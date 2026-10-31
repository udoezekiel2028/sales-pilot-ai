import { NextRequest, NextResponse } from "next/server";
import { classifyInboundReply } from "@/lib/agentEngine";

export async function POST(req: NextRequest) {
  try {
    const { replyText, calendarLink } = await req.json();

    if (!replyText || typeof replyText !== "string") {
      return NextResponse.json(
        { error: "replyText string is required." },
        { status: 400 }
      );
    }

    const classification = classifyInboundReply(
      replyText,
      calendarLink || "https://cal.com/outreach-team/15min"
    );

    return NextResponse.json({
      success: true,
      classification
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to classify reply." },
      { status: 500 }
    );
  }
}
