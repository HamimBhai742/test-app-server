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

  // Self-heal/migration check: If they claimed today but points were not added due to the previous database bug
  let points = user.points ?? 50;
  let needsUpdate = false;

  const todayStr = new Date().toISOString().split("T")[0];

  if (user.lastLoginRewardClaimedAt) {
    const claimDate = user.lastLoginRewardClaimedAt.toISOString().split("T")[0];
    if (claimDate === todayStr && points < 60) {
      // Only increase, never decrease — use Math.max to preserve higher values
      points = Math.max(points, 60);
      needsUpdate = true;
    }
  }

  if (user.lastTxRewardClaimedAt) {
    const claimDate = user.lastTxRewardClaimedAt.toISOString().split("T")[0];
    if (claimDate === todayStr && points < 70) {
      // Only increase, never decrease — use Math.max to preserve higher values
      points = Math.max(points, 70);
      needsUpdate = true;
    }
  }

  if (needsUpdate) {
    await prisma.user.update({
      where: { id: userId },
      data: { points },
    });
    user.points = points;
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

  const currentPoints = typeof user.points === "number" ? user.points : 50;
  const newPoints = currentPoints + 10;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: newPoints,
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

  const currentPoints = typeof user.points === "number" ? user.points : 50;
  const newPoints = currentPoints + 10;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: newPoints,
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

  const currentPoints = typeof user.points === "number" ? user.points : 50;
  const newPoints = currentPoints + amount;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: newPoints,
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
  let leaderboard = await prisma.user.findMany({
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

  // If the database has fewer than 5 registered users,
  // fill the gap with competitive mock profiles to make the leaderboard look active.
  const TARGET_SIZE = 5;
  if (leaderboard.length < TARGET_SIZE) {
    const allMockUsers = [
      { id: "mock_1", name: "তানভীর হাসান", points: 430, avatar: null },
      { id: "mock_2", name: "সাকিব রহমান", points: 340, avatar: null },
      { id: "mock_3", name: "রফিক উদ্দিন", points: 180, avatar: null },
      { id: "mock_4", name: "আরিফ হোসেন", points: 90, avatar: null },
      { id: "mock_5", name: "হামিম আহমেদ", points: 580, avatar: null },
    ];
    // Only add as many mock users as needed to reach the target size
    const needed = TARGET_SIZE - leaderboard.length;
    const mockToAdd = allMockUsers.slice(0, needed);
    leaderboard = [...leaderboard, ...mockToAdd];
    leaderboard.sort((a, b) => b.points - a.points);
  }

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
