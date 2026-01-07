# Voice Summary SaaS (로컬/배포 템플릿)

## 실행
1) .env.example -> .env 복사
2) npm install
3) npm run dev

## 핵심 흐름
- /upload 업로드 -> /r/[jobId] 결과(부분 노출)
- /pay?jobId=... -> 로컬 테스트 결제(DEV_BYPASS) -> /billing/success -> 결과 전체 공개

## 주의
- 데이터는 .data/store.json에 저장(로컬용)
- 운영 배포에서는 DB/스토리지(예: Supabase/Managed DB)로 교체 필요
