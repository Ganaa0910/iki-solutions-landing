<script lang="ts">
	import { projects } from '$lib/store';
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

	function handleMouseMove(e: MouseEvent) {
		if (prefersReducedMotion) return;
		mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
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
			// Just show everything immediately
			document.querySelectorAll('.hero-word, .hero-description, .project-card, .tag').forEach((el) => {
				(el as HTMLElement).style.opacity = '1';
			});
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
				delay: 400,
				ease: 'outExpo'
			});
		}

		// Star SVG continuous rotation + scale pulse
		const heroStar = document.querySelector('.hero-star');
		if (heroStar) {
			animate(heroStar, {
				rotate: { to: [0, 360] },
				duration: 25000,
				loop: true,
				ease: 'linear'
			});
			animate(heroStar, {
				scale: { to: [1, 1.08, 1] },
				duration: 4000,
				loop: true,
				ease: 'inOutSine'
			});
		}

		// Cards scroll reveal with stagger using IntersectionObserver
		const cardsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const cards = entry.target.querySelectorAll('.project-card');
						animate(cards, {
							opacity: { to: [0, 1] },
							y: { to: [80, 0] },
							scale: { to: [0.92, 1] },
							delay: stagger(150),
							duration: 800,
							ease: 'outExpo'
						});

						// Tags bounce in after cards settle
						const tags = entry.target.querySelectorAll('.project-card .tag');
						animate(tags, {
							opacity: { to: [0, 1] },
							scale: { to: [0.7, 1.1, 1] },
							delay: stagger(60, { start: 700 }),
							duration: 500,
							ease: 'outBack'
						});

						cardsObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		// Observe all card grids
		document.querySelectorAll('.cards-grid').forEach((grid) => {
			cardsObserver.observe(grid);
		});

		// Mouse tracking for parallax
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			cardsObserver.disconnect();
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

	.project-card {
		opacity: 0;
	}

	.project-card .tag {
		opacity: 0;
	}

	/* Floating keyframe animation */
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-15px); }
	}

	.floating {
		animation: float 6s ease-in-out infinite;
	}

	/* Card hover enhancements - Premium */
	.project-card {
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
					box-shadow 0.5s ease,
					border-color 0.4s ease;
	}

	.project-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 25px 50px -12px rgba(161, 161, 170, 0.15),
					0 12px 24px -8px rgba(0, 0, 0, 0.4);
		border-color: rgba(161, 161, 170, 0.3);
	}

	.project-card .card-image {
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
	}

	.project-card:hover .card-image {
		transform: scale(1.05);
	}

	/* CTA button arrow enhancement */
	.cta-arrow {
		transition: transform 0.3s ease;
	}

	.project-card:hover .cta-arrow {
		transform: translateX(4px);
	}

	/* Star animation container */
	.hero-star {
		will-change: transform;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.floating {
			animation: none;
		}

		.hero-word,
		.hero-description,
		.project-card,
		.project-card .tag {
			opacity: 1 !important;
		}

		.project-card:hover {
			transform: none;
		}

		.project-card:hover .card-image {
			transform: none;
		}
	}
</style>

