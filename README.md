# LG 트윈스 티켓 오픈 알리미

2026 시즌 LG 트윈스 홈경기(잠실) 티켓 오픈일에 텔레그램으로 자동 알림을 보내주는 서비스입니다.

## 텔레그램 알림 받기

트윈스 팬이라면 아래 채널에 참여하세요! 티켓 오픈일 오전에 자동으로 알림이 옵니다.

**https://t.me/lgtwins_ticket**

별도 설정 없이 채널 참여만 하면 됩니다.

## 어떻게 동작하나요?

1. **GitHub Actions**가 매일 오전 9시(KST)에 실행
2. **KBO 공식 API**에서 LG 트윈스 홈경기 최신 일정을 조회
3. 오늘이 티켓 오픈일(경기 7일 전)인 경기가 있으면 **텔레그램 채널로 알림 발송**
4. 우천 취소/일정 변경이 KBO에 반영되면 자동으로 따라감

## 웹 페이지

**https://lgtwins-ticket-alarm.vercel.app**

- 전체 홈경기 일정 확인
- 경기 종료 / 예매 중 / 오픈 예정 상태 구분
- KBO API에서 실시간 조회 (우천 취소 자동 반영)

## 기술 구조

```
├── api/
│   ├── cron.js          # 크론잡: KBO API 조회 → 텔레그램 발송
│   └── games.js         # 웹페이지용 API: KBO에서 전체 일정 조회
├── public/
│   └── index.html       # 경기 일정 웹페이지
├── .github/
│   └── workflows/
│       └── cron.yml     # GitHub Actions 스케줄 (매일 KST 9시)
├── vercel.json
└── package.json
```

### 알림 흐름

```
GitHub Actions (매일 KST 09:00)
  → Vercel /api/cron 호출
    → KBO API에서 당월+다음달 LG 홈경기 조회
      → 오늘 오픈 경기 있으면 텔레그램 채널(@lgtwins_ticket)로 발송
```

### 티켓 오픈일 규칙
- 홈경기 **7일 전** 오전 **11:00** 오픈
- 매월 31일도 예매일 계산에 포함 (2023시즌부터)

## 직접 배포하기

### 1. GitHub에 올리기
```bash
git clone https://github.com/dochoul/LGTWINS_Ticket_Alarm.git
cd LGTWINS_Ticket_Alarm
```

### 2. Vercel 배포
1. https://vercel.com 접속 → GitHub 로그인
2. "Add New Project" → `LGTWINS_Ticket_Alarm` 저장소 선택
3. Deploy 클릭

### 3. 환경변수 설정
Vercel Dashboard → 프로젝트 → Settings → Environment Variables

| 이름 | 값 | 설명 |
|------|-----|------|
| `TELEGRAM_TOKEN` | 봇 토큰 | @BotFather에서 발급 |
| `TELEGRAM_CHAT_ID` | `@lgtwins_ticket` | 텔레그램 채널 ID |
| `CRON_SECRET` | 랜덤 문자열 | API 호출 인증용 |

### 4. GitHub Secrets 설정
GitHub 저장소 → Settings → Secrets and variables → Actions

| 이름 | 값 |
|------|-----|
| `CRON_SECRET` | Vercel에 설정한 것과 동일한 값 |

### 5. 동작 확인
- GitHub Actions 탭에서 워크플로우 수동 실행 (workflow_dispatch)
- 텔레그램 채널에 알림이 오는지 확인

## 주의사항
- GitHub Actions cron은 10~30분 지연될 수 있어 KST 9시로 설정 (11시 오픈 전 충분히 도착)
- KBO API 일정이 변경되면 자동 반영 (우천 취소 등)
- Vercel Hobby 플랜에서 무료로 운영 가능
