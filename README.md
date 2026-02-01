# Sports.Live - Spoiler-Free NBA Web App

A mobile-first, spoiler-free NBA web application built with Next.js, TypeScript, and Tailwind CSS. Watch NBA games without knowing the score until you're ready!

## Features

### ✅ Implemented

- **Date-based game list**: Browse games by date with an intuitive date picker
- **Spoiler protection**: Scores are hidden by default with a confirmation dialog before revealing
- **Per-game cards**: Display status, time, venue, and broadcast information
- **Mobile-first design**: Responsive layout optimized for mobile devices
- **Dark mode support**: Automatic dark mode based on system preferences
- **PWA manifest**: Ready for Progressive Web App installation

### 🚧 Coming Soon

- Game rating system (0-10 scale) with upvote/downvote
- User authentication with Supabase
- Saved games with bookmarks and notes
- Real-time updates via Supabase Realtime
- Push notifications (spoiler-safe)
- Team pages and filters
- Personalized recommendations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3+ with @tailwindcss/postcss
- **UI Components**: Custom components with shadcn-inspired design
- **State Management**: React hooks + localStorage

### Planned Integrations

- **Database**: Supabase (Postgres + Realtime + Auth)
- **Caching**: Upstash Redis (optional)
- **Storage**: Cloudflare R2 for images
- **Hosting**: Vercel or Cloudflare Pages
- **Cron Jobs**: GitHub Actions or Cloudflare Workers

## Getting Started

### Option 1: Dev Container (Recommended)

The easiest way to get started is using the included dev container:

1. **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open the project in VS Code
3. Click "Reopen in Container" when prompted
4. Wait for the container to build
5. Run `npm run dev` in the terminal
6. Open [http://localhost:3000](http://localhost:3000)

See [.devcontainer/README.md](.devcontainer/README.md) for detailed instructions and troubleshooting.

### Option 2: Local Installation

If you prefer to run locally without Docker:

**Prerequisites**: Node.js 18+ and npm

1. Clone the repository:

```bash
git clone https://github.com/D34NM/sports.live.git
cd sports.live
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Mock Data System

The app currently uses a comprehensive mock data system for development and preview:

### Features

- **30 NBA teams** from all divisions (Eastern & Western Conference)
- **Deterministic scheduling** - same date always generates same games
- **Realistic game times** - 7:00 PM - 10:30 PM ET
- **Various game statuses** - scheduled, live, and final games
- **Broadcasting info** - ESPN, TNT, ABC, NBA TV, League Pass, Local
- **Historical data** - browse any date and see appropriate game schedules

### Game Status Logic

- **Scheduled**: Game hasn't started yet (no spoiler protection needed)
- **Live**: Game is currently in progress (scores hidden by default)
- **Final**: Game has ended (scores hidden by default)

### Testing Scenarios

The mock system includes several pre-defined scenarios in `lib/mockFixtures.ts`:

- Rivalry games (Lakers vs Celtics)
- Overtime thrillers
- Live games in progress
- High-scoring shootouts
- Low-scoring defensive battles
- Blowout games

### API Endpoints

Mock data is served through Next.js API routes:

```typescript
// Get games for a specific date
GET /api/games?date=YYYY-MM-DD

// Get scores for a game (requires explicit reveal)
GET /api/games/[id]/scores
```

### Switching to Real Data

When ready to integrate real NBA data:

1. Set up Supabase database (see `supabase/` directory)
2. Configure environment variables (see `.env.example`)
3. Replace mock data calls in API routes with Supabase queries
4. Set up cron jobs for data fetching (see `NBA_API_INTEGRATION.md`)

### Code Formatting

Code is automatically formatted on commit using Prettier and ESLint. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Project Structure

```
sports.live/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── game/                # Game-specific components
│   │   ├── GameCard.tsx
│   │   └── GameList.tsx
│   └── shared/              # Shared components
│       └── DatePicker.tsx
├── lib/
│   └── mockData.ts          # Mock data generator
├── types/
│   └── game.ts              # TypeScript types
├── public/                  # Static assets
│   └── manifest.json        # PWA manifest
└── README.md
```

## Key Features Explained

### Spoiler Protection System

The app implements a two-step spoiler protection:

1. **Automatic hiding**: Scores for live and finished games are hidden by default
2. **Confirmation dialog**: Users must confirm they want to see the score
3. **Persistent state**: Revealed games are remembered in localStorage
4. **Per-game reveal**: Each game can be revealed/hidden independently

### Game Status Indicators

- 🟢 **Final**: Game has ended (score hidden until revealed)
- 🔴 **Live**: Game is in progress (score hidden until revealed)
- ⚪ **Upcoming**: Game hasn't started yet (no spoiler protection needed)

## Development Roadmap

### Phase 1: Core Features ✅

- [x] Next.js setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Date-based game list
- [x] Spoiler protection system
- [x] Responsive design
- [x] PWA manifest

### Phase 2: Backend & Data

- [ ] Supabase integration
- [ ] Database schema setup
- [ ] NBA API integration
- [ ] Real game data fetching
- [ ] Caching strategy

### Phase 3: User Features

- [ ] Authentication (Supabase Auth)
- [ ] Game rating system
- [ ] Saved games functionality
- [ ] User preferences
- [ ] Bookmarks and notes

### Phase 4: Real-time & PWA

- [ ] Supabase Realtime subscriptions
- [ ] Service worker
- [ ] Offline support
- [ ] Push notifications
- [ ] Install prompt

### Phase 5: Advanced Features

- [ ] Team pages
- [ ] Advanced filters
- [ ] Game recommendations
- [ ] Spoiler-free recaps
- [ ] Multiple language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Inspired by [wikihoops.com](https://wikihoops.com)
- Built with ❤️ for NBA fans who want to avoid spoilers
