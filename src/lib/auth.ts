import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { configs } from "../config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: configs.APP_USER,
    pass: configs.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // 1.
  trustedOrigins: [configs.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  // 2.
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  // 3
  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url, token }, request) => {
      const customVerificationUrl = `${configs.APP_URL}/verify-email?token=${token}`;
      // console.log(
      //   `url: ${url}, </br> token: ${token}, </br> customVerificationUrl:</br> ${customVerificationUrl}`
      // );
      try {
        const info = await transporter.sendMail({
          from: `"ADMIN" <${configs.APP_USER}>`,
          to: user.email,
          subject: "Email Verification ",
          text: `Verify your email: ${customVerificationUrl}`,
          html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  
                  <tr>
                    <td style="background-color: #4f46e5; padding: 40px 20px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Confirm Your Email</h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #1f2937;">Hi ${
                        user.name || "there"
                      },</p>
                      <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #4b5563;">
                        Welcome to our community! We're excited to have you. To complete your sign-up and ensure your account is secure, please verify your email address.
                      </p>
                      
                      <div style="text-align: center; margin: 32px 0;">
                        <a href="${customVerificationUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);">
                          Verify Email Address
                        </a>
                      </div>

                      <p style="margin: 24px 0 0; font-size: 14px; color: #6b7280; text-align: center;">
                        If the button doesn't work, copy and paste this link:
                      </p>
                      <p style="margin: 8px 0 0; font-size: 12px; color: #4f46e5; text-align: center; word-break: break-all;">
                        <a href="${customVerificationUrl}" style="color: #4f46e5;">${customVerificationUrl}</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                      </p>
                      <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">
                        123 App Street, Tech City
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
        console.log({
          success: true,
          message: "Verification email sent successfully",
          recipient: user.email,
          messageId: info.messageId,
        });
      } catch (error) {
        console.error("Critical: Email service failed", error);
      }
    },
  },
  baseURL: configs.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: configs.GOOGLE_CLIENT_ID as string,
      clientSecret: configs.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
