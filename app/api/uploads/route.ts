// app/api/uploads/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";
import { fakeTranscribe } from "@/lib/summarizer";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file missing" }, { status: 400 });
  }

  const text = await fakeTranscribe(file);
  const job = Store.createJob(text);

  return NextResponse.json({
    jobId: job.id,
    preview: text.slice(0, 200),
  });
}