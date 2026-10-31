import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@/lib/agents/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const { pipelineId, websiteUrl, businessDescription, customFilters } = await req.json();

    if (!websiteUrl) {
      return NextResponse.json(
        { error: "A valid websiteUrl is required." },
        { status: 400 }
      );
    }

    const id = pipelineId || `pipe_${Date.now()}`;
    const result = await orchestrator.startOutboundPipeline(
      id,
      { websiteUrl, businessDescription },
      customFilters
    );

    return NextResponse.json({
      success: true,
      pipeline: result
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to run agent pipeline." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { pipelineId, companyId, action, editedNotes } = await req.json();

    if (!pipelineId || !companyId || !action) {
      return NextResponse.json(
        { error: "pipelineId, companyId, and action ('APPROVE' | 'REJECT') are required." },
        { status: 400 }
      );
    }

    const updated = orchestrator.approveDraftPackage(
      pipelineId,
      companyId,
      action,
      editedNotes
    );

    return NextResponse.json({
      success: true,
      pipeline: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update approval status." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pipelineId = searchParams.get("id");

  if (!pipelineId) {
    return NextResponse.json({ error: "Pipeline id parameter is required." }, { status: 400 });
  }

  const pipeline = orchestrator.getPipelineState(pipelineId);
  if (!pipeline) {
    return NextResponse.json({ error: "Pipeline not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, pipeline });
}
