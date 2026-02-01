# Devcontainer Testing Guide

This guide helps you test the Sports.Live application in the devcontainer environment with mock data.

## Quick Start

1. Open the project in VS Code
2. Reopen in Container (when prompted)
3. Open terminal and run: `npm run dev`
4. Navigate to [http://localhost:5173](http://localhost:5173)

## Testing Mock Data

### Today's Games

By default, the homepage shows today's games. You should see:

- Mix of scheduled, live, and final games
- Different team matchups
- Various broadcast channels (ESPN, TNT, ABC, NBA TV, Local)
- Realistic game times (7:00 PM - 10:30 PM ET)

### Historical Data

Use the date picker (← and → buttons) to browse different dates:

**Past Dates (e.g., January 25, 2026)**

- All games show status: "Final"
- Scores are hidden until revealed
- Click "Reveal Score" to see mock scores

**Future Dates (e.g., February 10, 2026)**

- All games show status: "Scheduled"
- Game times are displayed
- No scores available (games haven't been played)

**Today's Date**

- Mix of all three statuses: Scheduled, Live, Final
- Some games may be in progress
- Some games may have finished

### Spoiler Protection

Test the spoiler protection system:

1. Navigate to a past date (games with "Final" status)
2. Click on a game card
3. You should see a spoiler alert modal
4. Click "Reveal Score" to see the score
5. Refresh the page - the score should remain revealed (localStorage)
6. Click "Hide Again" to re-enable spoiler protection

### API Testing

Test the API endpoints directly:

```bash
# Get today's games
curl http://localhost:5173/api/games | jq '.'

# Get games for a specific date
curl 'http://localhost:5173/api/games?date=2026-01-25' | jq '.'

# Get scores for a game
curl 'http://localhost:5173/api/games/game-2026-01-25-0/scores' | jq '.'
```

## Expected Mock Data Patterns

### Game Count by Day of Week

The mock system generates deterministic but varied schedules:

- **Sunday**: 3-5 games (lighter schedule)
- **Monday**: 2-4 games (lighter schedule)
- **Tuesday**: 5-9 games (busy night)
- **Wednesday**: 5-9 games (busy night)
- **Thursday**: 6-9 games (TNT Doubleheader night)
- **Friday**: 5-9 games (busy night)
- **Saturday**: 5-9 games (busy night)

### Game Times

Games are scheduled at typical NBA times:

- 7:00 PM ET
- 7:30 PM ET
- 8:00 PM ET
- 8:30 PM ET
- 10:00 PM ET (West Coast games)
- 10:30 PM ET (West Coast games)

### Broadcasting

Games are assigned realistic broadcast networks:

- **ESPN** - National broadcasts
- **TNT** - Thursday doubleheaders and marquee matchups
- **ABC** - Weekend national games
- **NBA TV** - League-specific coverage
- **Local** - Regional sports networks
- **League Pass** - Streaming option

### Score Ranges

Mock scores are realistic for NBA games:

- **Normal games**: 95-125 points per team
- **High-scoring**: 130-145 points
- **Low-scoring**: 85-95 points
- **Close games**: Score difference 1-5 points
- **Blowouts**: Score difference 20+ points

## Testing Different Scenarios

### Test Case 1: Rivalry Games

Look for classic matchups:

- Lakers vs. Celtics
- Warriors vs. Lakers
- Knicks vs. Nets
- Heat vs. Celtics

### Test Case 2: Conference Games

Test Eastern vs. Western Conference matchups:

- Different venue locations
- Time zone appropriate game times
- Realistic travel schedules

### Test Case 3: Live Game Updates

Navigate to today's date and find games with "Live" status:

- Check that scores are hidden
- Verify quarter information (1st, 2nd, 3rd, 4th, OT)
- Confirm time remaining is displayed

### Test Case 4: Scheduled Games

Check future games:

- Verify no "Reveal Score" button appears
- Confirm game time is displayed
- Check broadcast information is present

## Performance Testing

### Load Time

First load should complete in under 3 seconds:

- Check Network tab in DevTools
- Monitor "DOMContentLoaded" time
- Verify images load progressively

### Date Navigation

Switching dates should be instant:

- Mock data generation is deterministic
- No API calls required
- Smooth transitions

### Responsive Design

Test on different viewport sizes:

- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1440px width

Use DevTools device emulation to test:

```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

## Mock Data Fixtures

For specific scenario testing, see `lib/mockFixtures.ts`:

- `RIVALRY_GAME_FINAL` - Lakers vs Celtics classic
- `OVERTIME_GAME` - Warriors vs Suns OT thriller
- `LIVE_GAME_3RD_QUARTER` - Current live game
- `SCHEDULED_GAME_TONIGHT` - Upcoming game
- `HIGH_SCORING_GAME` - 140+ point shootout
- `LOW_SCORING_GAME` - Defensive battle
- `BLOWOUT_GAME` - One-sided game

## Troubleshooting

### No Games Showing

**Check 1**: Verify API is responding

```bash
curl http://localhost:3000/api/games
```

**Check 2**: Check browser console for errors

- Open DevTools (F12)
- Look in Console tab
- Check Network tab for failed requests

### Scores Not Revealing

**Check 1**: Verify scores API is working

```bash
curl 'http://localhost:3000/api/games/game-2026-01-25-0/scores'
```

**Check 2**: Check localStorage

- Open DevTools → Application → Local Storage
- Look for `revealed-game-*` keys
- Clear storage to reset: `localStorage.clear()`

### Date Picker Issues

**Check 1**: Verify date navigation works

- Click ← and → buttons
- Check URL doesn't change (client-side only)
- Verify games update immediately

### Styling Issues

**Check 1**: Verify Tailwind CSS is loaded

- Inspect elements in DevTools
- Check for `className` attributes
- Verify dark mode works (system preference)

## Next Steps

Once you've verified the mock data works:

1. **Integrate Supabase**
   - Set up database (see `supabase/` directory)
   - Add environment variables
   - Replace mock API calls with database queries

2. **Connect NBA API**
   - Review `NBA_API_INTEGRATION.md`
   - Set up data fetching cron jobs
   - Implement caching strategy

3. **Add Authentication**
   - Set up Supabase Auth
   - Implement saved games feature
   - Add user preferences

4. **Enable Real-time Updates**
   - Configure Supabase Realtime
   - Add WebSocket connections
   - Implement live score updates

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Check environment
node --version
npm --version
```

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
