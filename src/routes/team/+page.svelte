<script lang="ts">
	import GeometricAvatar from '../../components/GeometricAvatar.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	// AnimeJS - dynamically imported to avoid SSR issues
	let animate: typeof import('animejs').animate;
	let stagger: typeof import('animejs').stagger;

	// Mouse tracking for parallax
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Reduced motion preference
	let prefersReducedMotion = $state(false);

	// Stat counter values for animation
	let statCounters = $state([0, 0, 0]);
	let statsAnimated = $state(false);

	const companyStats = [
		{
			value: 2025,
			displayValue: '2025',
			label: 'Founded',
			countFrom: 2020,
			svgPath:
				'M238.935 106.899C247.347 113.356 247.012 122.058 246.65 131.315L246.648 131.367C246.365 138.742 246.067 146.517 250.212 153.815C254.005 160.524 258.237 164.736 262.65 169.1L238.935 106.899ZM238.935 106.899C228.716 99.0293 218.832 106.369 208.407 114.113L238.935 106.899Z'
		},
		{
			value: 15,
			displayValue: '15',
			label: 'Team Members',
			countFrom: 0,
			svgPath:
				'M170.9 -9.17847L256.679 55.1168H256.626L257.829 56.0171C276.219 69.782 283.963 94.2588 276.932 116.594L243.697 222.074L243.697 222.075C236.668 244.433 216.499 259.5 193.732 259.5H86.2679C63.5009 259.5 43.3324 244.407 36.3029 222.075L36.3028 222.074L3.06762 116.594C-3.96279 94.2324 3.78101 69.782 22.1708 56.0171L22.1711 56.0169L109.15 -9.17787C127.614 -22.941 152.514 -22.9402 170.9 -9.17847ZM140.455 195.989L166.324 147.117L213.693 120.429L214.467 119.993L213.693 119.558L166.324 92.87L140.455 43.9974L140.013 43.1626L139.571 43.9974L113.702 92.87L66.3322 119.558L65.559 119.993L66.3322 120.429L113.702 147.117L139.571 195.989L140.013 196.824L140.455 195.989Z'
		},
		{
			value: 10,
			displayValue: '10+',
			label: 'Projects Delivered',
			countFrom: 0,
			suffix: '+',
			svgPath:
				'M279.474 222.044H279.5C279.5 193.317 279.498 85.76 279.216 26.5422V26.5399C279.216 19.3185 278.37 12.3459 277.263 5.09447L277.262 5.08598C276.706 0.971735 275.06 -3.15835 272.847 -6.74002L272.841 -6.75063C267.089 -16.6025 249.788 -24.2841 234.937 -13.0398L234.93 -13.035C226.679 -6.99327 223.362 1.81309 221.127 11.8466L221.126 11.8513C219.282 19.7652 217.494 27.5476 215.787 34.9802C213.211 46.1938 210.817 56.6112 208.692 65.4827C206.924 72.8595 205.339 79.1756 203.986 83.999C203.31 86.4104 202.69 88.454 202.132 90.073C201.581 91.6736 201.081 92.8913 200.635 93.639C192.949 108.138 176.089 112.423 163.504 103.01L163.5 103.007C158.654 99.2975 155.515 93.8712 153.537 88.2303L153.535 88.2231C151.003 80.6367 149.04 72.7955 147.083 64.9763L147.08 64.9664L147.08 64.9642C145.354 57.9357 143.75 50.9019 142.154 43.8999L141.897 42.7724C140.215 35.3967 138.534 28.0584 136.718 20.7918L136.718 20.791C134.499 11.8499 132.272 2.96453 127.548 -5.07051C122.573 -13.0533 116.001 -17.4421 107.191 -18.8113C106.954 -18.833 106.72 -18.8546 106.487 -18.8761C103.67 -19.1358 101.085 -19.3741 98.2822 -19.3741C97.0923 -19.3741 94.2781 -19.3868 90.4343 -19.4041C76.0971 -19.4685 47.4351 -19.5974 35.3015 -19.3743C28.3583 -19.0932 21.448 -17.436 15.0772 -14.1274L15.0731 -14.1253L15.0731 -14.1253C-0.0521502 -6.44607 -4.1841 13.058 6.57659 26.5107L6.58138 26.5167L6.58134 26.5167C11.2689 32.5648 17.609 36.1441 24.7972 38.0789C26.7063 38.5927 30.8082 39.6684 36.4492 41.1476C52.2497 45.291 80.1254 52.6009 105.709 59.6003C122.223 64.1068 130.105 74.0237 131.288 84.058C132.468 94.066 126.957 104.058 116.971 108.625L116.97 108.625C113.066 110.402 109.468 111.197 105.738 110.946C102.014 110.696 98.1999 109.406 93.8575 107.079C85.7558 102.736 75.6954 94.7105 60.8065 82.8326C59.7804 82.0139 58.7313 81.177 57.6583 80.3217C45.4343 70.6162 32.4182 68.1544 23.3685 70.3504C7.69006 74.1892 0.5 87.8939 0.5 104.257V227.847C0.5 238.33 5.45703 248.515 13.9925 254.283L13.9962 254.285C18.4146 257.329 23.6531 259.243 28.8429 259.243H92.9467C103.886 259.243 112.148 258.602 118.625 254.494C125.081 250.398 129.862 242.787 133.626 228.572C135.726 220.327 137.683 212.081 139.642 203.83L139.643 203.826C141.602 195.578 143.561 187.326 145.662 179.073C145.663 179.072 145.663 179.071 145.663 179.07L146.147 179.194C148.39 169.978 150.916 160.762 153.983 151.804L279.474 222.044ZM279.474 222.044V222.544C279.474 226.463 279.473 230.34 278.912 234.211L278.911 234.22L278.91 234.229C278.226 240.554 275.265 246.885 270.922 251.631C266.579 256.377 260.892 259.5 254.766 259.5H185.893C172.258 259.5 164.107 252.232 160.674 242.949C157.226 233.627 158.536 222.263 163.91 214.147M279.474 222.044L163.91 214.147M163.91 214.147C165.298 212.075 170.103 206.088 176.303 198.601C182.494 191.125 190.05 182.182 196.917 174.217L196.924 174.209C202.338 167.663 204.413 159.259 202.84 151.762C201.264 144.248 196.026 137.674 186.894 134.826L163.91 214.147Z'
		}
	];

	const teamMembers = [
		{ name: 'Sainbileg', role: 'CEO', avatarVariant: 1 },
		{ name: 'Bilguun', role: 'CFO', avatarVariant: 2 },
		{ name: 'Micheal', role: 'Head of Marketing', avatarVariant: 3 },
		{ name: 'Munkh-Od', role: 'CTO', avatarVariant: 4 },
		{ name: 'Bat-Ireedui', role: 'Asset Management', avatarVariant: 5 },
		{ name: 'Dolgoon', role: 'Development Manager', avatarVariant: 6 },
		{ name: 'Gombo-Ochir', role: 'Senior Back-End Developer', avatarVariant: 7 },
		{ name: 'Gan-Erdene', role: 'Senior Front-End Developer', avatarVariant: 8 },
		{ name: 'Batzorig', role: 'Junior Front-End Developer', avatarVariant: 9 },
		{ name: 'Dalai-Erdene', role: 'Junior Front-End Developer', avatarVariant: 10 },
		{ name: 'Bat-Otgon', role: 'Junior Front-End Developer', avatarVariant: 11 },
		{ name: 'Namkhaidorj', role: 'Junior Front-End Developer', avatarVariant: 12 },
		{ name: 'Munkhbayar', role: 'UI/UX Designer', avatarVariant: 13 },
		{ name: 'Temuujin', role: 'UI Designer', avatarVariant: 14 },
		{ name: 'Erkhemchuluun', role: 'Graphic Designer', avatarVariant: 15 }
	] as const;

	// Team rows for staggered animation
	const teamRows = [
		{ label: 'Leadership', members: teamMembers.slice(0, 4) },
		{ label: 'Development', members: teamMembers.slice(4, 8) },
		{ label: 'Engineering', members: teamMembers.slice(8, 12) },
		{ label: 'Design', members: teamMembers.slice(12) }
	];

	function handleMouseMove(e: MouseEvent) {
		if (prefersReducedMotion) return;
		mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
	}

	// 3D tilt effect for team cards
	function handleCardMouseMove(e: MouseEvent, cardEl: HTMLElement) {
		if (prefersReducedMotion) return;
		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;

		cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
	}

	function handleCardMouseLeave(cardEl: HTMLElement) {
		cardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
	}

	// Counter animation
	function animateCounter(index: number, from: number, to: number, duration: number) {
		const startTime = performance.now();
		const diff = to - from;

		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Ease out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			statCounters[index] = Math.round(from + diff * eased);

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		requestAnimationFrame(update);
	}

	// Scroll to top after navigation
	afterNavigate(() => {
		window.scrollTo(0, 0);
	});

	onMount(async () => {
		if (!browser) return;

		// Check reduced motion preference
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Load AnimeJS dynamically (SSR-safe)
		const animeModule = await import('animejs');
		animate = animeModule.animate;
		stagger = animeModule.stagger;

		// Wait for DOM to be ready
		await new Promise((resolve) => setTimeout(resolve, 50));

		if (prefersReducedMotion) {
			document
				.querySelectorAll(
					'.hero-word, .hero-description, .stat-card, .section-title, .team-card, .row-label'
				)
				.forEach((el) => {
					(el as HTMLElement).style.opacity = '1';
				});
			// Set final values for counters
			statCounters = companyStats.map((s) => s.value);
			return;
		}

		// Hero title word-by-word animation
		const titleWords = document.querySelectorAll('.hero-word');
		if (titleWords.length > 0) {
			animate(titleWords, {
				opacity: { to: [0, 1] },
				y: { to: [50, 0] },
				delay: stagger(100),
				duration: 700,
				ease: 'outExpo'
			});
		}

		// Hero description fade
		const heroDesc = document.querySelector('.hero-description');
		if (heroDesc) {
			animate(heroDesc, {
				opacity: { to: [0, 1] },
				y: { to: [30, 0] },
				duration: 600,
				delay: 500,
				ease: 'outExpo'
			});
		}

		// Stats section observer with counter animation
		const statsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !statsAnimated) {
						statsAnimated = true;

						const cards = entry.target.querySelectorAll('.stat-card');

						// Cards flip in from bottom
						animate(cards, {
							opacity: { to: [0, 1] },
							rotateX: { to: [45, 0] },
							y: { to: [100, 0] },
							delay: stagger(200),
							duration: 1000,
							ease: 'outExpo'
						});

						// SVG paths draw in
						const paths = entry.target.querySelectorAll('.stat-path');
						paths.forEach((path, i) => {
							const pathEl = path as SVGPathElement;
							const length = pathEl.getTotalLength();
							pathEl.style.strokeDasharray = `${length}`;
							pathEl.style.strokeDashoffset = `${length}`;

							animate(pathEl, {
								strokeDashoffset: { to: [length, 0] },
								duration: 2000,
								delay: 400 + i * 200,
								ease: 'inOutQuart'
							});
						});

						// Counter animations with stagger
						companyStats.forEach((stat, i) => {
							setTimeout(
								() => {
									animateCounter(i, stat.countFrom, stat.value, 1500);
								},
								600 + i * 200
							);
						});

						statsObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 }
		);

		const statsSection = document.querySelector('.stats-section');
		if (statsSection) {
			statsObserver.observe(statsSection);
		}

		// Section title with glitch effect
		const sectionTitleObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const title = entry.target as HTMLElement;

						// Main reveal
						animate(title, {
							opacity: { to: [0, 1] },
							y: { to: [60, 0] },
							scale: { to: [0.8, 1] },
							duration: 800,
							ease: 'outExpo'
						});

						// Glitch flicker effect
						animate(title, {
							skewX: { to: [0, -2, 3, -1, 0] },
							x: { to: [0, -3, 4, -2, 0] },
							duration: 400,
							delay: 800,
							ease: 'easeInOutQuad'
						});

						sectionTitleObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		const sectionTitle = document.querySelector('.section-title');
		if (sectionTitle) {
			sectionTitleObserver.observe(sectionTitle);
		}

		// Team rows with dramatic stagger
		const teamRowObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Row label slides in
						const rowLabel = entry.target.querySelector('.row-label');
						if (rowLabel) {
							animate(rowLabel, {
								opacity: { to: [0, 1] },
								x: { to: [-50, 0] },
								duration: 600,
								ease: 'outExpo'
							});
						}

						// Cards cascade in with 3D flip
						const cards = entry.target.querySelectorAll('.team-card');
						animate(cards, {
							opacity: { to: [0, 1] },
							rotateY: { to: [-30, 0] },
							rotateX: { to: [20, 0] },
							z: { to: [-200, 0] },
							delay: stagger(100, { start: 200 }),
							duration: 800,
							ease: 'outExpo'
						});

						// Avatar masks reveal with clip-path
						const avatars = entry.target.querySelectorAll('.avatar-container');
						animate(avatars, {
							clipPath: {
								to: ['circle(0% at 50% 50%)', 'circle(100% at 50% 50%)']
							},
							delay: stagger(100, { start: 400 }),
							duration: 700,
							ease: 'outQuart'
						});

						// Names type in effect - each character
						const names = entry.target.querySelectorAll('.member-name');
						names.forEach((name, i) => {
							const text = name.textContent || '';
							name.textContent = '';
							const chars = text.split('');

							chars.forEach((char, j) => {
								setTimeout(
									() => {
										name.textContent += char;
									},
									600 + i * 100 + j * 30
								);
							});
						});

						// Roles fade in after names
						const roles = entry.target.querySelectorAll('.member-role');
						animate(roles, {
							opacity: { to: [0, 1] },
							y: { to: [10, 0] },
							delay: stagger(100, { start: 900 }),
							duration: 500,
							ease: 'outExpo'
						});

						teamRowObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
		);

		document.querySelectorAll('.team-row').forEach((row) => {
			teamRowObserver.observe(row);
		});

		// Mouse tracking for parallax
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			statsObserver.disconnect();
			sectionTitleObserver.disconnect();
			teamRowObserver.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<style>
	/* Initial states for animation */
	.hero-word,
	.hero-description {
		opacity: 0;
	}

	.stat-card {
		opacity: 0;
		transform-style: preserve-3d;
	}

	.section-title {
		opacity: 0;
	}

	.team-card {
		opacity: 0;
		transform-style: preserve-3d;
	}

	.row-label {
		opacity: 0;
	}

	.member-role {
		opacity: 0;
	}

	.avatar-container {
		clip-path: circle(0% at 50% 50%);
	}

	/* Floating keyframe animation */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(161, 161, 170, 0);
		}
		50% {
			box-shadow: 0 0 40px rgba(161, 161, 170, 0.15);
		}
	}

	.floating {
		animation: float 6s ease-in-out infinite;
	}

	/* Stat card styles */
	.stat-card {
		transition:
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.4s ease;
		transform-style: preserve-3d;
	}

	.stat-card:hover {
		transform: translateY(-12px) rotateX(5deg);
		box-shadow:
			0 30px 60px -15px rgba(161, 161, 170, 0.2),
			0 15px 30px -10px rgba(0, 0, 0, 0.4);
	}

	.stat-card:hover .stat-value {
		text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
	}

	/* Team card 3D hover */
	.team-card {
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		transform-style: preserve-3d;
	}

	.team-card:hover {
		z-index: 10;
	}

	/* Avatar glow on hover */
	.team-card:hover .avatar-container {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.team-card:hover .avatar-glow {
		opacity: 1;
	}

	.avatar-glow {
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	/* Row label accent line */
	.row-label::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 100%;
		background: linear-gradient(180deg, transparent, rgba(161, 161, 170, 0.5), transparent);
		border-radius: 2px;
	}

	/* Stat value glow */
	.stat-value {
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.floating {
			animation: none;
		}

		.hero-word,
		.hero-description,
		.stat-card,
		.section-title,
		.team-card,
		.row-label,
		.member-role {
			opacity: 1 !important;
		}

		.avatar-container {
			clip-path: circle(100% at 50% 50%) !important;
		}

		.stat-card:hover,
		.team-card:hover {
			transform: none;
		}
	}
</style>

<div class="relative mx-auto w-full max-w-[1440px] px-5 md:px-16">
	<!-- Floating geometric shapes - more dynamic -->
	<div
		class="floating pointer-events-none absolute right-16 top-24 hidden h-24 w-24 rounded-full border border-zinc-600/40 opacity-50 md:block"
		style="animation-delay: 0s; transform: translate({mouseX * -25}px, {mouseY * -25}px)"
	></div>
	<div
		class="floating pointer-events-none absolute left-24 top-[350px] hidden h-16 w-16 rotate-45 border border-zinc-500/30 opacity-40 md:block"
		style="animation-delay: 1.5s; transform: translate({mouseX * 20}px, {mouseY * 20}px)"
	></div>
	<div
		class="floating pointer-events-none absolute right-1/3 top-[500px] hidden h-8 w-8 rounded-full bg-zinc-600/20 opacity-60 md:block"
		style="animation-delay: 3s; transform: translate({mouseX * -30}px, {mouseY * -30}px)"
	></div>
	<div
		class="floating pointer-events-none absolute left-1/4 top-[800px] hidden h-12 w-12 rotate-12 border border-zinc-700/25 opacity-35 md:block"
		style="animation-delay: 4.5s; transform: translate({mouseX * 15}px, {mouseY * 15}px)"
	></div>

	<div class="mt-[60px] flex flex-col gap-10">
		<!-- Hero Section -->
		<div class="flex flex-col items-center gap-8">
			<div class="flex flex-col items-center gap-6 text-center">
				<h1 class="text-display-4 text-gray-50 md:text-display-2">
					<span class="hero-word inline-block">Meet</span>{' '}
					<span class="hero-word inline-block">the</span>{' '}
					<span class="hero-word inline-block">Team</span>{' '}
					<span class="hero-word inline-block">Behind</span>{' '}
					<span class="hero-word inline-block">iki</span>{' '}
					<span class="hero-word inline-block">solutions</span>
				</h1>
				<p
					class="hero-description max-w-[600px] text-body-2-regular text-gray-100 md:text-body-1-regular"
				>
					Creative technologists crafting exceptional digital experiences.
				</p>
			</div>
		</div>

		<div class="mx-auto flex flex-col justify-center gap-y-8">
			<!-- Stats Section -->
			<div
				class="stats-section flex flex-col items-start gap-6 md:flex-row md:gap-8"
				style="perspective: 1000px"
			>
				{#each companyStats as stat, i}
					<div
						class="stat-card group relative h-[212px] flex-col items-start justify-end gap-3 self-stretch overflow-hidden rounded-3xl border border-opacity-white4 bg-gradient-to-br from-zinc-900/50 to-transparent p-6 transition-all duration-300 hover:border-zinc-600/50 md:w-[416px]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="200"
							height="212"
							viewBox="0 0 200 212"
							class="absolute bottom-0 right-0 opacity-60"
							fill="none"
						>
							<path
								d={stat.svgPath}
								stroke="rgba(255, 255, 255, 0.08)"
								stroke-width="1.5"
								class="stat-path transition-all duration-500 group-hover:stroke-zinc-500/40"
							/>
						</svg>
						<div class="absolute bottom-6 flex flex-col gap-3">
							<p
								class="stat-value font-mono text-h1 tabular-nums text-gray-50 duration-300 group-hover:text-white"
							>
								{statCounters[i]}{stat.suffix || ''}
							</p>
							<p class="text-body-2-medium text-gray-200 group-hover:text-gray-100">{stat.label}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Section Title -->
			<div class="flex justify-center">
				<h2 class="section-title mb-8 mt-[120px] text-h1 text-gray-50 md:text-h4">Team Members</h2>
			</div>

			<!-- Team Rows with Labels -->
			{#each teamRows as row, rowIndex}
				<div class="team-row flex flex-col gap-6" data-row={rowIndex}>
					<!-- Row Label -->
					<div class="row-label relative hidden pl-4 md:block">
						<span class="text-caption-1-medium uppercase tracking-widest text-zinc-500"
							>{row.label}</span
						>
					</div>

					<!-- Team Cards -->
					<div
						class="flex flex-wrap justify-center gap-6 md:gap-8"
						style="perspective: 1200px"
					>
						{#each row.members as member}
							<div
								class="team-card flex w-[160px] flex-col items-center gap-4 md:w-[280px]"
								role="button"
								tabindex="0"
								onmousemove={(e) => handleCardMouseMove(e, e.currentTarget)}
								onmouseleave={(e) => handleCardMouseLeave(e.currentTarget)}
							>
								<div class="avatar-container relative aspect-square w-full overflow-hidden rounded-2xl">
									<!-- Glow effect -->
									<div
										class="avatar-glow absolute inset-0 z-10 rounded-2xl"
										style="box-shadow: inset 0 0 60px rgba(161, 161, 170, 0.1)"
									></div>
									<GeometricAvatar variant={member.avatarVariant} />
									<div
										class="absolute bottom-0 h-[100px] w-full bg-gradient-to-t from-gray-600/90 via-gray-500/50 to-transparent"
									></div>
								</div>
								<div class="flex flex-col items-center gap-1 self-stretch px-1">
									<p class="member-name text-body-2-bold text-gray-50 md:text-h5">{member.name}</p>
									<p
										class="member-role text-center text-caption-2-regular text-gray-100 md:text-body-2-regular"
									>
										{member.role}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
