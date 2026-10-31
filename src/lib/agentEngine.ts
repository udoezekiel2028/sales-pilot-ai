import { CompanyRecord, DecisionMaker } from "@/data/mockDatabase";

export interface CompanyICP {
  companyName: string;
  websiteUrl: string;
  summary: string;
  valueProposition: string;
  targetIndustries: string[];
  targetEmployeeSizes: string[];
  buyerPersonas: {
    title: string;
    seniority: string;
    painPoint: string;
  }[];
  offerHook: string;
  suggestedSubjectLines: string[];
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  step: number;
  type: "initial" | "value_add" | "breakup";
}

export interface InboundClassification {
  intent: "MEETING_REQUEST" | "INTERESTED" | "OBJECTION" | "NOT_INTERESTED" | "OUT_OF_OFFICE";
  confidence: number;
  suggestedAction: "AUTO_BOOK_CALENDAR" | "SEND_CASE_STUDY" | "HANDLE_OBJECTION" | "UNSUBSCRIBE" | "PAUSE";
  draftResponse: string;
  detectedPainPoint?: string;
}

/**
 * Autonomous URL Analyzer & ICP Generator
 * Simulates real-time web scraping + LLM extraction pipeline
 */
export async function analyzeCompanyUrl(url: string): Promise<CompanyICP> {
  // Normalize URL
  let cleanDomain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0].toLowerCase();

  // Synthetic deterministic extraction tailored to the input URL
  let companyName = cleanDomain.split(".")[0];
  companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);

  // Default intelligent profile
  return {
    companyName,
    websiteUrl: url.startsWith("http") ? url : `https://${url}`,
    summary: `${companyName} delivers specialized high-velocity B2B software solutions designed to streamline workflows, eliminate manual operational bottlenecks, and accelerate commercial growth.`,
    valueProposition: `Enabling modern revenue and operations teams to automate complex manual touchpoints, reduce customer acquisition cost, and scale without increasing headcount.`,
    targetIndustries: [
      "B2B SaaS & Cloud Software",
      "Financial Services & FinTech",
      "E-Commerce & DTC Brands",
      "High-Growth Technology Scaleups",
      "Professional & IT Services"
    ],
    targetEmployeeSizes: ["25-100", "101-500", "501-1,000"],
    buyerPersonas: [
      {
        title: "VP of Sales / Chief Revenue Officer (CRO)",
        seniority: "Executive",
        painPoint: "High SDR ramp times, low email reply rates, and wasted budget on legacy outbound databases."
      },
      {
        title: "Head of Growth / Demand Generation",
        seniority: "Director",
        painPoint: "Difficulty maintaining high lead volume while maintaining hyper-personalized messaging at scale."
      },
      {
        title: "Founder / CEO",
        seniority: "C-Level",
        painPoint: "Need predictable, scalable sales pipeline without hiring 5 additional full-time SDRs."
      }
    ],
    offerHook: `We helped similar companies in your space increase qualified pipeline by 3.4x in 45 days through autonomous AI outbound orchestration.`,
    suggestedSubjectLines: [
      `Quick question regarding {{companyName}}'s outbound pipeline`,
      `Scaling {{companyName}}'s sales pipeline without hiring SDRs`,
      `Idea for {{firstName}} & {{companyName}}`
    ]
  };
}

/**
 * Generates context-aware, personalized email sequence steps
 */
