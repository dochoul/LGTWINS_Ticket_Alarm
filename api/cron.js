const GAMES = [
  { date: '2026-03-28', openAt: '2026-03-21T11:00:00+09:00', label: '3월 28일(토) vs kt wiz' },
  { date: '2026-03-29', openAt: '2026-03-22T11:00:00+09:00', label: '3월 29일(일) vs kt wiz' },
  { date: '2026-03-31', openAt: '2026-03-24T11:00:00+09:00', label: '3월 31일(화) vs KIA 타이거즈' },
  { date: '2026-04-01', openAt: '2026-03-25T11:00:00+09:00', label: '4월 1일(수) vs KIA 타이거즈' },
  { date: '2026-04-02', openAt: '2026-03-26T11:00:00+09:00', label: '4월 2일(목) vs KIA 타이거즈' },
  { date: '2026-04-10', openAt: '2026-04-03T11:00:00+09:00', label: '4월 10일(금) vs SSG 랜더스' },
  { date: '2026-04-11', openAt: '2026-04-04T11:00:00+09:00', label: '4월 11일(토) vs SSG 랜더스' },
  { date: '2026-04-12', openAt: '2026-04-05T11:00:00+09:00', label: '4월 12일(일) vs SSG 랜더스' },
  { date: '2026-04-14', openAt: '2026-04-07T11:00:00+09:00', label: '4월 14일(화) vs 롯데 자이언츠' },
  { date: '2026-04-15', openAt: '2026-04-08T11:00:00+09:00', label: '4월 15일(수) vs 롯데 자이언츠' },
  { date: '2026-04-16', openAt: '2026-04-09T11:00:00+09:00', label: '4월 16일(목) vs 롯데 자이언츠' },
  { date: '2026-04-21', openAt: '2026-04-14T11:00:00+09:00', label: '4월 21일(화) vs 한화 이글스' },
  { date: '2026-04-22', openAt: '2026-04-15T11:00:00+09:00', label: '4월 22일(수) vs 한화 이글스' },
  { date: '2026-04-23', openAt: '2026-04-16T11:00:00+09:00', label: '4월 23일(목) vs 한화 이글스' },
  { date: '2026-05-01', openAt: '2026-04-24T11:00:00+09:00', label: '5월 1일(금) vs NC 다이노스' },
  { date: '2026-05-02', openAt: '2026-04-25T11:00:00+09:00', label: '5월 2일(토) vs NC 다이노스' },
  { date: '2026-05-03', openAt: '2026-04-26T11:00:00+09:00', label: '5월 3일(일) vs NC 다이노스' },
  { date: '2026-05-05', openAt: '2026-04-28T11:00:00+09:00', label: '5월 5일(화) vs 두산 베어스' },
  { date: '2026-05-06', openAt: '2026-04-29T11:00:00+09:00', label: '5월 6일(수) vs 두산 베어스' },
  { date: '2026-05-07', openAt: '2026-04-30T11:00:00+09:00', label: '5월 7일(목) vs 두산 베어스' },
  { date: '2026-05-12', openAt: '2026-05-05T11:00:00+09:00', label: '5월 12일(화) vs 삼성 라이온즈' },
  { date: '2026-05-13', openAt: '2026-05-06T11:00:00+09:00', label: '5월 13일(수) vs 삼성 라이온즈' },
  { date: '2026-05-14', openAt: '2026-05-07T11:00:00+09:00', label: '5월 14일(목) vs 삼성 라이온즈' },
  { date: '2026-05-22', openAt: '2026-05-15T11:00:00+09:00', label: '5월 22일(금) vs 키움 히어로즈' },
  { date: '2026-05-23', openAt: '2026-05-16T11:00:00+09:00', label: '5월 23일(토) vs 키움 히어로즈' },
  { date: '2026-05-24', openAt: '2026-05-17T11:00:00+09:00', label: '5월 24일(일) vs 키움 히어로즈' },
  { date: '2026-05-29', openAt: '2026-05-22T11:00:00+09:00', label: '5월 29일(금) vs KIA 타이거즈' },
  { date: '2026-05-30', openAt: '2026-05-23T11:00:00+09:00', label: '5월 30일(토) vs KIA 타이거즈' },
  { date: '2026-05-31', openAt: '2026-05-24T11:00:00+09:00', label: '5월 31일(일) vs KIA 타이거즈' },
  { date: '2026-06-09', openAt: '2026-06-02T11:00:00+09:00', label: '6월 9일(화) vs SSG 랜더스' },
  { date: '2026-06-10', openAt: '2026-06-03T11:00:00+09:00', label: '6월 10일(수) vs SSG 랜더스' },
  { date: '2026-06-11', openAt: '2026-06-04T11:00:00+09:00', label: '6월 11일(목) vs SSG 랜더스' },
  { date: '2026-06-12', openAt: '2026-06-05T11:00:00+09:00', label: '6월 12일(금) vs 롯데 자이언츠' },
  { date: '2026-06-13', openAt: '2026-06-06T11:00:00+09:00', label: '6월 13일(토) vs 롯데 자이언츠' },
  { date: '2026-06-14', openAt: '2026-06-07T11:00:00+09:00', label: '6월 14일(일) vs 롯데 자이언츠' },
  { date: '2026-06-19', openAt: '2026-06-12T11:00:00+09:00', label: '6월 19일(금) vs 두산 베어스' },
  { date: '2026-06-20', openAt: '2026-06-13T11:00:00+09:00', label: '6월 20일(토) vs 두산 베어스' },
  { date: '2026-06-21', openAt: '2026-06-14T11:00:00+09:00', label: '6월 21일(일) vs 두산 베어스' },
  { date: '2026-06-23', openAt: '2026-06-16T11:00:00+09:00', label: '6월 23일(화) vs 삼성 라이온즈' },
  { date: '2026-06-24', openAt: '2026-06-17T11:00:00+09:00', label: '6월 24일(수) vs 삼성 라이온즈' },
  { date: '2026-06-25', openAt: '2026-06-18T11:00:00+09:00', label: '6월 25일(목) vs 삼성 라이온즈' },
  { date: '2026-07-03', openAt: '2026-06-26T11:00:00+09:00', label: '7월 3일(금) vs 한화 이글스' },
  { date: '2026-07-04', openAt: '2026-06-27T11:00:00+09:00', label: '7월 4일(토) vs 한화 이글스' },
  { date: '2026-07-05', openAt: '2026-06-28T11:00:00+09:00', label: '7월 5일(일) vs 한화 이글스' },
  { date: '2026-07-16', openAt: '2026-07-09T11:00:00+09:00', label: '7월 16일(목) vs kt wiz' },
  { date: '2026-07-17', openAt: '2026-07-10T11:00:00+09:00', label: '7월 17일(금) vs kt wiz' },
  { date: '2026-07-18', openAt: '2026-07-11T11:00:00+09:00', label: '7월 18일(토) vs kt wiz' },
  { date: '2026-07-19', openAt: '2026-07-12T11:00:00+09:00', label: '7월 19일(일) vs kt wiz' },
  { date: '2026-07-21', openAt: '2026-07-14T11:00:00+09:00', label: '7월 21일(화) vs NC 다이노스' },
  { date: '2026-07-22', openAt: '2026-07-15T11:00:00+09:00', label: '7월 22일(수) vs NC 다이노스' },
  { date: '2026-07-23', openAt: '2026-07-16T11:00:00+09:00', label: '7월 23일(목) vs NC 다이노스' },
  { date: '2026-07-28', openAt: '2026-07-21T11:00:00+09:00', label: '7월 28일(화) vs 키움 히어로즈' },
  { date: '2026-07-29', openAt: '2026-07-22T11:00:00+09:00', label: '7월 29일(수) vs 키움 히어로즈' },
  { date: '2026-07-30', openAt: '2026-07-23T11:00:00+09:00', label: '7월 30일(목) vs 키움 히어로즈' },
  { date: '2026-08-07', openAt: '2026-07-31T11:00:00+09:00', label: '8월 7일(금) vs KIA 타이거즈' },
  { date: '2026-08-08', openAt: '2026-08-01T11:00:00+09:00', label: '8월 8일(토) vs KIA 타이거즈' },
  { date: '2026-08-09', openAt: '2026-08-02T11:00:00+09:00', label: '8월 9일(일) vs KIA 타이거즈' },
  { date: '2026-08-14', openAt: '2026-08-07T11:00:00+09:00', label: '8월 14일(금) vs SSG 랜더스' },
  { date: '2026-08-15', openAt: '2026-08-08T11:00:00+09:00', label: '8월 15일(토) vs SSG 랜더스' },
  { date: '2026-08-16', openAt: '2026-08-09T11:00:00+09:00', label: '8월 16일(일) vs SSG 랜더스' },
  { date: '2026-08-18', openAt: '2026-08-11T11:00:00+09:00', label: '8월 18일(화) vs kt wiz' },
  { date: '2026-08-19', openAt: '2026-08-12T11:00:00+09:00', label: '8월 19일(수) vs kt wiz' },
  { date: '2026-08-20', openAt: '2026-08-13T11:00:00+09:00', label: '8월 20일(목) vs kt wiz' },
  { date: '2026-08-25', openAt: '2026-08-18T11:00:00+09:00', label: '8월 25일(화) vs NC 다이노스' },
  { date: '2026-08-26', openAt: '2026-08-19T11:00:00+09:00', label: '8월 26일(수) vs NC 다이노스' },
  { date: '2026-08-27', openAt: '2026-08-20T11:00:00+09:00', label: '8월 27일(목) vs NC 다이노스' },
  { date: '2026-09-04', openAt: '2026-08-28T11:00:00+09:00', label: '9월 4일(금) vs 삼성 라이온즈' },
  { date: '2026-09-05', openAt: '2026-08-29T11:00:00+09:00', label: '9월 5일(토) vs 삼성 라이온즈' },
  { date: '2026-09-06', openAt: '2026-08-30T11:00:00+09:00', label: '9월 6일(일) vs 삼성 라이온즈' },
];

async function sendTelegram(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  return res.json();
}

export default async function handler(req, res) {
  // Vercel cron 보안: Authorization 헤더 확인
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram credentials not set' });
  }

  const now = new Date();
  // 한국 시간(KST) 기준으로 오늘 날짜 구하기 (YYYY-MM-DD)
  const todayStr = new Date(now.getTime() + (9 * 60 * 60 * 1000)).toISOString().split('T')[0];
  const sent = [];

  for (const game of GAMES) {
    const openDateStr = game.openAt.split('T')[0];

    // 오늘 오픈되는 티켓인지 확인
    if (openDateStr === todayStr) {
      const msg =
        `⚾ LG 트윈스 홈 경기 티켓 오픈 안내\n\n` +
        `📅 경기: ${game.label}\n` +
        `🏟 장소: 잠실야구장\n` +
        `🎫 오픈 시간: 오늘(11:00)\n\n` +
        `잠시 후 11시에 티켓팅이 시작됩니다!\n` +
        `👉 https://www.ticketlink.co.kr/sports/137/59`;

      const result = await sendTelegram(token, chatId, msg);
      sent.push({ game: game.label, ok: result.ok });
    }
  }

  return res.status(200).json({ checked: GAMES.length, sent });
}
