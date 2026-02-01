import type { GameSafe, GameScores, Team } from '$lib/types/game';

// Comprehensive NBA teams data
const NBA_TEAMS: Team[] = [
	// Eastern Conference - Atlantic Division
	{ id: 'BOS', name: 'Boston Celtics', abbreviation: 'BOS' },
	{ id: 'BKN', name: 'Brooklyn Nets', abbreviation: 'BKN' },
	{ id: 'NYK', name: 'New York Knicks', abbreviation: 'NYK' },
	{ id: 'PHI', name: 'Philadelphia 76ers', abbreviation: 'PHI' },
	{ id: 'TOR', name: 'Toronto Raptors', abbreviation: 'TOR' },

	// Eastern Conference - Central Division
	{ id: 'CHI', name: 'Chicago Bulls', abbreviation: 'CHI' },
	{ id: 'CLE', name: 'Cleveland Cavaliers', abbreviation: 'CLE' },
	{ id: 'DET', name: 'Detroit Pistons', abbreviation: 'DET' },
	{ id: 'IND', name: 'Indiana Pacers', abbreviation: 'IND' },
	{ id: 'MIL', name: 'Milwaukee Bucks', abbreviation: 'MIL' },

	// Eastern Conference - Southeast Division
	{ id: 'ATL', name: 'Atlanta Hawks', abbreviation: 'ATL' },
	{ id: 'CHA', name: 'Charlotte Hornets', abbreviation: 'CHA' },
	{ id: 'MIA', name: 'Miami Heat', abbreviation: 'MIA' },
	{ id: 'ORL', name: 'Orlando Magic', abbreviation: 'ORL' },
	{ id: 'WAS', name: 'Washington Wizards', abbreviation: 'WAS' },

	// Western Conference - Northwest Division
	{ id: 'DEN', name: 'Denver Nuggets', abbreviation: 'DEN' },
	{ id: 'MIN', name: 'Minnesota Timberwolves', abbreviation: 'MIN' },
	{ id: 'OKC', name: 'Oklahoma City Thunder', abbreviation: 'OKC' },
	{ id: 'POR', name: 'Portland Trail Blazers', abbreviation: 'POR' },
	{ id: 'UTA', name: 'Utah Jazz', abbreviation: 'UTA' },

	// Western Conference - Pacific Division
	{ id: 'GSW', name: 'Golden State Warriors', abbreviation: 'GSW' },
	{ id: 'LAC', name: 'Los Angeles Clippers', abbreviation: 'LAC' },
	{ id: 'LAL', name: 'Los Angeles Lakers', abbreviation: 'LAL' },
	{ id: 'PHX', name: 'Phoenix Suns', abbreviation: 'PHX' },
	{ id: 'SAC', name: 'Sacramento Kings', abbreviation: 'SAC' },

	// Western Conference - Southwest Division
	{ id: 'DAL', name: 'Dallas Mavericks', abbreviation: 'DAL' },
	{ id: 'HOU', name: 'Houston Rockets', abbreviation: 'HOU' },
	{ id: 'MEM', name: 'Memphis Grizzlies', abbreviation: 'MEM' },
	{ id: 'NOP', name: 'New Orleans Pelicans', abbreviation: 'NOP' },
	{ id: 'SAS', name: 'San Antonio Spurs', abbreviation: 'SAS' },
];

// Venues mapped to teams
const TEAM_VENUES: Record<string, string> = {
	BOS: 'TD Garden',
	BKN: 'Barclays Center',
	NYK: 'Madison Square Garden',
	PHI: 'Wells Fargo Center',
	TOR: 'Scotiabank Arena',
	CHI: 'United Center',
	CLE: 'Rocket Mortgage FieldHouse',
	DET: 'Little Caesars Arena',
	IND: 'Gainbridge Fieldhouse',
	MIL: 'Fiserv Forum',
	ATL: 'State Farm Arena',
	CHA: 'Spectrum Center',
	MIA: 'FTX Arena',
	ORL: 'Amway Center',
	WAS: 'Capital One Arena',
	DEN: 'Ball Arena',
	MIN: 'Target Center',
	OKC: 'Paycom Center',
	POR: 'Moda Center',
	UTA: 'Vivint Arena',
	GSW: 'Chase Center',
	LAC: 'Crypto.com Arena',
	LAL: 'Crypto.com Arena',
	PHX: 'Footprint Center',
	SAC: 'Golden 1 Center',
	DAL: 'American Airlines Center',
	HOU: 'Toyota Center',
	MEM: 'FedExForum',
	NOP: 'Smoothie King Center',
	SAS: 'AT&T Center',
};

// Broadcast networks with realistic distribution
const BROADCAST_OPTIONS = [
	['ESPN'],
	['TNT'],
	['ABC'],
	['NBA TV'],
	['ESPN', 'Local'],
	['TNT', 'Local'],
	['Local'],
	['League Pass'],
];

/**
 * Generate a deterministic but varied number of games based on date
 * Simulates real NBA schedule patterns
 */
function getGameCountForDate(date: Date): number {
	const dayOfWeek = date.getDay();
	const dateHash = date.getDate() + date.getMonth();

	// More games on Tuesday, Wednesday, Friday, Saturday
	// Fewer on Monday and Sunday
	// Thursday typically has TNT doubleheaders
	if (dayOfWeek === 4) {
		// Thursday - TNT night
		return 6 + (dateHash % 4);
	} else if (
		dayOfWeek === 2 ||
		dayOfWeek === 3 ||
		dayOfWeek === 5 ||
		dayOfWeek === 6
	) {
		return 5 + (dateHash % 5);
	} else if (dayOfWeek === 0) {
		// Sunday
		return 3 + (dateHash % 3);
	} else {
		// Monday
		return 2 + (dateHash % 3);
	}
}

