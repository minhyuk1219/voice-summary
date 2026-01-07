// lib/summarizer.ts
export async function summarizeText(text: string) {
  return `요약 결과: ${text.slice(0, 100)}`;
}

export async function fakeTranscribe(_: File) {
  return "이것은 더미 음성 변환 텍스트입니다.";
}
