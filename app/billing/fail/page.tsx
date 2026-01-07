import Link from "next/link";
import { Button, Card, Container } from "@/components/UI";

export default function FailPage({ searchParams }: any) {
  const reason = searchParams?.reason ?? "결제 실패";
  const jobId = searchParams?.jobId ?? "";
  return (
    <Container className="py-12">
      <Card className="p-6">
        <div className="text-sm font-semibold text-red-600">결제 실패</div>
        <div className="mt-2 text-sm text-zinc-700">{reason}</div>
        <div className="mt-6 flex gap-2">
          <Link href={jobId ? `/pay?jobId=${jobId}` : "/pay"}>
            <Button>다시 시도</Button>
          </Link>
          <Link href={jobId ? `/r/${jobId}` : "/"}>
            <Button variant="ghost">뒤로</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
