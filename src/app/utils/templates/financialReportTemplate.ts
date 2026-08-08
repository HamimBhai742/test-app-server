export interface IFinancialReportCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface IFinancialReportTransaction {
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

export interface IFinancialReportTemplateParams {
  userName: string;
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpense: number;
  balanceChange: number;
  categoryBreakdown: IFinancialReportCategory[];
  recentTransactions: IFinancialReportTransaction[];
  appName?: string;
}

export const getFinancialReportEmailTemplate = ({
  userName,
  startDate,
  endDate,
  totalIncome,
  totalExpense,
  balanceChange,
  categoryBreakdown,
  recentTransactions,
  appName = "হিসাব কিতাব",
}: IFinancialReportTemplateParams): { subject: string; html: string } => {
  const subject = `${appName} - আপনার সাপ্তাহিক আর্থিক রিপোর্ট (${startDate} থেকে ${endDate})`;

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
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Banner -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 36px 20px;">
              <div style="font-size: 40px; margin-bottom: 8px;">📊</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">সাপ্তাহিক রিপোর্ট</h1>
              <p style="color: #dbeafe; margin: 4px 0 0 0; font-size: 13px;">সময়কাল: ${startDate} থেকে ${endDate}</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 24px;">
              <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 12px;">প্রিয় ${userName},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                গত ৭ দিনে হিসাব কিতাব অ্যাপে আপনার রেকর্ডকৃত আয়-ব্যয়ের বিস্তারিত বিবরণ নিচে দেওয়া হলো। আপনার বাজেট ঠিক রাখতে এবং সঞ্চয় বাড়াতে এটি সাহায্য করবে।
              </p>

              <!-- Financial KPI Summary Cards -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td width="33%" style="padding-right: 6px;">
                    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px; text-align: center;">
                      <p style="margin: 0; font-size: 11px; color: #166534; font-weight: 600;">মোট আয়</p>
                      <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #166534;">৳${totalIncome}</p>
                    </div>
                  </td>
                  <td width="33%" style="padding-horizontal: 3px;">
                    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 12px; text-align: center;">
                      <p style="margin: 0; font-size: 11px; color: #991b1b; font-weight: 600;">মোট ব্যয়</p>
                      <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #991b1b;">৳${totalExpense}</p>
                    </div>
                  </td>
                  <td width="33%" style="padding-left: 6px;">
                    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 12px; text-align: center;">
                      <p style="margin: 0; font-size: 11px; color: #1e40af; font-weight: 600;">ব্যালেন্স পরিবর্তন</p>
                      <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: ${balanceChange >= 0 ? '#166534' : '#991b1b'};">
                        ${balanceChange >= 0 ? '+' : ''}৳${balanceChange}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Category breakdown -->
              ${categoryBreakdown.length > 0 ? `
              <h3 style="font-size: 14px; color: #0f172a; margin: 24px 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">ব্যয়ের ক্যাটাগরি বিশ্লেষণ:</h3>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; font-size: 13px; color: #475569; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #f1f5f9; text-align: left;">
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600;">ক্যাটাগরি</th>
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">পরিমাণ</th>
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right; padding-left: 12px;">অনুপাত</th>
                  </tr>
                </thead>
                <tbody>
                  ${categoryBreakdown.map(cat => `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0;">📁 ${cat.category}</td>
                    <td style="padding: 10px 0; text-align: right; font-weight: 600;">৳${cat.amount}</td>
                    <td style="padding: 10px 0; text-align: right; color: #64748b; padding-left: 12px;">${cat.percentage}%</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
              ` : ''}

              <!-- Recent Transactions -->
              ${recentTransactions.length > 0 ? `
              <h3 style="font-size: 14px; color: #0f172a; margin: 24px 0 12px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">গত সপ্তাহের লেনদেনসমূহ:</h3>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #475569; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #f1f5f9; text-align: left;">
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600;">বিবরণ</th>
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600;">তারিখ</th>
                    <th style="padding: 8px 0; color: #0f172a; font-weight: 600; text-align: right;">পরিমাণ</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentTransactions.slice(0, 8).map(tx => `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0;">
                      <span style="font-weight: 600; color: #0f172a;">${tx.title}</span><br/>
                      <span style="font-size: 11px; color: #94a3b8;">${tx.category}</span>
                    </td>
                    <td style="padding: 10px 0; color: #64748b;">${tx.date}</td>
                    <td style="padding: 10px 0; text-align: right; font-weight: 700; color: ${tx.type === 'income' ? '#166534' : '#991b1b'};">
                      ${tx.type === 'income' ? '+' : '-'}৳${tx.amount}
                    </td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
              ` : ''}

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
