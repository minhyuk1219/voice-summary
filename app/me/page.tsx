import Link from "next/link";
import { Button, Card, Container, Divider } from "@/components/UI";

async function getJobs() {
  const res = await fetch(`${process.env.APP_URL ?? "http://localhost:3000"}/api/me`, { cache: "no-store" });
  return res.json();
}

export default async function MePage() {
  const data = await getJobs();
  const jobs = data.jobs ?? [];

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">내 이력</div>
        <Link href="/upload"><Button>새 업로드</Button></Link>
      </div>

      <Card className="mt-4 p-6">
        {jobs.length === 0 ? (
          <div className="text-sm text-zinc-600">이력이 없습니다.</div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((j: any) => (
              <div key={j.id} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{j.filename}</div>
                  <div className="text-xs text-zinc-500">
                    {new Date(j.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  상태: {j.status} · 결제: {j.isPaid ? "활성" : "미결제"}
                </div>
                <div className="flex gap-2">
                  <Link href={`/r/${j.id}`}><Button variant="ghost">열기</Button></Link>
                  {!j.isPaid && <Link href={`/pay?jobId=${j.id}`}><Button>구독 결제</Button></Link>}
                </div>
                <Divider />
              </div>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
}
