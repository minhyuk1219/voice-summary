import Link from "next/link";
import { Badge, Button, Card, Container, Divider } from "@/components/UI";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Container className="py-14">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-900">Voice Summary</div>
          <div className="flex items-center gap-2">
            <Link href="/upload">
              <Button variant="ghost">무료로 바로 사용</Button>
            </Link>
            <Link href="/me">
              <Button variant="ghost">내 이력</Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>구독형 · 자동결제</Badge>
              <Badge>업로드 즉시 요약</Badge>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight">
              회의·통화 음성 파일을 <br /> 자동으로 요약합니다
            </h1>

            <p className="mt-4 text-zinc-600">
              업로드하면 요약 일부를 먼저 보여주고, 구독 결제 후 전체 결과를 즉시
              공개합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/upload">
                <Button>무료로 바로 사용</Button>
              </Link>
              <Link href="/pay">
                <Button variant="ghost">요금제 보기</Button>
              </Link>
            </div>

            <div className="mt-8 text-sm text-zinc-600">
              과한 기능 없음 · 결제까지 막힘 없음 · 1인 운영 전제
            </div>
          </div>

          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900">흐름</div>
            <div className="mt-4 grid gap-3 text-sm text-zinc-700">
              <div>1) 음성 업로드</div>
              <Divider />
              <div>2) 자동 변환 · 요약</div>
              <Divider />
              <div>3) 일부 공개</div>
              <Divider />
              <div>4) “전체 결과 보기” → 구독 결제</div>
              <Divider />
              <div>5) 즉시 전체 공개 + 다음 결제 자동</div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
