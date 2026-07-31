import { z } from "zod";

const createTransactionValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    amount: z.number({ required_error: "Amount is required" }).positive("Amount must be positive"),
    type: z.enum(["income", "expense"], { required_error: "Type must be income or expense" }),
    category: z.enum(
      ["Food", "Shopping", "Utilities", "Rent", "Entertainment", "Salary", "Others"],
      { required_error: "Category is required" }
    ),
    date: z.string({ required_error: "Date is required" }),
  }),
});

export const TransactionValidation = {
  createTransactionValidationSchema,
};
