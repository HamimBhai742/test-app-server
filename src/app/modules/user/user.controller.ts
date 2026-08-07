import { Request, Response } from "express";
import { AppError } from "../../error/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await UserService.getMe(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await UserService.updateMe(user.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUserStatus(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

const uploadAvatar = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const { image } = req.body;
  if (!image) {
    throw new AppError("Image data is required", 400);
  }
  const result = await UserService.uploadAvatar(user.id, image);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Avatar uploaded to Cloudinary successfully",
    data: result,
  });
});

const claimDailyLogin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await UserService.claimDailyLoginReward(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Daily login reward claimed successfully",
    data: result,
  });
});

const claimDailyTx = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const result = await UserService.claimDailyTxReward(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Daily transaction reward claimed successfully",
    data: result,
  });
});

const addPoints = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;
  const { amount } = req.body;
  if (!amount || typeof amount !== "number" || amount <= 0) {
    throw new AppError("Invalid amount", 400);
  }
  const result = await UserService.addPointsSecure(user.id, amount);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Points added successfully",
    data: result,
  });
});

const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getLeaderboard();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Leaderboard retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getMe,
  updateMe,
  uploadAvatar,
  getAllUsers,
  getUserById,
  updateUserStatus,
  claimDailyLogin,
  claimDailyTx,
  addPoints,
  getLeaderboard,
};
