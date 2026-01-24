<script lang="ts">
	let { variant = 1 } = $props<{ variant?: number }>();

	// Procedural seed-based generation for unique patterns
	function seededRandom(seed: number) {
		const x = Math.sin(seed * 9999) * 10000;
		return x - Math.floor(x);
	}

	function getGradientId(v: number) {
		return `grad-${v}`;
	}

	// Generate colors based on variant
	function getColors(v: number) {
		const palettes = [
			['#3f3f46', '#27272a'], // zinc
			['#3f3f46', '#18181b'], // zinc-darker
			['#52525b', '#27272a'], // zinc-mid
			['#44403c', '#1c1917'], // stone
			['#3f3f46', '#171717'], // neutral
		];
		return palettes[v % palettes.length];
	}
</script>

<svg viewBox="0 0 200 200" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id={getGradientId(variant)} x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:{getColors(variant)[0]};stop-opacity:1" />
			<stop offset="100%" style="stop-color:{getColors(variant)[1]};stop-opacity:1" />
		</linearGradient>
	</defs>
	<rect width="200" height="200" fill="url(#{getGradientId(variant)})" />

	{#if variant === 1}
		<!-- Variant 1: Classic abstract portrait -->
		<circle cx="100" cy="70" r="35" fill="#52525b" />
		<polygon points="60,130 100,100 140,130 140,180 60,180" fill="#71717a" />
		<circle cx="70" cy="50" r="8" fill="#a1a1aa" opacity="0.6" />
		<circle cx="130" cy="60" r="5" fill="#a1a1aa" opacity="0.4" />
		<rect x="45" y="150" width="20" height="20" rx="4" fill="#52525b" opacity="0.5" transform="rotate(15 55 160)" />
	{:else if variant === 2}
		<!-- Variant 2: Diamond focus -->
		<polygon points="100,35 135,70 100,105 65,70" fill="#52525b" />
		<rect x="55" y="115" width="90" height="70" rx="8" fill="#71717a" />
		<circle cx="150" cy="45" r="10" fill="#a1a1aa" opacity="0.5" />
		<circle cx="50" cy="55" r="6" fill="#a1a1aa" opacity="0.3" />
		<polygon points="160,160 175,140 190,170" fill="#52525b" opacity="0.4" />
	{:else if variant === 3}
		<!-- Variant 3: Triple circles -->
		<circle cx="80" cy="60" r="30" fill="#52525b" />
		<circle cx="120" cy="75" r="25" fill="#71717a" />
		<circle cx="100" cy="45" r="20" fill="#a1a1aa" opacity="0.4" />
		<rect x="50" y="130" width="100" height="50" rx="10" fill="#71717a" />
		<polygon points="30,180 50,160 70,180" fill="#52525b" opacity="0.5" />
	{:else if variant === 4}
		<!-- Variant 4: Hexagon centered -->
		<polygon points="100,30 150,55 150,105 100,130 50,105 50,55" fill="#52525b" />
		<circle cx="100" cy="80" r="20" fill="#71717a" />
		<rect x="60" y="150" width="80" height="40" rx="6" fill="#71717a" />
		<circle cx="35" cy="40" r="12" fill="#a1a1aa" opacity="0.4" />
		<circle cx="165" cy="140" r="8" fill="#a1a1aa" opacity="0.3" />
	{:else if variant === 5}
		<!-- Variant 5: Stacked rectangles -->
		<rect x="40" y="40" width="60" height="60" rx="8" fill="#52525b" transform="rotate(15 70 70)" />
		<rect x="80" y="60" width="80" height="50" rx="6" fill="#71717a" />
		<rect x="50" y="130" width="100" height="55" rx="8" fill="#71717a" />
		<circle cx="160" cy="40" r="15" fill="#a1a1aa" opacity="0.4" />
		<polygon points="20,160 40,130 60,160" fill="#52525b" opacity="0.5" />
	{:else if variant === 6}
		<!-- Variant 6: Triangle composition -->
		<polygon points="100,25 160,100 40,100" fill="#52525b" />
		<polygon points="100,100 140,160 60,160" fill="#71717a" />
		<circle cx="100" cy="75" r="18" fill="#71717a" />
		<circle cx="45" cy="50" r="10" fill="#a1a1aa" opacity="0.5" />
		<circle cx="155" cy="55" r="7" fill="#a1a1aa" opacity="0.3" />
		<rect x="75" y="165" width="50" height="25" rx="4" fill="#52525b" opacity="0.6" />
	{:else if variant === 7}
		<!-- Variant 7: Overlapping circles -->
		<circle cx="70" cy="80" r="40" fill="#52525b" />
		<circle cx="130" cy="80" r="35" fill="#71717a" />
		<circle cx="100" cy="120" r="30" fill="#52525b" opacity="0.8" />
		<rect x="60" y="160" width="80" height="30" rx="5" fill="#71717a" />
		<polygon points="170,30 190,50 170,70 150,50" fill="#a1a1aa" opacity="0.4" />
		<circle cx="30" cy="150" r="12" fill="#a1a1aa" opacity="0.3" />
	{:else if variant === 8}
		<!-- Variant 8: Pentagon focus -->
		<polygon points="100,25 155,55 140,115 60,115 45,55" fill="#52525b" />
		<circle cx="100" cy="75" r="22" fill="#71717a" />
		<rect x="55" y="130" width="90" height="55" rx="8" fill="#71717a" />
		<circle cx="170" cy="100" r="10" fill="#a1a1aa" opacity="0.4" />
		<polygon points="20,70 35,50 50,70" fill="#a1a1aa" opacity="0.4" />
	{:else if variant === 9}
		<!-- Variant 9: Abstract wave -->
		<ellipse cx="100" cy="60" rx="55" ry="30" fill="#52525b" />
		<ellipse cx="100" cy="100" rx="45" ry="25" fill="#71717a" />
		<rect x="40" y="130" width="120" height="50" rx="10" fill="#71717a" />
		<circle cx="160" cy="35" r="12" fill="#a1a1aa" opacity="0.5" />
		<circle cx="40" cy="170" r="8" fill="#a1a1aa" opacity="0.3" />
		<polygon points="175,160 190,140 190,180" fill="#52525b" opacity="0.4" />
	{:else if variant === 10}
		<!-- Variant 10: Cross composition -->
		<rect x="80" y="30" width="40" height="100" rx="6" fill="#52525b" />
		<rect x="45" y="60" width="110" height="40" rx="6" fill="#71717a" />
		<rect x="50" y="140" width="100" height="45" rx="8" fill="#71717a" />
		<circle cx="35" cy="35" r="14" fill="#a1a1aa" opacity="0.4" />
		<circle cx="165" cy="170" r="10" fill="#a1a1aa" opacity="0.3" />
	{:else if variant === 11}
		<!-- Variant 11: Nested squares -->
		<rect x="35" y="35" width="130" height="130" rx="12" fill="#52525b" opacity="0.6" />
		<rect x="55" y="55" width="90" height="90" rx="10" fill="#71717a" />
		<rect x="75" y="75" width="50" height="50" rx="8" fill="#52525b" />
		<circle cx="170" cy="30" r="10" fill="#a1a1aa" opacity="0.5" />
		<circle cx="30" cy="170" r="8" fill="#a1a1aa" opacity="0.4" />
		<polygon points="165,165 185,145 185,185" fill="#71717a" opacity="0.5" />
	{:else if variant === 12}
		<!-- Variant 12: Circular array -->
		<circle cx="100" cy="100" r="50" fill="#52525b" />
		<circle cx="60" cy="60" r="20" fill="#71717a" />
		<circle cx="140" cy="60" r="18" fill="#71717a" />
		<circle cx="60" cy="140" r="16" fill="#71717a" />
		<circle cx="140" cy="140" r="22" fill="#71717a" />
		<circle cx="100" cy="100" r="15" fill="#a1a1aa" opacity="0.5" />
		<polygon points="15,100 30,80 30,120" fill="#a1a1aa" opacity="0.3" />
	{:else if variant === 13}
		<!-- Variant 13: Layered triangles -->
		<polygon points="100,20 180,120 20,120" fill="#52525b" />
		<polygon points="100,50 150,110 50,110" fill="#71717a" />
		<polygon points="100,75 125,105 75,105" fill="#a1a1aa" opacity="0.5" />
		<rect x="55" y="135" width="90" height="50" rx="8" fill="#71717a" />
		<circle cx="175" cy="160" r="12" fill="#a1a1aa" opacity="0.3" />
		<circle cx="25" cy="155" r="9" fill="#a1a1aa" opacity="0.4" />
	{:else if variant === 14}
		<!-- Variant 14: Organic blob -->
		<ellipse cx="90" cy="70" rx="45" ry="40" fill="#52525b" transform="rotate(-10 90 70)" />
		<ellipse cx="115" cy="90" rx="35" ry="30" fill="#71717a" transform="rotate(15 115 90)" />
		<rect x="45" y="130" width="110" height="55" rx="10" fill="#71717a" />
		<circle cx="160" cy="40" r="14" fill="#a1a1aa" opacity="0.4" />
		<circle cx="35" cy="120" r="10" fill="#a1a1aa" opacity="0.3" />
		<polygon points="175,180 190,160 190,180" fill="#52525b" opacity="0.5" />
	{:else}
		<!-- Variant 15+: Geometric star pattern -->
		<polygon points="100,20 115,70 170,70 125,100 145,155 100,125 55,155 75,100 30,70 85,70" fill="#52525b" />
		<circle cx="100" cy="90" r="25" fill="#71717a" />
		<rect x="55" y="155" width="90" height="35" rx="6" fill="#71717a" />
		<circle cx="170" cy="150" r="10" fill="#a1a1aa" opacity="0.4" />
		<circle cx="30" cy="145" r="8" fill="#a1a1aa" opacity="0.3" />
		<polygon points="15,50 30,30 45,50 30,70" fill="#a1a1aa" opacity="0.4" />
	{/if}
</svg>
