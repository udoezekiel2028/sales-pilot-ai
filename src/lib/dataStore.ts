import {
  AuthUser,
  Organization,
  OrganizationMember,
  BusinessProfile,
  IcpProfile,
  Company,
  Contact,
  Campaign,
  EmailSequence,
  CampaignLead,
  EmailMessage,
  Reply,
  CreditTransaction,
  Subscription,
  Integration
} from "./types";

// ============================================================================
// SINGLE SOURCE OF TRUTH (RELATIONAL STATE STORE)
// Matches the user's uploaded ERD flow exactly
// ============================================================================

export const DEFAULT_USER: AuthUser = {
  id: "usr_alex_01",
  email: "alex@brilliantcraft.io",
  name: "Alex Rivera",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  createdAt: "2026-10-15T08:00:00Z"
};

export const DEFAULT_ORG: Organization = {
  id: "org_bc_901",
  name: "Brilliantcraft Outbound",
  slug: "brilliantcraft",
  creditBalance: 24.60,
  plan: "FREE_TRIAL",
  createdAt: "2026-10-15T08:05:00Z"
};

export const DEFAULT_ORG_MEMBER: OrganizationMember = {
  id: "mem_01",
  organizationId: DEFAULT_ORG.id,
  userId: DEFAULT_USER.id,
  role: "OWNER",
  joinedAt: "2026-10-15T08:05:00Z"
};

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  id: "bp_01",
  organizationId: DEFAULT_ORG.id,
  websiteUrl: "https://brilliantcraft.io",
  companyName: "Brilliantcraft",
  summary: "Intelligent autonomous software and revenue operations platform for modern B2B organizations.",
  valueProposition: "Enables fast-growing teams to automate manual outbound touchpoints, multiply qualified pipeline, and scale without increasing SDR headcount.",
  offerHook: "We helped similar companies in your space increase qualified pipeline by 3.4x in 45 days through autonomous AI outbound orchestration.",
  primaryIndustry: "B2B SaaS & Cloud Software",
  createdAt: "2026-10-15T08:10:00Z",
  updatedAt: "2026-10-31T06:00:00Z"
};

