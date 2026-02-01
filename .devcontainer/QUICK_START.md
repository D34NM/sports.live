# Quick Start Guide - Sports.Live Devcontainer

## 🚀 Getting Started (30 seconds)

1. **Open in VS Code**
   - Click "Reopen in Container" when prompted
   - Or: Press `F1` → "Dev Containers: Reopen in Container"

2. **Wait for setup** (automatic, ~2 minutes first time)
   - Container builds
   - Dependencies install
   - Tools configure

3. **Start developing**

   ```bash
   npm run dev
   ```

4. **Open browser** → [http://localhost:3000](http://localhost:3000)

That's it! 🎉

---

## 📋 Quick Commands

```bash
# Development
npm run dev          # Start dev server (hot reload)
npm run build        # Build for production
npm start            # Run production build locally

# Code Quality
npm run lint         # Check for errors
npm run format       # Auto-fix formatting
npm run format:check # Check formatting (CI)

# Testing Mock Data
curl http://localhost:3000/api/games                    # Today's games
curl http://localhost:3000/api/games?date=2026-01-25   # Specific date
curl http://localhost:3000/api/games/game-id/scores    # Game scores
```

---

## 🎯 What You Get Out of the Box

### Mock Data Features

✅ **30 NBA teams** - All divisions and conferences  
✅ **Realistic schedules** - 2-9 games per day based on day of week  
✅ **Deterministic** - Same date = same games every time  
✅ **Game states** - Scheduled, Live, Final  
✅ **Realistic scores** - 85-145 points, varied outcomes  
✅ **Broadcasting** - ESPN, TNT, ABC, NBA TV, Local

### Development Tools

✅ **Hot reload** - Changes appear instantly  
✅ **TypeScript** - Full type safety  
✅ **Tailwind CSS** - Utility-first styling  
✅ **ESLint** - Code linting  
✅ **Prettier** - Auto-formatting  
✅ **Dark mode** - System preference support

---

## 🏀 Testing the App

### Browse Different Dates

1. Use ← → buttons to navigate dates
2. Notice game counts vary by day of week
3. Past dates show "Final" games
4. Future dates show "Scheduled" games
5. Today shows mix of all states

### Test Spoiler Protection

1. Navigate to a past date
2. Find a game with "Final" status
3. Click "Reveal Score"
4. Confirm in the modal
5. Score is revealed and saved
6. Refresh page - score stays revealed
7. Click "Hide Again" to reset

### Check Game Details

- **Game time** - Realistic NBA times (7-10:30 PM ET)
- **Venue** - Home team's arena
- **Broadcast** - Network information
- **Teams** - Full names and abbreviations
- **Status** - Visual indicators

---

## 📚 Key Files

```
.devcontainer/
├── devcontainer.json      # Container configuration
├── post-create.sh         # Setup script
├── README.md              # Detailed docs
└── QUICK_START.md         # This file

lib/
├── mockData.ts            # Mock data generator
└── mockFixtures.ts        # Pre-defined scenarios

app/api/
├── games/route.ts         # Games endpoint
└── games/[id]/scores/     # Scores endpoint
    └── route.ts

Documentation/
├── DEVCONTAINER_TESTING.md  # Testing guide
├── MOCK_DATA_EXAMPLES.md    # API examples
└── README.md                # Main readme
```

---

## 🔧 Common Tasks

### Clear Spoiler Reveals

```javascript
// In browser DevTools console:
localStorage.clear();
// Then refresh page
```

### Change Date Programmatically

```javascript
// Mock data for specific date:
import { generateMockGames } from '@/lib/mockData';

const games = generateMockGames(new Date('2026-01-25'));
console.log(games);
```

---

## 🐛 Troubleshooting

### Dependencies not installing

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Restart TypeScript server in VS Code
# F1 → "TypeScript: Restart TS Server"
```

### Container won't start

```bash
# Rebuild container
# F1 → "Dev Containers: Rebuild Container"
```

---

## 🚀 Next Steps

Once you're comfortable with mock data:

1. **Explore components** in `components/` directory
2. **Review types** in `types/game.ts`
3. **Check existing features** - date picker, game cards, spoiler protection
4. **Read documentation** - especially DEVCONTAINER_TESTING.md
5. **Start building** - add features, improve UI, integrate real APIs

---

## 💡 Pro Tips

- **Hot reload is fast** - Edit code and see changes instantly
- **Mock data is consistent** - Use same dates for reproducible tests
- **Browser DevTools** - Network tab shows API calls, Console for errors
- **VS Code search** - `Ctrl+Shift+F` to find code across project
- **Git integration** - VS Code has built-in Git support

---

## 📖 Documentation Links

- [Full Devcontainer Docs](./README.md)
- [Testing Guide](../DEVCONTAINER_TESTING.md)
- [Mock Data Examples](../MOCK_DATA_EXAMPLES.md)
- [Main README](../README.md)

---

**Need help?** Check the docs above or open an issue on GitHub!

Happy coding! 🏀✨
