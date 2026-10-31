"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  Linkedin,
  Sparkles,
  ArrowRight,
  Download,
  Building,
  MapPin
} from "lucide-react";
import { MOCK_B2B_COMPANIES, searchCompanies } from "@/data/mockDatabase";

export default function AppProspectsPage() {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [enrichedIds, setEnrichedIds] = useState<string[]>([]);

  const companies = searchCompanies(query);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleEnrich = (id: string) => {
    if (!enrichedIds.includes(id)) {
      setEnrichedIds([...enrichedIds, id]);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            ICP Prospecting
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Target Accounts & Decision-Makers
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/app/campaigns?leads=${selectedIds.join(",")}`}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Add {selectedIds.length} to Campaign Sequence</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="my-6">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter accounts by company name, technology, job role..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4 w-10">Select</th>
                <th className="p-4">Company</th>
                <th className="p-4">Key Decision-Maker</th>
                <th className="p-4">Location</th>
                <th className="p-4">Tech Stack</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {companies.map((comp) => {
                const dm = comp.decisionMakers[0];
                const isSelected = selectedIds.includes(comp.id);
                const isEnriched = enrichedIds.includes(comp.id);

                return (
                  <tr
                    key={comp.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      isSelected ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(comp.id)}
                        className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-700 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{comp.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{comp.domain}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">{comp.industry}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <span>{dm?.name}</span>
                        {dm?.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{dm?.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{dm?.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{comp.location.city}, {comp.location.country}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {comp.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleEnrich(comp.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          isEnriched
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                        }`}
                      >
                        {isEnriched ? "✓ Enriched" : "AI Deep Research"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
