# LG 트윈스 티켓 오픈 알리미

브라우저 없이도 텔레그램으로 티켓 오픈 10분 전 알림을 받을 수 있어요.

## 배포 방법

### 1. GitHub에 올리기
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/dochoul/lg-twins-alarm.git
git push -u origin main
```

### 2. Vercel 배포
1. https://vercel.com 접속 → 로그인
2. "Add New Project" → GitHub 저장소 선택
3. Deploy 클릭

### 3. 환경변수 설정 (중요!)
Vercel Dashboard → 프로젝트 → Settings → Environment Variables

| 이름 | 값 |
|------|-----|
| `TELEGRAM_TOKEN` | 봇 토큰 |
| `TELEGRAM_CHAT_ID` | `1858148024` |
| `CRON_SECRET` | 아무 랜덤 문자열 (예: `mysecret123`) |

### 4. 크론잡 확인
Vercel Dashboard → 프로젝트 → Settings → Crons
매분 `/api/cron` 이 실행되는 것을 확인

## 파일 구조
```
├── api/
│   └── cron.js        # 크론잡: 매분 실행, 10분 전 텔레그램 발송
├── public/
│   └── index.html     # 프론트엔드 UI
├── vercel.json        # 크론 스케줄 설정
└── package.json
```

## 주의사항
- Vercel 무료 플랜(Hobby)에서도 크론잡 사용 가능
- 크론잡은 UTC 기준이므로 한국 시간(KST = UTC+9)으로 자동 변환되어 있음
