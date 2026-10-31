"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Globe,
  Building,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Zap,
  Target
} from "lucide-react";
import { analyzeCompanyUrl, CompanyICP } from "@/lib/agentEngine";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState("brilliantcraft.io");
  const [isExtracting, setIsExtracting] = useState(false);

  // Form State
  const [icpData, setIcpData] = useState<CompanyICP>({
    companyName: "Brilliantcraft",
    websiteUrl: "https://brilliantcraft.io",
    summary: "Intelligent autonomous software and revenue operations platform.",
    valueProposition: "Accelerate pipeline velocity and automate complex commercial operations with AI agents.",
    targetIndustries: ["B2B SaaS", "Fintech", "E-Commerce", "Consulting"],
    targetEmployeeSizes: ["25-100", "101-500"],
    buyerPersonas: [
      {
        title: "VP of Sales / Chief Revenue Officer",
        seniority: "Executive",
        painPoint: "High SDR ramp times and low outbound reply rates."
      },
      {
        title: "Head of Growth & Demand Gen",
        seniority: "Director",
        painPoint: "Need to scale personalized outreach without compromising domain reputation."
      }
    ],
    offerHook: "We help growth-stage teams increase qualified sales pipeline by 3.4x in 45 days through autonomous AI outbound.",
    suggestedSubjectLines: ["Quick question regarding {{companyName}}'s outbound pipeline"]
  });

  const [calendarLink, setCalendarLink] = useState("https://cal.com/sales-team/15min");
  const [tone, setTone] = useState<"direct" | "consultative" | "casual">("direct");

  const handleExtractFromUrl = async () => {
    if (!url.trim()) return;
    setIsExtracting(true);
    const result = await analyzeCompanyUrl(url);
    setIcpData(result);
    setIsExtracting(false);
    setCurrentStep(2);
  };

  const handleFinish = () => {
    router.push("/app/prospects?source=onboarding");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
          Autonomous Agent Onboarding
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Configure Your 24/7 Sales Agent</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Teach the AI agent what you sell and who your ideal target buyers are.
        </p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentStep === step
                    ? "bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                    : currentStep > step
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {currentStep > step ? "✓" : step}
              </div>
              {step < 3 && <div className="w-8 sm:w-12 h-0.5 bg-slate-800" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Website URL */}
      {currentStep === 1 && (
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl text-left animate-in fade-in duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Step 1: Your Company Website</h2>
              <p className="text-xs text-slate-400">The agent will scrape your page to synthesize your ICP.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Company Domain / URL:</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. yourcompany.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleExtractFromUrl}
              disabled={isExtracting}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Deep-Scraping Website Copy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Extract Value Proposition & ICP</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: ICP & Personas Review */}
      {currentStep === 2 && (
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl text-left animate-in fade-in duration-300 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Step 2: Review Synthesized ICP</h2>
              <p className="text-xs text-slate-400">Edit any details before the agent begins prospecting.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              AI Extracted
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Value Proposition Summary:</label>
            <textarea
              rows={3}
              value={icpData.valueProposition}
              onChange={(e) => setIcpData({ ...icpData, valueProposition: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Industries (Comma separated):</label>
            <input
              type="text"
              value={icpData.targetIndustries.join(", ")}
              onChange={(e) =>
                setIcpData({
                  ...icpData,
                  targetIndustries: e.target.value.split(",").map((s) => s.trim())
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Core Outbound Offer Hook:</label>
            <input
              type="text"
              value={icpData.offerHook}
              onChange={(e) => setIcpData({ ...icpData, offerHook: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Continue to Scheduler Settings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Calendar Link & Tone */}
      {currentStep === 3 && (
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl text-left animate-in fade-in duration-300 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Step 3: Calendar & Autonomous Routing</h2>
            <p className="text-xs text-slate-400">
              When leads reply positively, the agent replies autonomously with your scheduling link.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Cal.com / Calendly Booking URL:
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={calendarLink}
                onChange={(e) => setCalendarLink(e.target.value)}
                placeholder="https://cal.com/your-name/15min"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Outreach Tone of Voice:</label>
            <div className="grid grid-cols-3 gap-3">
              {(["direct", "consultative", "casual"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`p-3 rounded-xl border text-xs font-semibold capitalize transition-all cursor-pointer ${
                    tone === t
                      ? "bg-emerald-500/10 border-emerald-400 text-emerald-400"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>$30 Free Credits Granted:</strong> Your mailbox pool is ready. You have 750 free verified sends to test live meetings.
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Activate 24/7 Agent</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
