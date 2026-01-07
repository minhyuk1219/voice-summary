import Link from "next/link";
import { Button, Card, Container } from "@/components/UI";

export default function SuccessPage({ searchParams }: any) {
  const jobId = searchParams?.jobId ?? "";
  return (
    <Container className="py-12">
      <Card className="p-6">
        <div className="text-sm font-semibold text-zinc-900">결제 성공</div>
        <div className="mt-2 text-sm text-zinc-700">전체 결과가 공개되었습니다.</div>
        <div className="mt-6 flex gap-2">
          <Link href={jobId ? `/r/${jobId}` : "/me"}>
            <Button>결과로 이동</Button>
          </Link>
          <Link href="/me">
            <Button variant="ghost">내 이력</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
