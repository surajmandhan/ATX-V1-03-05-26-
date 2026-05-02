"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { customerCreate } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupPage() {
  const { router } = useAppContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await customerCreate(email, password, firstName, lastName);

      if (response.customer) {
        toast.success("Account created! Please login.");
        router.push("/login");
      } else {
        const error = response.customerUserErrors[0]?.message || "Could not create account";
        toast.error(error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
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

        <div className="max-w-sm w-full bg-[#0b0b0f]/80 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
          {/* Subtle top glow */}
          <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-50"></div>

          <div className="text-center mb-8">
            <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-[0.1em] mb-2">JOIN THE RESEARCH</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-4 bg-[#6366f1]"></div>
              <p className="text-white/40 font-['Space_Mono'] text-[10px] uppercase tracking-widest">New Protocol</p>
              <div className="h-[1px] w-4 bg-[#6366f1]"></div>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-white/70 text-xs font-['Space_Mono'] mb-2 uppercase">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs font-['Space_Mono'] mb-2 uppercase">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>


            <div>
              <label className="block text-white/70 text-xs font-['Space_Mono'] mb-2 uppercase">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
                placeholder="researcher@example.com"
              />
            </div>

            <div>
              <label className="block text-white/70 text-xs font-['Space_Mono'] mb-2 uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6366f1] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#6366f1] hover:bg-[#22d3ee] text-white hover:text-black font-bold rounded-lg transition-all transform active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/5 pt-4">
            <p className="text-white/40 text-xs">
              Already have an account?{" "}
              <Link href="/login" className="text-[#6366f1] hover:underline">
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
