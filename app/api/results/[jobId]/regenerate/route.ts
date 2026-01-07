import { NextResponse } from "next/server";
import { summarizeText } from "@/lib/summarizer";
import { db } from "@/lib/store";

export async function POST(
  request: Request,
  context: { params: { jobId: string } }
) {
  const { jobId } = context.params;

  if (!jobId) {
    return NextResponse.json(
      { error: "jobId missing" },
      { status: 400 }
    );
  }

  const job = await db.jobs.get(jobId);

  if (!job || !job.text) {
    return NextResponse.json(
      { error: "job not found" },
      { status: 404 }
    );
  }

  const summary = await summarizeText(job.text);

  await db.jobs.update(jobId, {
    summary,
    regeneratedAt: new Date().toISOString(),
  });

  return NextResponse.json({ summary });
}