export const INITIAL_ICP_PROFILE: IcpProfile = {
  id: "icp_01",
  organizationId: DEFAULT_ORG.id,
  name: "Growth-Stage SaaS & FinTech (Series A-C)",
  targetIndustries: [
    "Financial Technology (Fintech)",
    "B2B SaaS & Cloud Platforms",
    "Cybersecurity & DevSecOps",
    "Healthcare IT"
  ],
  headcountRanges: ["25-100", "101-500"],
  targetLocations: ["United States", "United Kingdom", "Germany", "Sweden"],
  buyerPersonas: [
    {
      title: "VP of Sales / Chief Revenue Officer (CRO)",
      seniority: "Executive",
      painPoint: "High SDR ramp times, low email reply rates, and overhead of fragmented lead databases."
    },
    {
      title: "Head of Growth & Demand Generation",
      seniority: "Director",
      painPoint: "Difficulty maintaining high lead volume while maintaining hyper-personalized messaging at scale."
    },
    {
      title: "Founder & CEO",
      seniority: "C-Level",
      painPoint: "Need predictable sales pipeline without hiring 5 additional full-time SDRs."
    }
  ],
  exclusionKeywords: ["agency", "recruiting", "non-profit"],
  isDefault: true,
  createdAt: "2026-10-15T08:15:00Z"
};

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "comp_1",
    organizationId: DEFAULT_ORG.id,
    name: "FinFlow Systems",
    domain: "finflow.io",
    industry: "Financial Technology",
    category: "Fintech",
    headcount: "50-200",
    employeesCount: 142,
    revenueRange: "$10M - $25M",
    city: "New York",
    state: "NY",
    country: "United States",
    techStack: ["Next.js", "Stripe", "PostgreSQL", "AWS", "Segment"],
    description: "Automated billing and revenue recognition API for fast-growing SaaS startups.",
    createdAt: "2026-10-16T10:00:00Z"
  },
  {
    id: "comp_2",
    organizationId: DEFAULT_ORG.id,
    name: "AetherOps AI",
    domain: "aetherops.ai",
    industry: "DevOps & Cloud Infrastructure",
    category: "AI & Cloud",
    headcount: "11-50",
    employeesCount: 38,
    revenueRange: "$3M - $8M",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    techStack: ["Kubernetes", "Datadog", "OpenAI API", "Python", "GCP"],
    description: "Autonomous cloud infrastructure cost optimizer and anomaly detection agent.",
    createdAt: "2026-10-16T10:00:00Z"
  },
  {
    id: "comp_3",
    organizationId: DEFAULT_ORG.id,
    name: "ScaleForge Logistics",
    domain: "scaleforge.com",
    industry: "Supply Chain & Logistics",
    category: "Enterprise SaaS",
    headcount: "201-500",
    employeesCount: 310,
    revenueRange: "$25M - $50M",
    city: "Chicago",
    state: "IL",
    country: "United States",
    techStack: ["Salesforce", "HubSpot", "React", "Azure", "Snowflake"],
    description: "Real-time freight visibility and intelligent dispatching platform for nationwide carriers.",
    createdAt: "2026-10-16T10:00:00Z"
  },
  {
    id: "comp_4",
    organizationId: DEFAULT_ORG.id,
    name: "CipherGuard Labs",
    domain: "cipherguard.io",
    industry: "Information Security",
    category: "Cybersecurity",
    headcount: "50-200",
    employeesCount: 165,
    revenueRange: "$15M - $30M",
    city: "London",
    country: "United Kingdom",
    techStack: ["Golang", "Wasm", "AWS", "Splunk", "Tailscale"],
    description: "Zero-trust identity governance and API behavioral attack prevention.",
    createdAt: "2026-10-16T10:00:00Z"
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: "cont_1",
    companyId: "comp_1",
    name: "Elena Rostova",
    title: "Chief Executive Officer",
    email: "elena@finflow.io",
    isVerified: true,
    linkedinUrl: "https://linkedin.com/in/elenarostova",
    createdAt: "2026-10-16T10:05:00Z"
  },
  {
    id: "cont_2",
    companyId: "comp_1",
    name: "Marcus Vance",
    title: "VP of Sales & Growth",
    email: "marcus.vance@finflow.io",
    isVerified: true,
    linkedinUrl: "https://linkedin.com/in/marcusvance",
    createdAt: "2026-10-16T10:05:00Z"
  },
  {
    id: "cont_3",
    companyId: "comp_2",
    name: "David Chen",
    title: "Co-Founder & CTO",
    email: "david@aetherops.ai",
    isVerified: true,
    linkedinUrl: "https://linkedin.com/in/davidchentech",
    createdAt: "2026-10-16T10:05:00Z"
  },
  {
    id: "cont_4",
    companyId: "comp_3",
    name: "Robert MacIntyre",
    title: "Chief Commercial Officer",
    email: "robert.m@scaleforge.com",
    isVerified: true,
    linkedinUrl: "https://linkedin.com/in/robertmacintyre",
    createdAt: "2026-10-16T10:05:00Z"
  },
  {
    id: "cont_5",
    companyId: "comp_4",
    name: "Julian Thorne",
    title: "VP of Enterprise Sales",
    email: "julian@cipherguard.io",
    isVerified: true,
    linkedinUrl: "https://linkedin.com/in/julianthorne",
    createdAt: "2026-10-16T10:05:00Z"
  }
];

export const INITIAL_CAMPAIGN: Campaign = {
  id: "camp_01",
  organizationId: DEFAULT_ORG.id,
  icpProfileId: INITIAL_ICP_PROFILE.id,
  name: "Q1 Autonomous Outbound - SaaS & FinTech",
  status: "ACTIVE",
  dailySendLimit: 50,
  sendStartTime: "09:00",
  sendEndTime: "17:30",
  timezoneMatching: true,
  totalLeadsCount: 5,
  sentCount: 5,
  openedCount: 4,
  repliedCount: 3,
  meetingsBookedCount: 1,
  createdAt: "2026-10-20T09:00:00Z"
};

