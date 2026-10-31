"use client";

import { useState } from "react";
import {
  Coins,
  Zap,
  CheckCircle2,
  CreditCard,
  History,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BillingPage() {
  const [balance, setBalance] = useState(24.6);
  const [autoRecharge, setAutoRecharge] = useState(true);
  const [topupSuccess, setTopupSuccess] = useState(false);

  const packages = [
    {
      id: "pkg_starter",
      name: "Starter Top-Up",
      price: 30,
      emailsCount: "1,000 Emails",
      costPerEmail: "$0.030",
      isPopular: false
    },
    {
      id: "pkg_growth",
      name: "Growth Pack",
      price: 90,
      emailsCount: "3,200 Emails",
      costPerEmail: "$0.028",
      isPopular: true
    },
    {
      id: "pkg_scale",
      name: "Scale Fleet",
      price: 250,
      emailsCount: "10,000 Emails",
      costPerEmail: "$0.025",
      isPopular: false
    }
  ];

  const handleTopup = (price: number) => {
    setBalance((prev) => prev + price);
    setTopupSuccess(true);
    setTimeout(() => setTopupSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 mb-8">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Credits & Ledger
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Pay-As-You-Go Billing
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          No monthly subscription traps. Add credits as your pipeline grows.
        </p>
      </div>

      {topupSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Credits topped up successfully! Your balance has been updated.</span>
        </div>
      )}

      {/* Balance Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Available Balance
          </span>
          <div className="text-4xl font-extrabold text-white font-mono mt-1">
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Roughly <strong className="text-emerald-400">{Math.round(balance / 0.033)} verified emails</strong> remaining
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <input
              type="checkbox"
              id="autorecharge"
              checked={autoRecharge}
              onChange={(e) => setAutoRecharge(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <label htmlFor="autorecharge" className="text-slate-300 cursor-pointer">
              Auto-recharge $30 when balance &lt; $5
            </label>
          </div>
        </div>
      </div>

      {/* Credit Packages */}
      <div className="mb-12">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          One-Click Credit Top-Up
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all ${
                pkg.isPopular
                  ? "bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase">
                  Best Value
                </span>
              )}

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {pkg.name}
                </span>
                <div className="text-3xl font-extrabold text-white font-mono mt-2">
                  ${pkg.price}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  {pkg.emailsCount} ({pkg.costPerEmail}/email)
                </div>
              </div>

              <button
                onClick={() => handleTopup(pkg.price)}
                className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950" />
                <span>Add ${pkg.price} Credits</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
        <div className="flex items-center gap-2 font-bold text-sm text-white mb-4">
          <History className="w-4 h-4 text-emerald-400" />
          <span>Recent Credit Ledger</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <div>
              <span className="font-semibold text-white">Welcome Trial Credit Grant</span>
              <span className="text-slate-500 block text-[10px]">Activated during onboarding</span>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-mono font-bold">+$30.00</span>
              <span className="text-slate-500 block text-[10px]">Balance: $30.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <div>
              <span className="font-semibold text-white">Automated Campaign Sends (164 emails)</span>
              <span className="text-slate-500 block text-[10px]">Dispatched via Mailbox Fleet</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-mono">-$5.40</span>
              <span className="text-slate-500 block text-[10px]">Balance: $24.60</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
