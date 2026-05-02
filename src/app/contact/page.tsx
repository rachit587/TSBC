"use client";

import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header />

      <main className="pt-[100px] pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-[var(--color-forest-deep)] mb-4">Contact Us</h1>
          <div className="w-24 mx-auto green-line-h mb-6" />
          <p className="font-accent text-[var(--color-muted)] max-w-xl mx-auto">
            We&apos;d love to hear from you. Find our location or get in touch below.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Info Cards */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-[var(--color-line-green)] shadow-sm hover:shadow-green transition-shadow flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">Location</h3>
                  <p className="font-accent text-[var(--color-charcoal-soft)] leading-relaxed">
                    Kamarpatty More, Near Shiv Mandir,<br />
                    Joshda Apartment Ground Floor,<br />
                    Rampurhat, West Bengal 731224
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[var(--color-line-green)] shadow-sm hover:shadow-green transition-shadow flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">Hours</h3>
                  <p className="font-accent text-[var(--color-charcoal-soft)] leading-relaxed">
                    Monday - Sunday<br />
                    Open Daily
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[var(--color-line-green)] shadow-sm hover:shadow-green transition-shadow flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[var(--color-charcoal)] mb-2">Get in Touch</h3>
                  <p className="font-accent text-[var(--color-charcoal-soft)] mb-5">+91 82501 16900</p>
                  <div className="flex flex-wrap gap-3">
                    <LiquidMetalButton
                      label="Call Now"
                      href="tel:+918250116900"
                      icon={<Phone size={14} />}
                      bgColor={["#2D7A50", "#1A5C38"]}
                      textColor="#FAFAF5"
                      width={140}
                    />
                    <LiquidMetalButton
                      label="WhatsApp"
                      href="https://wa.me/918250116900"
                      target="_blank"
                      icon={<MessageCircle size={14} />}
                      bgColor={["#25D366", "#1DA851"]}
                      textColor="#FAFAF5"
                      width={140}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[500px] lg:h-auto w-full rounded-3xl overflow-hidden shadow-green-lg border border-[var(--color-line-green)] bg-white relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.2885994248473!2d87.78616337583648!3d24.175097475143323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fa330060934e6f%3A0x6d20f929de2cba18!2sThe%20Story%20Begins%20Cafe!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
