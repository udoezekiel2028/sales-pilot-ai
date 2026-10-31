// ============================================================================
// SIX SPECIALIZED AI AGENTS: STRICT INPUT & OUTPUT SCHEMAS
// Enforces structured JSON communication, validated boundaries, and approval gates.
// ============================================================================

// ----------------------------------------------------------------------------
// AGENT 01: Business Intelligence Agent (Business Analyst)
// ----------------------------------------------------------------------------
export interface BusinessAnalystInput {
  websiteUrl: string;
  businessDescription?: string;
}

export interface ServiceProductItem {
  name: string;
  category: string;
  description: string;
}

export interface CustomerSegmentRecommendation {
  segmentName: string;
  priorityScore: number; // 1-100
  rationalization: string;
  typicalHeadcount: string;
  keyPainPoint: string;
}

export interface TargetBuyerPersona {
  title: string;
  seniority: string;
  department: string;
  corePainPoint: string;
  buyingTrigger: string;
}

export interface IcpDetailedSpecification {
  targetBuyerPersonas: TargetBuyerPersona[];
  targetCompanyIndustries: string[];
  headcountBrackets: string[];
  revenueBrackets: string[];
  geographicFocus: string[];
  techStackSignals: string[];
  corePainPointsSolved: string[];
  recommendedPitchHook: string;
}

export interface BusinessProfileOutput {
  companyName: string;
  websiteUrl: string;
  businessModel: string;
  executiveSummary: string;
  coreServices: ServiceProductItem[];
  valueProposition: string;
  targetMarketDefinition: string;
  suggestedSegments: CustomerSegmentRecommendation[];
  offerAngle: string;
  confidenceScore: number;
  icpSpecification: IcpDetailedSpecification;
}

// ----------------------------------------------------------------------------
// AGENT 02: Lead Discovery Agent (Prospecting)
// ----------------------------------------------------------------------------
export interface LeadDiscoveryInput {
  icp: {
    targetIndustries: string[];
    headcountRanges: string[];
    targetLocations: string[];
    targetRoles: string[];
  };
  searchFilters?: {
    techStackKeywords?: string[];
    minRevenue?: string;
    excludeDomains?: string[];
    limit?: number;
  };
}

export interface DiscoveredContact {
  contactId: string;
  name: string;
  title: string;
  email: string;
  isVerifiedEmail: boolean;
  hasMissingInfo: boolean;
  missingFields: string[];
  linkedinUrl?: string;
}

export interface QualifiedCompanyProspect {
  companyId: string;
  name: string;
  domain: string;
  industry: string;
  headcount: string;
  location: string;
  techStack: string[];
  contacts: DiscoveredContact[];
  relevanceScore: number; // 1-100
}

export interface LeadDiscoveryOutput {
  totalRawFound: number;
  duplicatesRemoved: number;
  missingInfoFlagged: number;
  qualifiedCompanies: QualifiedCompanyProspect[];
  generatedProviderFilters: Record<string, any>;
}

// ----------------------------------------------------------------------------
// AGENT 03: Lead Research Agent (Research)
// ----------------------------------------------------------------------------
export interface LeadResearchInput {
  company: QualifiedCompanyProspect;
  userBusinessProfile: BusinessProfileOutput;
}

export interface VerifiableSignal {
  signalType: "TECH_STACK" | "HIRING_SURGE" | "REVENUE_EVENT" | "COMPLIANCE_NEED" | "MARKET_EXPANSION";
  headline: string;
  detail: string;
  evidenceSource: string; // URL / record
  detectedAt: string;
}

export interface CompanyResearchSummary {
  companyId: string;
  domain: string;
  operatingContext: string;
  primaryBusinessModel: string;
  verifiableSignals: VerifiableSignal[];
  needHypothesis: string; // "Why they need the user's service"
  sourceLinks: string[];
  fitScore: number; // 1-100
}

export interface LeadResearchOutput {
  researchedAccounts: CompanyResearchSummary[];
}

// ----------------------------------------------------------------------------
// AGENT 04: Outreach Agent (Copywriting)
// ----------------------------------------------------------------------------
export interface OutreachCopywritingInput {
  company: QualifiedCompanyProspect;
  contact: DiscoveredContact;
  research: CompanyResearchSummary;
  userBusinessProfile: BusinessProfileOutput;
  toneStyle: "direct" | "consultative" | "casual" | "executive";
}

export interface EmailDraftStep {
  stepNumber: number;
  stepType: "INITIAL_HOOK" | "VALUE_ADD" | "BREAKUP";
  delayDays: number;
  subjectLine: string;
  personalizedOpeningLine: string;
  body: string;
  callToAction: string;
  referencedSignal: string;
}

