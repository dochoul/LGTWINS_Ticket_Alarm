const GAMES = [
  { date: '2026-04-10', openAt: '2026-04-03T11:00:00+09:00', label: '4월 10일(금) vs SSG 랜더스' },
  { date: '2026-04-11', openAt: '2026-04-04T11:00:00+09:00', label: '4월 11일(토) vs SSG 랜더스' },
  { date: '2026-04-12', openAt: '2026-04-05T11:00:00+09:00', label: '4월 12일(일) vs SSG 랜더스' },
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
  const sent = [];

  for (const game of GAMES) {
    const openTime = new Date(game.openAt);
    const diffMs = openTime - now;
    const diffMin = diffMs / 1000 / 60;

    // 9분 ~ 11분 사이 (크론이 정확히 10분 전에 안 올 수도 있으므로 범위로 체크)
    if (diffMin >= 9 && diffMin <= 11) {
      const msg =
        `⚾ LG 트윈스 티켓 오픈 10분 전!\n\n` +
        `📅 ${game.label}\n` +
        `🏟 잠실야구장\n` +
        `🎫 티켓 오픈: ${game.openAt.slice(5, 10).replace('-', '/')} 11:00\n\n` +
        `👉 https://www.ticketlink.co.kr/sports/137/59`;

      const result = await sendTelegram(token, chatId, msg);
      sent.push({ game: game.label, ok: result.ok });
    }
  }

  return res.status(200).json({ checked: GAMES.length, sent });
}
