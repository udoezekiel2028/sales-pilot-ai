"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Globe, ArrowRight, CheckCircle2, Users, Building, Mail, Zap, Loader2 } from "lucide-react";
import { analyzeCompanyUrl, CompanyICP, generatePersonalizedEmail } from "@/lib/agentEngine";
import { MOCK_B2B_COMPANIES } from "@/data/mockDatabase";

export default function UrlAnalyzerHero() {
  const router = useRouter();
  const [url, setUrl] = useState("brilliantcraft.io");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analyzedICP, setAnalyzedICP] = useState<CompanyICP | null>(null);

  const steps = [
    "Crawling website & extracting value proposition...",
    "Deducing Ideal Customer Profile (ICP) & target personas...",
    "Querying 105M+ B2B database for high-intent accounts...",
    "Synthesizing high-converting email copy & hook..."
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalyzedICP(null);

    // Step progression animation
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);

    // Call analysis
    const icp = await analyzeCompanyUrl(url);

    setTimeout(() => {
      clearInterval(interval);
      setAnalyzedICP(icp);
      setIsAnalyzing(false);
    }, 2500);
  };

  const sampleLead = MOCK_B2B_COMPANIES[0];
  const sampleDecisionMaker = sampleLead.decisionMakers[0];
  const sampleEmail = analyzedICP ? generatePersonalizedEmail(analyzedICP, sampleLead, sampleDecisionMaker, 1) : null;

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 to-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>105M+ Verified B2B Companies & Places</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">$30 Free Credits Included</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Autonomous AI Outbound. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            From URL to Booked Meetings.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Paste your website. Our 24/7 AI agent discovers your target buyers in 105M+ companies, crafts personalized emails, sends from pre-warmed mailboxes, and routes replies directly to your calendar.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleAnalyze} className="mt-8 max-w-2xl mx-auto">
          <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-700/70 shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-emerald-500/80 transition-all">
            <div className="flex items-center gap-3 px-3 w-full sm:w-auto flex-1">
              <Globe className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL (e.g. yourcompany.com)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Analyze with AI</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading Progress State */}
        {isAnalyzing && (
          <div className="mt-8 p-6 max-w-xl mx-auto rounded-2xl bg-slate-900/80 border border-slate-800 text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-semibold text-emerald-400">Agent Researching</span>
              <span>Step {analysisStep + 1} of 4</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((analysisStep + 1) / 4) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>{steps[analysisStep]}</span>
            </div>
          </div>
        )}

        {/* Analysis Result Card */}
        {analyzedICP && !isAnalyzing && (
          <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 text-left shadow-2xl animate-in zoom-in-95 duration-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    ICP Synthesized
                  </span>
                  <span className="text-xs text-slate-400">Domain: {analyzedICP.websiteUrl}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{analyzedICP.companyName} Go-To-Market Profile</h3>
              </div>
              <button
                onClick={() => router.push(`/app/onboarding?domain=${encodeURIComponent(analyzedICP.websiteUrl)}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4" />
                <span>Launch Agent with $30 Free</span>
              </button>
            </div>

            {/* ICP Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>Target Industries</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{analyzedICP.targetIndustries.slice(0, 2).join(", ")}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Buyer Personas</span>
                </div>
                <p className="text-xs font-medium text-slate-200">{analyzedICP.buyerPersonas[0]?.title}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>High-Intent Leads Found</span>
                </div>
                <p className="text-base font-bold text-emerald-400">14,850+ Accounts</p>
              </div>
            </div>

            {/* Live Generated Email Preview */}
            {sampleEmail && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    Agent Sample Outreach (Step 1 Initial Hook)
                  </span>
                  <span className="text-xs text-emerald-400">Personalized for {sampleLead.name}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  <span className="text-slate-500 font-bold block mb-2">Subject: {sampleEmail.subject}</span>
                  {sampleEmail.body}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
