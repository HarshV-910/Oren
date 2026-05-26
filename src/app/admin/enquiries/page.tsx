"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Contact Enquiries Management
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { MessageSquare, Calendar, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Read" | "Responded";
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: "enq-1",
      name: "Aditya Roy",
      email: "aditya.roy@example.com",
      phone: "+91 95482 18749",
      subject: "Custom Solitaire Ring Customization Query",
      message: "I am looking for a 2.5 carat emerald cut diamond solitaire ring in platinum. Do you offer customization options?",
      date: "May 24, 2026",
      status: "Unread",
    },
    {
      id: "enq-2",
      name: "Sneha Kapur",
      email: "sneha.k@example.com",
      phone: "+91 88975 32410",
      subject: "Delivery to Bangalore location",
      message: "Do you ship to Bangalore and how long will the transit insurance cover stay active for diamond drop earrings?",
      date: "May 22, 2026",
      status: "Responded",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: Enquiry["status"]) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    toast.success(`Enquiry status updated to ${newStatus}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Client Enquiries
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Review and respond to messages submitted through the contact support form
        </p>
      </div>

      {/* Enquiries Cards List */}
      <div className="space-y-6">
        {enquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className={`glass-card rounded-2xl p-6 border transition-all ${
              enquiry.status === "Unread" ? "border-gold/40 bg-gold/[0.02]" : "border-gold/5"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-gold/5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold">
                  {enquiry.subject}
                </span>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                    {enquiry.name}
                  </h3>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                      enquiry.status === "Unread"
                        ? "bg-red-500/15 text-red-400"
                        : enquiry.status === "Read"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {enquiry.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-foreground/40">
                  <Calendar size={12} className="text-gold/40" />
                  <span>{enquiry.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(enquiry.id, "Read")}
                    className="text-[10px] text-foreground/40 hover:text-gold uppercase tracking-wider transition-colors"
                  >
                    Mark Read
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(enquiry.id, "Responded")}
                    className="text-[10px] text-foreground/40 hover:text-emerald-400 uppercase tracking-wider transition-colors"
                  >
                    Mark Responded
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-foreground/75 leading-relaxed bg-white/5 p-4 rounded-xl border border-gold/5 font-light">
                "{enquiry.message}"
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-[10px] text-foreground/40">
                <div className="flex items-center gap-1">
                  <Mail size={10} className="text-gold/60" />
                  <span>{enquiry.email}</span>
                </div>
                <div>
                  <span>Phone: {enquiry.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
