<script lang="ts">
	import { Isax } from 'isaxvelte';
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

	// Service data
	const services = [
		{
			icon: 'code1',
			title: 'Web Development',
			description:
				'Modern, performant web applications built with cutting-edge technologies. From landing pages to complex platforms, we craft solutions that scale.',
			tags: [
				'React & Next.js',
				'Custom platforms',
				'API integration',
				'Performance optimization',
				'Responsive design',
				'SEO-ready'
			]
		},
		{
			icon: 'mobileprogramming',
			title: 'Mobile Development',
			description:
				'Native and cross-platform mobile experiences designed for seamless performance across all devices.',
			tags: [
				'iOS & Android',
				'React Native',
				'Cross-platform',
				'Real-time features',
				'Push notifications',
				'App Store optimization'
			]
		},
		{
			icon: 'shop',
			title: 'E-commerce & SaaS',
			description:
				'End-to-end digital commerce and subscription platforms. Payment integration, inventory systems, and scalable architecture that grows with your business.',
			tags: [
				'Payment systems',
				'Subscription billing',
				'Inventory management',
				'Multi-tenant architecture',
				'Analytics dashboards',
				'Admin portals'
			]
		},
		{
			icon: 'pentool2',
			title: 'UX/UI Design',
			description:
				'Intuitive and visually engaging experiences where functional meets beautiful. Design systems that scale.',
			tags: [
				'User research',
				'Wireframing',
				'Prototyping',
				'Design systems',
				'Responsive layouts',
				'Brand consistency'
			]
		},
		{
			icon: 'lamp',
			title: 'Technical Consulting',
			description:
				'Strategic guidance for your digital initiatives. Architecture reviews, technology selection, and roadmap planning to set you up for success.',
			tags: [
				'Architecture review',
				'Tech stack selection',
				'MVP planning',
				'Code audits',
				'Performance analysis',
				'Team mentoring'
			]
		}
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
			// Just show everything immediately
			document
				.querySelectorAll('.hero-word, .hero-description, .service-card, .service-tag')
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

		// Cards scroll reveal with stagger using IntersectionObserver
		const cardsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const card = entry.target as HTMLElement;

						animate(card, {
							opacity: { to: [0, 1] },
							y: { to: [80, 0] },
							scale: { to: [0.92, 1] },
							duration: 800,
							ease: 'outExpo'
						});

						// Tags bounce in after card settles
						const tags = card.querySelectorAll('.service-tag');
						animate(tags, {
							opacity: { to: [0, 1] },
							scale: { to: [0.7, 1.1, 1] },
							delay: stagger(60, { start: 500 }),
							duration: 500,
							ease: 'outBack'
						});

						// Icon pulse animation
						const icon = card.querySelector('.service-icon');
						if (icon) {
							animate(icon, {
								scale: { to: [0.8, 1.15, 1] },
								duration: 600,
								delay: 300,
								ease: 'outBack'
							});
						}

						cardsObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		// Observe all service cards
		document.querySelectorAll('.service-card').forEach((card) => {
			cardsObserver.observe(card);
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

	.service-card {
		opacity: 0;
	}

	.service-card .service-tag {
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

	/* Card hover enhancements - Premium */
	.service-card {
		transition:
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.5s ease,
			border-color 0.4s ease;
	}

	.service-card:hover {
		transform: translateY(-8px);
		box-shadow:
			0 25px 50px -12px rgba(161, 161, 170, 0.15),
			0 12px 24px -8px rgba(0, 0, 0, 0.4);
		border-color: rgba(161, 161, 170, 0.3);
	}

	/* Icon container hover effect */
	.icon-container {
		transition: background-color 0.4s ease;
	}

	.service-card:hover .icon-container {
		background-color: rgba(39, 39, 42, 0.8);
	}

	/* Service image parallax on hover */
	.service-card .service-image {
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
	}

	.service-card:hover .service-image {
		transform: translateY(-16px);
	}

	/* Service icon pulse */
	.service-icon {
		will-change: transform;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.floating {
			animation: none;
		}

		.hero-word,
		.hero-description,
		.service-card,
		.service-card .service-tag {
			opacity: 1 !important;
		}

		.service-card:hover {
			transform: none;
		}

		.service-card:hover .service-image {
			transform: none;
		}
	}
</style>

<div class="flex flex-col gap-y-8">
	<!-- Hero Section -->
	<div
		class="bg-gradient-radial-bottom relative flex flex-col overflow-hidden border-b border-gray-400"
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

		<div
			class="absolute -right-[300px] -top-[60px] bottom-0 h-[320px] w-[640px] md:-right-[576px] md:h-[640px] md:w-[1280px]"
		>
			<img src="/Radial.svg" alt="Radial svg" class=" " />
		</div>
		<div class="mx-auto w-full max-w-[1440px] px-5 py-12 md:px-16">
			<div class="flex flex-col gap-y-6 md:w-[640px]">
				<h1 class="text-display-4 z-10 mb-4 font-bold text-white md:text-display-2">
					<span class="hero-word inline-block">Innovative</span>{' '}
					<span class="hero-word inline-block">Solutions,</span>{' '}
					<span class="hero-word inline-block">Tailored</span>{' '}
					<span class="hero-word inline-block">for</span>{' '}
					<span class="hero-word inline-block">Tomorrow</span>
				</h1>
				<p class="hero-description z-10 text-body-2-regular text-gray-100 md:text-body-1-regular">
					From web platforms to mobile apps and scalable digital products, we turn ideas into
					reality.
				</p>
			</div>
		</div>
	</div>

	<!-- Cards Section -->
	<div class="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-5 md:px-16">
		{#each services as service}
			<div
				class="service-card bg-gradient-radial-top group flex flex-col items-start justify-center gap-6 rounded-3xl border border-gray-400 p-5 md:flex-row md:gap-x-[60px] md:p-10"
			>
				<div
					class="icon-container relative flex h-[200px] items-center justify-center self-stretch overflow-hidden rounded-xl border border-gray-400 md:h-auto md:w-[400px] md:gap-2.5"
				>
					<img
						src="ServiceVector.svg"
						draggable="false"
						alt="svg"
						class="service-image absolute h-[600px] w-[720px] bg-cover"
					/>
					<p class="service-icon z-10">
						<Isax name={service.icon} type="outline" size="48px" />
					</p>
				</div>

				<div class="flex flex-1 flex-col gap-4 py-6">
					<div class="flex flex-col gap-4">
						<p class="text-h5 text-gray-50 md:text-h4">{service.title}</p>
						<p class="text-caption-1-regular text-gray-100 md:text-body-2-regular">
							{service.description}
						</p>
					</div>
					<div class="mt-2 flex flex-wrap content-start items-start gap-2 self-stretch">
						{#each service.tags as tag}
							<div
								class="service-tag flex justify-center rounded-3xl border border-gray-400 bg-gray-500 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50 md:text-body-2-medium">
									{tag}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
