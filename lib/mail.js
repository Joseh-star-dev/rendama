// lib/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to, token) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Rendama" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email address",
    html: `
  <!DOCTYPE html>
  <html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; font-family: -apple-system, BlinkMacOSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f9; color: #333333;">
   <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main container -->
        <table role="presentation" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 600;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 28px 24px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for signing up!<br>
                Please confirm your email address by clicking the button below.
              </p>

              <!-- Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 28px auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #4f46e5;" align="center">
                    <a href="${verificationUrl}" 
                       target="_blank" 
                       style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: white; text-decoration: none; border-radius: 8px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 15px; line-height: 1.5; color: #4b5563;">
                This link will expire in <strong>1 hour</strong> for security reasons.
              </p>

              <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                If you didn't create an account with us, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px;">
                © ${new Date().getFullYear()} Your Company Name. All rights reserved.
              </p>
              <p style="margin: 4px 0 0;">
                Having trouble? Contact us at support@yourcompany.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
   </table>
 </body>
 </html>
  `,
  });
}

export async function sendPasswordResetEmail(to, token) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Rendama" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacOSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f9; color: #333333;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main container -->
        <table role="presentation" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 600;">
                Reset Your Password
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 28px 24px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                We received a request to reset your password.<br>
                Click the button below to set a new one.
              </p>

              <!-- Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 28px auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #4f46e5;" align="center">
                    <a href="${resetUrl}" 
                       target="_blank" 
                       style="display: inline-block; padding: 16px 40px; font-size: 16px; font-weight: 600; color: white; text-decoration: none; border-radius: 8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 15px; line-height: 1.5; color: #4b5563;">
                This link will expire in <strong>1 hour</strong> for your security.
              </p>

              <p style="margin: 28px 0 0; font-size: 15px; line-height: 1.5; color: #4b5563;">
                If you did <strong>not</strong> request a password reset, please ignore this email or contact support immediately — your account is still safe.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px;">
                © ${new Date().getFullYear()} Your Company Name. All rights reserved.
              </p>
              <p style="margin: 4px 0 0;">
                Questions? Reach us at support@yourcompany.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });
}
