"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GitFork,
  Building,
  Users,
  Target,
  Send,
  Mail,
  Inbox,
  Coins,
  ShieldCheck,
  CreditCard,
  Network,
  ArrowRight,
  Database,
  CheckCircle2,
  ChevronRight,
  FileText
} from "lucide-react";
import { relationalStore } from "@/lib/dataStore";

export default function JourneyPage() {
  const [selectedEntity, setSelectedEntity] = useState<string>("ORGANIZATIONS");

  const entities = [
    {
      id: "ORGANIZATIONS",
      name: "ORGANIZATIONS",
      icon: Building,
      color: "text-blue-400 border-blue-500/40 bg-blue-500/10",
      description: "Tenant workspace that owns all business profiles, ICPs, campaigns, companies, and billing.",
      relations: [
        "has ➔ ORGANIZATION_MEMBERS",
        "owns ➔ BUSINESS_PROFILES",
        "defines ➔ ICP_PROFILES",
        "owns ➔ COMPANIES",
        "creates ➔ CAMPAIGNS",
        "receives ➔ REPLIES",
        "records ➔ CREDIT_TRANSACTIONS",
        "purchases ➔ SUBSCRIPTIONS",
        "connects ➔ INTEGRATIONS"
      ],
      sampleData: relationalStore.organization
    },
    {
      id: "AUTH_USERS",
      name: "AUTH_USERS",
      icon: Users,
      color: "text-slate-300 border-slate-700 bg-slate-800/60",
      description: "Authenticated user accounts with credentials, email, and profile metadata.",
      relations: ["joins ➔ ORGANIZATION_MEMBERS"],
      sampleData: relationalStore.user
    },
    {
      id: "ORGANIZATION_MEMBERS",
      name: "ORGANIZATION_MEMBERS",
      icon: Users,
      color: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10",
      description: "Join table linking users to organizations with RBAC roles (OWNER, ADMIN, MEMBER).",
      relations: ["belongs to ➔ ORGANIZATIONS", "belongs to ➔ AUTH_USERS"],
      sampleData: relationalStore.member
    },
    {
      id: "BUSINESS_PROFILES",
      name: "BUSINESS_PROFILES",
      icon: FileText,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      description: "Organization's public product identity, value proposition, website URL, and outbound offer hooks.",
      relations: ["owned by ➔ ORGANIZATIONS"],
      sampleData: relationalStore.businessProfile
    },
    {
      id: "ICP_PROFILES",
      name: "ICP_PROFILES",
      icon: Target,
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
      description: "Ideal Customer Profile defining target industries, headcount ranges, personas, and exclusion rules.",
      relations: ["defined by ➔ ORGANIZATIONS", "referenced by ➔ CAMPAIGNS"],
      sampleData: relationalStore.icpProfiles[0]
    },
    {
      id: "COMPANIES",
      name: "COMPANIES",
      icon: Database,
      color: "text-teal-400 border-teal-500/40 bg-teal-500/10",
      description: "Prospect company accounts sourced from the 105M+ database with tech stack, headcount, and location.",
      relations: ["owned by ➔ ORGANIZATIONS", "contains ➔ CONTACTS"],
      sampleData: relationalStore.companies[0]
    },
    {
      id: "CONTACTS",
      name: "CONTACTS",
      icon: Users,
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      description: "Individual decision-makers contained within companies with verified email and LinkedIn profiles.",
      relations: ["contained in ➔ COMPANIES", "assigned to ➔ CAMPAIGN_LEADS"],
      sampleData: relationalStore.contacts[0]
    },
    {
      id: "CAMPAIGNS",
      name: "CAMPAIGNS",
      icon: Send,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      description: "Autonomous outreach campaigns with daily velocity caps, schedule window, and timezone matching.",
      relations: [
        "created by ➔ ORGANIZATIONS",
        "references ➔ ICP_PROFILES",
        "contains ➔ EMAIL_SEQUENCES",
        "includes ➔ CAMPAIGN_LEADS"
      ],
      sampleData: relationalStore.campaigns[0]
    },
    {
      id: "EMAIL_SEQUENCES",
      name: "EMAIL_SEQUENCES",
      icon: Mail,
      color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
      description: "Multi-touch steps (Step 1 Hook, Step 2 Value-Add, Step 3 Breakup) with delay days and templates.",
      relations: ["contained in ➔ CAMPAIGNS"],
      sampleData: relationalStore.emailSequences[0]
    },
    {
      id: "CAMPAIGN_LEADS",
      name: "CAMPAIGN_LEADS",
      icon: GitFork,
      color: "text-pink-400 border-pink-500/40 bg-pink-500/10",
      description: "Assignment join linking CAMPAIGNS and CONTACTS with outreach progress status (QUEUED, SENT, BOOKED).",
      relations: [
        "included in ➔ CAMPAIGNS",
        "assigned from ➔ CONTACTS",
        "receives ➔ EMAIL_MESSAGES"
      ],
      sampleData: relationalStore.campaignLeads[0]
    },
    {
      id: "EMAIL_MESSAGES",
      name: "EMAIL_MESSAGES",
      icon: Mail,
      color: "text-orange-400 border-orange-500/40 bg-orange-500/10",
      description: "Individual email instances dispatched to campaign leads via rotated mailboxes with open tracking.",
      relations: ["received by ➔ CAMPAIGN_LEADS"],
      sampleData: relationalStore.emailMessages[0]
    },
    {
      id: "REPLIES",
      name: "REPLIES",
      icon: Inbox,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      description: "Incoming prospect emails classified by intent (MEETING_REQUEST, INTERESTED, OBJECTION) with auto-drafts.",
      relations: ["received by ➔ ORGANIZATIONS", "references ➔ CAMPAIGN_LEADS"],
      sampleData: relationalStore.replies[0]
    },
    {
      id: "CREDIT_TRANSACTIONS",
      name: "CREDIT_TRANSACTIONS",
      icon: Coins,
      color: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
      description: "Usage ledger tracking credit deductions per email sent (~$0.033) and top-up grant events.",
      relations: ["recorded for ➔ ORGANIZATIONS"],
      sampleData: relationalStore.creditTransactions[0]
    },
    {
      id: "SUBSCRIPTIONS",
      name: "SUBSCRIPTIONS",
      icon: CreditCard,
      color: "text-indigo-400 border-indigo-500/40 bg-indigo-500/10",
      description: "Subscription tier purchases and pay-as-you-go parameters.",
      relations: ["purchased by ➔ ORGANIZATIONS"],
      sampleData: relationalStore.subscription
    },
    {
      id: "INTEGRATIONS",
      name: "INTEGRATIONS",
      icon: Network,
      color: "text-purple-400 border-purple-500/40 bg-purple-500/10",
      description: "Connected services (Cal.com, MCP Token, Smartlead mailbox fleet, Webhooks).",
      relations: ["connected by ➔ ORGANIZATIONS"],
      sampleData: relationalStore.integrations[0]
    }
  ];

  const active = entities.find((e) => e.id === selectedEntity) || entities[0];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="pb-8 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
          <Network className="w-4 h-4" />
          <span>Architecture & Relational Journey</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Entity Flow & Data Journey
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          The entire platform is architected around your exact multi-tenant ERD. Every user action cascades from <code className="text-blue-400">ORGANIZATIONS</code> through <code className="text-teal-400">COMPANIES</code> & <code className="text-amber-400">CONTACTS</code>, orchestrating <code className="text-emerald-400">CAMPAIGNS</code>, <code className="text-pink-400">CAMPAIGN_LEADS</code>, and <code className="text-orange-400">EMAIL_MESSAGES</code>.
        </p>
      </div>

      {/* Visual ERD Map */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 overflow-x-auto shadow-2xl">
        <div className="min-w-[900px] space-y-8">
          {/* Top Row: Auth & Org */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedEntity("AUTH_USERS")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedEntity === "AUTH_USERS"
                    ? "bg-slate-800 border-white text-white shadow-lg"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="text-[10px] text-slate-500 font-mono block">Auth Layer</span>
                <span className="font-bold text-xs">AUTH_USERS</span>
              </button>

              <div className="text-xs text-slate-600 font-mono">joins ➔</div>

              <button
                onClick={() => setSelectedEntity("ORGANIZATION_MEMBERS")}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedEntity === "ORGANIZATION_MEMBERS"
                    ? "bg-indigo-950/80 border-indigo-400 text-indigo-300 shadow-lg"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="text-[10px] text-slate-500 font-mono block">RBAC Join</span>
                <span className="font-bold text-xs">ORGANIZATION_MEMBERS</span>
              </button>
            </div>

            <div className="text-xs text-slate-600 font-mono">⮜ has</div>

            <button
              onClick={() => setSelectedEntity("ORGANIZATIONS")}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedEntity === "ORGANIZATIONS"
                  ? "bg-blue-950/80 border-blue-400 text-blue-300 shadow-xl shadow-blue-500/20"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
              }`}
            >
              <span className="text-[10px] text-blue-400 font-mono block uppercase tracking-wider">
                Root Tenant
              </span>
              <span className="font-extrabold text-sm text-white">ORGANIZATIONS</span>
            </button>
          </div>

          {/* Org Owned Entities Row */}
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-mono mb-3">
              Direct Child Entities Owned by ORGANIZATIONS:
            </div>
            <div className="grid grid-cols-8 gap-2 text-center text-xs">
              {[
                { id: "BUSINESS_PROFILES", label: "BUSINESS_PROFILES", verb: "owns" },
                { id: "ICP_PROFILES", label: "ICP_PROFILES", verb: "defines" },
                { id: "COMPANIES", label: "COMPANIES", verb: "owns" },
                { id: "CAMPAIGNS", label: "CAMPAIGNS", verb: "creates" },
                { id: "REPLIES", label: "REPLIES", verb: "receives" },
                { id: "CREDIT_TRANSACTIONS", label: "CREDIT_TX", verb: "records" },
                { id: "SUBSCRIPTIONS", label: "SUBSCRIPTIONS", verb: "purchases" },
                { id: "INTEGRATIONS", label: "INTEGRATIONS", verb: "connects" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedEntity(item.id)}
                  className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    selectedEntity === item.id
                      ? "bg-slate-800 border-emerald-400 text-emerald-300 shadow-md"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] text-slate-500 block">{item.verb}</span>
                  <span className="font-bold text-[11px] truncate block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cascading Execution Branch: Companies -> Contacts & Campaigns -> Sequences -> Leads -> Messages */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-4">
              Execution Cascade: From Target Accounts to Outbound Email Delivery
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Companies */}
              <div className="flex-1 text-center">
                <button
                  onClick={() => setSelectedEntity("COMPANIES")}
                  className="w-full p-3 rounded-xl bg-teal-950/40 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold"
                >
                  COMPANIES
                </button>
                <span className="text-[10px] text-slate-500 block mt-1">contains 🠗</span>
                <button
                  onClick={() => setSelectedEntity("CONTACTS")}
                  className="w-full mt-1 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold"
                >
                  CONTACTS
                </button>
              </div>

              <div className="text-slate-600 font-mono text-xs px-2">assigned ➔</div>

              {/* Campaign Leads Hub */}
              <div className="flex-1 text-center">
                <button
                  onClick={() => setSelectedEntity("CAMPAIGN_LEADS")}
                  className="w-full p-4 rounded-xl bg-pink-950/40 border-2 border-pink-500/60 text-pink-300 font-mono text-xs font-bold shadow-lg"
                >
                  <span className="text-[9px] text-pink-400 block uppercase">Assignment Hub</span>
                  CAMPAIGN_LEADS
                </button>
                <span className="text-[10px] text-slate-500 block mt-1">receives 🠗</span>
                <button
                  onClick={() => setSelectedEntity("EMAIL_MESSAGES")}
                  className="w-full mt-1 p-3 rounded-xl bg-orange-950/40 border border-orange-500/40 text-orange-300 font-mono text-xs font-bold"
                >
                  EMAIL_MESSAGES
                </button>
              </div>

              <div className="text-slate-600 font-mono text-xs px-2">⮜ includes</div>

              {/* Campaigns & Sequences */}
              <div className="flex-1 text-center">
                <button
                  onClick={() => setSelectedEntity("CAMPAIGNS")}
                  className="w-full p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold"
                >
                  CAMPAIGNS
                </button>
                <span className="text-[10px] text-slate-500 block mt-1">contains 🠗</span>
                <button
                  onClick={() => setSelectedEntity("EMAIL_SEQUENCES")}
                  className="w-full mt-1 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold"
                >
                  EMAIL_SEQUENCES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Entity Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Metadata & Relationships */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${active.color}`}>
              {active.name}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{active.description}</p>

          <div className="pt-4 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              ERD Foreign Key Relations:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
              {active.relations.map((rel, idx) => (
                <li key={idx} className="flex items-center gap-2 p-1.5 rounded bg-slate-950 border border-slate-800/80">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{rel}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 2 Cols: Live Database Record Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <span className="text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Live Active Record in System ({active.name})
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Format: JSON Entity Instance</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800 max-h-[380px]">
            <pre>{JSON.stringify(active.sampleData, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
