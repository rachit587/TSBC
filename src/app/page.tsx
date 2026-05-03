"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Clock, MapPin, Phone, MessageCircle, Utensils, Calendar } from "lucide-react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { cn } from "@/lib/utils";

const typewriterPhrases = [
  "Unforgettable Memories",
  "Endless Conversations",
  "Beautiful Moments",
  "Meaningful Connections",
  "Pure Joy & Laughter",
];

const galleryImages = [
  "/a_images/inner sitting.webp",
  "/a_images/outer look 2.webp",
  "/a_images/inner sittings 2.webp",
  "/a_images/sitting.webp",
  "/a_images/outerlook.webp",
];

const cafeImages = [
  { src: "/a_images/outerlook.webp", alt: "Cafe exterior" },
  { src: "/a_images/inner sitting.webp", alt: "Cozy interior seating" },
  { src: "/a_images/outer look 2.webp", alt: "Cafe facade" },
  { src: "/a_images/inner sittings 2.webp", alt: "More seating" },
  { src: "/a_images/sitting.webp", alt: "Table setting" },
  { src: "/a_images/dining area.webp", alt: "Dining area" },
  { src: "/a_images/inner sitting area.webp", alt: "Sitting area" },
  { src: "/a_images/inner sitting3.webp", alt: "Interior corner" },
  { src: "/a_images/inside.webp", alt: "Inside the cafe" },
  { src: "/a_images/outer look at night.webp", alt: "Cafe at night" },
  { src: "/a_images/outers sitting.webp", alt: "Outdoor seating" },
  { src: "/a_images/unnamed.webp", alt: "Cafe ambience" },
];

const featuredFoods = [
  { img: "/a_images/gen/chicken_dynamite_1777652372832.png", name: "Chicken Dynamite" },
  { img: "/a_images/gen/blue_mojito_1777652391465.png", name: "Heavenly Blue Mojito" },
  { img: "/a_images/gen/tsb_special_burger_1777652409816.png", name: "TSB Special Burger" },
  { img: "/a_images/gen/chicken_mayo_sandwich_1777652424046.png", name: "Chicken Mayo Sandwich" },
  { img: "/a_images/gen/sizzler_brownie_1777652438058.png", name: "Sizzler Brownie" },
  { img: "/a_images/gen/white_sauce_pasta_1777652452117.png", name: "White Sauce Pasta" },
  { img: "/a_images/gen/chicken_hakka_noodles_1777652470509.png", name: "Chicken Hakka Noodles" },
  { img: "/a_images/gen/chilli_chicken_1777652487605.png", name: "Chilli Chicken" },
  { img: "/a_images/gen/golden_fried_prawns_1777652502269.png", name: "Golden Fried Prawns" },
  { img: "/a_images/gen/double_chicken_burger_1777652516372.png", name: "Double Chicken Cheese Burger" },
  { img: "/a_images/gen/prawn_pasta_1777652533970.png", name: "Prawn Pasta" },
  { img: "/a_images/gen/spicy_chicken_wrap_1777652548587.png", name: "Spicy Chicken Wrap" },
  { img: "/a_images/gen/tsb_special_quesadilla_1777652564591.png", name: "TSB Special Quesadilla" },
  { img: "/a_images/gen/chocolate_freak_shake_1777652583243.png", name: "Chocolate Freak Shake" },
  { img: "/a_images/gen/tawa_chicken_masala_1777652599941.png", name: "Tawa Chicken Masala" },
];

