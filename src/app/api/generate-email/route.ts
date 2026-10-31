import { NextRequest, NextResponse } from "next/server";
import { generatePersonalizedEmail } from "@/lib/agentEngine";

export async function POST(req: NextRequest) {
  try {
    const { icp, company, decisionMaker, step, tone } = await req.json();

    if (!icp || !company || !decisionMaker) {
      return NextResponse.json(
        { error: "icp, company, and decisionMaker payloads are required." },
        { status: 400 }
      );
    }

    const email = generatePersonalizedEmail(
      icp,
      company,
      decisionMaker,
      step || 1,
      tone || "direct"
    );

    return NextResponse.json({
      success: true,
      email
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate personalized email." },
      { status: 500 }
    );
  }
}
