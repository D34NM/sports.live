import { PlayerStats, GamePlayerStats } from '$lib/types/playerStats';

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];

const PLAYER_NAMES = [
	'LeBron James',
	'Stephen Curry',
	'Kevin Durant',
	'Giannis Antetokounmpo',
	'Nikola Jokic',
	'Luka Doncic',
	'Joel Embiid',
	'Jayson Tatum',
	'Damian Lillard',
	'Anthony Davis',
	'Jimmy Butler',
	'Kawhi Leonard',
	'Devin Booker',
	'Ja Morant',
	'Trae Young',
	'Donovan Mitchell',
	'Karl-Anthony Towns',
	'Zion Williamson',
	'Bam Adebayo',
	'Domantas Sabonis',
	"De'Aaron Fox",
	'Tyrese Haliburton',
	'Paolo Banchero',
	'Victor Wembanyama',
	'Shai Gilgeous-Alexander',
	'Jaylen Brown',
	'Kyrie Irving',
	'Paul George',
	'Bradley Beal',
	'DeMar DeRozan',
	'Julius Randle',
	'Jalen Brunson',
];

function generatePlayerName(seed: number): string {
	return PLAYER_NAMES[seed % PLAYER_NAMES.length];
}

function generateJerseyNumber(seed: number): string {
	const numbers = [23, 30, 35, 7, 11, 3, 21, 0, 1, 13, 2, 15, 24, 34, 22, 5];
	return numbers[seed % numbers.length].toString();
}

function generateMinutes(seed: number, isStarter: boolean): string {
	if (!isStarter && seed % 3 === 0) {
		return '0:00'; // DNP
	}
	const minutes = isStarter ? 25 + (seed % 15) : 10 + (seed % 18);
	const seconds = (seed * 7) % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function generatePlayerStats(
	seed: number,
	index: number,
	teamAbbr: string
): PlayerStats {
	const isStarter = index < 5;
	const position = POSITIONS[index % 5];
	const minutes = generateMinutes(seed + index, isStarter);

	// Generate stats based on playing time and position
	const minutesPlayed = parseInt(minutes.split(':')[0]);
	const scoringMultiplier = minutesPlayed > 0 ? minutesPlayed / 36 : 0;

	// Points (higher for guards and forwards)
	const basePoints =
		position === 'PG' || position === 'SG' ? 18 : position === 'SF' ? 16 : 12;
	const points = Math.floor(basePoints * scoringMultiplier + (seed % 10));

	// Field goals
	const fgAttempted = Math.floor(points * 0.8 + (seed % 5));
	const fgMade = Math.floor(fgAttempted * (0.4 + (seed % 20) / 100));

	// 3-pointers (higher for guards)
	const threePtAttempted =
		position === 'PG' || position === 'SG'
			? Math.floor(fgAttempted * 0.4 + (seed % 3))
			: Math.floor(fgAttempted * 0.2 + (seed % 2));
	const threePtMade = Math.floor(threePtAttempted * (0.3 + (seed % 15) / 100));

	// Free throws
	const ftAttempted = Math.floor(points * 0.3 + (seed % 4));
	const ftMade = Math.floor(ftAttempted * (0.75 + (seed % 20) / 100));

	// Rebounds (higher for centers and power forwards)
	const baseRebounds = position === 'C' ? 10 : position === 'PF' ? 8 : 4;
	const rebounds = Math.floor(baseRebounds * scoringMultiplier + (seed % 4));

	// Assists (higher for point guards)
	const baseAssists = position === 'PG' ? 8 : position === 'SG' ? 4 : 2;
	const assists = Math.floor(baseAssists * scoringMultiplier + (seed % 3));

	// Defensive stats
	const steals = Math.floor((seed % 3) * scoringMultiplier);
	const blocks =
		position === 'C' || position === 'PF'
			? Math.floor((seed % 3) * scoringMultiplier)
			: Math.floor((seed % 2) * scoringMultiplier);

	const fouls = Math.floor((seed % 5) * scoringMultiplier);

	return {
		playerId: `${teamAbbr}-player-${index}`,
		playerName: generatePlayerName(seed + index),
		jerseyNumber: generateJerseyNumber(seed + index),
		position,
		points,
		rebounds,
		assists,
		steals,
		blocks,
		fouls: Math.min(fouls, 6), // Max 6 fouls
		minutes,
		fieldGoalsMade: fgMade,
		fieldGoalsAttempted: fgAttempted,
		threePointersMade: threePtMade,
		threePointersAttempted: threePtAttempted,
		freeThrowsMade: ftMade,
		freeThrowsAttempted: ftAttempted,
	};
}

export function generateMockPlayerStatsForGame(
	gameId: string,
	homeTeamAbbr: string,
	awayTeamAbbr: string
): GamePlayerStats {
	// Use gameId as seed for consistent data
	const seed = gameId
		.split('')
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);

	// Generate 12 players per team (5 starters + 7 bench)
	const homeTeamStats: PlayerStats[] = [];
	const awayTeamStats: PlayerStats[] = [];

	for (let i = 0; i < 12; i++) {
		homeTeamStats.push(generatePlayerStats(seed, i, homeTeamAbbr));
		awayTeamStats.push(generatePlayerStats(seed + 1000, i, awayTeamAbbr));
	}

	// Sort by minutes played (descending) and points
	const sortPlayers = (players: PlayerStats[]) => {
		return players.sort((a, b) => {
			const minutesA = parseInt(a.minutes.split(':')[0]);
			const minutesB = parseInt(b.minutes.split(':')[0]);
			if (minutesB !== minutesA) return minutesB - minutesA;
			return b.points - a.points;
		});
	};

	return {
		gameId,
		homeTeamStats: sortPlayers(homeTeamStats),
		awayTeamStats: sortPlayers(awayTeamStats),
	};
}
