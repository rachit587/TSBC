"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { LiquidMetalButton } from "./liquid-metal-button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "py-0 bg-white/90 backdrop-blur-2xl border-b border-[var(--color-line-green)] shadow-sm"
            : "py-1 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        )}
      >
        <div className="mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="relative z-50 block cursor-pointer" aria-label="The Story Begins Cafe — Home">
            <Image
              src="/a_images/tsbc logo.webp"
              alt="The Story Begins Cafe"
              width={160}
              height={80}
              priority
              className={cn(
                "transition-all duration-500 w-auto origin-top-left",
                isScrolled
                  ? "h-14 md:h-16"
                  : "h-16 md:h-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              )}
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { label: "Gallery", href: "/#gallery" },
              { label: "About", href: "/#about" },
              { label: "Menu", href: "/menu" },
              { label: "Reviews", href: "/#reviews" },
              { label: "Contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "text-sm font-accent font-medium tracking-wide transition-colors duration-200 relative group cursor-pointer",
                  isScrolled ? "text-[var(--color-charcoal)]" : "text-white"
                )}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-emerald-rich)] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden relative z-50 p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--color-charcoal)]" />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-[var(--color-charcoal)]" : "text-white")} />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-5 w-full px-8 max-w-md">
              {[
                { label: "Home", href: "/" },
                { label: "Menu", href: "/menu" },
                { label: "Gallery", href: "/gallery" },
                { label: "About", href: "/#about" },
                { label: "Reviews", href: "/#reviews" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-heading font-medium text-[var(--color-charcoal)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 flex items-center justify-between w-full border-b border-gray-100 pb-4 cursor-pointer"
                  >
                    {label}
                    <ChevronRight className="w-4 h-4 text-[var(--color-emerald-rich)] opacity-40" />
                  </Link>
                </motion.div>
              ))}

              <div className="w-full h-px bg-[var(--color-line-green)] mt-1" />

              <div className="flex gap-3 w-full mt-3 justify-center">
                <LiquidMetalButton
                  label="Call Us"
                  href="tel:+918250116900"
                  icon={<Phone size={14} />}
                  bgColor={["#2D7A50", "#1A5C38"]}
                  textColor="#FAFAF5"
                  width={140}
                  height={42}
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