export interface OutreachDraftPackage {
  companyId: string;
  companyName: string;
  contactId: string;
  contactName: string;
  contactEmail: string;
  contactTitle: string;
  emailSteps: EmailDraftStep[];
  // EXPLICIT HUMAN-IN-THE-LOOP SAFEGUARD
  approvalStatus: "PENDING_USER_REVIEW" | "APPROVED" | "REJECTED" | "EDITED";
  userEditedNotes?: string;
  approvedAt?: string;
}

export interface OutreachCopywritingOutput {
  draftPackages: OutreachDraftPackage[];
  totalDraftsGenerated: number;
  requiresUserApproval: true;
}

// ----------------------------------------------------------------------------
// AGENT 05: Sales Conversation Agent (Conversation)
// ----------------------------------------------------------------------------
export interface SalesConversationInput {
  inboundEmail: {
    messageId: string;
    senderEmail: string;
    senderName: string;
    subject: string;
    body: string;
    receivedAt: string;
  };
  conversationHistory?: { role: "agent" | "prospect"; text: string }[];
  calendarBookingUrl?: string;
}

export type DetectedReplyIntent =
  | "MEETING_REQUEST"
  | "INTERESTED_MORE_INFO"
  | "OBJECTION_TIMING"
  | "OBJECTION_COMPETITOR"
  | "OBJECTION_BUDGET"
  | "NOT_INTERESTED"
  | "OUT_OF_OFFICE"
  | "UNSUBSCRIBE";

export interface SalesConversationOutput {
  messageId: string;
  classifiedIntent: DetectedReplyIntent;
  confidenceScore: number;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  isUnsubscribeRequest: boolean;
  recommendedAction: "AUTO_REPLY_WITH_CALENDAR" | "SEND_COLLATERAL" | "PAUSE_SEQUENCE" | "UNSUBSCRIBE_AND_PURGE";
  suggestedResponse: string;
  requiresHumanReview: boolean;
}

// ----------------------------------------------------------------------------
// AGENT 06: Campaign Intelligence Agent (Optimization)
// ----------------------------------------------------------------------------
export interface CampaignPerformanceInput {
  campaignId: string;
  campaignName: string;
  metrics: {
    totalSent: number;
    deliveredCount: number;
    openedCount: number;
    repliedCount: number;
    meetingsBookedCount: number;
    bouncedCount: number;
    unsubscribedCount: number;
  };
  stepBreakdown: {
    stepNumber: number;
    subjectLine: string;
    sent: number;
    opened: number;
    replied: number;
  }[];
  segmentBreakdown: {
    segmentName: string;
    sent: number;
    replied: number;
    booked: number;
  }[];
}

export interface ActionableCampaignInsight {
  category: "SUBJECT_LINE" | "SENDING_TIME" | "ICP_TARGETING" | "OBJECTION_TREND";
  severity: "CRITICAL" | "WARNING" | "OPPORTUNITY";
  title: string;
  observation: string;
  actionableRecommendation: string;
}

export interface CampaignIntelligenceOutput {
  campaignId: string;
  overallHealthScore: number; // 0 - 100
  underperformingMessages: {
    stepNumber: number;
    subjectLine: string;
    issue: string;
    suggestedReplacement: string;
  }[];
  icpSegmentComparison: {
    topPerformingSegment: string;
    weakestSegment: string;
    efficiencyDifferential: string;
  };
  actionableInsights: ActionableCampaignInsight[];
  recommendedCampaignAdjustments: string[];
}

// ----------------------------------------------------------------------------
// COMPLETE ORCHESTRATION PIPELINE STATE
// ----------------------------------------------------------------------------
export type OrchestratorStage =
  | "IDLE"
  | "AGENT_01_ANALYZING_BUSINESS"
  | "AGENT_02_DISCOVERING_PROSPECTS"
  | "AGENT_03_RESEARCHING_LEADS"
  | "AGENT_04_DRAFTING_OUTREACH"
  | "AWAITING_USER_APPROVAL"      // EXPLICIT HUMAN-IN-THE-LOOP GATE
  | "CAMPAIGN_APPROVED_READY"
  | "AGENT_05_TRIAGING_REPLIES"
  | "AGENT_06_OPTIMIZING_CAMPAIGN";

export interface PipelineExecutionState {
  id: string;
  stage: OrchestratorStage;
  businessProfile?: BusinessProfileOutput;
  discoveryResults?: LeadDiscoveryOutput;
  researchResults?: LeadResearchOutput;
  draftPackages?: OutreachDraftPackage[];
  conversationTriages?: SalesConversationOutput[];
  campaignInsights?: CampaignIntelligenceOutput;
  userApprovedCount: number;
  createdAt: string;
  updatedAt: string;
}
