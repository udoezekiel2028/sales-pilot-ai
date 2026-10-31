"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Coins,
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  HelpCircle,
  Mail,
  Database
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function PricingPage() {
  const [emailVolume, setEmailVolume] = useState<number>(3000);

  // SalesPilot AI pay-as-you-go calculation: roughly $0.03 per email
  const calculatedCost = Math.round(emailVolume * 0.033);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold border border-amber-400/20 mb-4">
          <Coins className="w-3.5 h-3.5" />
          <span>No Expensive Monthly Subscriptions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, Pay-As-You-Go Pricing.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          Only pay for verified emails sent (~$0.03/email). Start with $30 in free credits to test the AI agent without a credit card.
        </p>
      </div>

      {/* Interactive Pay-As-You-Go Slider Card */}
      <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-emerald-500/30 shadow-2xl mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              Interactive Estimator
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Estimate Your Monthly Outbound Cost
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">Estimated Cost</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              {formatCurrency(calculatedCost)}
            </span>
            <span className="text-xs text-slate-400 block">~ $0.033 / verified email</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="my-8">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Target Volume:</span>
            <span className="text-white font-mono text-sm">
              {formatNumber(emailVolume)} Emails / month
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="30000"
            step="500"
            value={emailVolume}
            onChange={(e) => setEmailVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
            <span>500 emails ($17)</span>
            <span>10,000 emails ($330)</span>
            <span>30,000 emails ($990)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pre-warmed mailboxes included</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI personalization per lead</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Automated calendar replies</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/app/onboarding"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg cursor-pointer"
          >
            <Zap className="w-4 h-4 text-slate-950" />
            <span>Claim $30 Free Credits & Start</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </div>

      {/* Pricing Tier Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Tier 1: Free Trial */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Trial Starter
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">Free Trial</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white font-mono">$0</span>
              <span className="text-xs text-slate-400">/ $30 credit grant</span>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Test out the autonomous AI agent on real prospects without entering a credit card.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 750 verified cold emails</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full access to 105M+ database</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI URL-to-ICP extractor</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cal.com automated booking</span>
              </li>
            </ul>
          </div>

          <Link
            href="/app/onboarding"
            className="mt-8 w-full py-3 rounded-xl font-semibold text-xs text-center text-white bg-slate-800 hover:bg-slate-700 transition-colors block"
          >
            Start Free ($30 Free)
          </Link>
        </div>

        {/* Tier 2: Pay As You Go (Featured) */}
        <div className="p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Autonomous Agent
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">Pay-As-You-Go</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-emerald-400 font-mono">~$0.03</span>
              <span className="text-xs text-slate-400">/ email sent</span>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Scale up or down anytime. Top up credits with auto-recharge caps.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>No monthly seat fees</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-warmed secondary mailbox pool</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ZeroBounce real-time email verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-touch AI sequencing & reply triage</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ChatGPT / Claude MCP server access</span>
              </li>
            </ul>
          </div>

          <Link
            href="/app/onboarding"
            className="mt-8 w-full py-3 rounded-xl font-bold text-xs text-center text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md block"
          >
            Launch Outreach Agent
          </Link>
        </div>

        {/* Tier 3: Enterprise Data */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Data Platform
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">Bulk & API</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white font-mono">$249</span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              For teams needing bulk CSV downloads, deep research credits, and high-frequency API access.
            </p>

            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>50,000 monthly lead export credits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bulk CSV & webhook export</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deep company website scraping API</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated sending IP & custom domains</span>
              </li>
            </ul>
          </div>

          <Link
            href="/app/billing"
            className="mt-8 w-full py-3 rounded-xl font-semibold text-xs text-center text-white bg-slate-800 hover:bg-slate-700 transition-colors block"
          >
            Explore Data Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
