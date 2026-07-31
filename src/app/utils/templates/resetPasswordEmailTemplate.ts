export interface IResetPasswordTemplateParams {
  resetLink?: string;
  name?: string;
  appName?: string;
}

export const getResetPasswordEmailTemplate = ({
  resetLink = "#",
  name = "ইউজার",
  appName = "হিসাব কিতাব",
}: IResetPasswordTemplateParams): { subject: string; html: string } => {
  const subject = `${appName} - পাসওয়ার্ড পুনর্নির্ধারণ লিংক`;

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
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">${appName}</h1>
              <p style="color: #dbeafe; margin: 4px 0 0 0; font-size: 13px;">পাসওয়ার্ড রিসেট লিংক</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 12px;">প্রিয় ${name},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                আপনার অ্যাকাউন্টের পাসওয়ার্ড পুনর্নির্ধারণের জন্য অনুরোধ পাওয়া গেছে। নিচে দেওয়া বাটনটিতে ক্লিক করে আপনার পাসওয়ার্ড রিসেট করুন:
              </p>

              <!-- Reset Action Button -->
              <div style="text-align: center; margin-bottom: 28px;">
                <a href="${resetLink}" style="background-color: #2563eb; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block;">
                  পাসওয়ার্ড পুনর্নির্ধারণ করুন
                </a>
              </div>

              <p style="font-size: 13px; color: #64748b; margin: 0;">
                আপনি যদি এই পাসওয়ার্ড রিসেটের অনুরোধ না করে থাকেন, তবে এটি উপেক্ষা করতে পারেন।
              </p>
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
