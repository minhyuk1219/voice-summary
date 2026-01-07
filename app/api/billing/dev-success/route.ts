// app/api/billing/dev-success/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "jobId 없음" }, { status: 400 });
  }

  const job = Store.getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: "job 없음" }, { status: 404 });
  }

  Store.updateJob(jobId, { isPaid: true });
  return NextResponse.json({ ok: true });
}