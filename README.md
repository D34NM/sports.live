# Sports.Live - Spoiler-Free NBA Web App

A mobile-first, spoiler-free NBA web application built with SvelteKit, TypeScript, and Tailwind CSS. Watch NBA games without knowing the score until you're ready!

## Features

### ✅ Implemented

- **Date-based game list**: Browse games by date with an intuitive date picker
- **Spoiler protection**: Scores are hidden by default with a confirmation dialog before revealing
- **Per-game cards**: Display status, time, venue, and broadcast information
- **Mobile-first design**: Responsive layout optimized for mobile devices
- **Dark mode support**: Automatic dark mode based on system preferences
- **PWA manifest**: Ready for Progressive Web App installation
- **Game ratings**: Upvote/downvote system for completed games
- **Player statistics**: Expandable player stats for completed games

### 🚧 Coming Soon

- User authentication with Supabase
- Saved games with bookmarks and notes
- Real-time updates via Supabase Realtime
- Push notifications (spoiler-safe)
- Team pages and filters
- Personalized recommendations

## Tech Stack

- **Framework**: SvelteKit 2+ with Svelte 5
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3+
- **UI Components**: Custom Svelte components
- **State Management**: Svelte runes ($state, $derived, $effect)
- **Icons**: Lucide Svelte
- **Build Tool**: Vite

### Planned Integrations

- **Database**: Supabase (Postgres + Realtime + Auth)
- **Caching**: Upstash Redis (optional)
- **Storage**: Cloudflare R2 for images
- **Hosting**: Vercel or Cloudflare Pages
- **Cron Jobs**: GitHub Actions or Cloudflare Workers

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

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

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run svelte-check for type checking
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Project Structure

```
sports.live/
├── src/
│   ├── routes/              # SvelteKit routes
│   │   ├── +page.svelte     # Home page
│   │   ├── +layout.svelte   # Root layout
│   │   └── api/             # API endpoints
│   ├── lib/
│   │   ├── components/      # Svelte components
│   │   │   ├── ui/          # Base UI components
│   │   │   ├── game/        # Game-specific components
│   │   │   └── shared/      # Shared components
│   │   ├── types/           # TypeScript types
│   │   └── mockData.ts      # Mock data generators
│   ├── app.html             # HTML template
│   ├── app.css              # Global styles
│   └── app.d.ts             # Type definitions
├── static/                  # Static assets
├── svelte.config.js         # SvelteKit config
├── vite.config.ts           # Vite config
└── package.json
```

## Features Explained

### Spoiler Protection

The app's core feature is spoiler protection. By default, all game scores are hidden behind a confirmation dialog. When you're ready to see the score, you can reveal it with two clicks:

1. Click "Reveal Score & Stats" on the game card
2. Confirm in the modal dialog

The reveal state is saved in localStorage, so you won't accidentally see the score again if you reload the page.

### Game Ratings

After a game is completed, you can rate it:

- **Great**: Indicates it was an exciting game worth watching
- **Boring**: Indicates it was a less interesting game

This helps other users decide which games are worth watching without revealing the actual score.

### Player Statistics

For completed games, you can view detailed player statistics including:

- Points, rebounds, assists
- Field goal percentage
- 3-point and free throw stats
- Steals, blocks, turnovers, and fouls

## Development

### Tech Stack Highlights

This project uses:

- **SvelteKit** for the web framework
- **Svelte 5 Runes** for reactive state management
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for fast builds

### Code Style

- Use tabs for indentation (configured in Prettier)
- Follow TypeScript strict mode
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Write self-documenting code
- Add comments for complex logic only

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NBA for the game data
- The Svelte team for an amazing framework
- The open-source community

## Roadmap

- [x] Basic spoiler-free game listing
- [x] Date picker for browsing games
- [x] Game rating system
- [x] Player statistics
- [ ] Supabase integration
- [ ] Real-time updates
- [ ] User authentication
- [ ] Saved games
- [ ] Push notifications
- [ ] Team pages
- [ ] Advanced filters

## Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using SvelteKit
