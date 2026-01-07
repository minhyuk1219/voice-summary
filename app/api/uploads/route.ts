export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { fakeTranscribe, summarizeText } from "@/lib/summarizer";
import { db } from "@/lib/store";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "file missing" }, { status: 400 });
  }

  const jobId = randomUUID();

  // STT (더미)
  const text = await fakeTranscribe(file.name);

  // 요약 생성
  const summary = await summarizeText(text);

  db.jobs.set({
    id: jobId,
    text,
    summary,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ jobId });
}