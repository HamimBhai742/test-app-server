import { Router } from 'express';
import { NotificationController } from './notification.controller';

const router = Router();

router.post('/send-push', NotificationController.sendPush);

export const NotificationRoutes = router;
