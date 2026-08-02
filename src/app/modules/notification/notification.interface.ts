export interface IPushNotificationPayload {
  token?: string;
  userId?: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}
