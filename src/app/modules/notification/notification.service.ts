import { AppError } from '../../error/AppError';
import { prisma } from '../../lib/prisma';
import { messaging } from '../../config/firebaseAdmin';
import { IPushNotificationPayload } from './notification.interface';

const sendPushNotification = async (payload: IPushNotificationPayload) => {
  let targetTokens: string[] = [];

  if (payload.token) {
    targetTokens.push(payload.token);
  } else if (payload.userId) {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { pushToken: true },
    });
    if (user && user.pushToken) {
      targetTokens.push(user.pushToken);
    }
  } else {
    // Send to all users who have a pushToken registered
    const users = await prisma.user.findMany({
      where: { pushToken: { not: null } },
      select: { pushToken: true },
    });
    targetTokens = users.map((u) => u.pushToken!).filter(Boolean);
  }

  if (targetTokens.length === 0) {
    throw new AppError('No push tokens available for notification targets', 400);
  }

  if (!messaging) {
    throw new AppError('Firebase Admin Messaging is not initialized', 500);
  }

  const results = [];
  for (const token of targetTokens) {
    try {
      const message = {
        token,
        notification: {
          title: payload.title,
          body: payload.body,
        },
        data: payload.data || {},
        android: {
          priority: 'high' as const,
          notification: {
            sound: 'default',
            color: '#3B82F6',
          },
        },
      };

      const response = await messaging.send(message);
      results.push({ token, success: true, messageId: response });
    } catch (error: any) {
      results.push({ token, success: false, error: error.message });
    }
  }

  return results;
};

export const NotificationService = {
  sendPushNotification,
};
