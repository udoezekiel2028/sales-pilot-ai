"use client";

import Link from "next/link";
import {
  Mail,
  TrendingUp,
  Calendar,
  Zap,
  Users,
  Inbox,
  ArrowUpRight,
  Bot,
  Play,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Emails Sent (30d)", value: "3,842", change: "+24.5%", icon: Mail, color: "text-emerald-400" },
    { label: "Open Rate", value: "62.4%", change: "+5.1%", icon: TrendingUp, color: "text-indigo-400" },
    { label: "Reply Rate", value: "9.1%", change: "+2.3%", icon: Inbox, color: "text-teal-400" },
    { label: "Meetings Booked", value: "28", change: "+8 this week", icon: Calendar, color: "text-amber-400" },
  ];

  const recentActivity = [
    {
      time: "2 mins ago",
      type: "meeting",
      lead: "Elena Rostova",
      company: "FinFlow Systems",
      title: "Chief Executive Officer",
      detail: "Booked demo via Cal.com link for Thursday 2:00 PM",
      status: "Booked"
    },
    {
      time: "14 mins ago",
      type: "reply",
      lead: "David Chen",
      company: "AetherOps AI",
      title: "Co-Founder & CTO",
      detail: "Inbound reply: 'Looks interesting, please send over a 1-pager on pricing.'",
      status: "Interested"
    },
    {
      time: "42 mins ago",
      type: "sent",
      lead: "Julian Thorne",
      company: "CipherGuard Labs",
      title: "VP of Enterprise Sales",
      detail: "Step 2 follow-up delivered via mailbox sender-pool-04.salespilot.net",
      status: "Delivered"
    },
    {
      time: "1 hour ago",
      type: "sent",
      lead: "Astrid Lindholm",
      company: "NordicHealth Tech",
      title: "Head of Global Partnerships",
      detail: "Initial outreach hook dispatched with 99.8% verification score",
      status: "Delivered"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Autonomous Agent Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            GTM Mission Control
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/onboarding"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Update Agent ICP
          </Link>
          <Link
            href="/app/campaigns"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Launch Campaign</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {stat.value}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Split: Live Feed & Quick Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Autonomous Activity Stream</h3>
              </div>
              <Link href="/app/inbox" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                <span>View AI Inbox</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        item.status === "Booked"
                          ? "bg-amber-400"
                          : item.status === "Interested"
                          ? "bg-emerald-400"
                          : "bg-indigo-400"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.lead}</span>
                        <span className="text-xs text-slate-400">({item.company})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{item.detail}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                        item.status === "Booked"
                          ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                          : item.status === "Interested"
                          ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Status & Credit Balance */}
        <div className="space-y-6">
          {/* Credit balance card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Credits Balance
              </span>
              <span className="text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                $30 Welcome Active
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">$24.60</div>
            <p className="text-xs text-slate-400 mt-1">~ 745 verified email sends remaining</p>

            <div className="w-full bg-slate-800 rounded-full h-1.5 my-4 overflow-hidden">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: "78%" }} />
            </div>

            <Link
              href="/app/billing"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center justify-center gap-2 transition-colors block text-center"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Top Up Pay-As-You-Go Credits</span>
            </Link>
          </div>

          {/* Mailbox Health Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white">Sending Infrastructure</h3>
              <Link href="/app/mailboxes" className="text-xs text-emerald-400 hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Mailbox Pool Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Warm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>DNS (SPF, DKIM, DMARC):</span>
                <span className="text-emerald-400 font-semibold">Valid (99.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Daily Velocity Cap:</span>
                <span className="text-slate-400 font-mono">150 / 500 sent today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
