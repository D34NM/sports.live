<script lang="ts">
	import { Shield } from 'lucide-svelte';

	interface Props {
		teamAbbreviation: string;
		teamName: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
	}

	let { teamAbbreviation, teamName, size = 'md' }: Props = $props();

	const sizeMap = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-12 h-12 text-sm',
		lg: 'w-16 h-16 text-base',
		xl: 'w-20 h-20 text-lg',
	};

	// Team color mapping for visual identification
	const teamColors: Record<string, string> = {
		// Eastern Conference - Atlantic Division
		BOS: 'bg-green-700 text-white',
		BKN: 'bg-black text-white',
		NYK: 'bg-blue-700 text-orange-400',
		PHI: 'bg-blue-600 text-red-500',
		TOR: 'bg-red-600 text-white',
		// Eastern Conference - Central Division
		CHI: 'bg-red-600 text-black',
		CLE: 'bg-red-800 text-yellow-400',
		DET: 'bg-blue-700 text-red-600',
		IND: 'bg-blue-800 text-yellow-400',
		MIL: 'bg-green-800 text-white',
		// Eastern Conference - Southeast Division
		ATL: 'bg-red-600 text-white',
		CHA: 'bg-teal-600 text-purple-400',
		MIA: 'bg-red-700 text-black',
		ORL: 'bg-blue-700 text-black',
		WAS: 'bg-blue-800 text-red-600',
		// Western Conference - Northwest Division
		DEN: 'bg-blue-600 text-yellow-400',
		MIN: 'bg-blue-800 text-green-400',
		OKC: 'bg-blue-700 text-orange-500',
		POR: 'bg-red-600 text-black',
		UTA: 'bg-blue-900 text-yellow-400',
		// Western Conference - Pacific Division
		GSW: 'bg-blue-600 text-yellow-400',
		LAC: 'bg-blue-700 text-red-600',
		LAL: 'bg-purple-700 text-yellow-400',
		PHX: 'bg-purple-700 text-orange-500',
		SAC: 'bg-purple-700 text-gray-300',
		// Western Conference - Southwest Division
		DAL: 'bg-blue-700 text-white',
		HOU: 'bg-red-700 text-white',
		MEM: 'bg-blue-600 text-yellow-400',
		NOP: 'bg-blue-800 text-yellow-400',
		SAS: 'bg-gray-700 text-white',
	};

	const colorClass = $derived(
		teamColors[teamAbbreviation] || 'bg-gray-600 text-white'
	);
	const sizeClass = $derived(sizeMap[size]);
</script>

<div
	class={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-bold shadow-md relative overflow-hidden group`}
	title={teamName}
	role="img"
	aria-label={`${teamName} logo`}
>
	<div class="absolute inset-0 flex items-center justify-center opacity-20">
		<Shield class="w-2/3 h-2/3" />
	</div>
	<span class="relative z-10 font-bold">{teamAbbreviation}</span>
</div>
