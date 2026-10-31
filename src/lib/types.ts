// ============================================================================
// SALESPILOT AI / AUTOGTM RELATIONAL DATA MODEL & FLOW
// Follows the exact ERD architecture:
// AUTH_USERS -> ORGANIZATION_MEMBERS <- ORGANIZATIONS
// ORGANIZATIONS -> BUSINESS_PROFILES
// ORGANIZATIONS -> ICP_PROFILES
// ORGANIZATIONS -> COMPANIES -> CONTACTS
// ORGANIZATIONS -> CAMPAIGNS -> EMAIL_SEQUENCES
// CAMPAIGNS (includes) + CONTACTS (assigned) -> CAMPAIGN_LEADS -> EMAIL_MESSAGES
// ORGANIZATIONS -> REPLIES
// ORGANIZATIONS -> CREDIT_TRANSACTIONS
// ORGANIZATIONS -> SUBSCRIPTIONS
// ORGANIZATIONS -> INTEGRATIONS
// ============================================================================

export type UserRole = "OWNER" | "ADMIN" | "MEMBER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  creditBalance: number;
  plan: "FREE_TRIAL" | "PAY_AS_YOU_GO" | "DATA_PLATFORM";
  createdAt: string;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
}

export interface BusinessProfile {
  id: string;
  organizationId: string;
  websiteUrl: string;
  companyName: string;
  summary: string;
  valueProposition: string;
  offerHook: string;
  primaryIndustry: string;
  createdAt: string;
  updatedAt: string;
}

export interface IcpProfile {
  id: string;
  organizationId: string;
  name: string;
  targetIndustries: string[];
  headcountRanges: string[];
  targetLocations: string[];
  buyerPersonas: {
    title: string;
    seniority: string;
    painPoint: string;
  }[];
  exclusionKeywords: string[];
  isDefault: boolean;
  createdAt: string;
}

export interface Company {
  id: string;
  organizationId: string;
  name: string;
  domain: string;
  industry: string;
  category: string;
  headcount: string;
  employeesCount: number;
  revenueRange: string;
  city: string;
  state?: string;
  country: string;
  techStack: string[];
  description: string;
  googleMapsRating?: number;
  googleMapsReviews?: number;
  createdAt: string;
}

export interface Contact {
  id: string;
  companyId: string;
  name: string;
  title: string;
  email: string;
  isVerified: boolean;
  linkedinUrl?: string;
  phone?: string;
  createdAt: string;
}

export type CampaignStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED";

export interface Campaign {
  id: string;
  organizationId: string;
  icpProfileId?: string;
  name: string;
  status: CampaignStatus;
  dailySendLimit: number;
  sendStartTime: string; // e.g. "09:00"
  sendEndTime: string;   // e.g. "17:30"
  timezoneMatching: boolean;
  totalLeadsCount: number;
  sentCount: number;
  openedCount: number;
  repliedCount: number;
  meetingsBookedCount: number;
  createdAt: string;
}

export interface EmailSequence {
  id: string;
  campaignId: string;
  stepNumber: number; // 1, 2, 3
  stepType: "INITIAL_HOOK" | "VALUE_ADD" | "BREAKUP";
  delayDays: number;
  subjectTemplate: string;
  bodyTemplate: string;
  createdAt: string;
}

export type LeadOutreachStatus = "QUEUED" | "IN_PROGRESS" | "OPENED" | "REPLIED" | "BOOKED" | "BOUNCED" | "UNSUBSCRIBED";

export interface CampaignLead {
  id: string;
  campaignId: string;
  contactId: string;
  status: LeadOutreachStatus;
  currentStepNumber: number;
  customVariables?: Record<string, string>;
  lastSentAt?: string;
  nextStepDueAt?: string;
  assignedAt: string;
}

export type EmailDeliveryStatus = "QUEUED" | "SENT" | "DELIVERED" | "OPENED" | "BOUNCED" | "FAILED";

export interface EmailMessage {
  id: string;
  campaignLeadId: string;
  sequenceStepNumber: number;
  mailboxSender: string;
  recipientEmail: string;
  subject: string;
  body: string;
  status: EmailDeliveryStatus;
  sentAt?: string;
  openedAt?: string;
  openCount: number;
  createdAt: string;
}

export type ReplyIntent = "MEETING_REQUEST" | "INTERESTED" | "OBJECTION" | "NOT_INTERESTED" | "OUT_OF_OFFICE";

export interface Reply {
  id: string;
  organizationId: string;
  campaignLeadId?: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  body: string;
  intent: ReplyIntent;
  confidenceScore: number;
  suggestedAction: string;
  suggestedDraftReply: string;
  isAddressed: boolean;
  receivedAt: string;
}

export type TransactionType = "WELCOME_GRANT" | "EMAIL_DISPATCH_DEDUCTION" | "CREDIT_PURCHASE" | "DATA_EXPORT";

export interface CreditTransaction {
  id: string;
  organizationId: string;
  type: TransactionType;
  amountCredits: number;
  costUsd: number;
  description: string;
  balanceAfter: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planName: "Free Trial" | "Pay-As-You-Go" | "Enterprise Data";
  status: "ACTIVE" | "PAST_DUE" | "CANCELED";
  monthlyBasePrice: number;
  emailUnitCost: number; // e.g. 0.03
  creditAllowance: number;
  currentPeriodEnd: string;
}

export type IntegrationType = "CAL_COM" | "CALENDLY" | "MCP_API" | "SMARTLEAD" | "APOLLO" | "SLACK_WEBHOOK";

export interface Integration {
  id: string;
  organizationId: string;
  type: IntegrationType;
  name: string;
  status: "CONNECTED" | "DISCONNECTED";
  config: Record<string, any>;
  lastSyncedAt?: string;
  createdAt: string;
}
