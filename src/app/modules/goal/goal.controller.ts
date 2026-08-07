import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { GoalService } from "./goal.service";

const createGoal = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await GoalService.createGoal(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Goal created successfully",
    data: result,
  });
});

const getAllGoals = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await GoalService.getAllGoals(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Goals retrieved successfully",
    data: result,
  });
});

const updateGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  const result = await GoalService.updateGoal(id, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Goal updated successfully",
    data: result,
  });
});

const deleteGoal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  const result = await GoalService.deleteGoal(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Goal deleted successfully",
    data: result,
  });
});

const addSavings = catchAsync(async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const userId = req.user?.id as string;
  const result = await GoalService.addSavings(goalId, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Savings added successfully",
    data: result,
  });
});

const deleteSavings = catchAsync(async (req: Request, res: Response) => {
  const { goalId, savingsLogId } = req.params;
  const userId = req.user?.id as string;
  const result = await GoalService.deleteSavings(goalId, userId, savingsLogId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Savings deleted successfully",
    data: result,
  });
});

const updateSavings = catchAsync(async (req: Request, res: Response) => {
  const { goalId, savingsLogId } = req.params;
  const userId = req.user?.id as string;
  const result = await GoalService.updateSavings(goalId, userId, savingsLogId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Savings updated successfully",
    data: result,
  });
});

export const GoalController = {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
  addSavings,
  deleteSavings,
  updateSavings,
};
