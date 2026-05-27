"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Settings Page
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { Settings, Save, ShieldAlert, Globe, Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { useAnnouncementStore } from "@/store/useAnnouncementStore";
import { useGuideStore } from "@/store/useGuideStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function AdminSettingsPage() {
  const {
    storeName: initialStoreName,
    contactEmail: initialContactEmail,
    phone: initialPhone,
    address: initialAddress,
    maintenance: initialMaintenance,
    addressState: initialAddressState,
    phoneBackup: initialPhoneBackup,
    phoneTollFree: initialPhoneTollFree,
    supportEmail: initialSupportEmail,
    ordersEmail: initialOrdersEmail,
    workingHoursWeekdays: initialWorkingHoursWeekdays,
    workingHoursSunday: initialWorkingHoursSunday,
    workingHoursHolidays: initialWorkingHoursHolidays,
    setStoreName: updateStoreName,
    setContactEmail: updateContactEmail,
    setPhone: updatePhone,
    setAddress: updateAddress,
    setMaintenance: updateMaintenance,
    setAddressState: updateAddressState,
    setPhoneBackup: updatePhoneBackup,
    setPhoneTollFree: updatePhoneTollFree,
    setSupportEmail: updateSupportEmail,
    setOrdersEmail: updateOrdersEmail,
    setWorkingHoursWeekdays: updateWorkingHoursWeekdays,
    setWorkingHoursSunday: updateWorkingHoursSunday,
    setWorkingHoursHolidays: updateWorkingHoursHolidays,
  } = useSettingsStore();

  const [storeName, setStoreName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressState, setAddressState] = useState("");
  const [phoneBackup, setPhoneBackup] = useState("");
  const [phoneTollFree, setPhoneTollFree] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [ordersEmail, setOrdersEmail] = useState("");
  const [workingHoursWeekdays, setWorkingHoursWeekdays] = useState("");
  const [workingHoursSunday, setWorkingHoursSunday] = useState("");
  const [workingHoursHolidays, setWorkingHoursHolidays] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [saving, setSaving] = useState(false);

  const storeAnnouncement = useAnnouncementStore((s) => s.text);
  const storeSetAnnouncement = useAnnouncementStore((s) => s.setText);
  const [announcementText, setAnnouncementText] = useState("");

  const storeSizeGuide = useGuideStore((s) => s.sizeGuide);
  const storeCareGuide = useGuideStore((s) => s.careGuide);
  const storeSetSizeGuide = useGuideStore((s) => s.setSizeGuide);
  const storeSetCareGuide = useGuideStore((s) => s.setCareGuide);

  const [sizeGuideText, setSizeGuideText] = useState("");
  const [careGuideText, setCareGuideText] = useState("");

  useEffect(() => {
    setStoreName(initialStoreName);
    setContactEmail(initialContactEmail);
    setPhone(initialPhone);
    setAddress(initialAddress);
    setAddressState(initialAddressState);
    setPhoneBackup(initialPhoneBackup);
    setPhoneTollFree(initialPhoneTollFree);
    setSupportEmail(initialSupportEmail);
    setOrdersEmail(initialOrdersEmail);
    setWorkingHoursWeekdays(initialWorkingHoursWeekdays);
    setWorkingHoursSunday(initialWorkingHoursSunday);
    setWorkingHoursHolidays(initialWorkingHoursHolidays);
    setMaintenance(initialMaintenance);
    setAnnouncementText(storeAnnouncement);
    setSizeGuideText(storeSizeGuide);
    setCareGuideText(storeCareGuide);
  }, [
    initialStoreName,
    initialContactEmail,
    initialPhone,
    initialAddress,
    initialAddressState,
    initialPhoneBackup,
    initialPhoneTollFree,
    initialSupportEmail,
    initialOrdersEmail,
    initialWorkingHoursWeekdays,
    initialWorkingHoursSunday,
    initialWorkingHoursHolidays,
    initialMaintenance,
    storeAnnouncement,
    storeSizeGuide,
    storeCareGuide,
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateStoreName(storeName);
      updateContactEmail(contactEmail);
      updatePhone(phone);
      updateAddress(address);
      updateAddressState(addressState);
      updatePhoneBackup(phoneBackup);
      updatePhoneTollFree(phoneTollFree);
      updateSupportEmail(supportEmail);
      updateOrdersEmail(ordersEmail);
      updateWorkingHoursWeekdays(workingHoursWeekdays);
      updateWorkingHoursSunday(workingHoursSunday);
      updateWorkingHoursHolidays(workingHoursHolidays);
      updateMaintenance(maintenance);
      storeSetAnnouncement(announcementText);
      storeSetSizeGuide(sizeGuideText);
      storeSetCareGuide(careGuideText);
      setSaving(false);
      toast.success("System configurations updated successfully! ⚙️");
    }, 800);
  };

  return (
    <div>
      {/* Navigation */}
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-foreground/45 hover:text-gold uppercase tracking-wider transition-colors font-medium"
        >
          <ArrowLeft size={14} /> Back to Storefront
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          System Settings
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Configure business details, store defaults, and platform options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <h2 className="text-base font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <Settings size={18} className="text-gold" /> General Configurations
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Luxury Brand Name</label>
                  <Input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Primary Hello Email</label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Support Contact Email</label>
                  <Input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Orders Support Email</label>
                  <Input
                    type="email"
                    value={ordersEmail}
                    onChange={(e) => setOrdersEmail(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Primary Phone</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Backup Phone</label>
                  <Input
                    value={phoneBackup}
                    onChange={(e) => setPhoneBackup(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Toll-free Support Line</label>
                  <Input
                    value={phoneTollFree}
                    onChange={(e) => setPhoneTollFree(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Store Street / City Address</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Store Region / Zip Address</label>
                  <Input
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Working Hours (Weekdays)</label>
                  <Input
                    value={workingHoursWeekdays}
                    onChange={(e) => setWorkingHoursWeekdays(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Working Hours (Sunday)</label>
                  <Input
                    value={workingHoursSunday}
                    onChange={(e) => setWorkingHoursSunday(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/50 uppercase tracking-wider">Working Hours (Holidays)</label>
                  <Input
                    value={workingHoursHolidays}
                    onChange={(e) => setWorkingHoursHolidays(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Header Announcement Banner Text</label>
                <Input
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Size Guide Page Content (Markdown supported)</label>
                <Textarea
                  value={sizeGuideText}
                  onChange={(e) => setSizeGuideText(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40 h-40 font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Care Guide Page Content (Markdown supported)</label>
                <Textarea
                  value={careGuideText}
                  onChange={(e) => setCareGuideText(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40 h-40 font-mono text-xs"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save size={16} />
                  {saving ? "Updating System..." : "Update Settings"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Security & Maintenance status */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <ShieldAlert size={16} className="text-gold" /> Platform Operations
            </h3>
            <p className="text-xs text-foreground/50 leading-relaxed mb-4">
              Switch the platform to maintenance mode during database updates.
            </p>
            <div className="flex items-center justify-between p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-xs">
              <span className="text-foreground/70 uppercase tracking-wider font-semibold">Maintenance Mode</span>
              <input
                type="checkbox"
                checked={maintenance}
                onChange={(e) => {
                  const val = e.target.checked;
                  setMaintenance(val);
                  updateMaintenance(val);
                  toast.success(
                    val
                      ? "Maintenance mode activated site-wide! 🛠️"
                      : "Maintenance mode deactivated! ✨"
                  );
                }}
                className="rounded border-red-500/30 bg-white/5 text-red-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Globe size={16} className="text-gold" /> System Status
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-foreground/40">Next.js Version</span>
                <span className="text-foreground/80 font-mono">15.0</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-2">
                <span className="text-foreground/40">Database Engine</span>
                <span className="text-foreground/80">Firebase SDK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">Deployment Environment</span>
                <span className="text-gold uppercase font-mono">Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
