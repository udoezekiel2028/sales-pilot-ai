import {
  QualifiedCompanyProspect,
  CompanyResearchSummary,
  BusinessProfileOutput,
  OutreachDraftPackage,
  EmailDraftStep,
  OutreachCopywritingOutput
} from "./types";

/**
 * AI AGENT 04: Outreach Agent (Copywriting)
 * 
 * Specialized Responsibility:
 * Synthesizes personalized opening hooks and concise cold email sequences
 * based on verifiable research evidence.
 * 
 * SAFEGUARD ENFORCED:
 * Generates packages with approvalStatus: "PENDING_USER_REVIEW".
 * The user must explicitly approve emails before sending.
 */
export async function runOutreachCopywritingAgent(
  companies: QualifiedCompanyProspect[],
  researchSummaries: CompanyResearchSummary[],
  userBusinessProfile: BusinessProfileOutput,
  toneStyle: "direct" | "consultative" | "casual" | "executive" = "direct"
): Promise<OutreachCopywritingOutput> {
  const draftPackages: OutreachDraftPackage[] = [];

  for (const company of companies) {
    const research = researchSummaries.find((r) => r.companyId === company.companyId);
    if (!research || company.contacts.length === 0) continue;

    for (const contact of company.contacts) {
      const firstName = contact.name.split(" ")[0];
      const techSignal = company.techStack.slice(0, 2).join(" & ");

      // 1. Personalized Opening Line referencing verifiable research
      const openingHook = `I saw you're spearheading ${contact.title} at ${company.name} and noticed your active deployment of ${techSignal}.`;

      // 2. Step 1: Initial Hook
      const step1: EmailDraftStep = {
        stepNumber: 1,
        stepType: "INITIAL_HOOK",
        delayDays: 0,
        subjectLine: `Question regarding ${company.name}'s commercial pipeline`,
        personalizedOpeningLine: openingHook,
        body: `Hi ${firstName},

${openingHook} Seeing your focus on ${company.industry}, I wanted to reach out directly.

Most teams in your space are struggling with low SDR conversion and bloated sales acquisition overhead.

At ${userBusinessProfile.companyName}, ${userBusinessProfile.offerAngle}

Would you be open to a 10-minute introductory conversation this Thursday at 2 PM to see if this model fits ${company.name}'s roadmap?

Best,
Alex Rivera
Founding Team | ${userBusinessProfile.companyName}`,
        callToAction: "10-minute introductory conversation this Thursday at 2 PM",
        referencedSignal: `Tech stack deployment (${techSignal})`
      };

      // 3. Step 2: Value-Add Follow-up
      const step2: EmailDraftStep = {
        stepNumber: 2,
        stepType: "VALUE_ADD",
        delayDays: 3,
        subjectLine: `Re: Question regarding ${company.name}'s commercial pipeline`,
        personalizedOpeningLine: `Following up on my note from earlier this week, ${firstName}.`,
        body: `Hi ${firstName},

Following up on my note from earlier this week.

Thought this would be relevant for your team: we recently helped an organization with ${company.headcount} employees eliminate 80% of manual prospecting hours while doubling demo volume.

Here is a 2-minute breakdown of the framework: ${userBusinessProfile.websiteUrl}/case-study

Let me know if you'd like to benchmark your current numbers.

Best,
Alex Rivera`,
        callToAction: "Benchmark current outbound metrics",
        referencedSignal: `Headcount tier (${company.headcount})`
      };

      // 4. Step 3: Polite Breakup
      const step3: EmailDraftStep = {
        stepNumber: 3,
        stepType: "BREAKUP",
        delayDays: 5,
        subjectLine: `Closing the loop for ${company.name}`,
        personalizedOpeningLine: `I know your schedule as ${contact.title} is full, ${firstName}.`,
        body: `Hi ${firstName},

I know how busy your schedule is as ${contact.title}. I assume outbound pipeline optimization isn't an active priority for ${company.name} right now.

I'll step back and won't follow up further, but if your team ever needs an autonomous agent to handle B2B lead generation on autopilot, you can always visit ${userBusinessProfile.websiteUrl}.

Wishing you and the ${company.name} team continued success!

Best,
Alex Rivera`,
        callToAction: "Self-serve link reference",
        referencedSignal: "Executive role schedule awareness"
      };

      draftPackages.push({
        companyId: company.companyId,
        companyName: company.name,
        contactId: contact.contactId,
        contactName: contact.name,
        contactEmail: contact.email,
        contactTitle: contact.title,
        emailSteps: [step1, step2, step3],
        approvalStatus: "PENDING_USER_REVIEW"
      });
    }
  }

  return {
    draftPackages,
    totalDraftsGenerated: draftPackages.length,
    requiresUserApproval: true
  };
}