export default function Home() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [enlargedFoodIdx, setEnlargedFoodIdx] = useState<number | null>(null);
  
  // Ambience Scroll Refs
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const isPausedRef = useRef(false);

  // Menu Scroll Refs
  const menuScrollTrackRef = useRef<HTMLDivElement>(null);
  const menuScrollPosRef = useRef(0);
  const menuAnimFrameRef = useRef<number>(0);
  const isMenuPausedRef = useRef(false);

  // Review Scroll Refs
  const reviewScrollTrackRef = useRef<HTMLDivElement>(null);
  const reviewScrollPosRef = useRef(0);
  const reviewAnimFrameRef = useRef<number>(0);
  const isReviewPausedRef = useRef(false);
  const reviewDragStartX = useRef<number | null>(null);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = typewriterPhrases[currentPhrase];

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length);
      setTypingSpeed(100);
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
        setTypingSpeed(isDeleting ? 40 : 100);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, typingSpeed]);

  // Infinite scroll animation
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    let pos = scrollPosRef.current;

    const step = () => {
      if (!isPausedRef.current) {
        pos += 0.69;
        if (pos >= totalWidth) pos = 0;
        scrollPosRef.current = pos;
        track.style.transform = `translateX(-${pos}px)`;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Menu Infinite scroll animation
  useEffect(() => {
    const track = menuScrollTrackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    let pos = menuScrollPosRef.current;

    const step = () => {
      if (!isMenuPausedRef.current) {
        pos += 0.8; // Slightly faster for menu items
        if (pos >= totalWidth) pos = 0;
        menuScrollPosRef.current = pos;
        track.style.transform = `translateX(-${pos}px)`;
      }
      menuAnimFrameRef.current = requestAnimationFrame(step);
    };
    menuAnimFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(menuAnimFrameRef.current);
  }, []);

  // Review Infinite scroll animation
  useEffect(() => {
    const track = reviewScrollTrackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    let pos = reviewScrollPosRef.current;

    const step = () => {
      if (!isReviewPausedRef.current && reviewDragStartX.current === null) {
        pos += 0.5; // smooth slow scroll
        if (pos >= totalWidth) pos = 0;
        if (pos < 0) pos = totalWidth - 0.5;
        reviewScrollPosRef.current = pos;
        track.style.transform = `translateX(-${pos}px)`;
      }
      reviewAnimFrameRef.current = requestAnimationFrame(step);
    };
    reviewAnimFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reviewAnimFrameRef.current);
  }, []);

  const handleReviewPointerDown = (e: React.PointerEvent) => {
    isReviewPausedRef.current = true;
    reviewDragStartX.current = e.clientX;
  };

  const handleReviewPointerMove = (e: React.PointerEvent) => {
    if (reviewDragStartX.current === null) return;
    const diff = reviewDragStartX.current - e.clientX;
    reviewDragStartX.current = e.clientX;
    
    const track = reviewScrollTrackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    let pos = reviewScrollPosRef.current + diff;
    
    if (pos >= totalWidth) pos -= totalWidth;
    if (pos < 0) pos += totalWidth;
    
    reviewScrollPosRef.current = pos;
    track.style.transform = `translateX(-${pos}px)`;
  };

  const handleReviewPointerUp = () => {
    isReviewPausedRef.current = false;
    reviewDragStartX.current = null;
  };

  const openLightbox = useCallback((idx: number) => {
    isPausedRef.current = true;
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    isPausedRef.current = false;
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  // Hero slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] selection:bg-[var(--color-sage-pale)] selection:text-[var(--color-forest-deep)]">
      <Header />

      <main className="pb-24">
        {/* ─── 1. HERO SECTION ─── */}
        <section className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-forest-deep)]">
          {/* Background Slideshow */}
          {galleryImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: index === currentSlide ? 0.6 : 0,
                scale: index === currentSlide ? 1 : 1.05,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={src}
                alt="Cafe ambience"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-deep)] via-black/40 to-black/60 mix-blend-multiply" />
            </motion.div>
          ))}

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8 mx-auto max-w-5xl mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-3xl"
            >
              <p className="font-accent text-[var(--color-sage)] font-medium tracking-widest text-sm md:text-base uppercase mb-6 flex items-center justify-center gap-3">
                <span className="w-12 h-px bg-[var(--color-sage)]/50" />
                Rampurhat&apos;s Favourite
                <span className="w-12 h-px bg-[var(--color-sage)]/50" />
              </p>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                The Story <br className="hidden md:block" />
                Begins Cafe
              </h1>

              <div className="h-10 md:h-12 mb-10 flex items-center justify-center">
                <p className="font-accent text-xl md:text-2xl text-white/90 font-light">
                  Crafting <span className="green-shimmer font-medium">{text}</span>
                  <span className="typewriter-cursor text-[var(--color-emerald-rich)]">|</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
                <LiquidMetalButton
                  label="View Menu"
                  href="/menu"
                  icon={<Utensils size={18} />}
                  bgColor={["#2D7A50", "#1A5C38"]}
                  textColor="#FAFAF5"
                  width={180}
                  height={56}
                />
                <LiquidMetalButton
                  label="Call Café"
                  href="tel:+918250116900"
                  icon={<Phone size={18} />}
                  bgColor={["#25D366", "#1DA851"]}
                  textColor="#ffffff"
                  width={180}
                  height={56}
                />
                <LiquidMetalButton
                  label="Make Reservation"
                  href="/reservation"
                  icon={<Calendar size={18} />}
                  bgColor={["#059669", "#064E3B"]}
                  textColor="#ffffff"
                  width={220}
                  height={56}
                />
              </div>
            </motion.div>
          </div>
          

        </section>

        {/* ─── 2. TRUST BAR ─── */}
        <section className="bg-white border-b border-[var(--color-line-green)] relative z-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-[var(--color-line-green)] text-center">
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex gap-1 mb-2 text-[var(--color-emerald-mid)]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="font-accent text-sm font-medium text-[var(--color-charcoal)]">4.5+ on Zomato</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <MapPin className="mb-2 text-[var(--color-emerald-mid)]" size={20} />
                <span className="font-accent text-sm font-medium text-[var(--color-charcoal)]">Heart of Rampurhat</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <Utensils className="mb-2 text-[var(--color-emerald-mid)]" size={20} />
                <span className="font-accent text-sm font-medium text-[var(--color-charcoal)]">Multi-Cuisine</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <Clock className="mb-2 text-[var(--color-emerald-mid)]" size={20} />
                <span className="font-accent text-sm font-medium text-[var(--color-charcoal)]">Open Daily</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. GALLERY / AMBIENCE ─── */}
        <section id="gallery" className="py-24 bg-[var(--color-ivory)] overflow-hidden">
          <div className="mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-4">Our Ambience</h2>
              <div className="w-24 mx-auto green-line-h mb-6" />
              <p className="font-accent text-[var(--color-muted)] max-w-2xl mx-auto">
                A cozy, aesthetic space perfect for dates, hangouts, and celebrations.
              </p>
            </div>
          </div>

          {/* Infinite horizontal scroll strip — full bleed */}
          <div className="relative w-full overflow-hidden">
            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[var(--color-ivory)] to-transparent" />
            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[var(--color-ivory)] to-transparent" />

            <div ref={scrollTrackRef} className="flex gap-5 will-change-transform" style={{ width: "max-content" }}>
              {/* Render images twice for seamless loop */}
              {[...cafeImages, ...cafeImages].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx % cafeImages.length)}
                  className="shrink-0 w-72 md:w-96 h-60 md:h-72 rounded-2xl overflow-hidden relative group cursor-pointer shadow-green"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-[var(--color-forest-deep)]/0 group-hover:bg-[var(--color-forest-deep)]/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                      View Photo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <LiquidMetalButton
              label="View Full Gallery"
              href="/gallery"
              bgColor={["#FAFAF5", "#E8EAE3"]}
              textColor="#1A5C38"
              width={200}
            />
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                src={cafeImages[lightboxIndex].src}
                alt={cafeImages[lightboxIndex].alt}
                className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Prev / Next arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + cafeImages.length) % cafeImages.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 text-xl"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % cafeImages.length); }}
                className="absolute right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 text-xl"
                aria-label="Next"
              >
                ›
              </button>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-accent text-white/60 text-sm">
                {lightboxIndex + 1} / {cafeImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── 4. MENU CTA (Infinite Scroll Carousel) ─── */}
        <section className="py-24 bg-[var(--color-forest-deep)] overflow-hidden relative border-y border-[var(--color-emerald-rich)]/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,122,80,0.15)_0,transparent_100%)]" />
          
          <div className="relative z-10 text-center mb-16 px-4">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">Taste the Magic</h2>
            <div className="w-24 mx-auto h-px bg-gradient-to-r from-transparent via-[var(--color-sage)] to-transparent mb-6" />
            <p className="font-accent text-[var(--color-sage-pale)]/80 max-w-2xl mx-auto">
              From our signature burgers to refreshing mocktails.
            </p>
          </div>

          <div 
            className="relative w-full flex overflow-hidden mb-16 pb-12 cursor-pointer select-none"
            onPointerUp={() => { isMenuPausedRef.current = false; setEnlargedFoodIdx(null); }}
            onPointerLeave={() => { isMenuPausedRef.current = false; setEnlargedFoodIdx(null); }}
          >
            {/* Left and right gradient masks */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-20 bg-gradient-to-r from-[var(--color-forest-deep)] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-20 bg-gradient-to-l from-[var(--color-forest-deep)] to-transparent" />

            <div ref={menuScrollTrackRef} className="flex gap-6 px-3 will-change-transform" style={{ width: "max-content" }}>
              {[...featuredFoods, ...featuredFoods].map((item, idx) => (
                <div 
                  key={idx} 
                  onPointerDown={(e) => { 
                    isMenuPausedRef.current = true; 
                    setEnlargedFoodIdx(idx); 
                  }}
                  className={cn(
                    "w-56 md:w-64 rounded-2xl overflow-hidden relative group shrink-0 shadow-xl border border-white/10 inner-glow aspect-square bg-white transition-all duration-300",
                    enlargedFoodIdx === idx ? "scale-110 md:scale-125 z-50 shadow-2xl ring-4 ring-[var(--color-sage)]" : "scale-100 z-10"
                  )}
                >
                  <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 224px, 256px" className="object-cover transition-transform duration-700 group-hover:scale-110" draggable={false} loading="lazy" quality={70} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-forest-deep)] to-transparent pt-12 pb-4 px-4 pointer-events-none">
                    <h3 className="text-white font-heading text-lg md:text-xl drop-shadow-md text-center">{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 relative z-10">
            <LiquidMetalButton
              label="Explore Full Menu"
              href="/menu"
              icon={<Utensils size={18} />}
              bgColor={["#3DA16B", "#2D7A50"]}
              textColor="#ffffff"
              width={240}
              height={56}
            />
            <LiquidMetalButton
              label="Order from Zomato"
              href="https://www.zomato.com/rampurhat/the-story-begins-cafe-rampurhat-locality"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.12 14.67c-1.18 1.18-3.08 1.18-4.26 0l-3.53-3.53c-1.18-1.18-1.18-3.08 0-4.26s3.08-1.18 4.26 0l3.53 3.53c1.17 1.18 1.17 3.08 0 4.26z"/>
                </svg>
              }
              bgColor={["#cb202d", "#E23744"]}
              textColor="#ffffff"
              width={240}
              height={56}
            />
          </div>
        </section>

        {/* ─── 4.5. FOLLOW & CONNECT ─── */}
        <section className="py-20 bg-[var(--color-warm-white)] flex flex-col items-center justify-center text-center px-4">
          <h4 className="font-accent tracking-[0.2em] text-sm text-[var(--color-gold)] font-bold uppercase mb-4">
            Stay Updated
          </h4>
          <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-12">
            Follow & <span className="text-[var(--color-gold)]">Connect</span>
          </h2>
          
          <div className="flex flex-col gap-5 w-full items-center">
            <LiquidMetalButton
              label="Instagram"
              href="https://www.instagram.com/thestorybegins2022/"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              }
              bgColor={["#d62976", "#962fbf"]}
              textColor="#ffffff"
              width={260}
              height={56}
            />
            <LiquidMetalButton
              label="Facebook"
              href="https://www.facebook.com/p/The-Story-Begins-Cafe-100085034447767/"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              }
              bgColor={["#1877F2", "#1152a8"]}
              textColor="#ffffff"
              width={260}
              height={56}
            />
            <LiquidMetalButton
              label="WhatsApp"
              href="https://wa.me/918250116900?text=Hi%20The%20Story%20Begins%20Cafe%2C%20I%20want%20to%20inquire%20about%20your%20menu%2C%20ordering%2C%20and%20table%20booking."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              }
              bgColor={["#25D366", "#128C7E"]}
              textColor="#ffffff"
              width={260}
              height={56}
            />
          </div>
        </section>

        {/* ─── 5. ABOUT / BRAND STORY ─── */}
        <section id="about" className="py-24 bg-white">
          <div className="mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-green-lg">
                <Image src="/a_images/outerlook.webp" alt="The Story Begins Cafe Exterior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" quality={75} />
                <div className="absolute inset-0 ring-1 ring-inset ring-[var(--color-line-green)] rounded-3xl" />
              </div>
              
              <div>
                <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-6">Every great story<br/>starts with good food.</h2>
                <div className="w-16 h-1 bg-[var(--color-emerald-rich)] mb-8" />
                <div className="space-y-6 text-[var(--color-charcoal-soft)] font-accent leading-relaxed">
                  <p>
                    Located at Kamarpatty More, Rampurhat, <strong>The Story Begins Cafe</strong> was born from a simple idea: to create a space where great food meets great conversations.
                  </p>
                  <p>
                    We take pride in our diverse menu, offering everything from comforting hot beverages and thick smoothies to sizzlers, pasta, and our signature burgers. Every dish is prepared with fresh ingredients and a lot of passion.
                  </p>
                  <p>
                    Whether you&apos;re looking for a quiet corner to read, a vibrant space to catch up with friends, or simply craving a delicious meal, your story begins here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. TESTIMONIALS ─── */}
        <section id="reviews" className="py-24 bg-[var(--color-warm-white)] border-y border-[var(--color-line-green)]">
          <div className="mx-auto px-4 md:px-8 max-w-7xl text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-4">What Our Guests Say</h2>
            <div className="w-24 mx-auto green-line-h" />
          </div>

          <div 
            className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handleReviewPointerDown}
            onPointerMove={handleReviewPointerMove}
            onPointerUp={handleReviewPointerUp}
            onPointerLeave={handleReviewPointerUp}
          >
            <div ref={reviewScrollTrackRef} className="flex gap-6 px-6 will-change-transform" style={{ width: "max-content" }}>
              {[
                { name: "Arnab Bhattacharya", img: "/a_images/gen/profile_1_1777794665687.png", text: "Best cafe in Rampurhat! The Chicken Dynamite and White Sauce Pasta are absolute must-tries. The ambience is incredibly cozy." },
                { name: "Sohini Mukherjee", img: "/a_images/gen/profile_2_1777794680392.png", text: "Love the vibe here. Perfect place for hanging out with friends. Their cold coffee and burgers never disappoint." },
                { name: "Kabir Hossain", img: "/a_images/gen/profile_3_1777794695035.png", text: "Great food, aesthetic interior, and polite staff. The sizzlers are really good. Highly recommended!" },
                { name: "Riya Sarkar", img: "/a_images/gen/profile_4_1777794710433.png", text: "A hidden gem. The Heavenly Blue Mojito is so refreshing. Definitely visiting again for the pizzas." },
                { name: "Arnab Bhattacharya", img: "/a_images/gen/profile_1_1777794665687.png", text: "Best cafe in Rampurhat! The Chicken Dynamite and White Sauce Pasta are absolute must-tries. The ambience is incredibly cozy." },
                { name: "Sohini Mukherjee", img: "/a_images/gen/profile_2_1777794680392.png", text: "Love the vibe here. Perfect place for hanging out with friends. Their cold coffee and burgers never disappoint." },
                { name: "Kabir Hossain", img: "/a_images/gen/profile_3_1777794695035.png", text: "Great food, aesthetic interior, and polite staff. The sizzlers are really good. Highly recommended!" },
                { name: "Riya Sarkar", img: "/a_images/gen/profile_4_1777794710433.png", text: "A hidden gem. The Heavenly Blue Mojito is so refreshing. Definitely visiting again for the pizzas." },
              ].map((review, idx) => (
                <div key={idx} className="w-80 md:w-96 p-8 rounded-2xl glass-panel shadow-sm shrink-0 flex flex-col gap-4 border-l-4 border-l-[var(--color-emerald-rich)] pointer-events-none">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[var(--color-line-green)]">
                      <Image src={review.img} alt={review.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-heading font-bold text-lg text-[var(--color-forest-deep)] leading-tight">{review.name}</p>
                      <div className="flex text-[var(--color-emerald-mid)] mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                  <p className="font-accent text-[var(--color-charcoal-soft)] italic flex-grow">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 7. CONTACT & LOCATION ─── */}
        <section id="contact" className="py-24 bg-white">
          <div className="mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Contact Info */}
              <div className="flex flex-col justify-center">
                <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-forest-deep)] mb-6">Visit Us</h2>
                <p className="font-accent text-[var(--color-muted)] mb-10 text-lg">
                  We&apos;re located in the heart of Rampurhat. Drop by for a cup of coffee or a hearty meal.
                </p>

                <div className="space-y-8 font-accent">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-1">Address</h3>
                      <p className="text-[var(--color-muted)] leading-relaxed">
                        Kamarpatty More, Near Shiv Mandir,<br />
                        Joshda Apartment Ground Floor,<br />
                        Rampurhat, West Bengal 731224
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-1">Opening Hours</h3>
                      <p className="text-[var(--color-muted)]">Monday - Sunday<br />Open Daily</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-sage-pale)] flex items-center justify-center text-[var(--color-emerald-rich)] shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-charcoal)] text-lg mb-1">Contact</h3>
                      <p className="text-[var(--color-muted)] mb-3">+91 82501 16900</p>
                      <div className="flex gap-3">
                        <LiquidMetalButton
                          label="Call Now"
                          href="tel:+918250116900"
                          icon={<Phone size={14} />}
                          bgColor={["#2D7A50", "#1A5C38"]}
                          textColor="#FAFAF5"
                          width={140}
                          height={42}
                        />
                        <LiquidMetalButton
                          label="WhatsApp"
                          href="https://wa.me/918250116900"
                          target="_blank"
                          icon={<MessageCircle size={14} />}
                          bgColor={["#25D366", "#1DA851"]}
                          textColor="#FAFAF5"
                          width={140}
                          height={42}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-green-lg border border-[var(--color-line-green)] bg-[var(--color-warm-white)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.2885994248473!2d87.78616337583648!3d24.175097475143323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fa330060934e6f%3A0x6d20f929de2cba18!2sThe%20Story%20Begins%20Cafe!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
