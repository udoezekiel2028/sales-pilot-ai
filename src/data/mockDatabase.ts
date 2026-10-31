export interface DecisionMaker {
  id: string;
  name: string;
  title: string;
  email: string;
  isVerified: boolean;
  linkedin: string;
  avatar: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  domain: string;
  industry: string;
  category: "Enterprise SaaS" | "AI & Cloud" | "Fintech" | "Healthcare" | "E-commerce" | "Local Business" | "Cybersecurity";
  headcount: string;
  employeesCount: number;
  location: {
    city: string;
    state?: string;
    country: string;
  };
  revenueRange: string;
  techStack: string[];
  description: string;
  googleMapsRating?: number;
  googleMapsReviews?: number;
  decisionMakers: DecisionMaker[];
}

export const MOCK_B2B_COMPANIES: CompanyRecord[] = [
  {
    id: "comp_1",
    name: "FinFlow Systems",
    domain: "finflow.io",
    industry: "Financial Technology",
    category: "Fintech",
    headcount: "50-200",
    employeesCount: 142,
    location: { city: "New York", state: "NY", country: "United States" },
    revenueRange: "$10M - $25M",
    techStack: ["Next.js", "Stripe", "PostgreSQL", "AWS", "Segment"],
    description: "Automated billing and revenue recognition API for fast-growing SaaS startups.",
    decisionMakers: [
      {
        id: "dm_1",
        name: "Marcus Vance",
        title: "VP of Sales & Growth",
        email: "marcus.vance@finflow.io",
        isVerified: true,
        linkedin: "https://linkedin.com/in/marcusvance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
      },
      {
        id: "dm_2",
        name: "Elena Rostova",
        title: "Chief Executive Officer",
        email: "elena@finflow.io",
        isVerified: true,
        linkedin: "https://linkedin.com/in/elenarostova",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_2",
    name: "AetherOps AI",
    domain: "aetherops.ai",
    industry: "DevOps & Cloud Infrastructure",
    category: "AI & Cloud",
    headcount: "11-50",
    employeesCount: 38,
    location: { city: "San Francisco", state: "CA", country: "United States" },
    revenueRange: "$3M - $8M",
    techStack: ["Kubernetes", "Datadog", "OpenAI API", "Python", "GCP"],
    description: "Autonomous cloud infrastructure cost optimizer and anomaly detection agent.",
    decisionMakers: [
      {
        id: "dm_3",
        name: "David Chen",
        title: "Co-Founder & CTO",
        email: "david@aetherops.ai",
        isVerified: true,
        linkedin: "https://linkedin.com/in/davidchentech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
      },
      {
        id: "dm_4",
        name: "Sarah Jenkins",
        title: "Head of Demand Generation",
        email: "s.jenkins@aetherops.ai",
        isVerified: true,
        linkedin: "https://linkedin.com/in/sarahjenkins-growth",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_3",
    name: "ScaleForge Logistics",
    domain: "scaleforge.com",
    industry: "Supply Chain & Logistics",
    category: "Enterprise SaaS",
    headcount: "201-500",
    employeesCount: 310,
    location: { city: "Chicago", state: "IL", country: "United States" },
    revenueRange: "$25M - $50M",
    techStack: ["Salesforce", "HubSpot", "React", "Azure", "Snowflake"],
    description: "Real-time freight visibility and intelligent dispatching platform for nationwide carriers.",
    decisionMakers: [
      {
        id: "dm_5",
        name: "Robert MacIntyre",
        title: "Chief Commercial Officer",
        email: "robert.m@scaleforge.com",
        isVerified: true,
        linkedin: "https://linkedin.com/in/robertmacintyre",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_4",
    name: "NordicHealth Tech",
    domain: "nordichealth.se",
    industry: "Healthcare IT",
    category: "Healthcare",
    headcount: "50-200",
    employeesCount: 84,
    location: { city: "Stockholm", country: "Sweden" },
    revenueRange: "$8M - $15M",
    techStack: ["React", "FastAPI", "Docker", "PostgreSQL", "HL7/FHIR"],
    description: "Compliant digital patient engagement and clinic management platform across Scandinavia.",
    decisionMakers: [
      {
        id: "dm_6",
        name: "Astrid Lindholm",
        title: "Head of Global Partnerships",
        email: "astrid@nordichealth.se",
        isVerified: true,
        linkedin: "https://linkedin.com/in/astridlindholm",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_5",
    name: "CipherGuard Labs",
    domain: "cipherguard.io",
    industry: "Information Security",
    category: "Cybersecurity",
    headcount: "50-200",
    employeesCount: 165,
    location: { city: "London", country: "United Kingdom" },
    revenueRange: "$15M - $30M",
    techStack: ["Golang", "Wasm", "AWS", "Splunk", "Tailscale"],
    description: "Zero-trust identity governance and API behavioral attack prevention.",
    decisionMakers: [
      {
        id: "dm_7",
        name: "Julian Thorne",
        title: "VP of Enterprise Sales",
        email: "julian@cipherguard.io",
        isVerified: true,
        linkedin: "https://linkedin.com/in/julianthorne",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_6",
    name: "Apex Precision Dental",
    domain: "apexdentalpartners.com",
    industry: "Healthcare & Local Services",
    category: "Local Business",
    headcount: "11-50",
    employeesCount: 22,
    location: { city: "Austin", state: "TX", country: "United States" },
    revenueRange: "$2M - $5M",
    techStack: ["WordPress", "Google Workspace", "Square"],
    description: "High-end cosmetic dentistry and orthodontic practice network in Texas.",
    googleMapsRating: 4.9,
    googleMapsReviews: 412,
    decisionMakers: [
      {
        id: "dm_8",
        name: "Dr. Nathan Cole",
        title: "Managing Partner & Clinic Director",
        email: "drcole@apexdentalpartners.com",
        isVerified: true,
        linkedin: "https://linkedin.com/in/nathancole-dds",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_7",
    name: "VerveCart Commerce",
    domain: "vervecart.com",
    industry: "E-commerce Infrastructure",
    category: "E-commerce",
    headcount: "50-200",
    employeesCount: 120,
    location: { city: "Berlin", country: "Germany" },
    revenueRange: "$12M - $20M",
    techStack: ["Shopify Plus", "Klaviyo", "Node.js", "GCP"],
    description: "Headless checkout and localized currency switching for multi-brand DTC merchants.",
    decisionMakers: [
      {
        id: "dm_9",
        name: "Maximilian Weber",
        title: "Chief Marketing Officer",
        email: "m.weber@vervecart.com",
        isVerified: true,
        linkedin: "https://linkedin.com/in/maxweber-dtc",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "comp_8",
    name: "OmniSignal Data",
    domain: "omnisignal.io",
    industry: "B2B Marketing & Intelligence",
    category: "Enterprise SaaS",
    headcount: "201-500",
    employeesCount: 245,
    location: { city: "Boston", state: "MA", country: "United States" },
    revenueRange: "$30M - $60M",
    techStack: ["Snowflake", "dbt", "Airflow", "BigQuery", "React"],
    description: "Buyer intent signal aggregation from across 4,000+ B2B review and content networks.",
    decisionMakers: [
      {
        id: "dm_10",
        name: "Jessica Albright",
        title: "Senior Director of Revenue Operations",
        email: "jessica.a@omnisignal.io",
        isVerified: true,
        linkedin: "https://linkedin.com/in/jessicaalbright",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
      }
    ]
  }
];

export function searchCompanies(query: string, categoryFilter?: string, locationFilter?: string): CompanyRecord[] {
  let results = [...MOCK_B2B_COMPANIES];

  if (categoryFilter && categoryFilter !== "All") {
    results = results.filter((c) => c.category === categoryFilter);
  }

  if (locationFilter && locationFilter !== "All") {
    results = results.filter(
      (c) =>
        c.location.country.toLowerCase().includes(locationFilter.toLowerCase()) ||
        (c.location.state && c.location.state.toLowerCase() === locationFilter.toLowerCase()) ||
        c.location.city.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.techStack.some((t) => t.toLowerCase().includes(q)) ||
        c.decisionMakers.some((dm) => dm.title.toLowerCase().includes(q) || dm.name.toLowerCase().includes(q))
    );
  }

  return results;
}
