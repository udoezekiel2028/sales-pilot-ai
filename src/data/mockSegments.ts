export interface SegmentCluster {
  id: string;
  name: string;
  category: string;
  totalCompanies: number;
  totalDecisionMakers: number;
  avgContractValue: string;
  growthRate: string;
  topGeographies: string[];
  subNiches: {
    name: string;
    companiesCount: number;
    tamEstimate: string;
  }[];
}

export const MOCK_SEGMENTS: SegmentCluster[] = [
  {
    id: "seg_1",
    name: "B2B SaaS & Cloud Infrastructure",
    category: "Software & Technology",
    totalCompanies: 412000,
    totalDecisionMakers: 1850000,
    avgContractValue: "$24,000 / yr",
    growthRate: "+18.4% YoY",
    topGeographies: ["United States", "United Kingdom", "Germany", "Canada"],
    subNiches: [
      { name: "DevOps & Observability", companiesCount: 38400, tamEstimate: "$4.2B" },
      { name: "Fintech & Billing APIs", companiesCount: 62100, tamEstimate: "$7.8B" },
      { name: "Cybersecurity & Identity", companiesCount: 78500, tamEstimate: "$9.5B" },
      { name: "AI & LLM Tooling", companiesCount: 45000, tamEstimate: "$5.1B" },
      { name: "HRTech & Payroll", companiesCount: 54000, tamEstimate: "$6.0B" }
    ]
  },
  {
    id: "seg_2",
    name: "Healthcare Providers & MedTech",
    category: "Healthcare & Life Sciences",
    totalCompanies: 890000,
    totalDecisionMakers: 2400000,
    avgContractValue: "$35,000 / yr",
    growthRate: "+12.1% YoY",
    topGeographies: ["United States", "France", "Germany", "Japan"],
    subNiches: [
      { name: "Dental & Orthodontic Networks", companiesCount: 145000, tamEstimate: "$5.6B" },
      { name: "Telehealth Platforms", companiesCount: 42000, tamEstimate: "$8.4B" },
      { name: "Hospital IT & EHR Systems", companiesCount: 31000, tamEstimate: "$14.2B" },
      { name: "Physical Therapy & Wellness Clinics", companiesCount: 210000, tamEstimate: "$4.1B" }
    ]
  },
  {
    id: "seg_3",
    name: "E-Commerce Brands & DTC Retailers",
    category: "Retail & Consumer",
    totalCompanies: 1250000,
    totalDecisionMakers: 3100000,
    avgContractValue: "$15,000 / yr",
    growthRate: "+14.8% YoY",
    topGeographies: ["United States", "United Kingdom", "Australia", "Germany"],
    subNiches: [
      { name: "Shopify Plus Merchants ($5M+ GMV)", companiesCount: 88000, tamEstimate: "$6.2B" },
      { name: "Beauty & Personal Care DTC", companiesCount: 165000, tamEstimate: "$4.9B" },
      { name: "Apparel & Sustainable Fashion", companiesCount: 220000, tamEstimate: "$7.1B" },
      { name: "Cross-Border Marketplaces", companiesCount: 45000, tamEstimate: "$8.8B" }
    ]
  },
  {
    id: "seg_4",
    name: "Industrial, Logistics & Supply Chain",
    category: "Manufacturing & Logistics",
    totalCompanies: 640000,
    totalDecisionMakers: 1950000,
    avgContractValue: "$48,000 / yr",
    growthRate: "+9.5% YoY",
    topGeographies: ["United States", "Germany", "China", "Mexico"],
    subNiches: [
      { name: "Third-Party Logistics (3PL)", companiesCount: 72000, tamEstimate: "$12.4B" },
      { name: "Freight Brokerages", companiesCount: 54000, tamEstimate: "$8.1B" },
      { name: "Precision CNC & Aerospace Machining", companiesCount: 95000, tamEstimate: "$11.0B" },
      { name: "Cold-Chain Storage Operators", companiesCount: 32000, tamEstimate: "$5.3B" }
    ]
  }
];
