import { LeadDiscoveryInput, LeadDiscoveryOutput, QualifiedCompanyProspect, DiscoveredContact } from "./types";
import { queryApolloLeadData } from "../integrations/apolloClient";

/**
 * AI AGENT 02: Lead Discovery Agent (Prospecting)
 * 
 * Powered by Apollo.io B2B Intelligence:
 * Translates the user's ICP into Apollo.io search queries and parameters,
 * queries Apollo's global repository of 275M+ verified business contacts and companies,
 * removes duplicate domains/emails, and flags records with missing info.
 */
export async function runLeadDiscoveryAgent(
  input: LeadDiscoveryInput
): Promise<LeadDiscoveryOutput> {
  const providerFilters = {
    provider: "Apollo.io API",
    personTitles: input.icp.targetRoles,
    organizationIndustries: input.icp.targetIndustries,
    headcountRanges: input.icp.headcountRanges,
    organizationLocations: input.icp.targetLocations,
    techKeywords: input.searchFilters?.techStackKeywords || [],
    emailStatus: "verified_only",
    excludeDomains: input.searchFilters?.excludeDomains || []
  };

  // Query Apollo.io API Client
  const apolloResponse = await queryApolloLeadData({
    titles: input.icp.targetRoles,
    industries: input.icp.targetIndustries,
    headcountRanges: input.icp.headcountRanges,
    locations: input.icp.targetLocations,
    domainKeywords: input.searchFilters?.techStackKeywords,
    perPage: input.searchFilters?.limit || 10
  });

  // Deduplication tracking
  const seenDomains = new Set<string>();
  const seenEmails = new Set<string>();
  let duplicatesRemoved = 0;
  let missingInfoFlagged = 0;

  const qualified: QualifiedCompanyProspect[] = [];

  for (const company of apolloResponse.qualifiedCompanies) {
    if (seenDomains.has(company.domain)) {
      duplicatesRemoved++;
      continue;
    }
    seenDomains.add(company.domain);

    const validContacts: DiscoveredContact[] = [];

    for (const contact of company.contacts) {
      if (seenEmails.has(contact.email)) {
        duplicatesRemoved++;
        continue;
      }
      seenEmails.add(contact.email);

      if (contact.hasMissingInfo || !contact.email) {
        missingInfoFlagged++;
      }

      validContacts.push(contact);
    }

    qualified.push({
      ...company,
      contacts: validContacts
    });
  }

  return {
    totalRawFound: apolloResponse.totalFound,
    duplicatesRemoved,
    missingInfoFlagged,
    qualifiedCompanies: qualified,
    generatedProviderFilters: providerFilters
  };
}
