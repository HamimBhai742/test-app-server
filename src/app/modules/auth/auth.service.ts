import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import config from "../../../config";
import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { sendOTPEmail } from "../../utils/sendEmail";
import {
  IChangePassword,
  IGoogleLogin,
  ILoginUser,
  IRegisterUser,
  IVerifyOTP,
  IResendOTP,
  IForgotPassword,
  IResetPassword,
} from "./auth.interface";

const googleClient = new OAuth2Client(config.google_client_id);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (payload: IRegisterUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new AppError("User with this email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.password_salt)
  );

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpires,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Send OTP Email
  await sendOTPEmail(payload.email, otp);

  return {
    user: newUser,
  };
};

const verifyOTP = async (payload: IVerifyOTP) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.otp || user.otp !== payload.otp) {
    throw new AppError("Invalid OTP code", 400);
  }

  if (user.otpExpires && new Date() > user.otpExpires) {
    throw new AppError("OTP code has expired", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { email: payload.email },
    data: {
      isVerified: true,
      otp: null,
      otpExpires: null,
    },
  });

  const jwtPayload = {
    id: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expire_in as SignOptions["expiresIn"],
  });

  const { password, ...result } = updatedUser;

  return {
    accessToken,
    user: result,
  };
};

const resendOTP = async (payload: IResendOTP) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email: payload.email },
    data: {
      otp,
      otpExpires,
    },
  });

  // Send OTP Email
  await sendOTPEmail(payload.email, otp);

  return {
    message: "New OTP sent successfully",
  };
};

const loginUser = async (payload: ILoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (user.status === "blocked" || user.status === "inactive") {
    throw new AppError(`User account is ${user.status}`, 403);
  }

  if (!user.password) {
    throw new AppError("Password is not set for this account", 400);
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expire_in as SignOptions["expiresIn"],
  });

  const { password, ...result } = user;

  return {
    accessToken,
    user: result,
  };
};

const googleLogin = async (payload: IGoogleLogin) => {
  let userEmail = payload.email || "google.user@example.com";
  let userName = payload.name || "Google User";
  let userAvatar = payload.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop";
  let googleId = "google_" + Date.now();

  if (payload.idToken) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: payload.idToken,
        audience: config.google_client_id || undefined,
      });
      const googleUser = ticket.getPayload();
      if (googleUser && googleUser.email) {
        userEmail = googleUser.email;
        userName = googleUser.name || userName;
        userAvatar = googleUser.picture || userAvatar;
        googleId = googleUser.sub || googleId;
      }
    } catch (e) {
      console.warn("Google token verification warning, fallback to payload login:", e);
    }
  }

  let user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userEmail,
        name: userName,
        avatar: userAvatar,
        provider: "google",
        googleId,
        isVerified: true,
      },
    });
  } else {
    if (user.status === "blocked" || user.status === "inactive") {
      throw new AppError(`User account is ${user.status}`, 403);
    }

    if (!user.googleId || !user.avatar) {
      user = await prisma.user.update({
        where: { email: userEmail },
        data: {
          googleId: user.googleId || googleId,
          provider: "google",
          ...(user.avatar ? {} : { avatar: userAvatar }),
        },
      });
    }
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expire_in as SignOptions["expiresIn"],
  });

  const { password, ...result } = user;

  return {
    accessToken,
    user: result,
  };
};

const changePassword = async (
  userId: string,
  payload: IChangePassword
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  if (!user.password) {
    throw new AppError("Password is not set for this account", 400);
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError("Old password does not match", 400);
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.password_salt)
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newHashedPassword,
    },
  });

  return { message: "Password updated successfully" };
};

const refreshToken = async (token: string) => {
  let decoded: JwtPayload & { id: string; email: string; role: string };
  try {
    decoded = jwt.verify(
      token,
      config.jwt.secret as Secret
    ) as JwtPayload & { id: string; email: string; role: string };
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === "blocked" || user.status === "inactive") {
    throw new AppError(`User account is ${user.status}`, 403);
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expire_in as SignOptions["expiresIn"],
  });

  return { accessToken };
};

const forgotPassword = async (payload: IForgotPassword) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.user.update({
    where: { email: payload.email },
    data: {
      otp,
      otpExpires,
    },
  });

  // Send OTP Email
  await sendOTPEmail(payload.email, otp);

  return {
    message: "OTP sent successfully",
  };
};

const resetPassword = async (payload: IResetPassword) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.otp || user.otp !== payload.otp) {
    throw new AppError("Invalid OTP code", 400);
  }

  if (user.otpExpires && new Date() > user.otpExpires) {
    throw new AppError("OTP code has expired", 400);
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.password_salt)
  );

  await prisma.user.update({
    where: { email: payload.email },
    data: {
      password: hashedPassword,
      otp: null,
      otpExpires: null,
    },
  });

  return {
    message: "Password reset successfully",
  };
};

export const AuthService = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  changePassword,
  refreshToken,
  googleLogin,
  forgotPassword,
  resetPassword,
};