export const INITIAL_EMAIL_SEQUENCES: EmailSequence[] = [
  {
    id: "seq_step_1",
    campaignId: INITIAL_CAMPAIGN.id,
    stepNumber: 1,
    stepType: "INITIAL_HOOK",
    delayDays: 0,
    subjectTemplate: "Quick question regarding {{companyName}}'s outbound pipeline",
    bodyTemplate: `Hi {{firstName}},

I noticed you're leading {{title}} at {{companyName}}. Seeing your focus on {{industry}}, I wanted to reach out directly.

Most teams in your space are struggling with low reply rates on cold outreach and the overhead of managing fragmented lead databases.

At {{businessName}}, {{offerHook}}

Would you be open to a quick 10-minute chat this Thursday at 2 PM or Friday morning to see how this fits into {{companyName}}'s growth roadmap?

Best,
Alex Rivera
Founding Team | {{businessName}}`,
    createdAt: "2026-10-20T09:05:00Z"
  },
  {
    id: "seq_step_2",
    campaignId: INITIAL_CAMPAIGN.id,
    stepNumber: 2,
    stepType: "VALUE_ADD",
    delayDays: 3,
    subjectTemplate: "Re: Quick question regarding {{companyName}}'s outbound pipeline",
    bodyTemplate: `Hi {{firstName}},

Following up on my note from earlier this week.

Thought you might find this interesting: we recently helped an organization with {{employeeCount}} team members eliminate 80% of their manual prospecting hours while doubling booked demo conversion.

Here is a 2-minute breakdown of the framework: https://brilliantcraft.io/case-study

Let me know if you'd like to benchmark your current numbers.

Best,
Alex Rivera`,
    createdAt: "2026-10-20T09:05:00Z"
  },
  {
    id: "seq_step_3",
    campaignId: INITIAL_CAMPAIGN.id,
    stepNumber: 3,
    stepType: "BREAKUP",
    delayDays: 5,
    subjectTemplate: "Closing the loop for {{companyName}}",
    bodyTemplate: `Hi {{firstName}},

I know how busy your schedule is as {{title}}. I assume outbound pipeline optimization isn't a top priority for {{companyName}} right now.

I'll step back and won't follow up further, but if your team ever needs an autonomous agent to handle B2B lead generation on autopilot, you can always check out brilliantcraft.io.

Wishing you and the {{companyName}} team continued success!

Best,
Alex Rivera`,
    createdAt: "2026-10-20T09:05:00Z"
  }
];

export const INITIAL_CAMPAIGN_LEADS: CampaignLead[] = [
  {
    id: "lead_1",
    campaignId: INITIAL_CAMPAIGN.id,
    contactId: "cont_1", // Elena Rostova
    status: "BOOKED",
    currentStepNumber: 1,
    lastSentAt: "2026-10-31T06:00:00Z",
    assignedAt: "2026-10-20T09:30:00Z"
  },
  {
    id: "lead_2",
    campaignId: INITIAL_CAMPAIGN.id,
    contactId: "cont_3", // David Chen
    status: "REPLIED",
    currentStepNumber: 1,
    lastSentAt: "2026-10-31T05:30:00Z",
    assignedAt: "2026-10-20T09:30:00Z"
  },
  {
    id: "lead_3",
    campaignId: INITIAL_CAMPAIGN.id,
    contactId: "cont_4", // Robert MacIntyre
    status: "REPLIED",
    currentStepNumber: 1,
    lastSentAt: "2026-10-30T14:00:00Z",
    assignedAt: "2026-10-20T09:30:00Z"
  },
  {
    id: "lead_4",
    campaignId: INITIAL_CAMPAIGN.id,
    contactId: "cont_5", // Julian Thorne
    status: "IN_PROGRESS",
    currentStepNumber: 2,
    lastSentAt: "2026-10-31T06:15:00Z",
    nextStepDueAt: "2026-11-05T09:00:00Z",
    assignedAt: "2026-10-20T09:30:00Z"
  },
  {
    id: "lead_5",
    campaignId: INITIAL_CAMPAIGN.id,
    contactId: "cont_2", // Marcus Vance
    status: "OPENED",
    currentStepNumber: 1,
    lastSentAt: "2026-10-31T06:30:00Z",
    nextStepDueAt: "2026-11-03T09:00:00Z",
    assignedAt: "2026-10-20T09:30:00Z"
  }
];

export const INITIAL_EMAIL_MESSAGES: EmailMessage[] = [
  {
    id: "msg_1",
    campaignLeadId: "lead_1",
    sequenceStepNumber: 1,
    mailboxSender: "alex.r@growth-outreach01.salespilot.net",
    recipientEmail: "elena@finflow.io",
    subject: "Quick question regarding FinFlow Systems' outbound pipeline",
    body: "Hi Elena,\n\nI noticed you're leading Chief Executive Officer at FinFlow Systems...",
    status: "DELIVERED",
    sentAt: "2026-10-31T06:00:00Z",
    openedAt: "2026-10-31T06:04:00Z",
    openCount: 2,
    createdAt: "2026-10-31T06:00:00Z"
  },
  {
    id: "msg_2",
    campaignLeadId: "lead_2",
    sequenceStepNumber: 1,
    mailboxSender: "alex.r@growth-outreach01.salespilot.net",
    recipientEmail: "david@aetherops.ai",
    subject: "Quick question regarding AetherOps AI's outbound pipeline",
    body: "Hi David,\n\nI noticed you're leading Co-Founder & CTO at AetherOps AI...",
    status: "DELIVERED",
    sentAt: "2026-10-31T05:30:00Z",
    openedAt: "2026-10-31T05:42:00Z",
    openCount: 1,
    createdAt: "2026-10-31T05:30:00Z"
  },
  {
    id: "msg_3",
    campaignLeadId: "lead_3",
    sequenceStepNumber: 1,
    mailboxSender: "team@dispatch-scale02.salespilot.net",
    recipientEmail: "robert.m@scaleforge.com",
    subject: "Quick question regarding ScaleForge Logistics' outbound pipeline",
    body: "Hi Robert,\n\nI noticed you're leading Chief Commercial Officer at ScaleForge Logistics...",
    status: "DELIVERED",
    sentAt: "2026-10-30T14:00:00Z",
    openedAt: "2026-10-30T14:22:00Z",
    openCount: 3,
    createdAt: "2026-10-30T14:00:00Z"
  }
];

