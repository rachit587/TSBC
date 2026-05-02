"use client";

import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full text-center">
          <h1 className="font-heading text-8xl text-[var(--color-emerald-rich)] mb-4">404</h1>
          <h2 className="font-heading text-3xl text-[var(--color-forest-deep)] mb-4">Page Not Found</h2>
          <div className="w-16 h-px mx-auto bg-[var(--color-emerald-rich)]/30 mb-6" />
          <p className="font-accent text-[var(--color-charcoal-soft)] mb-10">
            Looks like this page is missing from our menu. Don&apos;t worry, we have plenty of other delicious options waiting for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LiquidMetalButton
              label="Back to Home"
              href="/"
              icon={<ArrowLeft size={16} />}
              bgColor={["#FAFAF5", "#E8EAE3"]}
              textColor="#1A5C38"
              width={180}
            />
            <LiquidMetalButton
              label="View Menu"
              href="/menu"
              icon={<Utensils size={16} />}
              bgColor={["#2D7A50", "#1A5C38"]}
              textColor="#FAFAF5"
              width={180}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
