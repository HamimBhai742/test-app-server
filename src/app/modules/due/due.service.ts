import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateDue } from "./due.interface";

const createDue = async (userId: string | undefined, payload: ICreateDue) => {
  const due = await prisma.due.create({
    data: {
      ...payload,
      userId: userId || null,
    },
  });
  return due;
};

const getAllDues = async (userId?: string) => {
  const whereCondition = userId ? { userId } : {};
  const dues = await prisma.due.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
  });
  return dues;
};

const toggleSettleDue = async (id: string, userId?: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Due ID format", 400);
  }

  const existing = await prisma.due.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError("Due record not found", 404);
  }

  const updated = await prisma.due.update({
    where: { id },
    data: {
      isSettled: !existing.isSettled,
    },
  });
  return updated;
};

const deleteDue = async (id: string, userId?: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Due ID format", 400);
  }

  // Check if due exists
  const existing = await prisma.due.findUnique({
    where: { id },
  });
  if (!existing) {
    throw new AppError("Due record not found", 404);
  }

  const deleted = await prisma.due.delete({
    where: { id },
  });
  return deleted;
};

const updateDue = async (id: string, userId: string | undefined, payload: Partial<ICreateDue>) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Due ID format", 400);
  }

  const existing = await prisma.due.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError("Due record not found", 404);
  }

  const updated = await prisma.due.update({
    where: { id },
    data: payload,
  });
  return updated;
};

export const DueService = {
  createDue,
  getAllDues,
  toggleSettleDue,
  deleteDue,
  updateDue,
};
