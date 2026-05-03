"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AllProductsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
      <div className="animate-pulse text-[#6366f1] font-['Bebas_Neue'] text-3xl tracking-widest">
        REDIRECTING TO HOME...
      </div>
    </div>
  );
}