export const INITIAL_REPLIES: Reply[] = [
  {
    id: "rep_1",
    organizationId: DEFAULT_ORG.id,
    campaignLeadId: "lead_1",
    fromEmail: "elena@finflow.io",
    fromName: "Elena Rostova",
    subject: "Re: Quick question regarding FinFlow Systems' outbound pipeline",
    body: "Hi Alex, thanks for reaching out. Yes, we're currently re-evaluating our outbound pipeline for Q1. Are you available this Thursday afternoon to hop on a quick 15-minute zoom?",
    intent: "MEETING_REQUEST",
    confidenceScore: 0.98,
    suggestedAction: "AUTO_BOOK_CALENDAR",
    suggestedDraftReply: "Hi Elena,\n\nFantastic, looking forward to connecting! You can grab whatever time works best directly on my calendar here:\n\nhttps://cal.com/outreach-team/15min\n\nTalk soon!",
    isAddressed: true,
    receivedAt: "2026-10-31T06:10:00Z"
  },
  {
    id: "rep_2",
    organizationId: DEFAULT_ORG.id,
    campaignLeadId: "lead_2",
    fromEmail: "david@aetherops.ai",
    fromName: "David Chen",
    subject: "Re: Quick question regarding AetherOps AI's outbound pipeline",
    body: "Interesting concept. How does your pay-as-you-go model work compared to paying per seat? Do you have a 1-pager or pricing breakdown you can send over?",
    intent: "INTERESTED",
    confidenceScore: 0.91,
    suggestedAction: "SEND_CASE_STUDY",
    suggestedDraftReply: "Hi David,\n\nThanks for getting back to me! Our pricing is completely pay-as-you-go (~$0.03 per verified send) with no lock-in contracts.\n\nI've attached our 1-pager summary. Would you have 10 minutes next week to see a live 2-minute walkthrough? Here's my calendar: https://cal.com/outreach-team/15min",
    isAddressed: false,
    receivedAt: "2026-10-31T05:48:00Z"
  },
  {
    id: "rep_3",
    organizationId: DEFAULT_ORG.id,
    campaignLeadId: "lead_3",
    fromEmail: "robert.m@scaleforge.com",
    fromName: "Robert MacIntyre",
    subject: "Re: Quick question regarding ScaleForge Logistics' outbound pipeline",
    body: "We are currently under contract with Apollo and ZoomInfo until the end of this year. Maybe reach back out in November.",
    intent: "OBJECTION",
    confidenceScore: 0.88,
    suggestedAction: "HANDLE_OBJECTION",
    suggestedDraftReply: "Completely understand, Robert! Timing and existing commitments are everything. If it makes sense, I'll follow up at the start of November. Best of luck with current initiatives!",
    isAddressed: false,
    receivedAt: "2026-10-30T15:12:00Z"
  }
];

export const INITIAL_CREDIT_TRANSACTIONS: CreditTransaction[] = [
  {
    id: "tx_1",
    organizationId: DEFAULT_ORG.id,
    type: "WELCOME_GRANT",
    amountCredits: 1000,
    costUsd: 30.00,
    description: "Welcome Free Trial Grant (750-1000 sends)",
    balanceAfter: 30.00,
    createdAt: "2026-10-15T08:05:00Z"
  },
  {
    id: "tx_2",
    organizationId: DEFAULT_ORG.id,
    type: "EMAIL_DISPATCH_DEDUCTION",
    amountCredits: -164,
    costUsd: -5.40,
    description: "Autonomous Sequence Dispatches (164 emails)",
    balanceAfter: 24.60,
    createdAt: "2026-10-31T06:30:00Z"
  }
];

