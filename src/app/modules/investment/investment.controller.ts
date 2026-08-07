import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { InvestmentService } from "./investment.service";

const createInvestment = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await InvestmentService.createInvestment(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Investment project created successfully",
    data: result,
  });
});

const getAllInvestments = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await InvestmentService.getAllInvestments(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment projects retrieved successfully",
    data: result,
  });
});

const updateInvestment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  const result = await InvestmentService.updateInvestment(id, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment project updated successfully",
    data: result,
  });
});

const deleteInvestment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  const result = await InvestmentService.deleteInvestment(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment project deleted successfully",
    data: result,
  });
});

const addLog = catchAsync(async (req: Request, res: Response) => {
  const { investmentId } = req.params;
  const userId = req.user?.id as string;
  const result = await InvestmentService.addLog(investmentId, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment log added successfully",
    data: result,
  });
});

const deleteLog = catchAsync(async (req: Request, res: Response) => {
  const { investmentId, logId } = req.params;
  const userId = req.user?.id as string;
  const result = await InvestmentService.deleteLog(investmentId, userId, logId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment log deleted successfully",
    data: result,
  });
});

const updateLog = catchAsync(async (req: Request, res: Response) => {
  const { investmentId, logId } = req.params;
  const userId = req.user?.id as string;
  const result = await InvestmentService.updateLog(investmentId, userId, logId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Investment log updated successfully",
    data: result,
  });
});

export const InvestmentController = {
  createInvestment,
  getAllInvestments,
  updateInvestment,
  deleteInvestment,
  addLog,
  deleteLog,
  updateLog,
};
