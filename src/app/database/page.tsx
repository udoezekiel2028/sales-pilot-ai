"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Database,
  Search,
  Filter,
  Building2,
  Users,
  MapPin,
  CheckCircle2,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Layers,
  Star
} from "lucide-react";
import { MOCK_B2B_COMPANIES, searchCompanies, CompanyRecord } from "@/data/mockDatabase";

export default function DatabasePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const categories = [
    "All",
    "Enterprise SaaS",
    "AI & Cloud",
    "Fintech",
    "Healthcare",
    "E-commerce",
    "Local Business",
    "Cybersecurity"
  ];

  const locations = ["All", "United States", "Sweden", "United Kingdom", "Germany"];

  const filteredCompanies = searchCompanies(query, selectedCategory, selectedLocation);

  const toggleSelect = (id: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(filteredCompanies.map((c) => c.id));
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
            <Database className="w-4 h-4" />
            <span>Global B2B Data Lake (105M+ Companies)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Prospect & Decision-Maker Directory
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Search 105M+ companies and 80M+ verified decision-makers. Query by technology, role, geography, or business category.
          </p>
        </div>

        {/* Action Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/segments"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700/80 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Segments & TAM</span>
          </Link>
          <Link
            href={
              selectedCompanies.length > 0
                ? `/app/campaigns?leads=${selectedCompanies.join(",")}`
                : `/app/onboarding`
            }
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>
              {selectedCompanies.length > 0
                ? `Launch Sequence (${selectedCompanies.length} Selected)`
                : "Launch AI Outreach"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="my-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies, tech stack (e.g. Next.js, Stripe), titles (e.g. VP Sales, CTO)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer w-full"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-slate-900 text-white">
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Industry:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
        <div className="flex items-center gap-3">
          <button
            onClick={selectAll}
            className="text-emerald-400 hover:underline font-medium cursor-pointer"
          >
            {selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0
              ? "Deselect All"
              : "Select All Page"}
          </button>
          <span>•</span>
          <span>Showing {filteredCompanies.length} verified accounts (105M+ pool)</span>
        </div>
        {selectedCompanies.length > 0 && (
          <span className="text-emerald-400 font-semibold">
            {selectedCompanies.length} accounts queued for AI campaign
          </span>
        )}
      </div>

      {/* Companies List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCompanies.map((company) => {
          const isSelected = selectedCompanies.includes(company.id);
          return (
            <div
              key={company.id}
              className={`p-6 rounded-2xl border transition-all ${
                isSelected
                  ? "bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left: Company Details */}
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(company.id)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-700 mt-1.5 cursor-pointer"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors">
                        {company.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        {company.domain}
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                        {company.category}
                      </span>
                      {company.googleMapsRating && (
                        <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {company.googleMapsRating} ({company.googleMapsReviews} Google reviews)
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-300 max-w-2xl leading-relaxed">
                      {company.description}
                    </p>

                    {/* Metadata chips */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        {company.headcount} employees ({company.employeesCount} recorded)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {company.location.city}, {company.location.country}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">
                        Revenue: {company.revenueRange}
                      </span>
                    </div>

                    {/* Tech stack */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 mr-1">Tech Stack:</span>
                      {company.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Verified Decision-Makers */}
                <div className="lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6 pt-4 lg:pt-0">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>Verified Decision-Makers</span>
                    <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {company.decisionMakers.length} Available
                    </span>
                  </div>

                  <div className="space-y-3">
                    {company.decisionMakers.map((dm) => (
                      <div
                        key={dm.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white truncate">{dm.name}</span>
                            {dm.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{dm.title}</p>
                          <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500 font-mono truncate">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{dm.email}</span>
                          </div>
                        </div>

                        <a
                          href={dm.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
