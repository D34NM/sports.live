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

### Prerequisites
- Node.js 18+ and npm

### Installation

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
