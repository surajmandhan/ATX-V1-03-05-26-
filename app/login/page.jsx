"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { customerAccessTokenCreate } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const { setCustomerToken, router } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await customerAccessTokenCreate(email, password);

      if (response.customerAccessToken) {
        const token = response.customerAccessToken.accessToken;
        const expiresAt = response.customerAccessToken.expiresAt;

        // Store token in cookie
        document.cookie = `shopifyCustomerToken=${token}; expires=${new Date(expiresAt).toUTCString()}; path=/;`;
        setCustomerToken(token);
        
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        const error = response.customerUserErrors[0]?.message || "Invalid email or password";
        toast.error(error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-wrapper min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-40 pb-20 px-6">
        <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide">WELCOME BACK</h1>
            <p className="text-white/50 font-['Space_Mono'] text-xs mt-2">Enter your research credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
              className="w-full py-4 bg-[#6366f1] hover:bg-[#22d3ee] text-white hover:text-black font-bold rounded-lg transition-all transform active:scale-95 disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO PORTAL"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-white/40 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#6366f1] hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
