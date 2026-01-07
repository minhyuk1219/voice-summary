// lib/summarizer.ts
export async function fakeTranscribe(file: File): Promise<string> {
  return "이것은 샘플 음성 파일의 더미 텍스트입니다.";
}

export async function summarizeText(text: string): Promise<string> {
  return text.slice(0, 100) + "... 요약됨";
}