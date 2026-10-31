import Link from "next/link";
import { Bot, Shield, Globe2, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-dark-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">SalesPilot AI</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              Autonomous 24/7 AI Sales Agent & B2B Go-To-Market Platform. Paste your website, discover verified decision-makers from 105M+ companies, and orchestrate warm outreach on autopilot.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                105,420,000+ Companies Active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> 100% CAN-SPAM & GDPR Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">AI Outreach Agent</Link></li>
              <li><Link href="/database" className="hover:text-emerald-400 transition-colors">105M+ B2B Database</Link></li>
              <li><Link href="/segments" className="hover:text-emerald-400 transition-colors">Segments & TAM Map</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pay-As-You-Go Pricing</Link></li>
              <li><Link href="/mcp" className="hover:text-emerald-400 transition-colors">ChatGPT MCP Server</Link></li>
            </ul>
          </div>

          {/* Col 3: Data Regions */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Global Coverage</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-300">North America (22M+)</span></li>
              <li><span className="text-slate-300">Europe & UK (31M+)</span></li>
              <li><span className="text-slate-300">Asia-Pacific (28M+)</span></li>
              <li><span className="text-slate-300">Latin America (14M+)</span></li>
              <li><span className="text-slate-300">Google Maps Places (210M+)</span></li>
            </ul>
          </div>

          {/* Col 4: Resources & App */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Application</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/app/dashboard" className="hover:text-emerald-400 transition-colors">Client Portal</Link></li>
              <li><Link href="/app/onboarding" className="hover:text-emerald-400 transition-colors">Agent Setup Wizard</Link></li>
              <li><Link href="/app/prospects" className="hover:text-emerald-400 transition-colors">Prospecting Table</Link></li>
              <li><Link href="/app/inbox" className="hover:text-emerald-400 transition-colors">AI Inbound Inbox</Link></li>
              <li><Link href="/app/mailboxes" className="hover:text-emerald-400 transition-colors">Mailbox Warm-up</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SalesPilot AI Inc. Built for Autonomous Go-To-Market Execution.</p>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/pricing" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/pricing" className="hover:text-slate-400">Security & Deliverability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
