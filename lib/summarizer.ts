/**
 * 로컬 데모용 요약기.
 * 실제 운영에서는 STT(Whisper) + LLM 요약으로 교체.
 * 지금은 '흐름 검증'을 위해 빠르게 결과를 만들어 줌.
 */
export function fakeTranscribe(filename: string) {
  const base = filename.replace(/\.[^/.]+$/, "");
  return [
    `회의명: ${base}`,
    "참석자: A, B",
    "핵심 안건:",
    "- 이번 주 진행 상황 공유",
    "- 다음 액션 아이템 확정",
    "- 리스크 및 이슈 정리",
    "",
    "결정사항:",
    "1) 데드라인: 금요일 18시",
    "2) 담당: A(개발), B(콘텐츠)",
  ].join("\n");
}

export function fakeSummarize(transcript: string) {
  return [
    "요약",
    "- 진행 상황 공유 및 다음 액션 아이템 확정",
    "- 금요일 18시까지 마감, A/B 역할 분담",
    "",
    "액션 아이템",
    "1) A: 기능 구현 및 배포 준비",
    "2) B: 안내문/랜딩 문구 정리",
    "",
    "리스크",
    "- 일정 지연 가능성: 중간 점검 필요",
  ].join("\n");
}

export function partialText(full: string) {
  const lines = full.split("\n");
  const keep = Math.max(4, Math.ceil(lines.length * 0.35));
  return lines.slice(0, keep).join("\n");
}
