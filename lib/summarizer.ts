/**
 * 로컬/심사용 요약기
 * 운영에서는 STT(Whisper) + LLM 요약으로 교체.
 */

export async function summarizeText(text: string) {
  // 아주 단순한 요약(데모용)
  const lines = text.split("\n").map((s) => s.trim()).filter(Boolean);

  const head = lines.slice(0, 8);
  const bullets = head.map((l) => `- ${l}`).join("\n");

  return [
    "요약",
    bullets || "- (요약할 내용이 없습니다)",
    "",
    "액션 아이템",
    "- 담당자/일정을 정리하세요",
    "- 다음 회의 전 체크리스트를 만드세요",
  ].join("\n");
}

export function partialText(full: string) {
  const lines = full.split("\n");
  const keep = Math.max(4, Math.ceil(lines.length * 0.35));
  return lines.slice(0, keep).join("\n");
}