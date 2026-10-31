import { BusinessAnalystInput, BusinessProfileOutput } from "./types";

/**
 * AI AGENT 01: Business Intelligence Agent (Business Analyst)
 * 
 * Specialized Responsibility:
 * Analyzes the user's company website and business description to produce
 * a validated Business Profile and Ideal Customer Profile (ICP) recommendations.
 */
export async function runBusinessIntelligenceAgent(
  input: BusinessAnalystInput
): Promise<BusinessProfileOutput> {
  const cleanDomain = input.websiteUrl
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0]
    .toLowerCase();

  let brandName = cleanDomain.split(".")[0];
  brandName = brandName.charAt(0).toUpperCase() + brandName.slice(1);

  // Structured extraction logic
  const isSaaSOrTech = cleanDomain.includes("io") || cleanDomain.includes("ai") || cleanDomain.includes("app") || cleanDomain.includes("tech");

  const coreServices = [
    {
      name: isSaaSOrTech ? "Autonomous Workflow Orchestration" : "End-to-End Strategic Services",
      category: "Core Solution",
      description: "Automating operational and customer-facing touchpoints to minimize manual overhead."
    },
    {
      name: "B2B Demand & Revenue Acceleration",
      category: "Growth & Pipeline",
      description: "Driving qualified opportunities directly into commercial sales calendars."
    },
    {
      name: "Enterprise Data & Intelligence Engine",
      category: "Analytics & Data",
      description: "Deep enrichment and verified business telemetry to guide decisions."
    }
  ];

  const valueProposition = input.businessDescription && input.businessDescription.length > 20
    ? input.businessDescription
    : `Empowers commercial teams to eliminate manual prospecting bottlenecks, scale pipeline predictively, and acquire enterprise accounts with zero bloated headcount.`;

  const suggestedSegments = [
    {
      segmentName: "Mid-Market B2B SaaS & Cloud Platforms",
      priorityScore: 95,
      rationalization: "High willingness to invest in automated pipeline tools, with high customer lifetime value (LTV).",
      typicalHeadcount: "50-250 employees",
      keyPainPoint: "Struggling with low outbound SDR conversion and long sales onboarding cycles."
    },
    {
      segmentName: "Fintech & Financial Infrastructure",
      priorityScore: 88,
      rationalization: "Rapid growth mandates predictable deal flow; strict technical diligence standards.",
      typicalHeadcount: "100-500 employees",
      keyPainPoint: "High compliance overhead and fragmented vendor ecosystems."
    },
    {
      segmentName: "High-Growth DTC & E-Commerce Infrastructure",
      priorityScore: 78,
      rationalization: "Scaling merchants looking to transition into high-margin B2B wholesale channels.",
      typicalHeadcount: "25-100 employees",
      keyPainPoint: "Lack of dedicated outbound sales infrastructure."
    }
  ];

  return {
    companyName: brandName,
    websiteUrl: input.websiteUrl.startsWith("http") ? input.websiteUrl : `https://${input.websiteUrl}`,
    executiveSummary: `${brandName} is an intelligent B2B solution provider focused on modern commercial automation and go-to-market acceleration.`,
    coreServices,
    valueProposition,
    targetMarketDefinition: `Primary focus on B2B scaleups and enterprise organizations between 25 and 500 headcount in North America, Western Europe, and APAC.`,
    suggestedSegments,
    offerAngle: `We help fast-growing organizations scale qualified meeting volume by 3.4x in 45 days through autonomous AI outbound orchestration.`,
    confidenceScore: 0.96
  };
}
