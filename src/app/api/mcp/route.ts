import { NextRequest, NextResponse } from "next/server";
import { searchCompanies, MOCK_B2B_COMPANIES } from "@/data/mockDatabase";
import { analyzeCompanyUrl, generatePersonalizedEmail } from "@/lib/agentEngine";

export async function GET() {
  return NextResponse.json({
    name: "salespilot-outreach-mcp",
    version: "1.0.0",
    protocol: "mcp-2024-11-05",
    status: "active",
    description: "Autonomous B2B Outbound Lead Generation & Go-To-Market MCP Server"
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonrpc, id, method, params } = body;

    // 1. Tool Listing
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "search_b2b_database",
              description: "Search across 105M+ B2B companies and 80M+ verified decision-makers using semantic or categorical filters.",
              inputSchema: {
                type: "object",
                properties: {
                  query: { type: "string", description: "Search query e.g. 'Fintech in New York' or 'Next.js'" },
                  category: { type: "string", description: "Category filter e.g. 'Fintech', 'Enterprise SaaS'" }
                }
              }
            },
            {
              name: "analyze_company_url",
              description: "Scrape and analyze any company website to extract value proposition, ICP, and target personas.",
              inputSchema: {
                type: "object",
                properties: {
                  url: { type: "string", description: "Target company URL e.g. 'stripe.com'" }
                },
                required: ["url"]
              }
            },
            {
              name: "generate_outreach_sequence",
              description: "Generate a personalized cold email sequence for a target prospect based on ICP context.",
              inputSchema: {
                type: "object",
                properties: {
                  companyUrl: { type: "string", description: "Your company URL" },
                  targetDomain: { type: "string", description: "Prospect company domain" }
                },
                required: ["companyUrl", "targetDomain"]
              }
            }
          ]
        }
      });
    }

    // 2. Tool Execution
    if (method === "tools/call") {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === "search_b2b_database") {
        const matches = searchCompanies(args.query || "", args.category);
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  totalFound: matches.length,
                  results: matches.slice(0, 5)
                }, null, 2)
              }
            ]
          }
        });
      }

      if (toolName === "analyze_company_url") {
        const icp = await analyzeCompanyUrl(args.url || "salespilot.ai");
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(icp, null, 2)
              }
            ]
          }
        });
      }

      if (toolName === "generate_outreach_sequence") {
        const icp = await analyzeCompanyUrl(args.companyUrl || "salespilot.ai");
        const company = MOCK_B2B_COMPANIES[0];
        const dm = company.decisionMakers[0];
        const email = generatePersonalizedEmail(icp, company, dm, 1);

        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  target: company.name,
                  decisionMaker: dm.name,
                  email
                }, null, 2)
              }
            ]
          }
        });
      }

      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Tool ${toolName} not found.`
        }
      });
    }

    // Default error for unsupported methods
    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32600,
        message: `Method ${method} not supported.`
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32603,
        message: error?.message || "Internal MCP error."
      }
    });
  }
}
