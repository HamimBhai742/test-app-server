export interface IWelcomeEmailTemplateParams {
  name?: string;
  appName?: string;
}

export const getWelcomeEmailTemplate = ({
  name = "ইউজার",
  appName = "হিসাব কিতাব",
}: IWelcomeEmailTemplateParams): { subject: string; html: string } => {
  const subject = `স্বাগতম ${name}! ${appName} অ্যাপে আপনার যাত্রা শুরু হোক`;

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
            <td align="center" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 36px 20px;">
              <div style="font-size: 40px; margin-bottom: 10px;">✨</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">${appName}-এ স্বাগতম!</h1>
              <p style="color: #dbeafe; margin: 6px 0 0 0; font-size: 13px;">আপনার ডিজিটাল আয়-ব্যয় ট্র্যাকিং পার্টনার</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 16px; font-weight: 600;">প্রিয় ${name},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
                আপনার দৈনিক আয় ও ব্যয়ের হিসাব সহজ এবং ডিজিটাল উপায়ে ট্র্যাক করার জন্য <strong>${appName}</strong> অ্যাপে যুক্ত হওয়ার জন্য আপনাকে আন্তরিক ধন্যবাদ। এখন থেকে আপনার আর্থিক পরিকল্পনা হবে আরো সহজ এবং গোছানো!
              </p>

              <!-- App Features list -->
              <h3 style="font-size: 14px; color: #0f172a; margin: 24px 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">ফিচারসমূহ যা আপনি উপভোগ করতে পারবেন:</h3>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    📈 <strong>আয়-ব্যয় ট্র্যাকিং:</strong> ক্যাটাগরি অনুযায়ী চোখের পলকে আয়-ব্যয়ের হিসাব রাখুন।
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    🪙 <strong>ডেইলি রিওয়ার্ড পয়েন্ট:</strong> প্রতিদিন লগইন করে ও লেনদেন করে পয়েন্ট অর্জন করুন এবং লিডারবোর্ডে এগিয়ে থাকুন।
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #475569;">
                    🎯 <strong>আর্থিক লক্ষ্য (Goals):</strong> আপনার কাঙ্ক্ষিত সঞ্চয় বা লক্ষ্যের অগ্রগতি ট্র্যাক করুন।
                  </td>
                </tr>
              </table>

              <div style="background-color: #f1f5f9; padding: 16px; border-radius: 10px; border-left: 4px solid #3b82f6; margin-bottom: 12px;">
                <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.5;">
                  চলুন শুরু করা যাক! আজই অ্যাপে আপনার প্রথম লেনদেনটি যুক্ত করুন এবং আপনার অর্থ ব্যবস্থাপনা শুরু করুন।
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
