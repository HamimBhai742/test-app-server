import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateInvestment, IUpdateInvestment, IInvestmentLog } from "./investment.interface";

const createInvestment = async (userId: string, payload: ICreateInvestment) => {
  const investment = await prisma.investmentProject.create({
    data: {
      ...payload,
      userId,
    },
  });
  return investment;
};

const getAllInvestments = async (userId: string) => {
  const investments = await prisma.investmentProject.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return investments;
};

const updateInvestment = async (id: string, userId: string, payload: IUpdateInvestment) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Investment ID format", 400);
  }

  const existing = await prisma.investmentProject.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new AppError("Investment not found", 404);
  }

  const updated = await prisma.investmentProject.update({
    where: { id },
    data: payload,
  });
  return updated;
};

const deleteInvestment = async (id: string, userId: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new AppError("Invalid Investment ID format", 400);
  }

  const existing = await prisma.investmentProject.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    throw new AppError("Investment not found", 404);
  }

  const deleted = await prisma.investmentProject.delete({
    where: { id },
  });
  return deleted;
};

const addLog = async (investmentId: string, userId: string, log: IInvestmentLog) => {
  if (!/^[0-9a-fA-F]{24}$/.test(investmentId)) {
    throw new AppError("Invalid Investment ID format", 400);
  }

  const existing = await prisma.investmentProject.findFirst({
    where: { id: investmentId, userId },
  });

  if (!existing) {
    throw new AppError("Investment not found", 404);
  }

  const updatedLogs = [...existing.logs, log];

  const updated = await prisma.investmentProject.update({
    where: { id: investmentId },
    data: {
      logs: updatedLogs,
    },
  });
  return updated;
};

const deleteLog = async (investmentId: string, userId: string, logId: string) => {
  if (!/^[0-9a-fA-F]{24}$/.test(investmentId)) {
    throw new AppError("Invalid Investment ID format", 400);
  }

  const existing = await prisma.investmentProject.findFirst({
    where: { id: investmentId, userId },
  });

  if (!existing) {
    throw new AppError("Investment not found", 404);
  }

  const updatedLogs = existing.logs.filter((item) => item.id !== logId);

  const updated = await prisma.investmentProject.update({
    where: { id: investmentId },
    data: {
      logs: updatedLogs,
    },
  });
  return updated;
};

const updateLog = async (
  investmentId: string,
  userId: string,
  logId: string,
  payload: Omit<IInvestmentLog, "id">
) => {
  if (!/^[0-9a-fA-F]{24}$/.test(investmentId)) {
    throw new AppError("Invalid Investment ID format", 400);
  }

  const existing = await prisma.investmentProject.findFirst({
    where: { id: investmentId, userId },
  });

  if (!existing) {
    throw new AppError("Investment not found", 404);
  }

  const updatedLogs = existing.logs.map((item) => {
    if (item.id === logId) {
      return {
        ...item,
        ...payload,
      };
    }
    return item;
  });

  const updated = await prisma.investmentProject.update({
    where: { id: investmentId },
    data: {
      logs: updatedLogs,
    },
  });
  return updated;
};

export const InvestmentService = {
  createInvestment,
  getAllInvestments,
  updateInvestment,
  deleteInvestment,
  addLog,
  deleteLog,
  updateLog,
};
