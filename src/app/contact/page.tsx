"use client";

// ═══════════════════════════════════════════════════════
// OREN — Contact Page
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function ContactPage() {
  const {
    storeName,
    contactEmail,
    phone,
    address,
    addressState,
    phoneBackup,
    phoneTollFree,
    supportEmail,
    ordersEmail,
    workingHoursWeekdays,
    workingHoursSunday,
    workingHoursHolidays,
  } = useSettingsStore();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [`${storeName} Luxury Jewellers`, address, addressState],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [phone, phoneBackup, phoneTollFree],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [contactEmail, supportEmail, ordersEmail],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [workingHoursWeekdays, workingHoursSunday, workingHoursHolidays],
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs text-gold/70 uppercase tracking-[0.3em]">Get in Touch</span>
          <h1 className="text-3xl lg:text-5xl font-display font-bold mt-3">
            <span className="gradient-gold-text">Contact Us</span>
          </h1>
          <p className="text-foreground/50 mt-4">
            Have a question about our collection, need help with an order, or want to schedule a
            private viewing? We&apos;re here to help.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-gold/25 transition-all"
            >
              <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{info.title}</h3>
              {info.details.map((d, j) => (
                <p key={j} className="text-xs text-foreground/40 leading-relaxed">
                  {d}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Send Us a Message
            </h2>
            <p className="text-sm text-foreground/40 mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Subject</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-foreground/50 uppercase tracking-wider">Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your enquiry, order, or jewellery needs..."
                  rows={5}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Right Side — Support Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-luxury-black" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                    Live Support
                    <span className="text-[9px] font-sans font-bold bg-gold/10 text-gold border border-gold/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Upcoming
                    </span>
                  </h3>
                  <p className="text-xs text-foreground/40">Available during working hours</p>
                </div>
              </div>
              <p className="text-sm text-foreground/50 mb-4">
                Speak with our jewellery experts for personalized assistance with your purchase,
                custom orders, or any questions.
              </p>
              <Button
                variant="outline"
                className="border-gold/20 text-gold hover:bg-gold/10"
              >
                <MessageSquare size={16} className="mr-2" />
                Start Live Chat
              </Button>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                Frequently Asked
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How do I track my order?",
                    a: "Once shipped, you'll receive a tracking link via email and SMS.",
                  },
                  {
                    q: "What is your return policy?",
                    a: "We offer a 30-day hassle-free return policy on all purchases.",
                  },
                  {
                    q: "Do you offer custom designs?",
                    a: "Yes! Contact us for bespoke jewellery designed to your vision.",
                  },
                  {
                    q: "Is international shipping available?",
                    a: "We ship to 50+ countries with free insured shipping on orders above ₹50,000.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="border-b border-gold/5 pb-3 last:border-0">
                    <p className="text-sm font-medium text-foreground/80 mb-1">{faq.q}</p>
                    <p className="text-xs text-foreground/40">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
