import { NextRequest, NextResponse } from "next/server";
import { analyzeCompanyUrl } from "@/lib/agentEngine";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid website URL is required." },
        { status: 400 }
      );
    }

    const icp = await analyzeCompanyUrl(url);

    return NextResponse.json({
      success: true,
      icp
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to analyze website." },
      { status: 500 }
    );
  }
}
