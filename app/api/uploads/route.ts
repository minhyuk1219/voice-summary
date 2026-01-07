export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { Store } from "@/lib/store";
import { fakeSummarize, fakeTranscribe } from "@/lib/summarizer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const id = randomUUID();
    const filePath = path.join(uploadDir, `${id}-${file.name}`);
    fs.writeFileSync(filePath, buffer);

    // 데모용 즉시 처리
    Store.createJob({
      id,
      filename: file.name,
      createdAt: Date.now(),
      status: "done",
      transcript: fakeTranscribe(file.name),
      summary: fakeSummarize(fakeTranscribe(file.name)),
      isPaid: false,
    });

    return NextResponse.json({ jobId: id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "업로드 실패" }, { status: 500 });
  }
}
