import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DueService } from "./due.service";

const createDue = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await DueService.createDue(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Due record created successfully",
    data: result,
  });
});

const getAllDues = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await DueService.getAllDues(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Due records retrieved successfully",
    data: result,
  });
});

const toggleSettleDue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await DueService.toggleSettleDue(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Due settlement status updated successfully",
    data: result,
  });
});

const deleteDue = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await DueService.deleteDue(id, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Due record deleted successfully",
    data: result,
  });
});

export const DueController = {
  createDue,
  getAllDues,
  toggleSettleDue,
  deleteDue,
};
