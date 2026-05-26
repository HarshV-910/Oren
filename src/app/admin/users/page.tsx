"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Customers Management
// ═══════════════════════════════════════════════════════

import { Users, Mail, Phone, Calendar } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/lib/data";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joined: string;
}

export default function AdminUsersPage() {
  const orders = useOrderStore((s) => s.orders);

  // Group orders by client to build a dynamic list
  const customersMap = new Map<string, Customer>();

  // Add initial mock list for elegant visual design representation
  const defaultCustomers: Customer[] = [
    {
      id: "cust-1",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98123 45678",
      totalOrders: 3,
      totalSpent: 450000,
      joined: "Jan 12, 2025",
    },
    {
      id: "cust-2",
      name: "Rahul Mehta",
      email: "rahul.mehta@example.com",
      phone: "+91 99123 98765",
      totalOrders: 1,
      totalSpent: 165000,
      joined: "Feb 18, 2025",
    },
    {
      id: "cust-3",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 (555) 019-2834",
      totalOrders: 2,
      totalSpent: 380000,
      joined: "Mar 05, 2025",
    },
  ];

  defaultCustomers.forEach((c) => customersMap.set(c.email, c));

  // Integrate dynamic orders placed during user session
  orders.forEach((order) => {
    const emailKey = order.address.fullName.toLowerCase().replace(/\s+/g, "") + "@orenclient.com";
    if (customersMap.has(emailKey)) {
      const existing = customersMap.get(emailKey)!;
      existing.totalOrders += 1;
      existing.totalSpent += order.total;
    } else {
      customersMap.set(emailKey, {
        id: `cust-${Math.random().toString(36).substr(2, 5)}`,
        name: order.address.fullName,
        email: emailKey,
        phone: order.address.phone,
        totalOrders: 1,
        totalSpent: order.total,
        joined: order.date,
      });
    }
  });

  const customersList = Array.from(customersMap.values());

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Customer Directory
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Review, manage, and explore profiles of registered luxury buyers
        </p>
      </div>

      {/* Customers Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Customer Profile
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Member Since
                </th>
              </tr>
            </thead>
            <tbody>
              {customersList.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{customer.name}</p>
                        <p className="text-[10px] text-foreground/30 uppercase tracking-widest font-mono">
                          {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-foreground/60">
                      <Mail size={12} className="text-gold/55" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground/60">
                      <Phone size={12} className="text-gold/55" />
                      <span>{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70 font-mono">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gold">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/40">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-gold/40" />
                      <span>{customer.joined}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
