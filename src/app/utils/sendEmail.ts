import nodemailer from "nodemailer";
import { getOTPEmailTemplate } from "./templates";

export const sendOTPEmail = async (to: string, otp: string, name?: string) => {
  console.log(`\n==================================================`);
  console.log(`🔑 [OTP GENERATED] Email: ${to} | OTP Code: ${otp}`);
  console.log(`==================================================\n`);

  // Get template subject and html from templates module
  const { subject, html } = getOTPEmailTemplate({ otp, name });

  // If SMTP environment variables are set in .env, send real email via SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"হিসাব কিতাব" <noreply@hisabkitab.com>',
        to,
        subject,
        html,
      });
      console.log(`✅ [EMAIL SENT] OTP successfully mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send email via SMTP:", error);
    }
  }
};
