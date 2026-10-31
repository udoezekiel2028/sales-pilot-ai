import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@/lib/agents/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();

    if (!input.inboundEmail || !input.inboundEmail.body) {
      return NextResponse.json(
        { error: "inboundEmail with body is required." },
        { status: 400 }
      );
    }

    const result = await orchestrator.triageInboundReply({
      inboundEmail: input.inboundEmail,
      conversationHistory: input.conversationHistory || [],
      calendarBookingUrl: input.calendarBookingUrl || "https://cal.com/outreach-team/15min"
    });

    return NextResponse.json({
      success: true,
      analysis: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Conversation agent triage failed." },
      { status: 500 }
    );
  }
}
