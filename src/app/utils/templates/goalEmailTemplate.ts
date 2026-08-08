export interface IGoalSuccessTemplateParams {
  goalName: string;
  targetAmount: number;
  pointsAwarded: number;
  name?: string;
  appName?: string;
}

export const getGoalSuccessEmailTemplate = ({
  goalName,
  targetAmount,
  pointsAwarded,
  name = "ইউজার",
  appName = "হিসাব কিতাব",
}: IGoalSuccessTemplateParams): { subject: string; html: string } => {
  const subject = `অভিনন্দন ${name}! আপনি আপনার লক্ষ্য "${goalName}" অর্জন করেছেন 🎉`;

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
            <td align="center" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px;">
              <div style="font-size: 50px; margin-bottom: 12px;">🏆</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">অসাধারণ অর্জন!</h1>
              <p style="color: #d1fae5; margin: 6px 0 0 0; font-size: 13px;">আপনি আপনার লক্ষ্য পূরণ করেছেন</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 16px;">প্রিয় ${name},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                আমরা অত্যন্ত আনন্দের সাথে জানাচ্ছি যে আপনি <strong>${appName}</strong> অ্যাপে আপনার সেট করা লক্ষ্য <strong>"${goalName}"</strong> সফলভাবে পূরণ করতে পেরেছেন! আপনার আর্থিক শৃঙ্খলা ও সঞ্চয়ের এই প্রচেষ্টা সত্যিই প্রশংসনীয়।
              </p>

              <!-- Goal Stats Cards -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td width="50%" style="padding-right: 8px;">
                    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #166534; text-transform: uppercase; font-weight: 600;">সঞ্চয়ের পরিমাণ</p>
                      <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: 700; color: #15803d;">৳${targetAmount}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px;">
                    <div style="background-color: #fef9c3; border: 1px solid #fef08a; border-radius: 12px; padding: 16px; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #854d0e; text-transform: uppercase; font-weight: 600;">অর্জিত পয়েন্ট</p>
                      <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: 700; color: #a16207;">+${pointsAwarded} XP</p>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background-color: #f1f5f9; padding: 16px; border-radius: 10px; border-left: 4px solid #10b981; margin-bottom: 12px;">
                <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">
                  এই অর্জনের মাধ্যমে আপনার রিওয়ার্ড পয়েন্ট লিডারবোর্ডে যুক্ত হয়ে গেছে। এভাবে সঞ্চয়ের ধারা বজায় রাখুন এবং আপনার ভবিষ্যৎ আর্থিক অবস্থানকে আরও সুরক্ষিত করুন!
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0;">© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
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