/**
 * Get deterministic but random team pairing based on date and index
 */
function getTeamPairing(date: Date, index: number): { home: Team; away: Team } {
	const seed =
		date.getFullYear() * 10000 +
		date.getMonth() * 100 +
		date.getDate() +
		index * 17;
	const homeIndex = seed % NBA_TEAMS.length;
	let awayIndex = (seed * 13 + index) % NBA_TEAMS.length;

	// Ensure home and away are different
	if (awayIndex === homeIndex) {
		awayIndex = (awayIndex + 1) % NBA_TEAMS.length;
	}

	return {
		home: NBA_TEAMS[homeIndex],
		away: NBA_TEAMS[awayIndex],
	};
}

/**
 * Get game time for a specific game index
 */
function getGameTime(date: Date, index: number): Date {
	const gameDate = new Date(date);

	// Typical NBA game times (ET)
	const startTimes = [
		{ hour: 19, minute: 0 }, // 7:00 PM ET
		{ hour: 19, minute: 30 }, // 7:30 PM ET
		{ hour: 20, minute: 0 }, // 8:00 PM ET
		{ hour: 20, minute: 30 }, // 8:30 PM ET
		{ hour: 22, minute: 0 }, // 10:00 PM ET (West Coast)
		{ hour: 22, minute: 30 }, // 10:30 PM ET (West Coast)
	];

	const timeSlot = startTimes[index % startTimes.length];
	gameDate.setHours(timeSlot.hour, timeSlot.minute, 0, 0);

	return gameDate;
}

/**
 * Determine game status based on current time and game time
 */
function determineGameStatus(
	gameTime: Date,
	now: Date
): 'scheduled' | 'live' | 'final' {
	const timeDiff = now.getTime() - gameTime.getTime();
	const threeHours = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

	if (timeDiff < 0) {
		return 'scheduled';
	} else if (timeDiff < threeHours) {
		return 'live';
	} else {
		return 'final';
	}
}

/**
 * Generate mock games for a specific date
 */
export function generateMockGames(date: Date): GameSafe[] {
	const games: GameSafe[] = [];
	const now = new Date();
	const numGames = getGameCountForDate(date);

	for (let i = 0; i < numGames; i++) {
		const { home, away } = getTeamPairing(date, i);
		const gameTime = getGameTime(date, i);
		const status = determineGameStatus(gameTime, now);
		const broadcastIndex = (date.getDate() + i) % BROADCAST_OPTIONS.length;

		games.push({
			id: `game-${date.toISOString().split('T')[0]}-${i}`,
			nbaGameId: `nba-${date.toISOString().split('T')[0]}-${home.abbreviation}-${away.abbreviation}`,
			homeTeam: home,
			awayTeam: away,
			gameDate: gameTime.toISOString(),
			status,
			venue: TEAM_VENUES[home.id] || `${home.name} Arena`,
			broadcasts: BROADCAST_OPTIONS[broadcastIndex],
			createdAt: new Date(date.getTime() - 24 * 60 * 60 * 1000).toISOString(),
			updatedAt: new Date().toISOString(),
		});
	}

	// Sort by game time
	games.sort(
		(a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime()
	);

	return games;
}

/**
 * Generate realistic mock scores for a game
 */
export function generateMockScores(
	gameId: string,
	status: 'live' | 'final'
): GameScores {
	// Use gameId as seed for deterministic but varied scores
	const seed = gameId
		.split('')
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);

	// Base scores - typical NBA range is 90-130 points
	const baseScore = 95 + (seed % 30);
	const scoreDiff = (seed * 7) % 20; // Score difference 0-19

	const homeScore = baseScore + (seed % 2 === 0 ? scoreDiff : 0);
	const awayScore = baseScore + (seed % 2 === 1 ? scoreDiff : 0);

	if (status === 'final') {
		return {
			homeScore,
			awayScore,
			quarter: 'Final',
			timeRemaining: undefined,
		};
	} else {
		// Live game
		const quarters = ['1st', '2nd', '3rd', '4th', 'OT'];
		const currentQuarter = quarters[(seed * 3) % 4]; // Usually 1-4 quarter
		const minutesLeft = (seed * 11) % 12;
		const secondsLeft = (seed * 13) % 60;

		return {
			homeScore: Math.floor(homeScore * 0.7), // Adjust for partial game
			awayScore: Math.floor(awayScore * 0.7),
			quarter: currentQuarter,
			timeRemaining: `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`,
		};
	}
}

/**
 * Get a specific team by abbreviation
 */
export function getTeamByAbbreviation(abbreviation: string): Team | undefined {
	return NBA_TEAMS.find((team) => team.abbreviation === abbreviation);
}

/**
 * Get all NBA teams
 */
export function getAllTeams(): Team[] {
	return [...NBA_TEAMS];
}

/**
 * Generate historical games for a date range
 */
export function generateHistoricalGames(
	startDate: Date,
	endDate: Date
): GameSafe[] {
	const allGames: GameSafe[] = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const gamesForDate = generateMockGames(currentDate);
		allGames.push(...gamesForDate);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return allGames;
}