export function generatePersonalizedEmail(
  icp: CompanyICP,
  company: CompanyRecord,
  decisionMaker: DecisionMaker,
  stepNumber: number = 1,
  tone: "direct" | "consultative" | "casual" = "direct"
): GeneratedEmail {
  const firstName = decisionMaker.name.split(" ")[0];

  if (stepNumber === 1) {
    let subject = `Quick question regarding ${company.name}'s pipeline`;
    let body = `Hi ${firstName},

I noticed you're leading ${decisionMaker.title} at ${company.name}. Seeing your focus on ${company.industry}, I wanted to reach out directly.

Most teams in your space are struggling with low reply rates on cold outreach and the overhead of managing fragmented lead databases.

At ${icp.companyName}, ${icp.offerHook}

Would you be open to a quick 10-minute chat this Thursday at 2 PM or Friday morning to see how this fits into ${company.name}'s growth roadmap?

Best,
Alex Rivera
Founding Team | ${icp.companyName}`;

    return {
      subject,
      body,
      step: 1,
      type: "initial"
    };
  }

  if (stepNumber === 2) {
    let subject = `Re: Quick question regarding ${company.name}'s pipeline`;
    let body = `Hi ${firstName},

Following up on my note from earlier this week.

Thought you might find this interesting: we recently helped an organization with ${company.employeesCount} team members eliminate 80% of their manual prospecting hours while doubling booked demo conversion.

Here is a 2-minute breakdown of the framework: https://${icp.websiteUrl.replace(/https?:\/\//, "")}/case-study

Let me know if you'd like to benchmark your current numbers.

Best,
Alex Rivera`;

    return {
      subject,
      body,
      step: 2,
      type: "value_add"
    };
  }

  return {
    subject: `Closing the loop for ${company.name}`,
    body: `Hi ${firstName},

I know how busy your schedule is as ${decisionMaker.title}. I assume outbound pipeline optimization isn't a top priority for ${company.name} right now.

I'll step back and won't follow up further, but if your team ever needs an autonomous agent to handle B2B lead generation on autopilot, you can always check out ${icp.websiteUrl}.

Wishing you and the ${company.name} team continued success!

Best,
Alex Rivera`,
    step: 3,
    type: "breakup"
  };
}

/**
 * Autonomous Reply Classifier
 */
export function classifyInboundReply(replyText: string, calendarLink: string = "https://cal.com/outreach-team/15min"): InboundClassification {
  const text = replyText.toLowerCase();

  if (
    text.includes("book") ||
    text.includes("calendar") ||
    text.includes("available") ||
    text.includes("tuesday") ||
    text.includes("thursday") ||
    text.includes("schedule") ||
    text.includes("meet")
  ) {
    return {
      intent: "MEETING_REQUEST",
      confidence: 0.96,
      suggestedAction: "AUTO_BOOK_CALENDAR",
      draftResponse: `Hi there,\n\nFantastic, looking forward to connecting! You can grab whatever time works best directly on my calendar here:\n\n${calendarLink}\n\nTalk soon!`,
    };
  }

  if (
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("more info") ||
    text.includes("send over") ||
    text.includes("deck") ||
    text.includes("how does it work")
  ) {
    return {
      intent: "INTERESTED",
      confidence: 0.91,
      suggestedAction: "SEND_CASE_STUDY",
      draftResponse: `Hi there,\n\nThanks for getting back to me! Our pricing is completely pay-as-you-go (~$0.03 per verified send) with no lock-in contracts.\n\nI've attached our 1-pager summary. Would you have 10 minutes next week to see a live 2-minute walkthrough? Here's my calendar: ${calendarLink}`,
    };
  }

  if (
    text.includes("already using") ||
    text.includes("competitor") ||
    text.includes("not right now") ||
    text.includes("budget") ||
    text.includes("next quarter")
  ) {
    return {
      intent: "OBJECTION",
      confidence: 0.88,
      suggestedAction: "HANDLE_OBJECTION",
      draftResponse: `Completely understand—timing and existing commitments are everything. If it makes sense, I'll follow up at the start of next quarter to check in. Best of luck with current initiatives!`,
      detectedPainPoint: "Timing / Existing Tool Vendor"
    };
  }

  if (
    text.includes("out of office") ||
    text.includes("vacation") ||
    text.includes("annual leave") ||
    text.includes("returning on")
  ) {
    return {
      intent: "OUT_OF_OFFICE",
      confidence: 0.98,
      suggestedAction: "PAUSE",
      draftResponse: `[Auto-paused until contact returns]`,
    };
  }

  return {
    intent: "NOT_INTERESTED",
    confidence: 0.94,
    suggestedAction: "UNSUBSCRIBE",
    draftResponse: `Understood! You've been removed from all future communications. Have a great quarter ahead!`,
  };
}
