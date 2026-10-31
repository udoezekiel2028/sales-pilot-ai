"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Search,
  FileSearch,
  PenTool,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCw,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Sparkles,
  ArrowRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  X
} from "lucide-react";
import {
  PipelineExecutionState,
  OutreachDraftPackage,
  SalesConversationOutput,
  CampaignIntelligenceOutput
} from "@/lib/agents/types";

export default function AgentsHubPage() {
  const [websiteUrl, setWebsiteUrl] = useState("brilliantcraft.io");
  const [isRunning, setIsRunning] = useState(false);
  const [pipeline, setPipeline] = useState<PipelineExecutionState | null>(null);
  const [activeTab, setActiveTab] = useState<"pipeline" | "conversation" | "intelligence">("pipeline");
  const [selectedDraft, setSelectedDraft] = useState<OutreachDraftPackage | null>(null);

  // Agent 5 test state
  const [testReplyText, setTestReplyText] = useState("Hi Alex, we are very interested. Could you send over pricing or times you are free for a quick Zoom this Thursday?");
  const [conversationResult, setConversationResult] = useState<SalesConversationOutput | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  // Agent 6 test state
  const [intelligenceResult, setIntelligenceResult] = useState<CampaignIntelligenceOutput | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Trigger Multi-Agent Pipeline
  const handleRunPipeline = async () => {
    setIsRunning(true);
    setPipeline(null);

    try {
      const res = await fetch("/api/agents/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl })
      });
      const data = await res.json();
      if (data.success) {
        setPipeline(data.pipeline);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  // Human-in-the-Loop Approval Action
  const handleApprovalAction = async (companyId: string, action: "APPROVE" | "REJECT") => {
    if (!pipeline) return;

    try {
      const res = await fetch("/api/agents/pipeline", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pipelineId: pipeline.id,
          companyId,
          action
        })
      });
      const data = await res.json();
      if (data.success) {
        setPipeline(data.pipeline);
        if (selectedDraft?.companyId === companyId) {
          const updated = data.pipeline.draftPackages.find((p: any) => p.companyId === companyId);
          setSelectedDraft(updated || null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Test Agent 5
  const handleTestConversation = async () => {
    setIsClassifying(true);
    try {
      const res = await fetch("/api/agents/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inboundEmail: {
            messageId: "msg_test_01",
            senderEmail: "prospect@targetcorp.com",
            senderName: "Sarah Jenkins",
            subject: "Re: Quick question",
            body: testReplyText,
            receivedAt: new Date().toISOString()
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setConversationResult(data.analysis);
      }
    } finally {
      setIsClassifying(false);
    }
  };

  // Test Agent 6
  const handleRunIntelligence = async () => {
    setIsOptimizing(true);
    try {
      const res = await fetch("/api/agents/intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId: "camp_01" })
      });
      const data = await res.json();
      if (data.success) {
        setIntelligenceResult(data.intelligence);
      }
    } finally {
      setIsOptimizing(false);
    }
  };

  const agentsList = [
    {
      id: "agent_01",
      number: "01",
      name: "Business Analyst",
      title: "Business Intelligence Agent",
      icon: BrainCircuit,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      description: "Analyzes company website & description to produce structured business profiles and ICP recommendations.",
      status: pipeline?.businessProfile ? "COMPLETED" : isRunning ? "RUNNING" : "READY"
    },
    {
      id: "agent_02",
      number: "02",
      name: "Prospecting",
      title: "Lead Discovery Agent (Apollo.io)",
      icon: Search,
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      description: "Powered by Apollo.io API: Translates ICP into provider search queries, fetches verified decision-makers, and deduplicates records.",
      status: pipeline?.discoveryResults ? "COMPLETED" : isRunning && pipeline?.businessProfile ? "RUNNING" : "WAITING"
    },
    {
      id: "agent_03",
      number: "03",
      name: "Research",
      title: "Lead Research Agent",
      icon: FileSearch,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      description: "Deep-researches target company domains to find verifiable signals (tech stack, hiring) and formulates need hypotheses.",
      status: pipeline?.researchResults ? "COMPLETED" : isRunning && pipeline?.discoveryResults ? "RUNNING" : "WAITING"
    },
    {
      id: "agent_04",
      number: "04",
      name: "Copywriting",
      title: "Outreach Copywriting Agent",
      icon: PenTool,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      description: "Generates tailored subject lines, personalized opening hooks, and multi-touch sequence drafts with brand tone.",
      status: pipeline?.draftPackages ? "COMPLETED" : isRunning && pipeline?.researchResults ? "RUNNING" : "WAITING"
    },
    {
      id: "approval_gate",
      number: "GATE",
      name: "Approval Gate",
      title: "Human-in-the-Loop Review",
      icon: ShieldCheck,
      color: "text-pink-400 border-pink-500/40 bg-pink-500/10",
      description: "Mandatory safeguard gate: AI drafts & recommends. The user must explicitly review and approve emails before sending.",
      status: pipeline?.stage === "AWAITING_USER_APPROVAL"
        ? "ACTION_REQUIRED"
        : pipeline?.stage === "CAMPAIGN_APPROVED_READY"
        ? "APPROVED"
        : "WAITING"
    },
    {
      id: "agent_05",
      number: "05",
      name: "Conversation",
      title: "Sales Conversation Agent",
      icon: MessageSquare,
      color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      description: "Triage inbound replies, identifies meeting requests vs objections vs unsubscribes, and drafts auto-responses.",
      status: "ACTIVE"
    },
    {
      id: "agent_06",
      number: "06",
      name: "Optimization",
      title: "Campaign Intelligence Agent",
      icon: TrendingUp,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      description: "Analyzes open/reply conversion curves, compares ICP segments, flags underperforming subject lines, and optimizes campaigns.",
      status: "ACTIVE"
    }
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
            <BrainCircuit className="w-4 h-4" />
            <span>Multi-Agent System Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Six Specialized AI Agents Hub
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Each agent has an isolated task, strict JSON validation boundaries, and a mandatory Human-in-the-Loop review gate before sending.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === "pipeline"
                ? "bg-emerald-400 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pipeline (Agents 1-4 & Gate)
          </button>
          <button
            onClick={() => setActiveTab("conversation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === "conversation"
                ? "bg-emerald-400 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Agent 05 (Conversation)
          </button>
          <button
            onClick={() => setActiveTab("intelligence")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === "intelligence"
                ? "bg-emerald-400 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Agent 06 (Intelligence)
          </button>
        </div>
      </div>

      {/* TAB 1: PIPELINE RUNNER (AGENTS 1 - 4 & HUMAN GATE) */}
      {activeTab === "pipeline" && (
        <div className="my-8 space-y-8">
          {/* Runner Input Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Target Business URL for Agent 01 Input:
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="e.g. brilliantcraft.io or stripe.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <button
              onClick={handleRunPipeline}
              disabled={isRunning}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50 sm:self-end"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isRunning ? "Orchestrating Agents..." : "Run Multi-Agent Pipeline"}</span>
            </button>
          </div>

          {/* Six Agents Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentsList.slice(0, 5).map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    agent.status === "ACTION_REQUIRED"
                      ? "bg-pink-950/20 border-pink-500 shadow-xl shadow-pink-500/10 ring-1 ring-pink-500"
                      : "bg-slate-900/60 border-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${agent.color}`}>
                        {agent.number}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          agent.status === "COMPLETED"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : agent.status === "RUNNING"
                            ? "bg-amber-500/15 text-amber-400 animate-pulse"
                            : agent.status === "ACTION_REQUIRED"
                            ? "bg-pink-500 text-slate-950 animate-bounce"
                            : agent.status === "APPROVED"
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1">{agent.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 text-[10px] text-slate-500 font-mono">
                    Validated JSON Schema ➔
                  </div>
                </div>
              );
            })}
          </div>

          {/* AGENT 01 DOSSIER: BUSINESS ANALYSIS & ICP SPECIFICATION */}
          {pipeline?.businessProfile && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl space-y-6 animate-in fade-in">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      Agent 01: Business Intelligence & ICP Dossier
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    {pipeline.businessProfile.companyName} Analysis & Target ICP
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Website: <a href={pipeline.businessProfile.websiteUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{pipeline.businessProfile.websiteUrl}</a>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Model: {pipeline.businessProfile.businessModel}
                  </span>
                </div>
              </div>

              {/* Part 1: What the Business Does */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  1. What the Business Does & Solves:
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <p className="mb-2"><strong>Executive Summary:</strong> {pipeline.businessProfile.executiveSummary}</p>
                  <p className="text-emerald-400 font-medium"><strong>Core Value Proposition:</strong> {pipeline.businessProfile.valueProposition}</p>
                </div>
              </div>

              {/* Core Services / Products identified */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Identified Products & Core Solutions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pipeline.businessProfile.coreServices.map((srv, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1 uppercase font-semibold">
                        {srv.category}
                      </span>
                      <h4 className="font-bold text-white text-xs mb-1">{srv.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{srv.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Tailored Ideal Customer Profile (ICP) */}
              <div className="pt-6 border-t border-slate-800">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-3 font-mono">
                  2. Tailored Ideal Customer Profile (ICP) Specifications:
                </span>

                {/* Target Personas */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-300">
                    Target Buyer Personas (Who Buys from Them):
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pipeline.businessProfile.icpSpecification?.targetBuyerPersonas.map((persona, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {persona.seniority}
                          </span>
                          <span className="text-[10px] text-slate-500">{persona.department}</span>
                        </div>
                        <h5 className="font-bold text-white text-xs">{persona.title}</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          <strong>Core Pain Point:</strong> {persona.corePainPoint}
                        </p>
                        <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-900">
                          <strong>Trigger:</strong> {persona.buyingTrigger}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Sizing & Industries Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block mb-1 uppercase font-semibold">
                      Target Industries
                    </span>
                    <span className="text-slate-200 font-medium block">
                      {pipeline.businessProfile.icpSpecification?.targetCompanyIndustries.slice(0, 3).join(", ")}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block mb-1 uppercase font-semibold">
                      Employee Headcount
                    </span>
                    <span className="text-emerald-400 font-mono font-bold block">
                      {pipeline.businessProfile.icpSpecification?.headcountBrackets.join(" or ")} employees
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block mb-1 uppercase font-semibold">
                      Revenue Bracket
                    </span>
                    <span className="text-indigo-400 font-mono font-bold block">
                      {pipeline.businessProfile.icpSpecification?.revenueBrackets.join(", ")}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block mb-1 uppercase font-semibold">
                      Geographic Focus
                    </span>
                    <span className="text-slate-200 block">
                      {pipeline.businessProfile.icpSpecification?.geographicFocus.slice(0, 3).join(", ")}
                    </span>
                  </div>
                </div>

                {/* Recommended Pitch Hook */}
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    Synthesized Outbound Value Angle (Passed to Agent 04):
                  </span>
                  <p className="text-slate-200 font-medium">
                    "{pipeline.businessProfile.offerAngle}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* HUMAN-IN-THE-LOOP APPROVAL SECTION */}
          {pipeline?.draftPackages && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-pink-500/50 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-pink-400" />
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider font-mono">
                      Human-in-the-Loop Approval Gate Active
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Review AI-Drafted Outreach Before Sending
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    AI has researched, drafted, and recommended. You must explicitly review and approve emails below.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">
                    {pipeline.userApprovedCount} / {pipeline.draftPackages.length} Approved
                  </span>
                </div>
              </div>

              {/* Draft Review Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pipeline.draftPackages.map((draft) => {
                  const research = pipeline.researchResults?.researchedAccounts.find(
                    (r) => r.companyId === draft.companyId
                  );
                  const isApproved = draft.approvalStatus === "APPROVED";
                  const isRejected = draft.approvalStatus === "REJECTED";

                  return (
                    <div
                      key={draft.companyId}
                      className={`p-5 rounded-2xl border transition-all ${
                        isApproved
                          ? "bg-emerald-950/20 border-emerald-500/50"
                          : isRejected
                          ? "bg-red-950/20 border-red-500/40 opacity-60"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">{draft.companyName}</h4>
                          <p className="text-xs text-slate-400">
                            {draft.contactName} • <span className="text-slate-500">{draft.contactTitle}</span>
                          </p>
                          <span className="text-[10px] text-emerald-400 font-mono">{draft.contactEmail}</span>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isApproved
                              ? "bg-emerald-500/20 text-emerald-400"
                              : isRejected
                              ? "bg-red-500/20 text-red-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {draft.approvalStatus}
                        </span>
                      </div>

                      {/* Verifiable Signals Detected by Agent 03 */}
                      {research && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3 text-xs">
                          <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                            Agent 03 Public Signal Evidence:
                          </span>
                          <p className="text-[11px] text-slate-300">
                            {research.verifiableSignals[0]?.headline}
                          </p>
                        </div>
                      )}

                      {/* Email Draft Preview */}
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 mb-4 whitespace-pre-wrap line-clamp-4">
                        <span className="text-slate-500 block font-bold mb-1">
                          Subject: {draft.emailSteps[0].subjectLine}
                        </span>
                        {draft.emailSteps[0].body}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <button
                          onClick={() => setSelectedDraft(draft)}
                          className="text-xs text-emerald-400 hover:underline cursor-pointer font-medium"
                        >
                          Inspect Full Sequence ({draft.emailSteps.length} Steps)
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprovalAction(draft.companyId, "REJECT")}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors cursor-pointer border border-slate-800"
                            title="Reject Draft"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleApprovalAction(draft.companyId, "APPROVE")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-slate-950" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AGENT 05 (SALES CONVERSATION) */}
      {activeTab === "conversation" && (
        <div className="my-8 space-y-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-teal-400" />
              <h2 className="font-bold text-lg text-white">Agent 05: Sales Conversation Triage</h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Simulate an incoming prospect reply. Agent 05 will classify the intent, detect objections or meetings, and generate an automated response with calendar routing.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Simulated Inbound Prospect Email Body:
                </label>
                <textarea
                  rows={4}
                  value={testReplyText}
                  onChange={(e) => setTestReplyText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Test Presets:</span>
                <button
                  onClick={() => setTestReplyText("Are you free this Thursday at 2 PM to jump on a quick Zoom call?")}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Meeting Request
                </button>
                <button
                  onClick={() => setTestReplyText("We are currently under contract with ZoomInfo until the end of the year.")}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Competitor Objection
                </button>
                <button
                  onClick={() => setTestReplyText("Please unsubscribe me and remove my email from your database.")}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Unsubscribe Request
                </button>
              </div>

              <button
                onClick={handleTestConversation}
                disabled={isClassifying}
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>{isClassifying ? "Classifying Reply..." : "Run Agent 05 Classification"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </div>

          {conversationResult && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Agent 05 Structured Analysis
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Confidence: {(conversationResult.confidenceScore * 100).toFixed(0)}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Classified Intent</span>
                  <span className="font-bold text-emerald-400 font-mono mt-0.5 block truncate">
                    {conversationResult.classifiedIntent}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Sentiment</span>
                  <span className="font-bold text-white font-mono mt-0.5 block">
                    {conversationResult.sentiment}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Unsubscribe Flag</span>
                  <span className="font-bold font-mono mt-0.5 block text-slate-200">
                    {conversationResult.isUnsubscribeRequest ? "YES (AUTO-PURGE)" : "NO"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Recommended Action</span>
                  <span className="font-bold font-mono mt-0.5 block text-indigo-400 truncate">
                    {conversationResult.recommendedAction}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-1">
                  Suggested Context-Aware Response:
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {conversationResult.suggestedResponse}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AGENT 06 (CAMPAIGN INTELLIGENCE) */}
      {activeTab === "intelligence" && (
        <div className="my-8 space-y-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-lg text-white">Agent 06: Campaign Intelligence</h2>
              </div>
              <p className="text-xs text-slate-400">
                Audits message step conversion, identifies underperforming subject lines, and compares ICP segments.
              </p>
            </div>
            <button
              onClick={handleRunIntelligence}
              disabled={isOptimizing}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer shadow-md"
            >
              {isOptimizing ? "Auditing Campaign..." : "Run Intelligence Audit"}
            </button>
          </div>

          {intelligenceResult && (
            <div className="space-y-6 animate-in fade-in">
              {/* Health Score Banner */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                    Overall Campaign Health Score
                  </span>
                  <div className="text-4xl font-extrabold text-cyan-400 font-mono mt-1">
                    {intelligenceResult.overallHealthScore} / 100
                  </div>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold block font-mono">
                    Top Segment: {intelligenceResult.icpSegmentComparison.topPerformingSegment}
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">
                    Conversion Differential: {intelligenceResult.icpSegmentComparison.efficiencyDifferential}
                  </span>
                </div>
              </div>

              {/* Actionable Insights */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm">Actionable Strategic Insights</h3>
                <div className="space-y-3">
                  {intelligenceResult.actionableInsights.map((insight, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {insight.category}
                        </span>
                        <span className="font-bold text-white text-xs">{insight.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{insight.observation}</p>
                      <div className="text-xs text-emerald-400 font-medium">
                        ➔ Recommendation: {insight.actionableRecommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Inspect Modal */}
      {selectedDraft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedDraft.companyName}</h3>
                <p className="text-xs text-slate-400">
                  Recipient: {selectedDraft.contactName} ({selectedDraft.contactEmail})
                </p>
              </div>
              <button
                onClick={() => setSelectedDraft(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedDraft.emailSteps.map((step) => (
                <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                      Step {step.stepNumber}: {step.stepType} (Delay: {step.delayDays}d)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Signal: {step.referencedSignal}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">
                    Subject: {step.subjectLine}
                  </div>
                  <div className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {step.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  handleApprovalAction(selectedDraft.companyId, "REJECT");
                  setSelectedDraft(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/30 hover:bg-red-950 cursor-pointer"
              >
                Reject Sequence
              </button>
              <button
                onClick={() => {
                  handleApprovalAction(selectedDraft.companyId, "APPROVE");
                  setSelectedDraft(null);
                }}
                className="px-6 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 cursor-pointer shadow-md"
              >
                Approve Sequence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
