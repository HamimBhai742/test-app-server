import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateGoal, IUpdateGoal, ISavingsLog } from "./goal.interface";
import { sendGoalSuccessEmail } from "../../utils/sendEmail";

const createGoal = async (userId: string, payload: ICreateGoal) => {
  const goal = await prisma.goal.create({
    data: {
      ...payload,
      userId,
    },
  });
  return goal;
};

const getAllGoals = async (userId: string) => {
  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return goals;
};

const updateGoal = async (id: string, userId: string, payload: IUpdateGoal) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Goal ID format", 400);
  }

  const existing = await prisma.goal.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new AppError("Goal not found", 404);
  }

  const updated = await prisma.goal.update({
    where: { id },
    data: payload,
    include: { user: true },
  });

  if (updated.isCompleted && !existing.isCompleted) {
    sendGoalSuccessEmail(updated.user.email, {
      goalName: updated.name,
      targetAmount: updated.targetAmount,
      pointsAwarded: updated.pointsAwarded,
      name: updated.user.name,
    }).catch((err) => console.error("Error sending goal success email:", err));
  }

  return updated;
};

const deleteGoal = async (id: string, userId: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Goal ID format", 400);
  }

  const existing = await prisma.goal.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new AppError("Goal not found", 404);
  }

  const deleted = await prisma.goal.delete({
    where: { id },
  });
  return deleted;
};

const addSavings = async (goalId: string, userId: string, log: ISavingsLog) => {
  if (!/^[0-9a-fA-F]{24}$/.test(goalId)) {
    throw new AppError("Invalid Goal ID format", 400);
  }

  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new AppError("Goal not found", 404);
  }

  const updatedHistory = [...existing.history, log];
  const totalSavings = updatedHistory.reduce((sum, item) => sum + item.amount, 0);
  const shouldMarkCompleted = totalSavings >= existing.targetAmount;

  const updated = await prisma.goal.update({
    where: { id: goalId },
    data: {
      history: updatedHistory,
      ...(shouldMarkCompleted && !existing.isCompleted ? { isCompleted: true } : {}),
    },
    include: { user: true },
  });

  if (shouldMarkCompleted && !existing.isCompleted) {
    sendGoalSuccessEmail(updated.user.email, {
      goalName: updated.name,
      targetAmount: updated.targetAmount,
      pointsAwarded: updated.pointsAwarded,
      name: updated.user.name,
    }).catch((err) => console.error("Error sending goal success email:", err));
  }

  return updated;
};

const deleteSavings = async (goalId: string, userId: string, savingsLogId: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(goalId)) {
    throw new AppError("Invalid Goal ID format", 400);
  }

  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new AppError("Goal not found", 404);
  }

  const updatedHistory = existing.history.filter((item) => item.id !== savingsLogId);

  const updated = await prisma.goal.update({
    where: { id: goalId },
    data: {
      history: updatedHistory,
    },
  });
  return updated;
};

const updateSavings = async (
  goalId: string,
  userId: string,
  savingsLogId: string,
  payload: Omit<ISavingsLog, "id">
) => {
  if (!/^[0-9a-fA-F]{24}$/.test(goalId)) {
    throw new AppError("Invalid Goal ID format", 400);
  }

  const existing = await prisma.goal.findFirst({
    where: { id: goalId, userId },
  });

  if (!existing) {
    throw new AppError("Goal not found", 404);
  }

  const updatedHistory = existing.history.map((item) => {
    if (item.id === savingsLogId) {
      return {
        ...item,
        ...payload,
      };
    }
    return item;
  });

  const updated = await prisma.goal.update({
    where: { id: goalId },
    data: {
      history: updatedHistory,
    },
  });
  return updated;
};

export const GoalService = {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
  addSavings,
  deleteSavings,
  updateSavings,
};
