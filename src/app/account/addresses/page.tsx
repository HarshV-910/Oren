"use client";

// ═══════════════════════════════════════════════════════
// OREN — Addresses Page
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, Edit2, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<SavedAddress>>({});

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login?redirect=/account/addresses";
    }
  }, [authLoading, isAuthenticated]);

  // Load addresses from localstorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`oren-addresses-${user.id}`);
      if (stored) {
        setAddresses(JSON.parse(stored));
      } else {
        // Seed initial default address
        const seed: SavedAddress[] = [
          {
            id: "addr-1",
            fullName: user.full_name,
            phone: "+91 98765 43210",
            addressLine: "Flat 402, Signature Towers, Bandra West",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400050",
            country: "India",
            isDefault: true,
          },
        ];
        setAddresses(seed);
        localStorage.setItem(`oren-addresses-${user.id}`, JSON.stringify(seed));
      }
    }
  }, [user]);

  const saveToStorage = (newAddresses: SavedAddress[]) => {
    if (user) {
      setAddresses(newAddresses);
      localStorage.setItem(`oren-addresses-${user.id}`, JSON.stringify(newAddresses));
    }
  };

  const handleEdit = (address: SavedAddress) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentAddress({
      country: "India",
      isDefault: addresses.length === 0,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (addresses.find((a) => a.id === id)?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
    }
    saveToStorage(updated);
    toast.success("Address deleted successfully");
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveToStorage(updated);
    toast.success("Default address updated");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName: fName, phone: ph, addressLine: ad, city: c, state: st, postalCode: pc, country: co } = currentAddress;
    if (!fName || !ph || !ad || !c || !st || !pc || !co) {
      toast.error("Please fill in all address fields");
      return;
    }

    if (currentAddress.id) {
      // Edit existing
      const updated = addresses.map((a) => {
        if (a.id === currentAddress.id) {
          return {
            ...a,
            ...currentAddress,
          } as SavedAddress;
        }
        if (currentAddress.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      saveToStorage(updated);
      toast.success("Address updated successfully");
    } else {
      // Add new
      const newAddr: SavedAddress = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: fName,
        phone: ph,
        addressLine: ad,
        city: c,
        state: st,
        postalCode: pc,
        country: co,
        isDefault: !!currentAddress.isDefault,
      };

      let updated = [...addresses];
      if (newAddr.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(newAddr);
      saveToStorage(updated);
      toast.success("Address added successfully");
    }

    setIsEditing(false);
  };

  if (authLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
            <Link href="/account" className="hover:text-gold transition-colors">
              Account
            </Link>
            <ChevronRight size={12} />
            <span className="text-gold">Addresses</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold gradient-gold-text">
                My Addresses
              </h1>
              <p className="text-foreground/40 text-sm mt-1">
                Manage your shipping details for faster checkout
              </p>
            </div>
            {!isEditing && (
              <Button
                onClick={handleAddNew}
                className="btn-luxury px-6 py-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus size={16} /> Add Address
              </Button>
            )}
          </div>
        </motion.div>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 lg:p-8 rounded-3xl max-w-2xl"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              {currentAddress.id ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Full Name</Label>
                  <Input
                    value={currentAddress.fullName || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, fullName: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Phone</Label>
                  <Input
                    value={currentAddress.phone || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, phone: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Address Line</Label>
                  <Input
                    value={currentAddress.addressLine || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, addressLine: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="Street address, building, floor"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">City</Label>
                  <Input
                    value={currentAddress.city || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">State</Label>
                  <Input
                    value={currentAddress.state || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Postal Code</Label>
                  <Input
                    value={currentAddress.postalCode || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, postalCode: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="400001"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Country</Label>
                  <Input
                    value={currentAddress.country || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, country: e.target.value })}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="India"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={!!currentAddress.isDefault}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, isDefault: e.target.checked })}
                  className="rounded border-gold/30 bg-white/5 text-gold focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <Label htmlFor="isDefault" className="text-xs text-foreground/75 cursor-pointer uppercase tracking-wider select-none">
                  Set as default shipping address
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-gold/20 text-foreground/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider flex-1"
                >
                  Save Address
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <motion.div
                key={address.id}
                layout
                className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between min-h-[180px] border transition-all ${
                  address.isDefault ? "border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.05)]" : "border-gold/5"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                      {address.fullName}
                    </h3>
                    {address.isDefault && (
                      <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-semibold uppercase tracking-widest flex items-center gap-1">
                        <Check size={10} /> Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light">
                    {address.addressLine}
                  </p>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light mt-0.5">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light mt-0.5">
                    {address.country}
                  </p>
                  <p className="text-[10px] text-foreground/40 mt-3 font-mono">
                    Phone: {address.phone}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 mt-4 border-t border-gold/5">
                  {!address.isDefault ? (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-[10px] text-foreground/40 hover:text-gold uppercase tracking-wider transition-colors font-medium"
                    >
                      Set Default
                    </button>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-1.5 text-foreground/40 hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
