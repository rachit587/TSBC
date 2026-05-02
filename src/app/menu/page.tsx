"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Utensils, Info } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";import { menuData, menuCategories, type MenuItem } from "./menuData";
import { cn } from "@/lib/utils";

type FilterType = "All" | "veg" | "non-veg" | "egg";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Derive categories that actually have items
  const availableCategories = useMemo(() => {
    const cats = new Set(menuData.map(i => i.category));
    return ["All Categories", ...menuCategories.filter(c => cats.has(c))];
  }, []);

  // Filter logic
  const filteredMenu = useMemo(() => {
    let filtered = menuData;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All Categories") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (activeFilter !== "All") {
      filtered = filtered.filter(item => item.tags?.includes(activeFilter));
    }

    return filtered;
  }, [searchQuery, activeFilter, activeCategory]);

  // Group by category for display
  const groupedMenu = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredMenu.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredMenu]);

  // Lock body scroll when modal is open
  if (typeof document !== "undefined") {
    document.body.style.overflow = selectedItem ? "hidden" : "";
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header />

      <main className="pt-[100px] pb-24">
        {/* Hero Banner */}
        <section className="bg-[var(--color-forest-deep)] relative overflow-hidden py-16 mb-8 shadow-green">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,122,80,0.15)_0,transparent_100%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">Our Menu</h1>
            <div className="w-24 mx-auto green-line-h mb-6" />
            <p className="font-accent text-[var(--color-sage-pale)] max-w-xl mx-auto">
              From our signature Chicken Dynamite to refreshing mocktails.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Controls: Search and Filters */}
          <div className="sticky top-[72px] md:top-[88px] z-30 bg-[var(--color-ivory)]/95 backdrop-blur-md pt-4 pb-6 border-b border-[var(--color-line-green)] mb-10 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[var(--color-muted)]" />
                </div>
                <input
                  type="text"
                  placeholder="Search for a dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-full border border-[var(--color-line-green)] bg-white text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] transition-all font-accent shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-muted)] hover:text-[var(--color-charcoal)]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Dietary Filters */}
              <div className="flex bg-white rounded-full p-1 border border-[var(--color-line-green)] shadow-sm w-full md:w-auto overflow-x-auto hide-scrollbar">
                {(["All", "veg", "non-veg", "egg"] as FilterType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={cn(
                      "px-5 py-2 rounded-full font-accent text-sm font-medium transition-all capitalize whitespace-nowrap",
                      activeFilter === type
                        ? "bg-[var(--color-forest-deep)] text-white shadow-md"
                        : "text-[var(--color-charcoal-soft)] hover:bg-[var(--color-sage-pale)]/50"
                    )}
                  >
                    {type === "All" ? "All Items" : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 hide-scrollbar">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full border text-sm font-accent whitespace-nowrap transition-colors",
                    activeCategory === cat
                      ? "border-[var(--color-emerald-rich)] bg-[var(--color-emerald-rich)]/10 text-[var(--color-emerald-rich)] font-semibold"
                      : "border-[var(--color-line-green)] bg-white text-[var(--color-charcoal-soft)] hover:border-[var(--color-emerald-rich)]/50 hover:text-[var(--color-emerald-rich)]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="space-y-16">
            {Object.keys(groupedMenu).length > 0 ? (
              Object.entries(groupedMenu).map(([category, items]) => (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="scroll-mt-32">
                  <h2 className="font-heading text-3xl text-[var(--color-charcoal)] mb-6 flex items-center gap-3">
                    {category}
                    <span className="h-px flex-1 bg-[var(--color-line-green)] mt-2" />
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                      <motion.div
                        layoutId={`card-${item.id}`}
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white rounded-2xl p-5 border border-[var(--color-line-green)] shadow-sm hover:shadow-green transition-shadow cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2 gap-4">
                            <h3 className="font-heading font-semibold text-xl text-[var(--color-charcoal)] leading-tight">{item.name}</h3>
                            {/* Dietary dot indicator */}
                            <div className="shrink-0 mt-1">
                              {item.tags?.includes("veg") && !item.tags?.includes("egg") && <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center p-[2px] rounded-sm"><div className="w-full h-full bg-green-600 rounded-full" /></div>}
                              {item.tags?.includes("non-veg") && <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center p-[2px] rounded-sm"><div className="w-full h-full bg-red-600 rounded-full" /></div>}
                              {item.tags?.includes("egg") && !item.tags?.includes("non-veg") && <div className="w-4 h-4 border-2 border-yellow-500 flex items-center justify-center p-[2px] rounded-sm"><div className="w-full h-full bg-yellow-500 rounded-full" /></div>}
                            </div>
                          </div>
                          
                          {item.subcategory && (
                            <span className="inline-block px-2 py-1 bg-[var(--color-sage-pale)]/50 text-[var(--color-emerald-rich)] text-xs font-accent font-medium rounded mb-3">
                              {item.subcategory}
                            </span>
                          )}

                          {item.tags && item.tags.filter(t => t === "popular" || t === "spicy" || t === "new").length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {item.tags.includes("popular") && <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Bestseller</span>}
                              {item.tags.includes("spicy") && <span className="text-[10px] uppercase tracking-wider font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">Spicy</span>}
                              {item.tags.includes("new") && <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-emerald-rich)] bg-[var(--color-sage-pale)] px-2 py-0.5 rounded border border-[var(--color-sage)]">New</span>}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-heading text-xl font-bold text-[var(--color-emerald-rich)]">
                            {item.price && item.price !== "verify" ? `₹${item.price}` : item.variants ? `₹${item.variants[0].price}+` : "Ask staff"}
                          </span>
                          {item.description && <Info size={14} className="text-[var(--color-muted)] opacity-70" />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Utensils className="mx-auto h-16 w-16 text-[var(--color-line-green)] mb-4" />
                <h3 className="text-xl font-heading text-[var(--color-charcoal)] mb-2">No items found</h3>
                <p className="text-[var(--color-muted)] font-accent mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveFilter("All"); setActiveCategory("All Categories"); }}
                  className="px-6 py-2 bg-[var(--color-forest-deep)] text-white rounded-full font-accent hover:bg-[var(--color-emerald-rich)] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  layoutId={`card-${selectedItem.id}`}
                  className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl pointer-events-auto"
                >
                  <div className="bg-[var(--color-forest-deep)] p-6 text-white relative">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="font-heading text-2xl font-bold mb-2 pr-8">{selectedItem.name}</h3>
                    <p className="font-accent text-[var(--color-sage)] text-sm opacity-90">{selectedItem.category} {selectedItem.subcategory && `• ${selectedItem.subcategory}`}</p>
                  </div>
                  
                  <div className="p-6">
                    <p className="font-accent text-[var(--color-charcoal-soft)] mb-6 text-sm leading-relaxed">
                      {selectedItem.description || "A carefully crafted preparation by our chefs — visit us to experience it firsthand."}
                    </p>

                    {selectedItem.price && selectedItem.price !== "verify" && !selectedItem.variants && (
                      <div className="mb-4 flex items-center gap-2">
                        <span className="font-heading text-2xl font-bold text-[var(--color-emerald-rich)]">₹{selectedItem.price}</span>
                        <span className="text-xs text-[var(--color-muted)] font-accent">(+ GST)</span>
                      </div>
                    )}
                    {selectedItem.variants && selectedItem.variants.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-accent text-sm font-semibold text-[var(--color-charcoal)] mb-3">Available Options</h4>
                        <div className="space-y-2">
                          {selectedItem.variants.map((v, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--color-line-green)] last:border-0">
                              <span className="font-accent text-sm">{v.label}</span>
                              <span className="font-heading font-bold text-[var(--color-emerald-rich)] text-sm">₹{v.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-[var(--color-sage-pale)]/30 rounded-xl p-4 flex items-center gap-3">
                      <Info className="text-[var(--color-emerald-rich)] shrink-0" size={20} />
                      <p className="text-xs font-accent text-[var(--color-charcoal-soft)] leading-snug">
                        GST applicable. Self-service. Outside food & drinks not allowed. FSSAI: 12822030000122
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* FSSAI Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 mt-20 text-center">
          <p className="font-accent text-xs text-[var(--color-muted)]">
            Prices are subject to change. Images are for representation purposes only.<br/>
            FSSAI License: 12822030000122
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
