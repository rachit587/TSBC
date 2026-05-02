"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MapPin } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const galleryImages = [
  { id: 1, src: "/a_images/outerlook.webp", alt: "Cafe exterior at night", category: "Exterior" },
  { id: 2, src: "/a_images/inner sitting.webp", alt: "Cozy interior seating", category: "Interior" },
  { id: 3, src: "/a_images/outer look 2.webp", alt: "Cafe exterior view", category: "Exterior" },
  { id: 4, src: "/a_images/inner sittings 2.webp", alt: "More interior seating", category: "Interior" },
  { id: 5, src: "/a_images/sitting.webp", alt: "Table setup", category: "Ambience" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header />

      <main className="pt-[100px] pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-[var(--color-forest-deep)] mb-4">Our Gallery</h1>
          <div className="w-24 mx-auto green-line-h mb-6" />
          <p className="font-accent text-[var(--color-muted)] max-w-xl mx-auto">
            Take a visual tour of Rampurhat&apos;s favourite café.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {["All", "Interior", "Exterior", "Ambience"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-accent text-sm transition-all ${
                  activeTab === tab
                    ? "bg-[var(--color-forest-deep)] text-white shadow-md"
                    : "bg-white text-[var(--color-charcoal-soft)] border border-[var(--color-line-green)] hover:bg-[var(--color-sage-pale)]/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-green-lg transition-all"
                >
                  <Image src={img.src} alt={img.alt} width={800} height={600} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" loading="lazy" quality={75} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <div className="mt-20 text-center flex flex-col items-center justify-center space-y-6">
            <p className="font-heading text-2xl text-[var(--color-forest-deep)]">Experience the ambience in person.</p>
            <div className="flex gap-4">
              <LiquidMetalButton
                label="Visit Us"
                href="/contact"
                icon={<MapPin size={16} />}
                bgColor={["#2D7A50", "#1A5C38"]}
                textColor="#FAFAF5"
                width={160}
              />
              <LiquidMetalButton
                label="Follow Us"
                href="https://www.instagram.com/thestorybegins2022/"
                target="_blank"
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>}
                bgColor={["#FAFAF5", "#E8EAE3"]}
                textColor="#1A5C38"
                width={160}
              />
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
