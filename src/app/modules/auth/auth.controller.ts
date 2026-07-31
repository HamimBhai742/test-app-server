import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await AuthService.changePassword(user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.token;
  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.googleLogin(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in with Google successfully",
    data: result,
  });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.verifyOTP(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

const resendOTP = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.resendOTP(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New OTP sent successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  changePassword,
  refreshToken,
  googleLogin,
};
