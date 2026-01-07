export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";
import { partialText } from "@/lib/summarizer";

export async function GET(_: Request, { params }: { params: { jobId: string } }) {
  const job = Store.getJob(params.jobId);
  if (!job) return NextResponse.json({ error: "결과를 찾을 수 없습니다." }, { status: 404 });

  const full = job.summary ?? "(요약 없음)";
  const partial = partialText(full);

  return NextResponse.json({
    jobId: job.id,
    filename: job.filename,
    status: job.status,
    isPaid: job.isPaid,
    partial,
    full,
  });
}
