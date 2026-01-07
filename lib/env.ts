import { z } from "zod";

const schema = z.object({
  APP_URL: z.string().url().default("http://localhost:3000"),
  // Toss Payments (국내 PG) - 설정하면 실결제(테스트) 흐름 연결됨
  TOSS_CLIENT_KEY: z.string().optional(),
  TOSS_SECRET_KEY: z.string().optional(),
  // dev 모드 결제 우회(로컬 테스트)
  DEV_BYPASS_PAYMENT: z.string().optional(), // "1"이면 결제 성공을 버튼으로 처리
});

export const env = schema.parse({
  APP_URL: process.env.APP_URL ?? "http://localhost:3000",
  TOSS_CLIENT_KEY: process.env.TOSS_CLIENT_KEY,
  TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  DEV_BYPASS_PAYMENT: process.env.DEV_BYPASS_PAYMENT,
});
