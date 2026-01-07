export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";
import { summarizeText } from "@/lib/summarizer";

export async function POST(
  _req: Request,
  { params }: { params: { jobId: string } }
) {
  const job = Store.getJob(params.jobId);

  if (!job || !job.text) {
    return NextResponse.json(
      { error: "job not found" },
      { status: 404 }
    );
  }

  const summary = await summarizeText(job.text);

  Store.updateJob(params.jobId, {
    summary,
    regeneratedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, summary });
}