import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { NotificationService } from './notification.service';

const sendPush = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.sendPushNotification(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Push notification process completed',
    data: result,
  });
});

export const NotificationController = {
  sendPush,
};
