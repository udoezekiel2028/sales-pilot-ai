# SalesPilot AI Autonomous Outbound & GTM System

An end-to-end, production-ready system of **SalesPilot AI (AutoGTM)**: an autonomous 24/7 AI-driven B2B sales agent with access to a global database of 105M+ companies and 80M+ decision-makers.

---

## 🚀 Key Features & Navigation Map

### Public & Exploration Routes
- **`/` (Hero & Live URL Analyzer):** Paste any website URL to extract product value propositions, deduce buyer personas, calculate ICP matches, and preview personalized cold outreach hooks.
- **`/database` (105M+ B2B Database):** Search across global companies and decision-makers with natural language queries, technology filters (e.g., Next.js, Stripe, Snowflake), and verified email checks.
- **`/segments` (Market Map & TAM Explorer):** Interactive sector clusters, total addressable market calculation, and sub-niche market penetration sizing.
- **`/pricing` (Interactive Pay-As-You-Go Estimator):** Dynamic monthly slider (~$0.03/email sent), $30 free welcome credit grant, and data export plans.
- **`/mcp` (Model Context Protocol Integration):** Official MCP server setup for ChatGPT and Claude Desktop, complete with an in-browser tool runner.

### Authenticated Application Routes (`/app/*`)
- **`/app/dashboard`:** Mission Control showing active campaigns, delivery rates (62.4% open, 9.1% reply), meetings booked, credit ledger, and real-time activity stream.
- **`/app/onboarding`:** 3-step AI agent configuration wizard (URL extraction &rarr; ICP & persona customization &rarr; Cal.com scheduler integration).
- **`/app/prospects`:** In-app target account selector with 1-click AI deep research and campaign queueing.
- **`/app/campaigns`:** Multi-step sequence orchestration (Step 1 Hook, Step 2 Value-Add, Step 3 Breakup) with time delays and recipient timezone matching.
- **`/app/inbox`:** AI Reply Center with autonomous intent classification (`Meeting Requested`, `Interested`, `Objection`, `Out of Office`) and 1-click Cal.com booking responses.
- **`/app/mailboxes`:** Fleet monitoring for pre-warmed secondary domains, daily safety throttle limits, and SPF/DKIM/DMARC health verification.
- **`/app/billing`:** Credit balance ledger, automatic recharge thresholds, and Stripe-ready top-up packages.
- **`/app/settings`:** Cal.com/Calendly link configuration and MCP API key management.

---

## 🛠️ API & MCP Endpoints

- `POST /api/analyze-url`: Deep-scrapes target website and returns structured ICP.
- `GET /api/search-leads`: Filters the 105M+ B2B company database.
- `POST /api/generate-email`: Synthesizes personalized multi-touch cold email steps.
- `POST /api/classify-reply`: Analyzes inbound email responses and generates context-aware replies with scheduling links.
- `POST /api/mcp`: Fast JSON-RPC 2.0 endpoint implementing `tools/list` and `tools/call` for ChatGPT and Claude.

---

## 💻 Quickstart

### 1. Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 2. Production Build
```bash
npm run build
npm start
```
