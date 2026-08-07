import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionService } from "./transaction.service";

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await TransactionService.createTransaction(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Transaction created successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await TransactionService.getAllTransactions(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transactions retrieved successfully",
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TransactionService.deleteTransaction(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction deleted successfully",
    data: result,
  });
});

const deleteAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await TransactionService.deleteAllTransactions(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All transactions deleted successfully",
    data: result,
  });
});

const updateTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TransactionService.updateTransaction(id, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction updated successfully",
    data: result,
  });
});

export const TransactionController = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  deleteAllTransactions,
  updateTransaction,
};
