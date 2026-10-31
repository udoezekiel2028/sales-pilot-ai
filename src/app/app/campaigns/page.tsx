"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Clock,
  Settings2,
  Mail,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Zap,
  ArrowRight
} from "lucide-react";

export default function CampaignsPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  // Email Steps
  const [step1Subject, setStep1Subject] = useState("Quick question regarding {{companyName}}'s outbound pipeline");
  const [step1Body, setStep1Body] = useState(`Hi {{firstName}},

I noticed you're leading {{title}} at {{companyName}}. Seeing your focus on {{industry}}, I wanted to reach out directly.

Most teams in your space are struggling with low reply rates on cold outreach and the overhead of managing fragmented lead databases.

We helped similar companies in your space increase qualified pipeline by 3.4x in 45 days through autonomous AI outbound orchestration.

Would you be open to a quick 10-minute chat this Thursday at 2 PM or Friday morning to see how this fits into {{companyName}}'s growth roadmap?

Best,
Alex Rivera
Founding Team`);

  const [step2Delay, setStep2Delay] = useState("3");
  const [step2Body, setStep2Body] = useState(`Hi {{firstName}},

Following up on my note from earlier this week.

Thought you might find this interesting: we recently helped an organization with {{employeeCount}} team members eliminate 80% of their manual prospecting hours while doubling booked demo conversion.

Here is a 2-minute breakdown of the framework: https://salespilot.ai/case-study

Let me know if you'd like to benchmark your current numbers.

Best,
Alex Rivera`);

  const [step3Delay, setStep3Delay] = useState("5");
  const [step3Body, setStep3Body] = useState(`Hi {{firstName}},

I know how busy your schedule is as {{title}}. I assume outbound pipeline optimization isn't a top priority for {{companyName}} right now.

I'll step back and won't follow up further, but if your team ever needs an autonomous agent to handle B2B lead generation on autopilot, you can always check out salespilot.ai.

Wishing you and the {{companyName}} team continued success!

Best,
Alex Rivera`);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setIsLaunched(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Sequence Orchestration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Autonomous Outreach Sequence
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLaunch}
            disabled={isLaunching || isLaunched}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            {isLaunched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Campaign Active (Dispatching)</span>
              </>
            ) : isLaunching ? (
              <span>Deploying to Mailbox Pool...</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Launch Sequence (750 Free Credits)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isLaunched && (
        <div className="my-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Campaign sequence is live! The agent is actively rotating sends across warmed secondary mailboxes.</span>
          </div>
          <Link href="/app/inbox" className="underline font-semibold hover:text-white">
            Go to AI Inbox &rarr;
          </Link>
        </div>
      )}

      {/* Main Grid: Steps on Left, Settings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        {/* Sequence Steps (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeStep === step
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>
                  {step === 1 ? "Step 1: Hook" : step === 2 ? "Step 2: Value-Add" : "Step 3: Breakup"}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            {activeStep === 1 && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Subject Line:</label>
                  <input
                    type="text"
                    value={step1Subject}
                    onChange={(e) => setStep1Subject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Email Body:</label>
                  <textarea
                    rows={10}
                    value={step1Body}
                    onChange={(e) => setStep1Body(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                  />
                </div>
              </>
            )}

            {activeStep === 2 && (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Send delay after Step 1:</span>
                  <input
                    type="number"
                    value={step2Delay}
                    onChange={(e) => setStep2Delay(e.target.value)}
                    className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-center"
                  />
                  <span>business days</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Follow-Up Email Body:</label>
                  <textarea
                    rows={8}
                    value={step2Body}
                    onChange={(e) => setStep2Body(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                  />
                </div>
              </>
            )}

            {activeStep === 3 && (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Send delay after Step 2:</span>
                  <input
                    type="number"
                    value={step3Delay}
                    onChange={(e) => setStep3Delay(e.target.value)}
                    className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-center"
                  />
                  <span>business days</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Breakup Email Body:</label>
                  <textarea
                    rows={8}
                    value={step3Body}
                    onChange={(e) => setStep3Body(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                  />
                </div>
              </>
            )}

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Available Dynamic Tags: <code className="text-emerald-400">{"{{firstName}}"}</code>, <code className="text-emerald-400">{"{{companyName}}"}</code>, <code className="text-emerald-400">{"{{title}}"}</code>, <code className="text-emerald-400">{"{{industry}}"}</code></span>
              <span className="text-slate-400">AI automatically adapts per account</span>
            </div>
          </div>
        </div>

        {/* Dispatch & Mailbox Rules (Col 3) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
              <Settings2 className="w-4 h-4 text-emerald-400" />
              <span>Sending Infrastructure Rules</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="text-slate-400 block mb-1">Max Daily Sends per Mailbox:</label>
                <input
                  type="number"
                  defaultValue={45}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Sending Time Window:</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="09:00 AM"
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-center font-mono text-xs"
                  />
                  <input
                    type="text"
                    defaultValue="05:30 PM"
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-center font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Recipient Timezone Matching:</label>
                <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enabled (Respects prospect local time)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
