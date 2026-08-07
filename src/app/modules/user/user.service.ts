import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateProfile, IUpdateUserStatus } from "./user.interface";

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      pushToken: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateMe = async (userId: string, payload: IUpdateProfile) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      pushToken: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUserStatus = async (
  userId: string,
  payload: IUpdateUserStatus
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const uploadAvatar = async (userId: string, imageBase64: string) => {
  const { uploadToCloudinary } = await import("../../utils/cloudinary");
  const imageUrl = await uploadToCloudinary(imageBase64, "hisab_kitab/avatars");

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { avatar: imageUrl },
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

  return {
    url: imageUrl,
    user: updatedUser,
  };
};

const claimDailyLoginReward = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const todayStr = new Date().toISOString().split("T")[0];
  if (user.lastLoginRewardClaimedAt) {
    const lastClaimedStr = user.lastLoginRewardClaimedAt.toISOString().split("T")[0];
    if (todayStr === lastClaimedStr) {
      throw new AppError("Daily login reward already claimed today", 400);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 10 },
      lastLoginRewardClaimedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
    },
  });

  return updatedUser;
};

const claimDailyTxReward = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const todayStr = new Date().toISOString().split("T")[0];
  if (user.lastTxRewardClaimedAt) {
    const lastClaimedStr = user.lastTxRewardClaimedAt.toISOString().split("T")[0];
    if (todayStr === lastClaimedStr) {
      throw new AppError("Daily transaction reward already claimed today", 400);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: 10 },
      lastTxRewardClaimedAt: new Date(),
    },
    select: {
      id: true,
      name: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
    },
  });

  return updatedUser;
};

const addPointsSecure = async (userId: string, amount: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: amount },
    },
    select: {
      id: true,
      name: true,
      points: true,
      lastLoginRewardClaimedAt: true,
      lastTxRewardClaimedAt: true,
    },
  });

  return updatedUser;
};

const getLeaderboard = async () => {
  const leaderboard = await prisma.user.findMany({
    orderBy: {
      points: "desc",
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      points: true,
    },
  });

  return leaderboard;
};

export const UserService = {
  getMe,
  updateMe,
  uploadAvatar,
  getAllUsers,
  getUserById,
  updateUserStatus,
  claimDailyLoginReward,
  claimDailyTxReward,
  addPointsSecure,
  getLeaderboard,
};
