"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Customers Management
// ═══════════════════════════════════════════════════════

import { Users, Mail, Phone, Calendar } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/lib/data";
import { useVisitorStore } from "@/store/useVisitorStore";

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
  const registeredUsers = useVisitorStore((s) => s.registeredUsers);

  // Group orders by client to build a dynamic list
  const customersMap = new Map<string, Customer>();

  // Initialize customersMap with all registered users/visitors
  registeredUsers.forEach((user) => {
    customersMap.set(user.email.toLowerCase(), {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: "Not provided",
      totalOrders: 0,
      totalSpent: 0,
      joined: user.joined,
    });
  });

  // Integrate dynamic orders placed during user session
  orders.forEach((order) => {
    // If order has an email/fullName matching registered, map to it, otherwise fallback to guest
    const guestEmail = order.address.fullName.toLowerCase().replace(/\s+/g, "") + "@orenclient.com";
    const emailKey = guestEmail.toLowerCase();
    
    // Check if customer email exists in map (or look up by exact name match)
    let matchedKey = "";
    for (const [key, cust] of customersMap.entries()) {
      if (cust.name.toLowerCase() === order.address.fullName.toLowerCase()) {
        matchedKey = key;
        break;
      }
    }

    if (matchedKey) {
      const existing = customersMap.get(matchedKey)!;
      existing.totalOrders += 1;
      existing.totalSpent += order.total;
      if (order.address.phone) {
        existing.phone = order.address.phone;
      }
    } else {
      customersMap.set(emailKey, {
        id: `cust-${Math.random().toString(36).substr(2, 5)}`,
        name: order.address.fullName,
        email: emailKey,
        phone: order.address.phone || "Not provided",
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
              {customersList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-foreground/40">
                    No customers registered yet.
                  </td>
                </tr>
              ) : (
                customersList.map((customer) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
