import {
  PipelineExecutionState,
  BusinessAnalystInput,
  LeadDiscoveryInput,
  OutreachDraftPackage,
  SalesConversationInput,
  SalesConversationOutput,
  CampaignPerformanceInput,
  CampaignIntelligenceOutput
} from "./types";
import { runBusinessIntelligenceAgent } from "./agent01-business-intelligence";
import { runLeadDiscoveryAgent } from "./agent02-lead-discovery";
import { runLeadResearchAgent } from "./agent03-lead-research";
import { runOutreachCopywritingAgent } from "./agent04-outreach-copywriting";
import { runSalesConversationAgent } from "./agent05-sales-conversation";
import { runCampaignIntelligenceAgent } from "./agent06-campaign-intelligence";

/**
 * MULTI-AGENT PIPELINE ORCHESTRATOR
 * 
 * Enforces structured inter-agent data flow:
 * Agent 01 (Business Analyst) ➔ Agent 02 (Lead Discovery) ➔ Agent 03 (Lead Research) ➔ Agent 04 (Copywriting)
 * ➔ [EXPLICIT HUMAN APPROVAL GATE] ➔ Queue/Dispatch
 * ➔ Agent 05 (Sales Conversation Triage on replies)
 * ➔ Agent 06 (Campaign Intelligence Optimization)
 */
class MultiAgentOrchestrator {
  private activePipelines: Map<string, PipelineExecutionState> = new Map();

  /**
   * Runs the sequential pipeline from Business Analysis to Outreach Drafting,
   * then strictly pauses at the AWAITING_USER_APPROVAL gate.
   */
  async startOutboundPipeline(
    pipelineId: string,
    businessInput: BusinessAnalystInput,
    customFilters?: Record<string, any>
  ): Promise<PipelineExecutionState> {
    const state: PipelineExecutionState = {
      id: pipelineId,
      stage: "AGENT_01_ANALYZING_BUSINESS",
      userApprovedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.activePipelines.set(pipelineId, state);

    // STEP 1: Agent 01 (Business Intelligence)
    const businessProfile = await runBusinessIntelligenceAgent(businessInput);
    state.businessProfile = businessProfile;
    state.stage = "AGENT_02_DISCOVERING_PROSPECTS";
    state.updatedAt = new Date().toISOString();

    // STEP 2: Agent 02 (Lead Discovery)
    const discoveryInput: LeadDiscoveryInput = {
      icp: {
        targetIndustries: businessProfile.suggestedSegments.map((s) => s.segmentName),
        headcountRanges: ["25-100", "101-500"],
        targetLocations: ["United States", "United Kingdom", "Germany", "Sweden"],
        targetRoles: ["VP of Sales", "CRO", "Head of Growth", "CTO"]
      },
      searchFilters: {
        techStackKeywords: customFilters?.techStack || [],
        limit: 5
      }
    };
    const discoveryResults = await runLeadDiscoveryAgent(discoveryInput);
    state.discoveryResults = discoveryResults;
    state.stage = "AGENT_03_RESEARCHING_LEADS";
    state.updatedAt = new Date().toISOString();

    // STEP 3: Agent 03 (Lead Research)
    const researchResults = await runLeadResearchAgent(
      discoveryResults.qualifiedCompanies,
      businessProfile
    );
    state.researchResults = researchResults;
    state.stage = "AGENT_04_DRAFTING_OUTREACH";
    state.updatedAt = new Date().toISOString();

    // STEP 4: Agent 04 (Outreach Copywriting)
    const copywritingOutput = await runOutreachCopywritingAgent(
      discoveryResults.qualifiedCompanies,
      researchResults.researchedAccounts,
      businessProfile,
      "direct"
    );
    state.draftPackages = copywritingOutput.draftPackages;

    // STEP 5: STRICT HUMAN-IN-THE-LOOP APPROVAL GATE
    // The agent STOP and awaits explicit human review before any email can be sent.
    state.stage = "AWAITING_USER_APPROVAL";
    state.updatedAt = new Date().toISOString();

    return state;
  }

  /**
   * Explicit User Approval Gate Action
   * The user reviews drafts, applies modifications, and gives explicit approval.
   */
  approveDraftPackage(
    pipelineId: string,
    companyId: string,
    action: "APPROVE" | "REJECT",
    editedNotes?: string
  ): PipelineExecutionState {
    const state = this.activePipelines.get(pipelineId);
    if (!state || !state.draftPackages) {
      throw new Error(`Pipeline ${pipelineId} not found or has no drafts.`);
    }

    const pkg = state.draftPackages.find((p) => p.companyId === companyId);
    if (!pkg) {
      throw new Error(`Company package ${companyId} not found in pipeline.`);
    }

    if (action === "APPROVE") {
      pkg.approvalStatus = "APPROVED";
      pkg.approvedAt = new Date().toISOString();
      pkg.userEditedNotes = editedNotes;
      state.userApprovedCount++;
    } else {
      pkg.approvalStatus = "REJECTED";
      pkg.userEditedNotes = editedNotes;
    }

    // Check if all drafts have been reviewed
    const allReviewed = state.draftPackages.every(
      (p) => p.approvalStatus === "APPROVED" || p.approvalStatus === "REJECTED"
    );

    if (allReviewed && state.userApprovedCount > 0) {
      state.stage = "CAMPAIGN_APPROVED_READY";
    }

    state.updatedAt = new Date().toISOString();
    return state;
  }

  /**
   * Agent 05: Inbound Reply Triage
   */
  async triageInboundReply(input: SalesConversationInput): Promise<SalesConversationOutput> {
    return runSalesConversationAgent(input);
  }

  /**
   * Agent 06: Campaign Intelligence & Optimization
   */
  async analyzeCampaignHealth(input: CampaignPerformanceInput): Promise<CampaignIntelligenceOutput> {
    return runCampaignIntelligenceAgent(input);
  }

  getPipelineState(pipelineId: string): PipelineExecutionState | undefined {
    return this.activePipelines.get(pipelineId);
  }
}

export const orchestrator = new MultiAgentOrchestrator();
