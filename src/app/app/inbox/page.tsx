"use client";

import { useState } from "react";
import {
  Inbox,
  CheckCircle2,
  Calendar,
  Send,
  Sparkles,
  Bot,
  AlertCircle,
  Archive,
  Clock,
  User
} from "lucide-react";
import { classifyInboundReply } from "@/lib/agentEngine";

interface MessageThread {
  id: string;
  leadName: string;
  leadTitle: string;
  companyName: string;
  email: string;
  time: string;
  incomingText: string;
  intent: "MEETING_REQUEST" | "INTERESTED" | "OBJECTION" | "NOT_INTERESTED" | "OUT_OF_OFFICE";
}

export default function InboxPage() {
  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: "thread_1",
      leadName: "Elena Rostova",
      leadTitle: "Chief Executive Officer",
      companyName: "FinFlow Systems",
      email: "elena@finflow.io",
      time: "10 mins ago",
      incomingText: "Hi Alex, thanks for reaching out. Yes, we're currently re-evaluating our outbound pipeline for Q1. Are you available this Thursday afternoon to hop on a quick 15-minute zoom?",
      intent: "MEETING_REQUEST"
    },
    {
      id: "thread_2",
      leadName: "David Chen",
      leadTitle: "Co-Founder & CTO",
      companyName: "AetherOps AI",
      email: "david@aetherops.ai",
      time: "2 hours ago",
      incomingText: "Interesting concept. How does your pay-as-you-go model work compared to paying per seat? Do you have a 1-pager or pricing breakdown you can send over?",
      intent: "INTERESTED"
    },
    {
      id: "thread_3",
      leadName: "Robert MacIntyre",
      leadTitle: "Chief Commercial Officer",
      companyName: "ScaleForge Logistics",
      email: "robert.m@scaleforge.com",
      time: "Yesterday",
      incomingText: "We are currently under contract with Apollo and ZoomInfo until the end of this year. Maybe reach back out in November.",
      intent: "OBJECTION"
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>("thread_1");
  const [replyText, setReplyText] = useState<string>("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const classification = classifyInboundReply(activeThread.incomingText);

  // Initialize draft response when active thread changes
  const handleSelectThread = (id: string) => {
    setActiveThreadId(id);
    const selected = threads.find((t) => t.id === id);
    if (selected) {
      const cls = classifyInboundReply(selected.incomingText);
      setReplyText(cls.draftResponse);
    }
    setSentSuccess(false);
  };

  const handleSendReply = () => {
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Autonomous Inbound Classifier
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AI Reply & Scheduling Center
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            3 Active Conversations
          </span>
        </div>
      </div>

      {/* Main Split Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden min-h-[600px]">
        {/* Left Column: Thread List (5 cols) */}
        <div className="lg:col-span-5 border-r border-slate-800/80 p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-2">
            Inbound Messages
          </div>

          {threads.map((t) => {
            const isSelected = t.id === activeThreadId;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectThread(t.id)}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-800/80 border-emerald-500/50 shadow-md"
                    : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs">{t.leadName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({t.companyName})</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{t.time}</span>
                </div>

                <div className="mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                      t.intent === "MEETING_REQUEST"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : t.intent === "INTERESTED"
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {t.intent === "MEETING_REQUEST"
                      ? "✓ Meeting Requested"
                      : t.intent === "INTERESTED"
                      ? "★ Interested"
                      : "Objection / Delay"}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {t.incomingText}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Thread & Autonomous Draft (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            {/* Thread Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span>{activeThread.leadName}</span>
                  <span className="text-xs font-normal text-slate-400">({activeThread.email})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeThread.leadTitle} at <strong className="text-slate-200">{activeThread.companyName}</strong>
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Cal.com Scheduler Ready
              </span>
            </div>

            {/* Inbound Message Bubble */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Prospect Message:
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {activeThread.incomingText}
              </div>
            </div>

            {/* AI Agent Intent Insight */}
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <Bot className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-200">
                <strong>Autonomous Agent Assessment:</strong> Prospect has shown high commercial intent (Confidence: {(classification.confidence * 100).toFixed(0)}%). Recommended Action: <code className="bg-emerald-950 px-1 py-0.5 rounded font-mono text-[10px] text-emerald-300">{classification.suggestedAction}</code>.
              </div>
            </div>

            {/* Draft Reply Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  AI Suggested Response (with Booking Link):
                </span>
                <span className="text-[11px] text-emerald-400">Instant One-Click Send</span>
              </div>
              <textarea
                rows={5}
                value={replyText || classification.draftResponse}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
            {sentSuccess ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Response dispatched via mailbox pool! Calendar link routed.</span>
              </div>
            ) : (
              <span className="text-xs text-slate-500">Autonomous calendar sync enabled</span>
            )}

            <button
              onClick={handleSendReply}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Send Response & Route Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
