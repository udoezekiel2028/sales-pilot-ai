import { NextRequest, NextResponse } from "next/server";
import { searchCompanies } from "@/data/mockDatabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;

    const results = searchCompanies(query, category, location);

    return NextResponse.json({
      success: true,
      totalMatched: results.length,
      companies: results
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to search leads." },
      { status: 500 }
    );
  }
}