<div class="flex min-h-screen flex-col">
	<main class="flex-1">
		<div class="mx-auto w-full max-w-[1440px] px-5 md:px-16">
			<div class="flex flex-col gap-y-8 overflow-hidden">
				<!-- Hero Section -->
				<div
					class="relative flex flex-col overflow-hidden border-b border-gray-400 bg-gradient-radial-bottom py-12"
				>
					<!-- Floating geometric shapes -->
					<div
						class="pointer-events-none absolute right-16 top-16 hidden h-20 w-20 rounded-full border border-zinc-700/30 opacity-40 floating md:block"
						style="animation-delay: 0s; transform: translate({mouseX * -18}px, {mouseY * -18}px)"
					></div>
					<div
						class="pointer-events-none absolute bottom-20 right-1/3 hidden h-10 w-10 rotate-45 border border-zinc-600/20 opacity-30 floating md:block"
						style="animation-delay: 2s; transform: translate({mouseX * 12}px, {mouseY * 12}px)"
					></div>
					<div
						class="pointer-events-none absolute right-1/4 top-1/2 hidden h-6 w-6 rounded-full bg-zinc-700/10 opacity-50 floating md:block"
						style="animation-delay: 4s; transform: translate({mouseX * -22}px, {mouseY * -22}px)"
					></div>

					<!-- Star SVG with animation -->
					<div
						class="hero-star absolute -left-[10px] bottom-0 top-4 h-[160px] w-[160px] md:-left-0 md:top-4 md:h-[240px] md:w-[240px]"
					>
						<img src="/work-star.svg" alt="Radial svg" draggable="false" />
					</div>

					<div class="flex flex-col gap-y-6 md:w-[640px]">
						<h1 class="z-10 mb-4 text-display-4 font-bold text-white md:text-display-2">
							<span class="hero-word inline-block">Discover</span>{' '}
							<span class="hero-word inline-block">Our</span>{' '}
							<span class="hero-word inline-block">Work</span>
						</h1>
						<p class="hero-description z-10 text-body-2-regular text-gray-100 md:text-body-1-regular">
							Explore our portfolio of digital experiences and creative solutions.
						</p>
					</div>
				</div>

				<!-- Cards Grid Section 1 -->
				<div class="cards-grid grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
					<!-- First Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/Mintpark.png"
								alt="Mintpark"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg bg-cover object-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/mintpark">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/projects/mintpark">
								<p class="text-h5 text-gray-50">Mint Park</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								MintPark is a cutting-edge NFT marketplace built on Bitcoin's Layer 2, designed to
								offer fast, low-cost transactions and seamless minting of digital assets. It
								provides a no-code tool for artists, enabling creators to easily mint and manage
								their NFTs without technical expertise.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Cross-Chain Marketplace</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">CaaS</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Creator Program</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/Lumi.png"
								alt="Lumi"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg bg-cover object-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/lumi">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/projects/lumi">
								<p class="text-h5 text-gray-50">Lumi</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Capture, share, and savor life's flavors – your way. Snap a photo of your culinary
								adventures, share stories, and post them as moments that vanish after 72 hours –
								perfect for spontaneous, in-the-now connections.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Social Media</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Restaurant Loyalty</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">EVM</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Cards Grid Section 2 -->
				<div class="cards-grid grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr]">
					<!-- First Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/PepePunks.png"
								alt="Pepe Punks"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg object-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/pepepunks">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/projects/pepepunks">
								<p class="text-h5 text-gray-50">Pepe Punks</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Pepe Punks represents a breakthrough in Bitcoin Ordinals, pushing the limits of
								digital artifact creation through advanced inscription techniques. Our team
								implemented cursed inscriptions, re-inscriptions, and recursive inscriptions on a
								specially selected Block 9 sat.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Rare Sat</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Dual-Inscription</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Recursive Inscriptions</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/SatoshiPunks.webp"
								alt="Satoshi Punks"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg bg-cover object-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/satoshipunks">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/projects/satoshipunks">
								<p class="text-h5 text-gray-50">Satoshi Punks</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Satoshi Punks (#36151-#73597) is a trailblazing Bitcoin NFT collection from the rare
								sub-100k Ordinals, featuring 100 unique Punks that have already driven 10 BTC in
								trading volume. As one of only eight collections featured on Magic Eden's Bitcoin
								NFT launch, Satoshi Punks represents authenticity, decentralization, and the future
								of digital ownership on Bitcoin.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Ordinals</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Sub100k Ordinal</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Inscriptions</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Cards Grid Section 3 -->
				<div class="cards-grid grid grid-cols-1 gap-8 md:grid-cols-[3fr_2fr]">
					<!-- First Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/ShapeTown.png"
								alt="Shape Town"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg bg-cover object-cover md:h-[416px]"
							/>

							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/shapetown">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>

						<div class="flex flex-col gap-3">
							<a href="/projects/shapetown">
								<p class="text-h5 text-gray-50">Shape Town</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Join a thriving community where every player shapes the world. Trade your crafted
								NFTs, share resources, and connect with fellow townspeople in our social spaces.
								Coming soon: Participate in our DEX ecosystem to trade items seamlessly and earn
								rewards by providing liquidity to LP pools.
							</p>
						</div>

						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Play 2 Earn</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Phaser</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="project-card group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[416px]">
							<img
								src="/Araafal.png"
								alt="Araafal"
								draggable="false"
								class="card-image h-[240px] w-full self-stretch rounded-lg bg-cover object-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/projects/araafal">
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" class="cta-arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/projects/araafal">
								<p class="text-h5 text-gray-50">Araafal</p>
							</a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Enter the exciting world of Bitcoin Ordinals through Araafal, a pioneering
								decentralized raffle platform built natively on Bitcoin. Win unique Ordinal
								inscriptions using your BRC-20 tokens in an engaging and dynamic environment. Your
								Gateway to Ordinals
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Ordinals</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">BRC20</p>
							</div>
							<div
								class="tag flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Bitcoin Mainnet</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
