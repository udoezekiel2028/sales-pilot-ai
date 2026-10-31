"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Copy,
  Check,
  Play,
  Sparkles,
  Bot,
  ExternalLink,
  Code2,
  Cpu
} from "lucide-react";

export default function McpPage() {
  const [copied, setCopied] = useState(false);
  const [testTool, setTestTool] = useState("search_b2b_database");
  const [testQuery, setTestQuery] = useState("Fintech companies in New York using AWS");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const mcpConfig = `{
  "mcpServers": {
    "salespilot-outreach": {
      "url": "https://api.salespilot.ai/mcp",
      "headers": {
        "Authorization": "Bearer exp_live_9a8f27b4e1c"
      }
    }
  }
}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(mcpConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTestTool = () => {
    setIsRunning(true);
    setTestResponse(null);

    setTimeout(() => {
      setIsRunning(false);
      if (testTool === "search_b2b_database") {
        setTestResponse(
          JSON.stringify(
            {
              status: "success",
              matchesFound: 1420,
              topResults: [
                {
                  company: "FinFlow Systems",
                  domain: "finflow.io",
                  location: "New York, NY",
                  headcount: "50-200",
                  verifiedDecisionMakers: [
                    { name: "Marcus Vance", title: "VP of Sales & Growth", email: "marcus.vance@finflow.io" },
                    { name: "Elena Rostova", title: "Chief Executive Officer", email: "elena@finflow.io" }
                  ]
                }
              ]
            },
            null,
            2
          )
        );
      } else {
        setTestResponse(
          JSON.stringify(
            {
              status: "success",
              target: "finflow.io",
              generatedSequence: {
                step1Subject: "Quick question regarding FinFlow's sales pipeline",
                step1Hook: "Noticed you are leading VP of Sales at FinFlow Systems. Most fintech platforms face high SDR costs...",
                step2Followup: "Case study: How similar revenue platforms scaled qualified demo volume by 3.4x",
                step3Breakup: "Closing the loop for FinFlow Systems"
              }
            },
            null,
            2
          )
        );
      }
    }, 700);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-8 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1.5">
          <Terminal className="w-4 h-4" />
          <span>Model Context Protocol (MCP)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          ChatGPT & Claude MCP Integration
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
          SalesPilot AI exposes a standard Model Context Protocol (MCP) server. You can search 105M+ company databases, deduce ICPs, and trigger cold outreach directly inside ChatGPT and Claude Desktop.
        </p>
      </div>

      {/* Setup Guide */}
      <div className="my-8 space-y-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Claude Desktop & ChatGPT Client Configuration</span>
            </div>
            <button
              onClick={copyConfig}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy JSON"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800">
            <pre>{mcpConfig}</pre>
          </div>
        </div>

        {/* Live Interactive MCP Tool Runner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-lg text-white">Interactive MCP Tool Tester</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Protocol: JSON-RPC 2.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Select Tool Name:
              </label>
              <select
                value={testTool}
                onChange={(e) => setTestTool(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="search_b2b_database">tools/call: search_b2b_database</option>
                <option value="generate_outreach_sequence">tools/call: generate_outreach_sequence</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Natural Language Arguments:
              </label>
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Argument query..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            onClick={runTestTool}
            disabled={isRunning}
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? "Executing Tool..." : "Dispatch Tool Execution"}</span>
          </button>

          {testResponse && (
            <div className="mt-6">
              <span className="text-[11px] font-mono text-emerald-400 block mb-2 font-bold">
                ✓ Response (HTTP 200 OK):
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre">
                {testResponse}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
