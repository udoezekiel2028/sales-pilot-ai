"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Sparkles, Database, PieChart, Coins, Terminal, ArrowRight, Zap, Network, BrainCircuit } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isApp = pathname?.startsWith("/app");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                SalesPilot AI
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  AutoGTM
                </span>
              </span>
              <span className="text-[10px] text-slate-400 -mt-0.5">Autonomous AI Outbound</span>
            </div>
          </Link>

          {/* Navigation Links */}
          {!isApp && (
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/app/agents"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/app/agents" ? "text-emerald-400 bg-emerald-500/10" : "text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20"
                }`}
              >
                <BrainCircuit className="w-4 h-4 text-emerald-400" />
                6 AI Agents Hub
              </Link>
              <Link
                href="/database"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/database" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Database className="w-4 h-4 text-emerald-400" />
                105M+ Database
              </Link>
              <Link
                href="/segments"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/segments" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <PieChart className="w-4 h-4 text-indigo-400" />
                Segments & TAM
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/pricing" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Coins className="w-4 h-4 text-amber-400" />
                Pricing
              </Link>
              <Link
                href="/journey"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/journey" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Network className="w-4 h-4 text-pink-400" />
                System ERD
              </Link>
            </nav>
          )}

          {isApp && (
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/app/agents"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/app/agents" ? "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30" : "text-slate-200 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <BrainCircuit className="w-4 h-4 text-emerald-400" />
                6 AI Agents
              </Link>
              <Link
                href="/app/dashboard"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/dashboard" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/app/prospects"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/prospects" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Prospects
              </Link>
              <Link
                href="/app/campaigns"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/campaigns" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Campaigns
              </Link>
              <Link
                href="/app/inbox"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/inbox" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                AI Inbox
              </Link>
              <Link
                href="/app/mailboxes"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/mailboxes" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Mailboxes
              </Link>
              <Link
                href="/app/billing"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === "/app/billing" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Credits
              </Link>
              <Link
                href="/journey"
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  pathname === "/journey" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Network className="w-3.5 h-3.5 text-pink-400" />
                ERD
              </Link>
            </nav>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/app/agents"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <BrainCircuit className="w-4 h-4 text-slate-950" />
            <span>Launch 6 Agents</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </Link>
        </div>
      </div>
    </header>
  );
}
