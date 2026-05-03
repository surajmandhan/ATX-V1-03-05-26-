import { NextResponse } from 'next/server';
import { setOtp } from '@/lib/otp-utils';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in our memory store
    setOtp(email, otp);

    // Email Configuration from .env
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || '465');
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const fromName = process.env.EMAIL_FROM_NAME || "ATX Research";

    // If SMTP is configured, send the email
    if (user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: { user, pass },
      });

      const mailOptions = {
        from: `"${fromName}" <${user}>`,
        to: email,
        subject: `${otp} is your ATX Verification Code`,
        text: `Your verification code is: ${otp}. This code will expire in 5 minutes.`,
        html: `
          <div style="font-family: 'Space Mono', monospace; background-color: #0b0b0f; color: #ffffff; padding: 40px; border-radius: 20px; border: 1px solid #1d1d21;">
            <h2 style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.1em; color: #6366f1; font-size: 24px;">SECURITY PROTOCOL</h2>
            <p style="color: #ffffff; opacity: 0.6; font-size: 14px;">Your single-use research access code is below:</p>
            <div style="background-color: #13131a; padding: 20px; border-radius: 12px; border: 1px solid #6366f1; margin: 20px 0; text-align: center;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.3em; color: #22d3ee;">${otp}</span>
            </div>
            <p style="color: #ffffff; opacity: 0.4; font-size: 10px; text-transform: uppercase;">This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SENT] OTP successfully delivered to ${email}`);
    } else {
      // Fallback for development if SMTP is not set
      console.warn("[AUTH] SMTP not configured. OTP printed to console only.");
      console.log(`\n\n==============================\nOTP for ${email}: ${otp}\n==============================\n\n`);
    }

    return NextResponse.json({ 
      success: true, 
      message: (user && pass) ? "OTP sent to your email." : "OTP generated (Check console - SMTP not set)."
    });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP. Check your SMTP settings." }, { status: 500 });
  }
}
