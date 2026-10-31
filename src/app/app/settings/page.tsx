"use client";

import { useState } from "react";
import {
  Settings2,
  Calendar,
  Key,
  Globe,
  Bell,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

export default function SettingsPage() {
  const [calendarUrl, setCalendarUrl] = useState("https://cal.com/outreach-team/15min");
  const [apiKey] = useState("exp_live_9a8f27b4e1c50d8823");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800 mb-8">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Platform & Integration Settings
        </h1>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Calendar Booking Link */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Calendar Booking Automation</span>
          </div>
          <p className="text-xs text-slate-400">
            The AI automatically routes this scheduling link when prospects express interest or ask to speak.
          </p>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Cal.com / Calendly Link:
            </label>
            <input
              type="text"
              value={calendarUrl}
              onChange={(e) => setCalendarUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* API Key */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Key className="w-4 h-4 text-purple-400" />
            <span>MCP & API Key</span>
          </div>
          <p className="text-xs text-slate-400">
            Use this key to authenticate with the MCP server from ChatGPT, Claude Desktop, or your internal CRM scripts.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 font-mono"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
