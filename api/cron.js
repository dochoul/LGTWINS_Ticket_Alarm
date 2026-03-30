const TEAM_NAMES = {
  'KIA': 'KIA 타이거즈', 'SSG': 'SSG 랜더스', 'NC': 'NC 다이노스',
  'LG': 'LG 트윈스', '두산': '두산 베어스', 'KT': 'kt wiz',
  '한화': '한화 이글스', '삼성': '삼성 라이온즈', '키움': '키움 히어로즈',
  '롯데': '롯데 자이언츠',
};

const DOWS = ['일', '월', '화', '수', '목', '금', '토'];

// KBO 공식 API에서 LG 홈경기 일정 조회
async function fetchLGHomeGames(month) {
  const mm = String(month).padStart(2, '0');
  const res = await fetch('https://www.koreabaseball.com/ws/Schedule.asmx/GetScheduleList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `leId=1&srIdList=0%2C9%2C6&seasonId=2026&gameMonth=${mm}&teamId=LG`,
  });
  const data = await res.json();
  const games = [];

  for (const item of data.rows || []) {
    const row = item.row || [];
    if (row.length < 8) continue;

    const venue = row[7]?.Text || '';
    if (!venue.includes('잠실')) continue;

    // 팀 파싱: <span>KIA</span><em><span>vs</span></em><span>LG</span>
    const teamMatches = (row[2]?.Text || '').match(/<span>([^<]+)<\/span>/g) || [];
    const teams = teamMatches.map(t => t.replace(/<\/?span>/g, ''));
    if (teams.length < 3 || teams[2] !== 'LG') continue;

    // 날짜 파싱: "04.01(수)"
    const dateMatch = (row[0]?.Text || '').match(/(\d+)\.(\d+)\((.)\)/);
    if (!dateMatch) continue;

    // 시간 파싱: "<b>18:30</b>"
    const timeMatch = (row[1]?.Text || '').match(/>(\d+:\d+)</);
    const time = timeMatch ? timeMatch[1] : '18:30';

    const monthNum = dateMatch[1];
    const dayNum = dateMatch[2];
    const dow = dateMatch[3];
    const dateStr = `2026-${monthNum}-${dayNum}`;
    const awayTeam = TEAM_NAMES[teams[0]] || teams[0];

    games.push({ date: dateStr, time, dow, away: awayTeam });
  }

  return games;
}

// 경기일 7일 전 = 티켓 오픈일
function getOpenDate(gameDate) {
  const d = new Date(gameDate + 'T00:00:00+09:00');
  d.setDate(d.getDate() - 7);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

async function sendTelegram(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  return res.json();
}

export default async function handler(req, res) {
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
  const todayStr = new Date(now.getTime() + (9 * 60 * 60 * 1000)).toISOString().split('T')[0];

  // 오늘 기준 앞뒤 2개월 조회 (오픈일이 이번 달, 경기가 다음 달일 수 있음)
  const todayMonth = parseInt(todayStr.substring(5, 7));
  const monthsToCheck = [todayMonth, todayMonth + 1].filter(m => m >= 3 && m <= 10);

  let allGames = [];
  for (const m of monthsToCheck) {
    const games = await fetchLGHomeGames(m);
    allGames = allGames.concat(games);
  }

  const sent = [];

  for (const game of allGames) {
    const openDateStr = getOpenDate(game.date);

    if (openDateStr === todayStr) {
      const gameDate = new Date(game.date + 'T00:00:00+09:00');
      const mm = game.date.substring(5, 7);
      const dd = game.date.substring(8, 10);
      const dow = DOWS[gameDate.getDay()];

      const msg =
        `⚾ LG 트윈스 홈 경기 티켓 오픈 안내\n\n` +
        `📅 경기: ${mm}월 ${parseInt(dd)}일(${dow}) ${game.time} vs ${game.away}\n` +
        `🏟 장소: 잠실야구장\n` +
        `🎫 오픈 시간: 오늘 11:00\n\n` +
        `잠시 후 11시에 티켓팅이 시작됩니다!\n` +
        `👉 https://www.ticketlink.co.kr/sports/137/59`;

      const result = await sendTelegram(token, chatId, msg);
      sent.push({ game: `${mm}/${dd} vs ${game.away}`, ok: result.ok });
    }
  }

  return res.status(200).json({
    today: todayStr,
    gamesFound: allGames.length,
    sent,
  });
}
