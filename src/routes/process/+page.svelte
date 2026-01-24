<script lang="ts">
	import ContactModal from '../../components/ContactModal.svelte';
	import Button from '../../components/ui/Button.svelte';
	import { Isax } from 'isaxvelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	let isModalOpen = $state(false);
	function handleCloseModal() {
		isModalOpen = false;
	}

	// AnimeJS - dynamically imported to avoid SSR issues
	let animate: typeof import('animejs').animate;
	let stagger: typeof import('animejs').stagger;

	// Mouse tracking for parallax
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Reduced motion preference
	let prefersReducedMotion = $state(false);

	// Process steps data
	const steps = [
		{
			number: 1,
			title: 'Ignite',
			image: '/Ignite.svg',
			description:
				'We ignite the journey with bold ideas and comprehensive planning, transforming possibilities into actionable goals.'
		},
		{
			number: 2,
			title: 'Forge',
			image: '/Forge.svg',
			description:
				'Through cutting-edge development, we forge robust, scalable solutions tailored to your unique needs.'
		},
		{
			number: 3,
			title: 'Elevate',
			image: '/Elevate.svg',
			description:
				'Seamlessly elevate your systems with scalable integrations and optimized performance.'
		},
		{
			number: 4,
			title: 'Thrive',
			image: '/Thrive.svg',
			description:
				'Delivering solutions that empower your success, with ongoing support to ensure you thrive in the digital era.'
		}
	];

	// CTA floating tags
	const ctaTags = [
		{ icon: 'flash1', label: 'Innovative', position: 'left-[101px] top-[104px]' },
		{ icon: 'code1', label: 'Modern', position: 'right-[195px] top-[124px]' },
		{ icon: 'designtools', label: 'Creative', position: 'left-[174px] top-[208px]' },
		{ icon: 'cpu', label: 'Scalable', position: 'bottom-[208px] right-[63px]' },
		{ icon: 'timer1', label: 'Fast', position: 'bottom-[124px] left-[63px]' },
		{ icon: 'shield', label: 'Reliable', position: 'bottom-[104px] right-[190px]' }
	];

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
			document
				.querySelectorAll(
					'.hero-word, .hero-description, .process-card, .step-image, .cta-tag, .cta-content'
				)
				.forEach((el) => {
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

		// Center star pulse
		const centerStar = document.querySelector('.center-star');
		if (centerStar) {
			animate(centerStar, {
				scale: { to: [1, 1.2, 1] },
				opacity: { to: [0.8, 1, 0.8] },
				duration: 3000,
				loop: true,
				ease: 'inOutSine'
			});
		}

		// Process cards scroll reveal with IntersectionObserver
		const cardsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const card = entry.target as HTMLElement;
						const index = parseInt(card.dataset.index || '0');
						const isEven = index % 2 === 0;

						// Card slides in from alternating sides
						animate(card, {
							opacity: { to: [0, 1] },
							x: { to: [isEven ? -80 : 80, 0] },
							duration: 800,
							ease: 'outExpo'
						});

						// Image scales up
						const image = card.querySelector('.step-image');
						if (image) {
							animate(image, {
								opacity: { to: [0, 1] },
								scale: { to: [0.8, 1] },
								rotate: { to: [isEven ? -5 : 5, 0] },
								duration: 900,
								delay: 200,
								ease: 'outBack'
							});
						}

						// Step badge bounces in
						const badge = card.querySelector('.step-badge');
						if (badge) {
							animate(badge, {
								opacity: { to: [0, 1] },
								scale: { to: [0.5, 1.1, 1] },
								duration: 500,
								delay: 400,
								ease: 'outBack'
							});
						}

						// Title slides up
						const title = card.querySelector('.step-title');
						if (title) {
							animate(title, {
								opacity: { to: [0, 1] },
								y: { to: [20, 0] },
								duration: 600,
								delay: 500,
								ease: 'outExpo'
							});
						}

						// Description fades in
						const desc = card.querySelector('.step-description');
						if (desc) {
							animate(desc, {
								opacity: { to: [0, 1] },
								y: { to: [15, 0] },
								duration: 600,
								delay: 600,
								ease: 'outExpo'
							});
						}

						cardsObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
		);

		// Observe all process cards
		document.querySelectorAll('.process-card').forEach((card) => {
			cardsObserver.observe(card);
		});

		// CTA section observer
		const ctaObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// CTA content fade in
						const ctaContent = entry.target.querySelector('.cta-content');
						if (ctaContent) {
							animate(ctaContent, {
								opacity: { to: [0, 1] },
								y: { to: [40, 0] },
								duration: 800,
								ease: 'outExpo'
							});
						}

						// CTA tags scatter in with stagger
						const tags = entry.target.querySelectorAll('.cta-tag');
						animate(tags, {
							opacity: { to: [0, 1] },
							scale: { to: [0.5, 1.1, 1] },
							delay: stagger(100, { start: 300 }),
							duration: 600,
							ease: 'outBack'
						});

						// Circle scales up
						const circle = entry.target.querySelector('.cta-circle');
						if (circle) {
							animate(circle, {
								opacity: { to: [0, 1] },
								scale: { to: [0.8, 1] },
								duration: 1000,
								ease: 'outExpo'
							});
						}

						ctaObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		const ctaSection = document.querySelector('.cta-section');
		if (ctaSection) {
			ctaObserver.observe(ctaSection);
		}

		// Mouse tracking for parallax
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			cardsObserver.disconnect();
			ctaObserver.disconnect();
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

	.process-card {
		opacity: 0;
	}

	.step-image,
	.step-badge,
	.step-title,
	.step-description {
		opacity: 0;
	}

	.cta-tag,
	.cta-content,
	.cta-circle {
		opacity: 0;
	}

	/* Floating keyframe animation */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	.floating {
		animation: float 6s ease-in-out infinite;
	}

	/* Hero star */
	.hero-star {
		will-change: transform;
	}

	/* Center star pulse */
	.center-star {
		will-change: transform, opacity;
	}

	/* Process card hover */
	.process-card {
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.process-card:hover {
		transform: translateY(-4px);
	}

	/* Step image hover effect */
	.step-image {
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
	}

	.process-card:hover .step-image {
		transform: scale(1.05) rotate(2deg);
	}

	/* CTA tag hover */
	.cta-tag {
		transition:
			transform 0.3s ease,
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.cta-tag:hover {
		transform: scale(1.05);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.floating {
			animation: none;
		}

		.hero-word,
		.hero-description,
		.process-card,
		.step-image,
		.step-badge,
		.step-title,
		.step-description,
		.cta-tag,
		.cta-content,
		.cta-circle {
			opacity: 1 !important;
		}

		.process-card:hover,
		.process-card:hover .step-image {
			transform: none;
		}
	}
</style>

<div class="mx-auto max-w-[1440px]">
	<div
		class="relative flex flex-col gap-6 border-b border-gray-400 bg-gradient-radial-bottom px-5 py-[64px] md:px-[64px] md:py-[160px]"
	>
		<!-- Floating geometric shapes -->
		<div
			class="floating pointer-events-none absolute right-16 top-16 hidden h-20 w-20 rounded-full border border-zinc-700/30 opacity-40 md:block"
			style="animation-delay: 0s; transform: translate({mouseX * -18}px, {mouseY * -18}px)"
		></div>
		<div
			class="floating pointer-events-none absolute bottom-20 right-1/3 hidden h-10 w-10 rotate-45 border border-zinc-600/20 opacity-30 md:block"
			style="animation-delay: 2s; transform: translate({mouseX * 12}px, {mouseY * 12}px)"
		></div>
		<div
			class="floating pointer-events-none absolute right-1/4 top-1/2 hidden h-6 w-6 rounded-full bg-zinc-700/10 opacity-50 md:block"
			style="animation-delay: 4s; transform: translate({mouseX * -22}px, {mouseY * -22}px)"
		></div>

		<!-- Hero star with animation -->
		<div
			class="hero-star absolute -left-[10px] bottom-0 top-4 h-[160px] w-[160px] md:-left-0 md:top-4 md:h-[240px] md:w-[240px]"
		>
			<img src="/work-star.svg" alt="Radial svg" draggable="false" />
		</div>

		<div class="flex flex-col gap-y-8">
			<h1 class="z-10 mb-4 text-center text-display-4 font-bold text-white md:text-display-2">
				<span class="hero-word inline-block">Crafting</span>{' '}
				<span class="hero-word inline-block">Solutions,</span>{' '}
				<span class="hero-word inline-block">Step</span>{' '}
				<span class="hero-word inline-block">by</span>{' '}
				<span class="hero-word inline-block">Step</span>
			</h1>
			<p class="hero-description z-10 text-center text-body-2-regular text-gray-100 md:text-body-1-regular">
				Discover the journey behind every digital solution we deliver.
			</p>
		</div>

		<!-- Center star with pulse -->
		<img
			src="/Star.svg"
			alt="star"
			class="center-star absolute -bottom-[12px] left-1/2 h-6 w-6 -translate-x-1/2 md:-bottom-6 md:h-12 md:w-12"
		/>
	</div>

	<div class="flex w-full flex-col items-start overflow-x-hidden">
		{#each steps as step, index}
			<div
				class="process-card flex w-full flex-col px-6 pb-12 pt-16 {index % 2 === 1
					? 'md:flex-row-reverse'
					: 'md:flex-row'} md:gap-[80px] md:px-[176px] md:py-[60px]"
				data-index={index}
			>
				<div class="w-full shrink-0 md:w-[416px]">
					<img
						src={step.image}
						alt={step.title}
						class="step-image aspect-square w-full"
						draggable="false"
					/>
				</div>
				<div
					class="flex flex-1 shrink-0 flex-col items-start gap-5 self-stretch md:gap-6 md:pt-[96px]"
				>
					<div class="step-badge flex gap-4 rounded-3xl bg-gray-500 px-3 py-2">
						<p class="text-caption-1-medium text-gray-50">Step {step.number}</p>
					</div>
					<p class="step-title text-h4 text-gray-50">{step.title}</p>
					<p class="step-description text-body-2-regular text-gray-100">
						{step.description}
					</p>
				</div>
			</div>
		{/each}

		<!-- Ideas Section -->
		<div class="cta-section flex flex-col items-center gap-6 px-5 py-6">
			<!-- Mobile Layout -->
			<div class="flex flex-col xl:hidden">
				<img src="/Get-in-touch.png" alt="visual" class="w-full" />
				<div class="cta-content mt-6 flex flex-col items-center gap-4">
					<p class="text-center text-h4 text-white">Let's Make Ideas Happen!</p>
					<p class="text-center text-caption-1-medium text-gray-100">
						Share your vision, and we'll bring it to life with innovation, passion, and expertise.
						Let's start something extraordinary together!
					</p>
					<Button size="md" on:click={() => (isModalOpen = true)}>Let's work together!</Button>
				</div>
			</div>

			<!-- Desktop Layout -->
			<div class="hidden w-[1440px] xl:block">
				<div class="flex flex-row items-center gap-8 px-16">
					<div class="relative h-[480px] w-[640px] flex-1 shrink-0 px-[80px]">
						<img
							src="/Circle.svg"
							alt="circle"
							class="cta-circle absolute bottom-0 bg-gradient-radial-center"
						/>
						{#each ctaTags as tag}
							<div
								class="cta-tag group absolute {tag.position} inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
							>
								<span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
									<Isax name={tag.icon} type="outline" size="20px" />
								</span>
								<p
									class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
								>
									{tag.label}
								</p>
							</div>
						{/each}
					</div>
					<div class="cta-content flex w-[640px] shrink-0 flex-col gap-y-8">
						<p class="text-h4 text-white">Let's Make Ideas Happen!</p>
						<p class="self-stretch text-caption-1-medium text-gray-100">
							Share your vision, and we'll bring it to life with innovation, passion, and expertise.
							Let's start something extraordinary together!
						</p>
						<div class="">
							<Button size="md" on:click={() => (isModalOpen = true)}>Let's work together!</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
