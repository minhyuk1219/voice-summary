"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Card, Container } from "@/components/UI";

export default function PayPage() {
  const sp = useSearchParams();
  const jobId = sp.get("jobId") ?? "";
  const [busy, setBusy] = useState(false);

  const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_PAYMENT === "1";

  const price = useMemo(() => 9900, []);

  async function payDev() {
    setBusy(true);
    await fetch(`/api/billing/dev-success?jobId=${encodeURIComponent(jobId)}`, { method: "POST" });
    window.location.href = `/billing/success?jobId=${encodeURIComponent(jobId)}`;
  }

  async function payToss() {
    // Toss Payments 실제 결제는 운영 키/도메인 등록 필요.
    // 여기서는 결제 "연동 자리"만 제공하고, 로컬은 dev bypass로 검증.
    window.location.href = `/billing/fail?reason=PG_설정_필요&jobId=${encodeURIComponent(jobId)}`;
  }

  return (
    <Container className="py-12">
      <div className="text-sm font-semibold">구독 결제</div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold">월 구독</div>
          <div className="mt-2 text-3xl font-extrabold">{price.toLocaleString()}원</div>
          <div className="mt-2 text-sm text-zinc-600">
            결제 성공 즉시 전체 결과 공개 · 자동 갱신
          </div>

          <div className="mt-6 grid gap-2">
            {devBypass ? (
              <Button onClick={payDev} disabled={busy}>
                {busy ? "처리 중..." : "테스트 결제(로컬)로 진행"}
              </Button>
            ) : (
              <Button onClick={payToss}>토스페이먼츠 결제 진행</Button>
            )}
            <div className="text-xs text-zinc-500">
              * 국내 PG 연동은 토스페이먼츠/나이스페이 등으로 교체 가능
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold">연동 체크</div>
          <div className="mt-2 text-sm text-zinc-700">
            현재 jobId: <span className="font-mono">{jobId || "(없음)"}</span>
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            로컬에서 흐름 검증은 테스트 결제(DEV_BYPASS)로 완료하고,
            운영 배포에서 PG 키/도메인 등록 후 실결제로 전환한다.
          </div>
        </Card>
      </div>
    </Container>
  );
}
