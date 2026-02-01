# NBA API Integration Guide

This guide covers integrating real NBA game data into Sports.Live.

## Available Data Sources

### 1. Official NBA Stats API (Unofficial)

**Base URL**: `https://stats.nba.com/stats/`

**Pros:**

- Real-time data
- Comprehensive statistics
- Free to use

**Cons:**

- Unofficial and undocumented
- No official support
- May change without notice
- Aggressive rate limiting

**Key Endpoints:**

```
GET https://stats.nba.com/stats/scoreboardv2
  ?GameDate=2026-01-31
  &LeagueID=00
  &DayOffset=0

GET https://stats.nba.com/stats/scoreboard
  ?GameDate=2026-01-31
  &LeagueID=00
  &DayOffset=0
```

**Headers Required:**

```javascript
{
  'User-Agent': 'Mozilla/5.0',
  'Referer': 'https://stats.nba.com/',
  'Origin': 'https://stats.nba.com'
}
```

### 2. ESPN API

**Base URL**: `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/`

**Pros:**

- More stable than NBA Stats API
- Better documented
- Includes broadcast information

**Cons:**

- Less detailed statistics
- Still unofficial

**Key Endpoints:**

```
GET https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard
  ?dates=20260131

GET https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams

GET https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary
  ?event={gameId}
```

### 3. The Odds API

**Base URL**: `https://api.the-odds-api.com/v4/sports/basketball_nba/`

**Pros:**

- Official API with documentation
- Reliable
- Includes betting odds

**Cons:**

- Requires API key
- Limited free tier (500 requests/month)
- Paid plans required for production

**Key Endpoints:**

```
GET https://api.the-odds-api.com/v4/sports/basketball_nba/scores
  ?apiKey={your_key}
  &daysFrom=3
```

### 4. BallDontLie API

**Base URL**: `https://www.balldontlie.io/api/v1/`

**Pros:**

- Free and open
- Good documentation
- No API key required

**Cons:**

- Limited historical data
- Basic statistics only
- May not have real-time scores

## Implementation Strategy

### 1. Data Fetching Architecture

```typescript
// lib/nba/client.ts
export class NBAClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = 'https://stats.nba.com/stats/';
    this.headers = {
      'User-Agent': 'Mozilla/5.0',
      Referer: 'https://stats.nba.com/',
    };
  }

  async getScoreboard(date: string) {
    const response = await fetch(
      `${this.baseUrl}scoreboardv2?GameDate=${date}&LeagueID=00&DayOffset=0`,
      { headers: this.headers }
    );
    return response.json();
  }
}
```

### 2. Caching Strategy

Use Upstash Redis for caching:

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getCachedGames(date: string) {
  const cached = await redis.get(`games:${date}`);
  if (cached) return cached;

  const games = await fetchGamesFromNBA(date);
  await redis.setex(`games:${date}`, 300, games); // 5 min cache
  return games;
}
```

### 3. Data Transformation

Transform NBA API responses to our schema:

```typescript
// lib/nba/transformer.ts
import { GameSafe } from '$lib/types/game';

