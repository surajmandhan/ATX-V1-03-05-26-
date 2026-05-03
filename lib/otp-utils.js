// Simple in-memory OTP store (Use Redis or DB for production)
const otpStore = new Map();

export function setOtp(email, otp) {
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(email, { otp, expires });
  console.log(`[OTP STORE] Set OTP for ${email}: ${otp}`);
}

export function getOtp(email) {
  const entry = otpStore.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    otpStore.delete(email);
    return null;
  }
  return entry.otp;
}

export function deleteOtp(email) {
  otpStore.delete(email);
}
