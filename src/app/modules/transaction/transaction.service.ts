import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateTransaction } from "./transaction.interface";

const SEED_TRANSACTIONS = [
  // ── জুলাই ২০২৬ ──
  { title: "Salary (বেতন)", amount: 50000, type: "income", category: "Salary", date: "2026-07-01" },
  { title: "Monthly Rent (বাসা ভাড়া)", amount: 12000, type: "expense", category: "Rent", date: "2026-07-01" },
  { title: "Groceries (বাজার করা)", amount: 3200, type: "expense", category: "Food", date: "2026-07-10" },
  { title: "Freelance Design (ফ্রিল্যান্স)", amount: 8500, type: "income", category: "Others", date: "2026-07-15" },
  { title: "Netflix (নেটফ্লিক্স)", amount: 400, type: "expense", category: "Entertainment", date: "2026-07-20" },
  { title: "Electric Bill (বিদ্যুৎ বিল)", amount: 1100, type: "expense", category: "Utilities", date: "2026-07-22" },
  { title: "Clothes Shopping (কেনাকাটা)", amount: 2500, type: "expense", category: "Shopping", date: "2026-07-25" },

  // ── জুন ২০২৬ ──
  { title: "Salary (বেতন)", amount: 50000, type: "income", category: "Salary", date: "2026-06-01" },
  { title: "Monthly Rent (বাসা ভাড়া)", amount: 12000, type: "expense", category: "Rent", date: "2026-06-01" },
  { title: "Dinner Party (ডিনার পার্টি)", amount: 4500, type: "expense", category: "Food", date: "2026-06-12" },
  { title: "Tuition Income (টিউশনি)", amount: 6000, type: "income", category: "Others", date: "2026-06-15" },
  { title: "Internet Bill (ইন্টারনেট)", amount: 700, type: "expense", category: "Utilities", date: "2026-06-18" },
  { title: "Movie Tickets (সিনেমা)", amount: 600, type: "expense", category: "Entertainment", date: "2026-06-28" },

  // ── মে ২০২৬ ──
  { title: "Salary (বেতন)", amount: 50000, type: "income", category: "Salary", date: "2026-05-01" },
  { title: "Monthly Rent (বাসা ভাড়া)", amount: 12000, type: "expense", category: "Rent", date: "2026-05-01" },
  { title: "Eid Shopping (ঈদ কেনাকাটা)", amount: 9000, type: "expense", category: "Shopping", date: "2026-05-05" },
  { title: "Bonus (বোনাস)", amount: 15000, type: "income", category: "Salary", date: "2026-05-10" },
  { title: "Restaurant (রেস্তোরাঁ)", amount: 3500, type: "expense", category: "Food", date: "2026-05-20" },
  { title: "Gas Bill (গ্যাস বিল)", amount: 900, type: "expense", category: "Utilities", date: "2026-05-25" },

  // ── এপ্রিল ২০২৬ ──
  { title: "Salary (বেতন)", amount: 50000, type: "income", category: "Salary", date: "2026-04-01" },
  { title: "Monthly Rent (বাসা ভাড়া)", amount: 12000, type: "expense", category: "Rent", date: "2026-04-01" },
  { title: "Daily Food (দৈনন্দিন খাবার)", amount: 5200, type: "expense", category: "Food", date: "2026-04-15" },
  { title: "Mobile Recharge (মোবাইল)", amount: 500, type: "expense", category: "Utilities", date: "2026-04-20" },
  { title: "Side Income (পার্ট টাইম)", amount: 4000, type: "income", category: "Others", date: "2026-04-25" },
  { title: "Gadget Purchase (গ্যাজেট)", amount: 8500, type: "expense", category: "Shopping", date: "2026-04-28" },
];

const createTransaction = async (userId: string | undefined, payload: ICreateTransaction) => {
  const transaction = await prisma.transaction.create({
    data: {
      ...payload,
      userId: userId || null,
    },
  });
  return transaction;
};

const getAllTransactions = async (userId?: string) => {
  const whereCondition = userId ? { userId } : {};
  const transactions = await prisma.transaction.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
  });

  return transactions;
};

const deleteTransaction = async (id: string, userId?: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  // Only allow the owner to delete
  if (userId && transaction.userId && transaction.userId !== userId) {
    throw new AppError("Unauthorized to delete this transaction", 403);
  }

  await prisma.transaction.delete({
    where: { id },
  });

  return { message: "Transaction deleted successfully" };
};

const deleteAllTransactions = async (userId?: string) => {
  const whereCondition = userId ? { userId } : {};
  await prisma.transaction.deleteMany({
    where: whereCondition,
  });

  return { message: "All transactions deleted successfully" };
};

const updateTransaction = async (id: string, userId: string | undefined, payload: Partial<ICreateTransaction>) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  // Only allow the owner to update
  if (userId && transaction.userId && transaction.userId !== userId) {
    throw new AppError("Unauthorized to update this transaction", 403);
  }

  const updated = await prisma.transaction.update({
    where: { id },
    data: payload,
  });

  return updated;
};

export const TransactionService = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  deleteAllTransactions,
  updateTransaction,
};
