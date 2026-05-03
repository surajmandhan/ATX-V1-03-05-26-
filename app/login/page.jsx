"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const { setCustomerToken, setUserData, router } = useAppContext();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email, otp
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setStep("otp");
        setResendTimer(60);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Identity verified!");
        
        // Store token in cookie
        document.cookie = `shopifyCustomerToken=${data.token}; path=/; max-age=2592000;`;
        setCustomerToken(data.token);
        setUserData(data.user);
        
        router.push("/");
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify error:", error);
      toast.error("An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center pt-48 md:pt-56 pb-20 px-6 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-sm w-full bg-[#0b0b0f]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
          {/* Subtle top glow */}
          <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-50"></div>
          
          <div className="text-center mb-10">
            <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-[0.15em] mb-2">
              {step === "email" ? "PORTAL ACCESS" : "VERIFY ID"}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-4 bg-[#6366f1]"></div>
              <p className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-[0.2em]">
                {step === "email" ? "Secure Protocol" : "Authentication"}
              </p>
              <div className="h-[1px] w-4 bg-[#6366f1]"></div>
            </div>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-white/50 text-[10px] font-['Space_Mono'] mb-3 uppercase tracking-widest">Researcher Email</label>
                <div className="relative group">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#6366f1] transition-all"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#6366f1] focus:bg-white/10 transition-all placeholder:text-white/10"
                    placeholder="researcher@atx.lab"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#6366f1] hover:bg-[#ff0060] text-white font-['Bebas_Neue'] text-2xl tracking-widest rounded-xl transition-all transform active:scale-95 disabled:opacity-50 shadow-[0_10px_20px_rgba(99,102,241,0.2)]"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
                    SENDING...
                  </div>
                ) : "REQUEST OTP →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-white/50 text-[10px] font-['Space_Mono'] uppercase tracking-widest">Entry Code</label>
                  <button 
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-[#6366f1] text-[10px] font-['Space_Mono'] uppercase hover:underline"
                  >
                    Change Email
                  </button>
                </div>
                <div className="relative group">
                  <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#6366f1] transition-all"></i>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-[#6366f1] focus:bg-white/10 transition-all placeholder:text-white/10 font-mono"
                    placeholder="000000"
                  />
                </div>
                <p className="text-white/20 text-[9px] font-['Space_Mono'] mt-3 text-center uppercase tracking-wider">
                  Code sent to <span className="text-white/40">{email}</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-5 bg-[#6366f1] hover:bg-[#22d3ee] hover:text-[#0b0b0f] text-white font-['Bebas_Neue'] text-2xl tracking-widest rounded-xl transition-all transform active:scale-95 disabled:opacity-50 shadow-[0_10px_20px_rgba(34,211,238,0.1)]"
              >
                {loading ? "VERIFYING..." : "ACCESS PORTAL →"}
              </button>

              <div className="text-center pt-2">
                {resendTimer > 0 ? (
                  <p className="text-white/20 text-[10px] font-['Space_Mono'] uppercase">Resend code in {resendTimer}s</p>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleSendOtp}
                    className="text-[#6366f1] text-[10px] font-['Space_Mono'] uppercase hover:underline"
                  >
                    Request New Code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-10 text-center border-t border-white/5 pt-6">
            <p className="text-white/30 text-[10px] font-['Space_Mono'] uppercase tracking-widest">
              Secured by ATX Research Cryptography
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
