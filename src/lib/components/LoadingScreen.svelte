<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isVisible = $state(true);
	let isExiting = $state(false);
	let progress = $state(0);
	let logoRevealed = $state(false);
	let textRevealed = $state(false);
	let lineWidth = $state(0);

	// AnimeJS
	let animate: typeof import('animejs').animate;

	function startProgressAnimation() {
		const startTime = performance.now();
		const duration = 2000;

		function tick() {
			const elapsed = performance.now() - startTime;
			const p = Math.min(elapsed / duration, 1);
			// Ease out cubic
			const eased = 1 - Math.pow(1 - p, 3);
			progress = Math.round(eased * 100);
			lineWidth = eased * 100;

			if (p < 1) {
				requestAnimationFrame(tick);
			} else {
				exitLoader();
			}
		}

		requestAnimationFrame(tick);
	}

	function exitLoader() {
		isExiting = true;

		// Animate out
		const logo = document.querySelector('.loader-logo');
		const text = document.querySelector('.loader-text');
		const progressBar = document.querySelector('.loader-progress');

		if (animate) {
			if (logo) {
				animate(logo, {
					opacity: { to: [1, 0] },
					scale: { to: [1, 1.2] },
					y: { to: [0, -30] },
					duration: 500,
					ease: 'inExpo'
				});
			}

			if (text) {
				animate(text, {
					opacity: { to: [1, 0] },
					y: { to: [0, 20] },
					duration: 400,
					ease: 'inExpo'
				});
			}

			if (progressBar) {
				animate(progressBar, {
					opacity: { to: [1, 0] },
					duration: 300,
					ease: 'inExpo'
				});
			}

			// Curtain reveal - split and slide
			setTimeout(() => {
				const topCurtain = document.querySelector('.curtain-top');
				const bottomCurtain = document.querySelector('.curtain-bottom');

				if (topCurtain) {
					animate(topCurtain, {
						y: { to: [0, '-100%'] },
						duration: 800,
						ease: 'inOutExpo'
					});
				}

				if (bottomCurtain) {
					animate(bottomCurtain, {
						y: { to: [0, '100%'] },
						duration: 800,
						ease: 'inOutExpo'
					});
				}
			}, 400);
		}

		// Remove loader after animation
		setTimeout(() => {
			isVisible = false;
			if (browser) {
				sessionStorage.setItem('iki-loaded', 'true');
			}
		}, 1300);
	}

	onMount(async () => {
		if (!browser) return;

		// Check if we've already shown the loader this session
		const hasLoaded = sessionStorage.getItem('iki-loaded');
		if (hasLoaded) {
			isVisible = false;
			return;
		}

		// Load AnimeJS
		const animeModule = await import('animejs');
		animate = animeModule.animate;

		// Wait for DOM
		await new Promise((r) => setTimeout(r, 100));

		// Logo reveal - scale up from center
		const logo = document.querySelector('.loader-logo');
		if (logo && animate) {
			animate(logo, {
				opacity: { to: [0, 1] },
				scale: { to: [0.5, 1] },
				duration: 800,
				ease: 'outExpo'
			});
		}

		// Reveal logo state
		setTimeout(() => {
			logoRevealed = true;
		}, 400);

		// Text characters stagger in
		setTimeout(async () => {
			textRevealed = true;
			// Wait for text to render
			await new Promise((r) => setTimeout(r, 50));

			const chars = document.querySelectorAll('.loader-char');
			if (chars.length > 0 && animate) {
				animate(chars, {
					opacity: { to: [0, 1] },
					y: { to: [20, 0] },
					delay: (_, i) => i * 50,
					duration: 500,
					ease: 'outExpo'
				});
			}
		}, 600);

		// Start progress after text starts appearing
		setTimeout(() => {
			startProgressAnimation();
		}, 900);
	});

	const brandText = 'iki solutions';
</script>

{#if isVisible}
	<div
		class="loader-container fixed inset-0 z-[100] flex items-center justify-center"
		class:pointer-events-none={isExiting}
	>
		<!-- Split curtains -->
		<div class="curtain-top absolute inset-x-0 top-0 h-1/2 bg-zinc-950"></div>
		<div class="curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950"></div>

		<!-- Content -->
		<div class="relative z-10 flex flex-col items-center gap-8">
			<!-- Logo -->
			<div class="loader-logo opacity-0">
				<img src="/Logo.svg" alt="iki" class="h-20 w-20 md:h-24 md:w-24" draggable="false" />
			</div>

			<!-- Brand text -->
			{#if logoRevealed}
				<div class="loader-text flex items-center gap-1">
					{#each brandText.split('') as char, i}
						<span
							class="loader-char inline-block text-2xl font-semibold tracking-wide opacity-0 md:text-3xl {char ===
							' '
								? 'w-3'
								: 'text-white'}"
						>
							{char === ' ' ? '\u00A0' : char}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Progress bar -->
			<div class="loader-progress flex flex-col items-center gap-3">
				<div class="h-[2px] w-48 overflow-hidden rounded-full bg-zinc-800 md:w-64">
					<div
						class="h-full rounded-full bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600"
						style="width: {lineWidth}%; transition: width 50ms linear;"
					></div>
				</div>
				<span class="font-mono text-xs tabular-nums text-zinc-500">{progress}%</span>
			</div>
		</div>

		<!-- Floating particles -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			{#each Array(6) as _, i}
				<div
					class="particle absolute h-1 w-1 rounded-full bg-zinc-700"
					style="
						left: {15 + i * 15}%;
						top: {20 + (i % 3) * 25}%;
						animation: float-particle {3 + i * 0.5}s ease-in-out infinite;
						animation-delay: {i * 0.3}s;
					"
				></div>
			{/each}
		</div>
	</div>
{/if}

<style>
	@keyframes float-particle {
		0%,
		100% {
			transform: translateY(0) scale(1);
			opacity: 0.3;
		}
		50% {
			transform: translateY(-30px) scale(1.5);
			opacity: 0.6;
		}
	}

	.loader-char {
		will-change: transform, opacity;
	}

	.curtain-top,
	.curtain-bottom {
		will-change: transform;
	}
</style>
