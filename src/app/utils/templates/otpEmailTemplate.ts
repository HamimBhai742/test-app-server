export interface IOTPEmailTemplateParams {
  otp: string;
  name?: string;
  appName?: string;
  validMinutes?: number;
}

export const getOTPEmailTemplate = ({
  otp,
  name = "ইউজার",
  appName = "হিসাব কিতাব",
  validMinutes = 10,
}: IOTPEmailTemplateParams): { subject: string; html: string } => {
  const subject = `${appName} - আপনার ওটিপি ভেরিফিকেশন কোড`;

  const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 32px 20px;">
              <div style="background: rgba(255, 255, 255, 0.15); width: 60px; height: 60px; border-radius: 30px; line-height: 60px; text-align: center; margin: 0 auto 12px auto; font-size: 30px;">
                📊
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">${appName}</h1>
              <p style="color: #dbeafe; margin: 4px 0 0 0; font-size: 13px;">Daily Expense Tracker</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 12px;">প্রিয় ${name},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                ${appName}-এ আপনাকে স্বাগতম! আপনার অ্যাকাউন্ট ভেরিফিকেশন সম্পূর্ণ করতে নিচের ৬ ডিজিটের ওটিপি (OTP) কোডটি ব্যবহার করুন:
              </p>

              <!-- OTP Code Display Card -->
              <div style="background-color: #f1f5f9; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #2563eb; display: inline-block; font-family: 'Courier New', Courier, monospace;">
                  ${otp}
                </span>
              </div>

              <!-- Expiry Alert -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
                <tr>
                  <td style="font-size: 13px; color: #b45309; line-height: 1.5;">
                    ⏱️ এই কোডটি আগামী <strong>${validMinutes} মিনিট</strong> মেয়াদে কার্যকর থাকবে। নিরাপত্তার জন্য কারো সাথে কোডটি শেয়ার করবেন না।
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #64748b; margin: 0;">
                আপনি যদি এই একাউন্ট খোলার অনুরোধ না করে থাকেন, তবে এই ইমেইলটি উপেক্ষা করুন।
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0;">© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
              <p style="margin: 0;">যেকোনো প্রয়োজনে যোগাযোগ করুন: support@hisabkitab.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return { subject, html };
};
