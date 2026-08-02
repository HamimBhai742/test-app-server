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
  const existing = await prisma.due.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Due record not found");
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
  const deleted = await prisma.due.delete({
    where: { id },
  });
  return deleted;
};

export const DueService = {
  createDue,
  getAllDues,
  toggleSettleDue,
  deleteDue,
};
