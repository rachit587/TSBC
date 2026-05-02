"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle, X } from "lucide-react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    requests: ""
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmAndSend = () => {
    setIsSuccess(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    if (isSuccess) {
      // Reset form if they close after success
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "2",
        requests: ""
      });
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] selection:bg-[var(--color-sage-pale)] selection:text-[var(--color-forest-deep)]">
      <Header />

      <main className="pt-24 pb-24 md:pt-32">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[var(--color-forest-deep)] mb-6">
              Make a Reservation
            </h1>
            <div className="w-24 mx-auto green-line-h mb-6" />
            <p className="font-accent text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
              Book a table at Rampurhat's favourite cafe. Whether it's a date, a family dinner, or a casual hangout, we've got a spot for you.
            </p>
          </div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-green-lg border border-[var(--color-line-green)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-sage-pale)]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <form onSubmit={handleInitialSubmit} className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <User size={16} className="text-[var(--color-emerald-mid)]" /> Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent"
                    placeholder="John Doe"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <Phone size={16} className="text-[var(--color-emerald-mid)]" /> Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="email" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <Mail size={16} className="text-[var(--color-emerald-mid)]" /> Email Address (Optional)
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label htmlFor="date" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <Calendar size={16} className="text-[var(--color-emerald-mid)]" /> Date *
                  </label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label htmlFor="time" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <Clock size={16} className="text-[var(--color-emerald-mid)]" /> Time *
                  </label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="guests" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <Users size={16} className="text-[var(--color-emerald-mid)]" /> Number of Guests *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="requests" className="flex items-center gap-2 font-accent text-sm font-medium text-[var(--color-charcoal)]">
                    <MessageSquare size={16} className="text-[var(--color-emerald-mid)]" /> Special Requests (Optional)
                  </label>
                  <textarea 
                    id="requests" 
                    name="requests" 
                    rows={4}
                    value={formData.requests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-line-green)] bg-[var(--color-warm-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-mid)] focus:border-transparent transition-all font-accent resize-none"
                    placeholder="E.g., It's a birthday celebration, prefer a window seat..."
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[var(--color-forest-deep)] to-[var(--color-emerald-mid)] text-white font-accent font-medium rounded-xl shadow-green hover:shadow-green-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Send Reservation Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Modal Overlay */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-sage-pale)]/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              {!isSuccess ? (
                // Review & Confirm State
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading text-2xl md:text-3xl text-[var(--color-forest-deep)]">Review Details</h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-[var(--color-charcoal)] transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-8 font-accent">
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-[var(--color-muted)]">Name</span>
                      <span className="font-medium text-[var(--color-charcoal)]">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-[var(--color-muted)]">Phone</span>
                      <span className="font-medium text-[var(--color-charcoal)]">{formData.phone}</span>
                    </div>
                    {formData.email && (
                      <div className="flex justify-between border-b border-gray-100 pb-3">
                        <span className="text-[var(--color-muted)]">Email</span>
                        <span className="font-medium text-[var(--color-charcoal)]">{formData.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-[var(--color-muted)]">Date & Time</span>
                      <span className="font-medium text-[var(--color-charcoal)]">{formData.date} at {formData.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-[var(--color-muted)]">Guests</span>
                      <span className="font-medium text-[var(--color-charcoal)]">{formData.guests}</span>
                    </div>
                    {formData.requests && (
                      <div className="flex flex-col gap-1 pb-3">
                        <span className="text-[var(--color-muted)]">Special Requests</span>
                        <span className="font-medium text-[var(--color-charcoal)] italic">"{formData.requests}"</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={closeModal}
                      className="flex-1 py-3 px-4 border border-[var(--color-line-green)] rounded-xl font-accent font-medium text-[var(--color-charcoal)] hover:bg-[var(--color-warm-white)] transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={handleConfirmAndSend}
                      className="flex-1 py-3 px-4 bg-[var(--color-emerald-mid)] hover:bg-[var(--color-forest-deep)] text-white rounded-xl font-accent font-medium shadow-sm transition-colors"
                    >
                      Confirm & Send
                    </button>
                  </div>
                </div>
              ) : (
                // Success State
                <div className="p-8 md:p-10 text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 text-green-500">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="font-heading text-3xl text-[var(--color-forest-deep)] mb-4">Thank You!</h3>
                  <p className="font-accent text-[var(--color-muted)] text-lg mb-8 leading-relaxed">
                    We have received your message. The café will soon contact you at <strong>{formData.phone}</strong> to confirm your reservation.
                  </p>
                  <button 
                    onClick={closeModal}
                    className="w-full py-4 bg-[var(--color-forest-deep)] hover:bg-[var(--color-emerald-mid)] text-white rounded-xl font-accent font-medium shadow-sm transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
