export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";
import { fakeSummarize, fakeTranscribe } from "@/lib/summarizer";

export async function POST(_: Request, { params }: { params: { jobId: string } }) {
  const job = Store.getJob(params.jobId);
  if (!job) return NextResponse.redirect(new URL(`/r/${params.jobId}`, process.env.APP_URL ?? "http://localhost:3000"));

  const transcript = fakeTranscribe(job.filename);
  const summary = fakeSummarize(transcript);
  Store.updateJob(job.id, { transcript, summary, status: "done" });

  return NextResponse.redirect(new URL(`/r/${params.jobId}`, process.env.APP_URL ?? "http://localhost:3000"));
}
