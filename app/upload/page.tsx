"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card, Container } from "@/components/UI";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true);
    setErr(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/uploads", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "업로드 실패");

      router.push(`/r/${data.jobId}`);
    } catch (e: any) {
      setErr(e?.message ?? "오류 발생");
      setBusy(false);
    }
  }

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">업로드</div>
        <div className="text-xs text-zinc-500">mp3 / wav</div>
      </div>

      <Card className="mt-4 p-6">
        <div className="grid gap-3">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          />

          {err && <div className="text-sm font-semibold text-red-600">{err}</div>}

          <Button onClick={run} disabled={!file || busy}>
            {busy ? "처리 중..." : "업로드하고 요약 시작"}
          </Button>

          <div className="text-xs text-zinc-500">
            업로드 즉시 처리 시작 · 결과 화면에서 일부만 노출됩니다
          </div>
        </div>
      </Card>
    </Container>
  );
}
