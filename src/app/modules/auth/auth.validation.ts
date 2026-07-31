import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, "New password must be at least 6 characters"),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }).optional(),
  body: z.object({
    token: z.string().optional(),
  }).optional(),
});

const googleLoginValidationSchema = z.object({
  body: z.object({
    idToken: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

const verifyOTPValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    otp: z.string({ required_error: "OTP code is required" }),
  }),
});

const resendOTPValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  googleLoginValidationSchema,
  verifyOTPValidationSchema,
  resendOTPValidationSchema,
};
