<script lang="ts">
	import { Isax } from 'isaxvelte';
	import Button from '../components/ui/Button.svelte';
	import ContactModal from '../components/ContactModal.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// AnimeJS - dynamically imported to avoid SSR issues
	let animate: typeof import('animejs').animate;
	let stagger: typeof import('animejs').stagger;
	let splitText: typeof import('animejs').splitText;

	// Lazy load 3D components (SSR safe)
	let HeroScene: typeof import('$lib/components/HeroScene.svelte').default | null = $state(null);

	let isModalOpen = $state(false);
	let heroContainer: HTMLElement;
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroDescription: HTMLElement;
	let heroCta: HTMLElement;
	let servicesSection: HTMLElement;
	let processSection: HTMLElement;
	let worksSection: HTMLElement;
	let ctaSection: HTMLElement;
	let projectsTrack: HTMLElement;
	let progressBar: HTMLElement;

	// Horizontal scroll progress for projects
	let projectsScrollProgress = $state(0);

	// GSAP ScrollTrigger instance for cleanup
	let projectsScrollTrigger: ScrollTrigger | null = null;

	// Mouse tracking for parallax
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Rotating words
	let wordElement: HTMLSpanElement;
	let currentWordIndex = 0;
	const words = ['Building', 'Designing', 'Creating', 'Crafting'];
	let displayWord = $state(words[0]);
	let wordInterval: ReturnType<typeof setInterval>;

	// Scroll progress
	let scrollY = $state(0);

	function handleCloseModal() {
		isModalOpen = false;
	}

	// Track if word animation is in progress
	let isAnimatingWord = false;

	// Store split text references for cleanup
	let heroSplits: { revert: () => void }[] = [];

	function animateWord() {
		if (!wordElement || isAnimatingWord || !animate) return;
		isAnimatingWord = true;

		// Animate out
		animate(wordElement, {
			opacity: { to: 0 },
			translateY: { to: -20 },
			duration: 300,
			ease: 'inQuad',
			onComplete: () => {
				// Reset transform and change word
				wordElement.style.transform = '';
				wordElement.style.opacity = '0';

				currentWordIndex = (currentWordIndex + 1) % words.length;
				displayWord = words[currentWordIndex];

				// Wait for Svelte to update, then animate in
				setTimeout(() => {
					animate(wordElement, {
						opacity: { to: [0, 1] },
						translateY: { to: [20, 0] },
						duration: 400,
						ease: 'outExpo',
						onComplete: () => {
							// Clean up transform styles
							wordElement.style.transform = '';
							isAnimatingWord = false;
						}
					});
				}, 20);
			}
		});
	}

	// SVG Morph elements
	let heroBlob1: SVGPathElement;
	let heroBlob2: SVGPathElement;

	const heroMorphPaths = {
		path1: [
			'M0,50 Q25,0 50,50 T100,50 T150,50',
			'M0,50 Q25,80 50,50 T100,30 T150,50',
			'M0,50 Q25,20 50,60 T100,40 T150,50'
		],
		path2: [
			'M0,30 C20,10 40,50 60,30 S100,50 120,30',
			'M0,30 C20,50 40,10 60,40 S100,20 120,30',
			'M0,30 C20,30 40,30 60,50 S100,30 120,30'
		]
	};

	function initHeroMorphs() {
		if (!browser || !animate) return;

		// SVG path morphing with AnimeJS
		if (heroBlob1) {
			animate(heroBlob1, {
				d: heroMorphPaths.path1,
				duration: 6000,
				ease: 'inOutSine',
				loop: true,
				alternate: true
			});
		}

		if (heroBlob2) {
			animate(heroBlob2, {
				d: heroMorphPaths.path2,
				duration: 5000,
				ease: 'inOutQuad',
				loop: true,
				alternate: true
			});
		}
	}

	// Intersection Observer for scroll animations
	function createScrollObserver() {
		if (!browser || !animate) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						const delay = parseInt(target.dataset.delay || '0');

						animate(target, {
							opacity: { to: [0, 1] },
							y: { to: [60, 0] },
							duration: 800,
							delay,
							ease: 'outExpo'
						});

						observer.unobserve(target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		// Observe all scroll-animated elements
		document.querySelectorAll('.scroll-reveal').forEach((el) => {
			(el as HTMLElement).style.opacity = '0';
			observer.observe(el);
		});

		return observer;
	}

	// Enhanced services animation with stagger + direction
	function initServicesAnimation() {
		if (!browser || !animate) return;

		const serviceCards = document.querySelectorAll('.service-card');
		serviceCards.forEach((el) => {
			(el as HTMLElement).style.opacity = '0';
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Animate all service cards with stagger
						animate('.service-card', {
							opacity: { to: [0, 1] },
							y: { to: [80, 0] },
							scale: { to: [0.9, 1] },
							delay: stagger(150),
							duration: 800,
							ease: 'outExpo'
						});

						// Animate icons with bounce
						animate('.service-card .service-icon', {
							scale: { to: [0, 1.2, 1] },
							rotate: { to: [45, 0] },
							delay: stagger(150, { start: 200 }),
							duration: 600,
							ease: 'outBack'
						});

						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (servicesSection) {
			observer.observe(servicesSection);
		}
	}

	// GSAP ScrollTrigger for horizontal scroll
	function initProjectsScroll() {
		if (!browser || !worksSection || !projectsTrack) return;

		// Register GSAP plugin
		gsap.registerPlugin(ScrollTrigger);

		// Calculate scroll distance (track width - viewport + padding for full reveal)
		const totalWidth = projectsTrack.scrollWidth;
		const viewportWidth = window.innerWidth;
		const isMobile = viewportWidth < 768;
		const fullScrollDistance = totalWidth - viewportWidth + 200;

		// Mobile starts at 0%, desktop starts at 20%
		const startPercent = isMobile ? 0 : 0.2;
		const initialOffset = fullScrollDistance * startPercent;
		const scrollDistance = fullScrollDistance * (1 - startPercent);

		// Set initial position
		gsap.set(projectsTrack, { x: -initialOffset });

		// Create ScrollTrigger with pinning
		const trigger = ScrollTrigger.create({
			trigger: worksSection,
			start: 'top top',
			end: () => `+=${scrollDistance}`,
			pin: true,
			scrub: 1,
			anticipatePin: 1,
			invalidateOnRefresh: true,
			onUpdate: (self) => {
				// Progress calculation
				const adjustedProgress = startPercent + (self.progress * (1 - startPercent));
				projectsScrollProgress = adjustedProgress;
				// Animate track position
				gsap.set(projectsTrack, { x: -initialOffset - (scrollDistance * self.progress) });
				// Update progress bar
				if (progressBar) {
					gsap.set(progressBar, { width: `${adjustedProgress * 100}%` });
				}
			}
		});

		projectsScrollTrigger = trigger;

		return () => {
			if (projectsScrollTrigger) {
				projectsScrollTrigger.kill();
				projectsScrollTrigger = null;
			}
		};
	}

	onMount(async () => {
		if (browser) {
			// Load AnimeJS dynamically (SSR-safe)
			const animeModule = await import('animejs');
			animate = animeModule.animate;
			stagger = animeModule.stagger;
			splitText = animeModule.splitText;

			// Register GSAP plugin (for horizontal scroll)
			gsap.registerPlugin(ScrollTrigger);

			// Load 3D scene
			const module = await import('$lib/components/HeroScene.svelte');
			HeroScene = module.default;

			// Wait for DOM to be ready
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Hero animations with AnimeJS v4
			const heroLines = document.querySelectorAll('.hero-line');
			if (heroLines.length > 0) {
				animate(heroLines, {
					opacity: { to: [0, 1] },
					y: { to: [60, 0] },
					delay: stagger(150),
					duration: 800,
					ease: 'outExpo'
				});
			}

			// Subtitle animation
			if (heroSubtitle) {
				animate(heroSubtitle, {
					opacity: { to: [0, 1] },
					y: { to: [60, 0] },
					duration: 800,
					delay: 500,
					ease: 'outExpo'
				});
			}

			// Description animation
			if (heroDescription) {
				animate(heroDescription, {
					opacity: { to: [0, 1] },
					y: { to: [40, 0] },
					duration: 600,
					delay: 700,
					ease: 'outExpo'
				});
			}

			// CTA animation
			if (heroCta) {
				animate(heroCta, {
					opacity: { to: [0, 1] },
					y: { to: [30, 0] },
					scale: { to: [0.9, 1] },
					duration: 500,
					delay: 900,
					ease: 'outExpo'
				});
			}

			// Tags animation
			const heroTags = document.querySelectorAll('.hero-tag');
			if (heroTags.length > 0) {
				animate(heroTags, {
					opacity: { to: [0, 1] },
					y: { to: [20, 0] },
					scale: { to: [0.8, 1] },
					delay: stagger(100, { start: 800 }),
					duration: 400,
					ease: 'outExpo'
				});
			}

			// Start word rotation
			wordInterval = setInterval(animateWord, 2500);

			// Mouse parallax
			const handleMouseMove = (e: MouseEvent) => {
				mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
				mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
			};
			window.addEventListener('mousemove', handleMouseMove);

			// Scroll tracking
			const handleScroll = () => {
				scrollY = window.scrollY;
			};
			window.addEventListener('scroll', handleScroll);

			// Initialize scroll observer
			setTimeout(() => createScrollObserver(), 100);

			// Initialize hero morphs
			setTimeout(() => initHeroMorphs(), 200);

			// Initialize enhanced services animation
			setTimeout(() => initServicesAnimation(), 150);

			// Initialize GSAP ScrollTrigger for projects
			let cleanupProjectsScroll: (() => void) | undefined;
			setTimeout(() => {
				cleanupProjectsScroll = initProjectsScroll();
			}, 100);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('scroll', handleScroll);
				cleanupProjectsScroll?.();
			};
		}
	});

	onDestroy(() => {
		if (wordInterval) clearInterval(wordInterval);
		// Cleanup split text instances
		heroSplits.forEach((split) => {
			try {
				split.revert();
			} catch (e) {
				// Ignore errors during cleanup
			}
		});
		heroSplits = [];
	});

	const services = [
		{
			icon: 'code1',
			title: 'Web Development',
			description: 'Modern, performant web applications using cutting-edge technologies. From landing pages to complex platforms.'
		},
		{
			icon: 'mobileprogramming',
			title: 'Mobile Development',
			description: 'Native and cross-platform mobile apps crafted for seamless experiences across all devices.'
		},
		{
			icon: 'magicpen',
			title: 'Creative Development',
			description: 'Pushing boundaries with animations, 3D elements, and interactive storytelling that captivates.'
		},
		{
			icon: 'pentool2',
			title: 'UX/UI Design',
			description: 'Intuitive and visually engaging experiences. Functional meets beautiful.'
		}
	];

	const processes = [
		{ icon: 'glass', title: 'Discover', description: 'Deep dive into your vision, goals, and challenges.' },
		{ icon: 'brush2', title: 'Design', description: 'Craft intuitive interfaces and compelling visuals.' },
		{ icon: 'code1', title: 'Develop', description: 'Build with precision using modern technologies.' },
		{ icon: 'rocket', title: 'Deploy', description: 'Launch, optimize, and scale with confidence.' }
	];

	const projects = [
		{
			name: 'Goodwine',
			description: 'Premium wine e-commerce mobile app — secure auth, Qpay checkout, real-time order tracking.',
			image: '/projects/goodwine-cover.png',
			tags: ['Mobile E-commerce', 'React Native', 'Qpay'],
			href: '/projects/goodwine'
		},
		{
			name: 'Amuse-Bouche',
			description: 'QR-driven loyalty app for restaurant groups — multi-brand memberships, fiat + Bitcoin balances.',
			image: '/projects/amuse-cover.png',
			tags: ['Loyalty', 'QR Check-in', 'React Native'],
			href: '/projects/amuse'
		},
		{
			name: 'GoodWine Web',
			description: 'Full Next.js commerce platform — branded storefront, customer accounts, admin dashboard.',
			image: '/projects/goodwine-cover.png',
			tags: ['Web E-commerce', 'Next.js', 'tRPC'],
			href: '/projects/wine'
		},
		{
			name: 'Nair',
			description: "Mongolia's first end-to-end celebration platform — venues, vendors, and bookings.",
			image: '/projects/nair-cover.png',
			tags: ['Marketplace', 'SvelteKit', 'i18n'],
			href: '/projects/nair'
		},
		{
			name: 'CMM MarketIQ',
			description: 'B2B intelligence platform for capital markets — editorial CMS, deal flow, insights.',
			image: '/projects/cmm-cover.png',
			tags: ['B2B Platform', 'Editorial CMS', 'Next.js'],
			href: '/projects/cmm'
		}
	];

	const heroTags = ['Web Apps', 'Mobile', 'Creative Dev', 'UI/UX', 'E-Commerce'];
	const tagPositions = [
		{ top: '5%', left: '0%' },
		{ top: '20%', left: '50%' },
		{ top: '45%', left: '10%' },
		{ top: '60%', left: '55%' },
		{ top: '80%', left: '25%' }
	];
</script>

<style>
	.hero-gradient {
		background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(113, 113, 122, 0.15), transparent);
	}

	/* Hero line containers */
	.hero-line {
		display: block;
		overflow: visible;
		padding-bottom: 0.1em;
	}

	/* Word element specific styling */
	.word-element {
		display: inline-block;
		padding-bottom: 0.15em;
		margin-bottom: -0.15em;
	}

	.text-gradient {
		background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 50%, #ffffff 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 8s ease infinite;
	}

	@keyframes shimmer {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	.glow-line {
		background: linear-gradient(90deg, transparent, rgba(161, 161, 170, 0.5), transparent);
		height: 1px;
	}

	.floating {
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	.card-glow:hover {
		box-shadow: 0 0 60px -12px rgba(161, 161, 170, 0.2);
	}

	.project-card {
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		background: linear-gradient(135deg, rgba(24, 24, 27, 0.95) 0%, rgba(9, 9, 11, 0.98) 100%);
	}

	.project-card:hover {
		border-color: rgba(113, 113, 122, 0.5);
		box-shadow: 0 20px 60px -12px rgba(0, 0, 0, 0.5);
	}

	/* Service card initial state */
	.service-card {
		opacity: 0;
	}

	/* Service icon animation */
	.service-icon {
		transform-origin: center;
	}

	/* Projects section - ensure clipping and containment */
	.projects-section {
		overflow: hidden;
		contain: paint;
	}

	/* Projects horizontal scroll track - GSAP handles transforms */
	.projects-track {
		/* GSAP controls transforms */
	}
</style>

<!-- Hero Section -->
<section
	bind:this={heroContainer}
	class="relative min-h-[90vh] flex flex-col justify-center overflow-hidden hero-gradient"
>
	<!-- 3D Background -->
	{#if HeroScene}
		<div
			class="absolute inset-0 w-full h-full"
			style="transform: translate({mouseX * 10}px, {mouseY * 10}px)"
		>
			<HeroScene {scrollY} />
		</div>
	{/if}

	<!-- SVG Morphing Lines -->
	<svg
		class="absolute inset-0 w-full h-full pointer-events-none opacity-30"
		viewBox="0 0 150 100"
		preserveAspectRatio="none"
	>
		<defs>
			<linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style="stop-color: transparent" />
				<stop offset="50%" style="stop-color: rgba(161, 161, 170, 0.5)" />
				<stop offset="100%" style="stop-color: transparent" />
			</linearGradient>
		</defs>
		<path
			bind:this={heroBlob1}
			d="M0,50 Q25,0 50,50 T100,50 T150,50"
			fill="none"
			stroke="url(#hero-line-grad)"
			stroke-width="0.3"
		/>
		<path
			bind:this={heroBlob2}
			d="M0,30 C20,10 40,50 60,30 S100,50 120,30"
			fill="none"
			stroke="url(#hero-line-grad)"
			stroke-width="0.2"
			transform="translate(0, 40)"
		/>
	</svg>

	<!-- Floating geometric accents -->
	<div
		class="absolute top-20 left-10 w-24 h-24 border border-zinc-700/30 rounded-full floating opacity-40"
		style="animation-delay: 0s; transform: translate({mouseX * -20}px, {mouseY * -20}px)"
	></div>
	<div
		class="absolute bottom-40 right-20 w-16 h-16 border border-zinc-600/20 rotate-45 floating opacity-30"
		style="animation-delay: -2s; transform: translate({mouseX * 15}px, {mouseY * 15}px)"
	></div>
	<div
		class="absolute top-1/3 right-1/4 w-8 h-8 bg-zinc-700/10 rounded-full floating opacity-50"
		style="animation-delay: -4s; transform: translate({mouseX * -25}px, {mouseY * -25}px)"
	></div>

	<!-- Content -->
	<div class="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-16 py-20">
		<div class="flex flex-col lg:flex-row gap-16 items-center">
			<!-- Left: Main content -->
			<div class="flex-1 space-y-8">
				<div bind:this={heroTitle}>
					<h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
						<span class="hero-line block">
							<span
								bind:this={wordElement}
								class="inline-block text-gradient word-element"
							>{displayWord}</span>
						</span>
						<span class="hero-line block text-zinc-400">digital</span>
						<span class="hero-line block text-white">experiences</span>
					</h1>
				</div>

				<div bind:this={heroSubtitle}>
					<div class="glow-line w-32 mb-6"></div>
					<p class="text-xl md:text-2xl text-zinc-400 font-light max-w-lg">
						with trust and passion
					</p>
				</div>

				<p
					bind:this={heroDescription}
					class="text-zinc-500 text-lg max-w-md leading-relaxed"
				>
					Your partner in digital innovation. We blend technical expertise
					with exceptional craftsmanship to bring your vision to life.
				</p>

				<div bind:this={heroCta} class="flex gap-4 pt-4">
					<Button size="lg" on:click={() => isModalOpen = true}>
						Start a Project
					</Button>
					<a href="/work">
						<Button size="lg" variant="secondary" rightIcon="arrowright">
							View Work
						</Button>
					</a>
				</div>
			</div>

			<!-- Right: Floating tags -->
			<div class="relative h-[400px] hidden lg:block w-[400px] shrink-0">
				{#each heroTags as tag, i}
					<div
						class="hero-tag absolute group whitespace-nowrap"
						style="opacity: 0; top: {tagPositions[i].top}; left: {tagPositions[i].left};"
					>
						<div
							class="px-5 py-3 rounded-2xl border border-zinc-700/50 bg-zinc-800/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-zinc-700/50 group-hover:border-zinc-600 group-hover:scale-105 cursor-default"
							style="transform: translate({mouseX * (5 + i * 3)}px, {mouseY * (5 + i * 3)}px);"
						>
							<span class="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
								{tag}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
		<span class="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
		<div class="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
	</div>
</section>

<!-- Services Section -->
<section bind:this={servicesSection} class="py-32 relative">
	<div class="mx-auto max-w-[1440px] px-5 md:px-16">
		<!-- Section header -->
		<div class="scroll-reveal text-center mb-20" data-delay="0">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 mb-6">
				<Isax name="flash1" type="twotone" size="16px" />
				<span class="text-sm text-zinc-400">Our Services</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
				Crafting Digital Excellence
			</h2>
			<p class="text-zinc-500 text-lg max-w-2xl mx-auto">
				We design and develop solutions that transform ideas into impactful platforms.
			</p>
		</div>

		<!-- Services grid -->
		<div class="grid md:grid-cols-2 gap-6">
			{#each services as service, i}
				<div
					class="service-card group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50
							 hover:border-zinc-700 transition-all duration-500 card-glow cursor-default"
				>
					<div class="flex items-start gap-6">
						<div class="service-icon p-4 rounded-2xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
							<span class="text-zinc-400 group-hover:text-white transition-colors">
								<Isax name={service.icon} type="outline" size="28px" />
							</span>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-semibold text-white mb-2 group-hover:text-zinc-100">
								{service.title}
							</h3>
							<p class="text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
								{service.description}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Process Section -->
<section bind:this={processSection} class="py-32 relative">
	<div class="mx-auto max-w-[1440px] px-5 md:px-16">
		<div class="scroll-reveal text-center mb-20" data-delay="0">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 mb-6">
				<Isax name="routing2" type="twotone" size="16px" />
				<span class="text-sm text-zinc-400">Our Process</span>
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
				From Idea to Launch
			</h2>
			<p class="text-zinc-500 text-lg max-w-2xl mx-auto">
				A streamlined approach that delivers results at every stage.
			</p>
		</div>

		<!-- Process steps -->
		<div class="relative">
			<!-- Connecting line -->
			<div class="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2"></div>

			<div class="grid md:grid-cols-4 gap-8">
				{#each processes as process, i}
					<div
						class="scroll-reveal relative text-center group"
						data-delay={i * 150}
					>
						<!-- Step number -->
						<div class="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl font-bold text-zinc-800/50
									group-hover:text-zinc-700/50 transition-colors select-none">
							{String(i + 1).padStart(2, '0')}
						</div>

						<div class="relative pt-8">
							<div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-800 border border-zinc-700
										flex items-center justify-center group-hover:bg-zinc-700
										group-hover:border-zinc-600 transition-all duration-300">
								<span class="text-zinc-400 group-hover:text-white transition-colors">
									<Isax name={process.icon} type="outline" size="24px" />
								</span>
							</div>
							<h3 class="text-lg font-semibold text-white mb-2">{process.title}</h3>
							<p class="text-zinc-500 text-sm">{process.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Works Section - Horizontal Scroll -->
<section bind:this={worksSection} class="projects-section h-screen flex flex-col justify-center bg-[#0a0a0a] overflow-hidden">
	<!-- Header -->
	<div class="mx-auto max-w-[1440px] w-full px-5 md:px-16 mb-8 md:mb-12">
		<div class="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6" data-delay="0">
			<div>
				<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 mb-6">
					<Isax name="box1" type="linear" size="16px" />
					<span class="text-sm text-zinc-400">Featured Work</span>
				</div>
				<h2 class="text-4xl md:text-5xl font-bold text-white">
					Projects That Define Us
				</h2>
			</div>
			<a href="/work" class="hidden md:block">
				<Button variant="secondary" rightIcon="arrowright">
					View All Projects
				</Button>
			</a>
		</div>
	</div>

	<!-- Horizontal scroll track -->
	<div class="overflow-hidden">
		<div
			bind:this={projectsTrack}
			class="projects-track flex gap-6 md:gap-8 pl-6 md:pl-[calc(50vw-325px)] pr-6 md:pr-24 will-change-transform"
		>
			{#each projects as project, i}
				<a
					href={project.href}
					class="project-card flex-shrink-0 w-[85vw] md:w-[650px] h-[320px] md:h-[380px] flex rounded-3xl overflow-hidden border border-zinc-800 group"
				>
					<!-- Image side -->
					<div class="w-3/5 relative overflow-hidden bg-zinc-900">
						<img
							src={project.image}
							alt={project.name}
							class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<!-- Gradient overlay -->
						<div class="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/60"></div>
					</div>

					<!-- Content side -->
					<div class="w-2/5 p-6 md:p-8 flex flex-col justify-between bg-zinc-900/95">
						<div>
							<span class="text-5xl md:text-6xl font-bold text-zinc-800">0{i + 1}</span>
							<h3 class="text-xl md:text-2xl font-bold text-white mt-3 md:mt-4 group-hover:text-zinc-100 transition-colors">{project.name}</h3>
						</div>
						<p class="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3">{project.description}</p>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full border border-zinc-700 text-zinc-400">{tag}</span>
							{/each}
						</div>
					</div>
				</a>
			{/each}

			<!-- View all CTA card -->
			<a
				href="/work"
				class="flex-shrink-0 w-[85vw] md:w-[320px] h-[320px] md:h-[380px] flex items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/50 group hover:border-zinc-700 transition-all"
			>
				<div class="text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
						<Isax name="arrowright" type="outline" size="24px" />
					</div>
					<span class="text-lg font-medium text-white">View All Work</span>
				</div>
			</a>
		</div>
	</div>

	<!-- Progress indicator -->
	<div class="mx-auto max-w-[1440px] w-full px-5 md:px-16 mt-8 md:mt-12">
		<div class="h-px bg-zinc-800 relative overflow-hidden">
			<div
				bind:this={progressBar}
				class="absolute top-0 left-0 h-full bg-zinc-500 w-0"
			></div>
		</div>
	</div>

	<!-- Mobile CTA -->
	<div class="md:hidden mx-auto max-w-[1440px] w-full px-5 md:px-16 mt-6">
		<a href="/work">
			<Button variant="secondary" rightIcon="arrowright" class="w-full justify-center">
				View All Projects
			</Button>
		</a>
	</div>
</section>

<!-- CTA Section -->
<section bind:this={ctaSection} class="py-32 relative">
	<div class="mx-auto max-w-[1440px] px-5 md:px-16">
		<div class="scroll-reveal relative rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-12 md:p-16 overflow-hidden" data-delay="0">
			<!-- Background accent -->
			<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-800/20 to-transparent"></div>

			<div class="relative z-10 text-center">
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
					Ready to Build Something<br />
					<span class="text-gradient">Extraordinary?</span>
				</h2>
				<p class="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
					Share your vision, and we'll bring it to life with innovation,
					passion, and technical excellence.
				</p>
				<Button size="lg" on:click={() => isModalOpen = true}>
					Let's Work Together
				</Button>
			</div>
		</div>
	</div>
</section>

<ContactModal
	isOpen={isModalOpen}
	onClose={handleCloseModal}
/>
