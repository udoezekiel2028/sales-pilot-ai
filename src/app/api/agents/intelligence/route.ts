import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@/lib/agents/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();

    const result = await orchestrator.analyzeCampaignHealth({
      campaignId: input.campaignId || "camp_01",
      campaignName: input.campaignName || "Q1 Autonomous Outbound",
      metrics: input.metrics || {
        totalSent: 1250,
        deliveredCount: 1240,
        openedCount: 775,
        repliedCount: 112,
        meetingsBookedCount: 28,
        bouncedCount: 10,
        unsubscribedCount: 4
      },
      stepBreakdown: input.stepBreakdown || [
        {
          stepNumber: 1,
          subjectLine: "Quick question regarding {{companyName}}'s outbound pipeline",
          sent: 1240,
          opened: 775,
          replied: 84
        },
        {
          stepNumber: 2,
          subjectLine: "Re: Quick question regarding {{companyName}}'s outbound pipeline",
          sent: 920,
          opened: 580,
          replied: 28
        }
      ],
      segmentBreakdown: input.segmentBreakdown || [
        { segmentName: "FinTech & Financial Infrastructure", sent: 620, replied: 74, booked: 21 },
        { segmentName: "General B2B Software Services", sent: 620, replied: 38, booked: 7 }
      ]
    });

    return NextResponse.json({
      success: true,
      intelligence: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Campaign intelligence agent failed." },
      { status: 500 }
    );
  }
}
