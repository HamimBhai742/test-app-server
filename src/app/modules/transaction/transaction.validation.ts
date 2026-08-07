import { z } from "zod";

const VALID_CATEGORIES = [
  "Food", "Shopping", "Utilities", "Rent", "Entertainment",
  "Salary", "Transport", "Health", "Education", "Bills", "Others",
] as const;

const createTransactionValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    amount: z.number({ required_error: "Amount is required" }).positive("Amount must be positive"),
    type: z.enum(["income", "expense"], { required_error: "Type must be income or expense" }),
    category: z.string({ required_error: "Category is required" }),
    date: z.string({ required_error: "Date is required" }),
  }),
});

const updateTransactionValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    amount: z.number().positive("Amount must be positive").optional(),
    type: z.enum(["income", "expense"]).optional(),
    category: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const TransactionValidation = {
  createTransactionValidationSchema,
  updateTransactionValidationSchema,
};
