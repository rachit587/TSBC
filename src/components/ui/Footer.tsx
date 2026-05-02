import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-10 border-t border-[var(--color-line-green)]">
      <div className="mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="block mb-6 cursor-pointer" aria-label="Home">
              <Image
                src="/a_images/tsbc logo.webp"
                alt="The Story Begins Cafe"
                width={200}
                height={112}
                className="h-28 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-[var(--color-muted)] font-accent text-sm leading-relaxed max-w-xs">
              Where coffee, comfort food, and conversations begin. Rampurhat&apos;s favourite multi-cuisine café.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/thestorybegins2022/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--color-line-green)] flex items-center justify-center text-[var(--color-emerald-rich)] hover:bg-[var(--color-emerald-rich)] hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/918250116900"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--color-line-green)] flex items-center justify-center text-[var(--color-emerald-rich)] hover:bg-[var(--color-emerald-rich)] hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.facebook.com/p/The-Story-Begins-Cafe-100085034447767/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--color-line-green)] flex items-center justify-center text-[var(--color-emerald-rich)] hover:bg-[var(--color-emerald-rich)] hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-6 text-[var(--color-charcoal)]">Quick Links</h4>
            <ul className="space-y-3 font-accent text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Full Menu", href: "/menu" },
                { label: "Our Story", href: "/#about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[var(--color-muted)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-xl mb-6 text-[var(--color-charcoal)]">Support</h4>
            <ul className="space-y-3 font-accent text-sm">
              <li>
                <a href="tel:+918250116900" className="text-[var(--color-muted)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 cursor-pointer">
                  Call Us: +91 82501 16900
                </a>
              </li>
              <li>
                <a href="https://wa.me/918250116900" target="_blank" rel="noreferrer" className="text-[var(--color-muted)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 cursor-pointer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.zomato.com/rampurhat/the-story-begins-cafe-rampurhat-locality/order"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 cursor-pointer"
                >
                  Order on Zomato
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=24.1750926,87.7887383"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-emerald-rich)] transition-colors duration-200 cursor-pointer"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 text-center space-y-2">
          <p className="text-xs text-[var(--color-muted)] font-accent">
            FSSAI License: 12822030000122
          </p>
          <p className="text-xs text-[var(--color-muted)] font-accent">
            &copy; {new Date().getFullYear()} The Story Begins Cafe, Rampurhat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
