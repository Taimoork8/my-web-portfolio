"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Activity, Cpu, RefreshCw, Shield } from "lucide-react";

export default function DashboardVisual() {
  const [activeTab, setActiveTab] = useState<'bleiot' | 'medicalsync'>('bleiot');
  const [devices, setDevices] = useState([
    { id: 1, name: "ESP32-SmartNode", rssi: -58, status: "connected", battery: 94 },
    { id: 2, name: "STM32-Haptic-02", rssi: -72, status: "pairing", battery: 82 },
    { id: 3, name: "Ventilator-IoT", rssi: -65, status: "scanning", battery: 88 },
  ]);
  const [syncQueue, setSyncQueue] = useState([
    { id: 1, patient: "Ahmad Shah", medicine: "Amoxicillin 500mg", status: "syncing", latency: 42 },
    { id: 2, patient: "Fatima Bibi", medicine: "Metformin 850mg", status: "dispensed", latency: 12 },
    { id: 3, patient: "Zahid Khan", medicine: "Paracetamol 500mg", status: "dispensed", latency: 8 },
    { id: 4, patient: "Ayesha Omer", medicine: "Lisinopril 10mg", status: "audited", latency: 15 },
  ]);

  // BLE-IoT simulator: simulate scanner updating and pairing devices.
  // Started after a delay so it doesn't compete with initial page load.
  useEffect(() => {
    if (activeTab !== 'bleiot') return;
    const deviceNames = ["TempSensor-01", "Gateway-Hub", "SmartHaptic-v2", "CardiacPatch"];
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
    interval = setInterval(() => {
      setDevices(prev => {
        const updated = prev.map(dev => {
          if (dev.status === "pairing") return { ...dev, status: "connected" as const, rssi: -50 + Math.floor(Math.random() * 10) };
          if (dev.status === "scanning") return { ...dev, status: "pairing" as const };
          return {
            ...dev,
            rssi: Math.min(-40, Math.max(-95, dev.rssi + Math.floor(Math.random() * 6) - 3))
          };
        });

        const nextId = Math.max(...prev.map(d => d.id)) + 1;
        const newDevice = {
          id: nextId,
          name: deviceNames[Math.floor(Math.random() * deviceNames.length)],
          rssi: -75 - Math.floor(Math.random() * 15),
          status: "scanning" as const,
          battery: Math.floor(Math.random() * 20) + 75
        };
        return [newDevice, ...updated.filter((d, idx) => d.status !== "connected" || idx < 2)].slice(0, 4);
      });
    }, 3500);
    }, 2000);
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [activeTab]);

  // MedicalSync simulator: simulate live WebSocket dispatching.
  // Started after a delay so it doesn't compete with initial page load.
  useEffect(() => {
    if (activeTab !== 'medicalsync') return;
    const patientNames = ["Ali Raza", "Sara Khan", "Usman Ali", "Hina Farooq", "Bilal Ahmad"];
    const medicines = ["Augmentin 375mg", "Panadol 500mg", "Lipitor 20mg", "Zantac 150mg", "Surbex-Z"];

    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
    interval = setInterval(() => {
      setSyncQueue(prev => {
        const updated = prev.map(item => {
          if (item.status === "syncing") return { ...item, status: "dispensed" as const };
          if (item.status === "dispensed") return { ...item, status: "audited" as const };
          return item;
        });

        const filtered = updated.filter((item, idx) => item.status !== "audited" || idx < 3);
        const nextId = Math.max(...prev.map(i => i.id)) + 1;
        const newPatient = {
          id: nextId,
          patient: patientNames[Math.floor(Math.random() * patientNames.length)],
          medicine: medicines[Math.floor(Math.random() * medicines.length)],
          status: "syncing" as const,
          latency: Math.floor(Math.random() * 80) + 10
        };
        return [newPatient, ...filtered].slice(0, 4);
      });
    }, 4000);
    }, 2000);
    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [activeTab]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl blur-3xl scale-95 transition-colors duration-500"
        style={{ background: activeTab === 'bleiot' ? "rgba(198,244,50,0.06)" : "rgba(255,94,91,0.06)" }}
      />

      {/* Selector tabs */}
      <div className="relative z-10 flex bg-white/4 border border-white/6 rounded-xl p-1 mb-4">
        <button
          onClick={() => setActiveTab('bleiot')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all duration-300 ${
            activeTab === 'bleiot'
              ? 'bg-white/10 text-white shadow-sm border border-white/10'
              : 'text-white/40 hover:text-white/70 border border-transparent'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#C6F432]" />
          BLE-IoT Support
        </button>
        <button
          onClick={() => setActiveTab('medicalsync')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all duration-300 ${
            activeTab === 'medicalsync'
              ? 'bg-white/10 text-white shadow-sm border border-white/10'
              : 'text-white/40 hover:text-white/70 border border-transparent'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-[#FF5E5B]" />
          MedicalSync
        </button>
      </div>

      {/* Main card */}
      <motion.div
        layout
        className="relative bg-[#111113] border border-white/10 rounded-2xl p-5 shadow-2xl overflow-hidden min-h-[310px]"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'bleiot' ? (
            <motion.div
              key="bleiot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                  <span className="text-xs text-white/50 font-mono">BLE Scanner — Active</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#C6F432]/10 border border-[#C6F432]/20 rounded-md px-2.5 py-1">
                  <span className="text-[10px] text-[#C6F432] font-semibold font-mono">Pairing rate 99%</span>
                </div>
              </div>

              {/* Devices List */}
              <div className="space-y-3">
                {devices.map((dev) => (
                  <motion.div
                    layout
                    key={dev.id}
                    className="flex items-center justify-between gap-3 text-xs bg-white/2 border border-white/4 p-2 rounded-lg"
                  >
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white/80 font-mono">{dev.name}</span>
                        <span className="text-[9px] text-[#C6F432] font-mono px-1 bg-[#C6F432]/10 border border-[#C6F432]/20 rounded">
                          {dev.rssi} dBm
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-12 bg-white/5 h-1 rounded-full overflow-hidden">
                          <div className="h-full bg-white/20 rounded-full" style={{ width: `${Math.max(10, 100 + dev.rssi)}%` }} />
                        </div>
                        <span className="text-[9px] text-white/30 font-mono">Batt: {dev.battery}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {dev.status === 'scanning' ? (
                        <span className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
                          <RefreshCw className="w-2.5 h-2.5 animate-spin text-white/35" />
                          Scanning
                        </span>
                      ) : dev.status === 'pairing' ? (
                        <span className="flex items-center gap-1 text-[10px] text-orange-400 font-mono animate-pulse">
                          <Cpu className="w-2.5 h-2.5 animate-spin" />
                          Pairing
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                          <Shield className="w-2.5 h-2.5 text-emerald-400" />
                          Secure
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/6 flex items-center justify-between">
                <span className="text-[10px] text-white/30 font-mono">ESP32 & STM Firmware Node</span>
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                  RSSI: Stable
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="medicalsync"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF5E5B] animate-pulse" />
                  <span className="text-xs text-white/50 font-mono">Daphne WebSocket Node</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FF5E5B]/10 border border-[#FF5E5B]/20 rounded-md px-2.5 py-1">
                  <span className="text-[10px] text-[#FF5E5B] font-semibold font-mono">Ledger Audited</span>
                </div>
              </div>

              {/* WebSocket Dispatch Queue */}
              <div className="space-y-3">
                {syncQueue.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-xs bg-white/2 border border-white/4 p-2 rounded-lg"
                  >
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white/80">{item.patient}</span>
                        <span className="text-[9px] text-[#FF5E5B] font-mono px-1 bg-[#FF5E5B]/10 border border-[#FF5E5B]/20 rounded">
                          {item.latency}ms
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40 block mt-0.5 truncate">{item.medicine}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.status === 'syncing' ? (
                        <span className="flex items-center gap-1 text-[10px] text-orange-400 font-mono">
                          <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                          Syncing
                        </span>
                      ) : item.status === 'dispensed' ? (
                        <span className="flex items-center gap-1 text-[10px] text-[#6DE7FF] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6DE7FF]" />
                          Dispensed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                          <Shield className="w-2.5 h-2.5 text-emerald-400" />
                          Audited
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/6 flex items-center justify-between">
                <span className="text-[10px] text-white/30 font-mono">Django Channels & Celery Worker</span>
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active audits
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating metric cards with layout transition */}
      <AnimatePresence mode="wait">
        {activeTab === 'bleiot' ? (
          <div key="ble-metrics">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute -right-8 -top-6 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="text-lg font-bold font-display text-white">99%</p>
              <p className="text-[10px] text-white/40">Pairing Success</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute -left-8 -bottom-4 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="text-lg font-bold font-display text-[#6DE7FF]">&lt;200ms</p>
              <p className="text-[10px] text-white/40">Auth Latency</p>
            </motion.div>
          </div>
        ) : (
          <div key="ms-metrics">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute -right-8 -top-6 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="text-lg font-bold font-display text-[#FF5E5B]">&lt;100ms</p>
              <p className="text-[10px] text-white/40">Sync Latency</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute -left-8 -bottom-4 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
            >
              <p className="text-lg font-bold font-display text-white">5,000+</p>
              <p className="text-[10px] text-white/40">Medicines Tracked</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
