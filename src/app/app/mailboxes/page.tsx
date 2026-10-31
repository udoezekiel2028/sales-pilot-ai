"use client";

import { useState } from "react";
import {
  Flame,
  CheckCircle2,
  ShieldCheck,
  Plus,
  RefreshCw,
  Server,
  AlertTriangle,
  Mail
} from "lucide-react";

export default function MailboxesPage() {
  const mailboxes = [
    {
      id: "mb_1",
      email: "alex.r@growth-outreach01.salespilot.net",
      domain: "growth-outreach01.salespilot.net",
      provider: "Pre-Warmed Managed Pool",
      warmupScore: "100%",
      dailySent: 42,
      dailyLimit: 50,
      dns: { spf: true, dkim: true, dmarc: true },
      status: "Active & Optimal"
    },
    {
      id: "mb_2",
      email: "team@dispatch-scale02.salespilot.net",
      domain: "dispatch-scale02.salespilot.net",
      provider: "Pre-Warmed Managed Pool",
      warmupScore: "100%",
      dailySent: 38,
      dailyLimit: 50,
      dns: { spf: true, dkim: true, dmarc: true },
      status: "Active & Optimal"
    },
    {
      id: "mb_3",
      email: "connect@gtm-engine03.salespilot.net",
      domain: "gtm-engine03.salespilot.net",
      provider: "Pre-Warmed Managed Pool",
      warmupScore: "98%",
      dailySent: 45,
      dailyLimit: 50,
      dns: { spf: true, dkim: true, dmarc: true },
      status: "Active & Optimal"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Infrastructure & Deliverability
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Managed Mailbox Fleet
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero DNS setup required. SalesPilot AI rotates sends across pre-warmed secondary domains to safeguard deliverability.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Connect Custom Domain</span>
        </button>
      </div>

      {/* Aggregate Health Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Fleet Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">99.8%</div>
          <div className="text-[11px] text-emerald-400 mt-1">SPF, DKIM, DMARC Verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Today's Rotation Volume</span>
            <Mail className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">125 / 150</div>
          <div className="text-[11px] text-slate-400 mt-1">Daily safety throttle active</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Bounce / Complaint Rate</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">0.12%</div>
          <div className="text-[11px] text-slate-400 mt-1">Well below 1.0% industry threshold</div>
        </div>
      </div>

      {/* Mailbox Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Mailbox Sender Address</th>
                <th className="p-4">Infrastructure Type</th>
                <th className="p-4">Warm-up Health</th>
                <th className="p-4">Daily Sending Load</th>
                <th className="p-4">DNS Records</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mailboxes.map((mb) => (
                <tr key={mb.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{mb.email}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{mb.domain}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800">
                      {mb.provider}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 font-mono font-bold">{mb.warmupScore}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-slate-200">
                      {mb.dailySent} / {mb.dailyLimit}
                    </div>
                    <div className="w-24 bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-1 rounded-full"
                        style={{ width: `${(mb.dailySent / mb.dailyLimit) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                      <span>SPF ✓</span>
                      <span>DKIM ✓</span>
                      <span>DMARC ✓</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{mb.status}</span>
                    </span>
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
