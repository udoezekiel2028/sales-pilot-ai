import Link from "next/link";
import UrlAnalyzerHero from "@/components/UrlAnalyzerHero";
import {
  Database,
  Mail,
  Zap,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Cpu,
  Inbox,
  Sparkles,
  BarChart3,
  Flame,
  Globe2
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Interactive URL-to-ICP Agent */}
      <UrlAnalyzerHero />

      {/* 2. Global Database Numbers Banner */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Powering Autonomous Go-To-Market across the World's Largest Datasets
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">105M+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Global Companies</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Enriched with AI intent signals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">80M+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Verified Decision-Makers</div>
              <div className="text-[11px] text-slate-500 mt-0.5">99.2% Deliverable emails</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">210M+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Google Maps Places</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Local & commercial venues</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">$0.03</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Cost Per Email Sent</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Pay-as-you-go, no lock-in</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparison: Traditional Outbound vs SalesPilot AI Autonomous Agent */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-3">
            Why Teams Are Switching
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stop buying 6 disconnected tools to send cold emails.
          </h3>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Traditional cold outreach requires lead lists, email verification, domain buying, 3-week warm-up, and manual SDR copy drafting. SalesPilot AI handles everything autonomously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* The Old Way */}
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-red-500/20 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <span className="font-bold text-lg text-slate-300">The Traditional Outbound Stack</span>
              <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-xs font-semibold">
                Slow & Expensive
              </span>
            </div>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>$3,000 - $6,000 / month for full-time SDRs who need 3 months ramp time.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Pay $100+/mo for ZoomInfo/Apollo + $99/mo for warm-up + $149/mo for sequencing.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Buy 5 secondary domains and configure complex SPF, DKIM, DMARC records.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Generic, robotic templates with 1-2% reply rates that land in the spam folder.</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>Manual inbox triage and delayed replies causing warm prospects to go cold.</span>
              </li>
            </ul>
          </div>

          {/* The SalesPilot AI Way */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 relative shadow-xl shadow-emerald-500/10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-lg text-white">SalesPilot AI Autonomous Agent</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                Turnkey & 24/7
              </span>
            </div>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Setup:</strong> Paste your URL; the AI understands your product in 60 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>105M+ Global Database Built-In:</strong> No need for external Apollo or ZoomInfo subscriptions.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Pre-Warmed Mailbox Pool:</strong> Zero DNS configuration or burning your company's primary domain.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Hyper-Personalized Copy:</strong> AI researches prospect company tech stack and job title.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Autonomous Meeting Booking:</strong> Positive replies are answered instantly with your calendar link.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. The 4 Autonomous Pillars */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-3">
              End-To-End Autonomous Pipeline
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Four Core Engines Operating 24/7
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">1. URL & ICP Synthesizer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The agent deep-scrapes your product page, pricing, and case studies to understand exactly who gets the most value from your offer.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">2. Semantic Lead Hunter</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Queries 105M+ companies and 80M+ decision-makers using natural language. Verifies every email through live MX handshakes before sending.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">3. Managed Mailbox Pool</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sends across hundreds of distributed, pre-warmed secondary domains with automated rotation, ensuring maximum deliverability to primary inboxes.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">4. Autonomous Scheduler</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Classifies incoming prospect replies in real-time. Overcomes initial objections and routes booking links to secure calendar demos instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Get $30 in Free Outreach Credits Today
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Experience autonomous B2B pipeline generation. Send up to 750 verified cold emails with zero credit card commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/app/onboarding"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Launch Agent Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
              <Link
                href="/database"
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
              >
                <Database className="w-4 h-4 text-slate-400" />
                <span>Explore 105M+ Database</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