export const INITIAL_SUBSCRIPTION: Subscription = {
  id: "sub_01",
  organizationId: DEFAULT_ORG.id,
  planName: "Free Trial",
  status: "ACTIVE",
  monthlyBasePrice: 0,
  emailUnitCost: 0.033,
  creditAllowance: 1000,
  currentPeriodEnd: "2026-11-30T23:59:59Z"
};

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "int_1",
    organizationId: DEFAULT_ORG.id,
    type: "CAL_COM",
    name: "Cal.com Scheduling Route",
    status: "CONNECTED",
    config: {
      bookingUrl: "https://cal.com/outreach-team/15min",
      autoIncludeInReplies: true
    },
    lastSyncedAt: "2026-10-31T06:00:00Z",
    createdAt: "2026-10-15T08:30:00Z"
  },
  {
    id: "int_2",
    organizationId: DEFAULT_ORG.id,
    type: "MCP_API",
    name: "Model Context Protocol Endpoint",
    status: "CONNECTED",
    config: {
      token: "exp_live_9a8f27b4e1c50d8823",
      allowedTools: ["search_b2b_database", "analyze_company_url", "generate_outreach_sequence"]
    },
    lastSyncedAt: "2026-10-31T06:15:00Z",
    createdAt: "2026-10-15T08:35:00Z"
  },
  {
    id: "int_3",
    organizationId: DEFAULT_ORG.id,
    type: "SMARTLEAD",
    name: "Managed Mailbox Pool",
    status: "CONNECTED",
    config: {
      mailboxesCount: 3,
      domainPool: ["growth-outreach01.salespilot.net", "dispatch-scale02.salespilot.net", "gtm-engine03.salespilot.net"],
      warmupHealthScore: "100%"
    },
    lastSyncedAt: "2026-10-31T06:30:00Z",
    createdAt: "2026-10-15T08:40:00Z"
  }
];

// In-Memory Relational State Instance
class RelationalStore {
  user: AuthUser = DEFAULT_USER;
  organization: Organization = DEFAULT_ORG;
  member: OrganizationMember = DEFAULT_ORG_MEMBER;
  businessProfile: BusinessProfile = INITIAL_BUSINESS_PROFILE;
  icpProfiles: IcpProfile[] = [INITIAL_ICP_PROFILE];
  companies: Company[] = [...INITIAL_COMPANIES];
  contacts: Contact[] = [...INITIAL_CONTACTS];
  campaigns: Campaign[] = [INITIAL_CAMPAIGN];
  emailSequences: EmailSequence[] = [...INITIAL_EMAIL_SEQUENCES];
  campaignLeads: CampaignLead[] = [...INITIAL_CAMPAIGN_LEADS];
  emailMessages: EmailMessage[] = [...INITIAL_EMAIL_MESSAGES];
  replies: Reply[] = [...INITIAL_REPLIES];
  creditTransactions: CreditTransaction[] = [...INITIAL_CREDIT_TRANSACTIONS];
  subscription: Subscription = INITIAL_SUBSCRIPTION;
  integrations: Integration[] = [...INITIAL_INTEGRATIONS];

  // Helper Queries
  getFullOrganizationData() {
    return {
      user: this.user,
      organization: this.organization,
      member: this.member,
      businessProfile: this.businessProfile,
      icpProfiles: this.icpProfiles,
      companiesCount: this.companies.length,
      contactsCount: this.contacts.length,
      campaignsCount: this.campaigns.length,
      repliesCount: this.replies.length,
      creditBalance: this.organization.creditBalance,
      subscription: this.subscription,
      integrations: this.integrations
    };
  }

  getCompaniesWithContacts() {
    return this.companies.map((c) => ({
      ...c,
      contacts: this.contacts.filter((ct) => ct.companyId === c.id)
    }));
  }

  getCampaignWithFullDetails(campaignId: string) {
    const campaign = this.campaigns.find((c) => c.id === campaignId) || this.campaigns[0];
    const sequences = this.emailSequences.filter((s) => s.campaignId === campaign.id);
    const leads = this.campaignLeads
      .filter((l) => l.campaignId === campaign.id)
      .map((lead) => {
        const contact = this.contacts.find((ct) => ct.id === lead.contactId);
        const company = contact ? this.companies.find((comp) => comp.id === contact.companyId) : undefined;
        const messages = this.emailMessages.filter((m) => m.campaignLeadId === lead.id);
        return {
          ...lead,
          contact,
          company,
          messages
        };
      });

    return {
      ...campaign,
      sequences,
      leads
    };
  }
}

// Global singleton instance
export const relationalStore = new RelationalStore();
