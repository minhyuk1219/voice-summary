import Link from "next/link";
import { Button, Card, Container, Divider } from "@/components/UI";

type PageProps = { params: { jobId: string } };

async function getData(jobId: string) {
  const res = await fetch(`${process.env.APP_URL ?? "http://localhost:3000"}/api/results/${jobId}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ResultPage({ params }: PageProps) {
  const data = await getData(params.jobId);

  if (data?.error) {
    return (
      <Container className="py-12">
        <Card className="p-6">
          <div className="text-sm font-semibold text-red-600">오류</div>
          <div className="mt-2 text-sm text-zinc-700">{data.error}</div>
          <div className="mt-4">
            <Link href="/upload">
              <Button>다시 업로드</Button>
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  const locked = !data.isPaid;

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">결과</div>
          <div className="text-xs text-zinc-500">{data.filename}</div>
        </div>
        <div className="flex gap-2">
          <form action={`/api/results/${params.jobId}/regenerate`} method="post">
            <Button variant="ghost" type="submit">재생성</Button>
          </form>
          <Link href="/me">
            <Button variant="ghost">내 이력</Button>
          </Link>
        </div>
      </div>

      <Card className="mt-4 p-6">
        <div className="text-sm font-semibold text-zinc-900">요약</div>
        <Divider />
        <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-800">
{locked ? data.partial : data.full}
        </pre>

        {locked && (
          <div className="mt-6">
            <Link href={`/pay?jobId=${params.jobId}`}>
              <Button className="w-full">전체 결과 보기</Button>
            </Link>
            <div className="mt-2 text-center text-xs text-zinc-500">
              구독 결제 후 즉시 전체 공개 · 다음 결제일 자동 설정
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}