export function transformNBAGame(nbaGame: any): GameSafe {
  return {
    id: generateUUID(),
    nbaGameId: nbaGame.gameId,
    homeTeam: {
      id: nbaGame.homeTeam.teamId,
      name: nbaGame.homeTeam.teamName,
      abbreviation: nbaGame.homeTeam.teamTricode,
    },
    awayTeam: {
      id: nbaGame.awayTeam.teamId,
      name: nbaGame.awayTeam.teamName,
      abbreviation: nbaGame.awayTeam.teamTricode,
    },
    gameDate: nbaGame.gameDateTimeUTC,
    status: mapStatus(nbaGame.gameStatus),
    venue: nbaGame.arenaName,
    broadcasts: nbaGame.broadcasters?.map((b) => b.broadcastDisplay),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function mapStatus(nbaStatus: number): 'scheduled' | 'live' | 'final' {
  if (nbaStatus === 1) return 'scheduled';
  if (nbaStatus === 2) return 'live';
  return 'final';
}
```

### 4. Scheduled Updates

Use GitHub Actions or Cloudflare Workers:

```yaml
# .github/workflows/fetch-games.yml
name: Fetch NBA Games
on:
  schedule:
    - cron: '*/10 * * * *' # Every 10 minutes

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Fetch and update games
        run: |
          curl -X POST ${{ secrets.API_ENDPOINT }}/api/cron/fetch-games \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

### 5. Rate Limiting

Implement rate limiting to avoid API bans:

```typescript
// lib/rateLimit.ts
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

let requestCount = 0;
let windowStart = Date.now();

export async function rateLimitedFetch(url: string, options?: RequestInit) {
  const now = Date.now();

  if (now - windowStart > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    windowStart = now;
  }

  if (requestCount >= MAX_REQUESTS) {
    const waitTime = RATE_LIMIT_WINDOW - (now - windowStart);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    requestCount = 0;
    windowStart = Date.now();
  }

  requestCount++;
  return fetch(url, options);
}
```

## Storing Data in Supabase

### Insert Games

```typescript
// lib/db/games.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function upsertGames(games: GameSafe[]) {
  const { data, error } = await supabase
    .from('games')
    .upsert(games, { onConflict: 'nba_game_id' });

  if (error) throw error;
  return data;
}
```

### Store Scores Separately

```typescript
export async function updateGameScores(gameId: string, scores: GameScores) {
  const { data, error } = await supabase.from('game_scores').upsert({
    game_id: gameId,
    home_score: scores.homeScore,
    away_score: scores.awayScore,
    quarter: scores.quarter,
    time_remaining: scores.timeRemaining,
  });

  if (error) throw error;
  return data;
}
```

## Real-Time Updates

Use Supabase Realtime for live score updates:

```typescript
// components/game/LiveGameCard.tsx
useEffect(() => {
  const channel = supabase
    .channel(`game-${gameId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_scores',
        filter: `game_id=eq.${gameId}`,
      },
      (payload) => {
        setScores(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [gameId]);
```

## Error Handling

```typescript
// lib/nba/errorHandler.ts
export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}
```

## Testing

```typescript
// lib/nba/__tests__/client.test.ts
import { NBAClient } from '../client';

describe('NBAClient', () => {
  it('fetches scoreboard data', async () => {
    const client = new NBAClient();
    const data = await client.getScoreboard('2026-01-31');
    expect(data).toHaveProperty('scoreboard');
  });
});
```

## Monitoring

Set up monitoring for API health:

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    nbaApi: await checkNBAApi(),
    supabase: await checkSupabase(),
    redis: await checkRedis(),
  };

  const allHealthy = Object.values(checks).every((check) => check.healthy);

  return NextResponse.json(
    { checks, healthy: allHealthy },
    { status: allHealthy ? 200 : 503 }
  );
}
```

## Best Practices

1. **Cache aggressively**: Use Redis to minimize API calls
2. **Respect rate limits**: Implement backoff and retry logic
3. **Handle errors gracefully**: Provide fallback data when APIs fail
4. **Monitor API health**: Set up alerts for API failures
5. **Use environment variables**: Keep API keys secure
6. **Log all API calls**: Track usage and debug issues
7. **Test with mock data**: Don't hit production APIs during tests

## Production Checklist

- [ ] API keys secured in environment variables
- [ ] Rate limiting implemented
- [ ] Caching strategy in place
- [ ] Error handling and retries
- [ ] Monitoring and alerting
- [ ] Fallback data for API failures
- [ ] CORS configured correctly
- [ ] API usage tracked
- [ ] Cost analysis completed
- [ ] Backup data source identified

## Resources

- [NBA Stats API Documentation (Community)](https://github.com/swar/nba_api)
- [ESPN API Examples](https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c)
- [The Odds API Docs](https://the-odds-api.com/liveapi/guides/v4/)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
