const TEAM_NAMES = {
  'KIA': 'KIA 타이거즈', 'SSG': 'SSG 랜더스', 'NC': 'NC 다이노스',
  'LG': 'LG 트윈스', '두산': '두산 베어스', 'KT': 'kt wiz',
  '한화': '한화 이글스', '삼성': '삼성 라이온즈', '키움': '키움 히어로즈',
  '롯데': '롯데 자이언츠',
};

async function fetchMonth(month) {
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

    const teamMatches = (row[2]?.Text || '').match(/<span>([^<]+)<\/span>/g) || [];
    const teams = teamMatches.map(t => t.replace(/<\/?span>/g, ''));
    if (teams.length < 3 || teams[2] !== 'LG') continue;

    const dateMatch = (row[0]?.Text || '').match(/(\d+)\.(\d+)\((.)\)/);
    if (!dateMatch) continue;

    const timeMatch = (row[1]?.Text || '').match(/>(\d+:\d+)</);
    const time = timeMatch ? timeMatch[1] : '18:30';

    const dateStr = `2026-${dateMatch[1]}-${dateMatch[2]}`;
    const away = TEAM_NAMES[teams[0]] || teams[0];
    const dow = dateMatch[3];

    // 오픈일: 경기 7일 전
    const d = new Date(dateStr + 'T00:00:00+09:00');
    d.setDate(d.getDate() - 7);
    const openDate = d.toISOString().split('T')[0] + 'T11:00:00';

    games.push({ date: dateStr, dow, time, away, openDate });
  }

  return games;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

  try {
    let allGames = [];
    for (let m = 3; m <= 10; m++) {
      const games = await fetchMonth(m);
      allGames = allGames.concat(games);
    }
    return res.status(200).json(allGames);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch schedule', detail: err.message });
  }
}
