"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PieChart,
  TrendingUp,
  Globe2,
  Building2,
  ArrowRight,
  Layers,
  Sparkles,
  BarChart2,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { MOCK_SEGMENTS, SegmentCluster } from "@/data/mockSegments";
import { formatNumber } from "@/lib/utils";

export default function SegmentsPage() {
  const [activeSegmentId, setActiveSegmentId] = useState<string>(MOCK_SEGMENTS[0].id);

  const activeSegment = MOCK_SEGMENTS.find((s) => s.id === activeSegmentId) || MOCK_SEGMENTS[0];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-8 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1.5">
          <PieChart className="w-4 h-4" />
          <span>Market Intelligence & Sizing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Segments & TAM Explorer
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          Visualize market clusters, discover adjacent ICP niches, and calculate Total Addressable Market (TAM) with verified company accounts.
        </p>
      </div>

      {/* Cluster Navigation Cards */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_SEGMENTS.map((segment) => {
          const isActive = segment.id === activeSegmentId;
          return (
            <button
              key={segment.id}
              onClick={() => setActiveSegmentId(segment.id)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                isActive
                  ? "bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-300">{segment.category}</span>
                <span className="text-emerald-400 font-mono text-[11px]">{segment.growthRate}</span>
              </div>
              <h3 className="font-bold text-white text-base mb-3 leading-snug">{segment.name}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                <span>{formatNumber(segment.totalCompanies)} Companies</span>
                <span className="text-indigo-400 font-mono">{formatNumber(segment.totalDecisionMakers)} Contacts</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Active Segment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Sub-niches breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  Niche Distribution Breakdown
                </span>
                <h2 className="text-2xl font-bold text-white mt-0.5">{activeSegment.name}</h2>
              </div>
              <Link
                href={`/database?category=${encodeURIComponent(activeSegment.name)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prospect This Cluster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Sub-niches List */}
            <div className="mt-6 space-y-4">
              {activeSegment.subNiches.map((niche, idx) => {
                const percentage = Math.round((niche.companiesCount / activeSegment.totalCompanies) * 100);
                return (
                  <div
                    key={niche.name}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center border border-indigo-500/20">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white text-sm">{niche.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-slate-400">{formatNumber(niche.companiesCount)} Accounts</span>
                        <span className="text-emerald-400 font-bold">TAM {niche.tamEstimate}</span>
                      </div>
                    </div>

                    {/* Progress visualizer */}
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full"
                        style={{ width: `${Math.max(percentage * 2, 12)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Aggregate Metrics Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-slate-300">
              Cluster Benchmark Insights
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Avg Contract Value (ACV)</span>
                <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                  {activeSegment.avgContractValue}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Annual Sector Growth</span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {activeSegment.growthRate}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Top Geographies</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeSegment.topGeographies.map((geo) => (
                    <span
                      key={geo}
                      className="px-2 py-0.5 rounded bg-slate-900 text-xs text-slate-300 border border-slate-800"
                    >
                      {geo}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <Link
                href="/app/onboarding"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Automate Outreach in this Segment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
