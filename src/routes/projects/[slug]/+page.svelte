<script lang="ts">
	import { projects } from '$lib/store';
	import { goto, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from '../../../components/ui/Button.svelte';
	import type { Project } from '$lib/types';

	let { data } = $props<{ data: { project: Project; slug: string } }>();

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

	function handleNextProject() {
		const projectKeys = Object.keys(projects);
		const currentIndex = projectKeys.indexOf(data.slug);
		const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
		goto(`/projects/${nextKey}`);
	}

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
			document.querySelectorAll('.page-title, .project-tag, .hero-image-container, .meta-block, .content-reveal, .next-btn').forEach((el) => {
				(el as HTMLElement).style.opacity = '1';
			});
			return;
		}

		// Title word-by-word reveal
		const titleWords = document.querySelectorAll('.title-word');
		if (titleWords.length > 0) {
			animate(titleWords, {
				opacity: { to: [0, 1] },
				y: { to: [40, 0] },
				delay: stagger(80),
				duration: 600,
				ease: 'outExpo'
			});
		}

		// Tags stagger bounce in
		const tags = document.querySelectorAll('.project-tag');
		if (tags.length > 0) {
			animate(tags, {
				opacity: { to: [0, 1] },
				scale: { to: [0.7, 1.1, 1] },
				delay: stagger(80, { start: 400 }),
				duration: 500,
				ease: 'outBack'
			});
		}

		// Hero image simple fade + subtle scale
		const heroImageContainer = document.querySelector('.hero-image-container');
		if (heroImageContainer) {
			animate(heroImageContainer, {
				opacity: { to: [0, 1] },
				y: { to: [40, 0] },
				duration: 800,
				delay: 300,
				ease: 'outExpo'
			});
		}

		// Metadata blocks stagger reveal
		const metaBlocks = document.querySelectorAll('.meta-block');
		if (metaBlocks.length > 0) {
			animate(metaBlocks, {
				opacity: { to: [0, 1] },
				y: { to: [30, 0] },
				delay: stagger(100, { start: 800 }),
				duration: 600,
				ease: 'outExpo'
			});
		}

		// Content sections reveal on scroll
		const contentObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						animate(target, {
							opacity: { to: [0, 1] },
							y: { to: [50, 0] },
							duration: 700,
							ease: 'outExpo'
						});
						contentObserver.unobserve(target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
		);

		document.querySelectorAll('.content-reveal').forEach((el) => {
			(el as HTMLElement).style.opacity = '0';
			contentObserver.observe(el);
		});

		// Next Project button slide in
		const nextBtn = document.querySelector('.next-btn');
		if (nextBtn) {
			animate(nextBtn, {
				opacity: { to: [0, 1] },
				x: { to: [30, 0] },
				duration: 600,
				delay: 1200,
				ease: 'outExpo'
			});
		}

		// Mouse tracking for parallax
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			contentObserver.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<style>
	/* Initial states for animation */
	.title-word {
		opacity: 0;
		display: inline-block;
	}

	.project-tag {
		opacity: 0;
	}

	.hero-image-container {
		opacity: 0;
		overflow: hidden;
	}

	.meta-block {
		opacity: 0;
	}

	.next-btn {
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

	/* Gallery image hover */
	.gallery-image {
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.gallery-image:hover {
		transform: scale(1.02);
	}

	/* Next button arrow bounce */
	@keyframes arrow-bounce {
		0%, 100% { transform: translateX(0); }
		50% { transform: translateX(4px); }
	}

	.next-btn:hover .arrow-icon {
		animation: arrow-bounce 0.6s ease-in-out infinite;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.floating {
			animation: none;
		}

		.title-word,
		.project-tag,
		.meta-block,
		.next-btn {
			opacity: 1 !important;
		}

		.hero-image-container {
			opacity: 1 !important;
		}

		.gallery-image:hover {
			transform: none;
		}
	}
</style>

<div class="relative mt-[60px] flex flex-col gap-10">
	<!-- Floating decorative elements -->
	<div
		class="pointer-events-none absolute -right-10 -top-10 hidden h-32 w-32 rounded-full border border-zinc-800/50 opacity-30 floating md:block"
		style="animation-delay: 0s; transform: translate({mouseX * -15}px, {mouseY * -15}px)"
	></div>
	<div
		class="pointer-events-none absolute -left-20 top-1/3 hidden h-20 w-20 rotate-45 border border-zinc-700/15 opacity-20 floating md:block"
		style="animation-delay: 1.5s; transform: translate({mouseX * 10}px, {mouseY * 10}px)"
	></div>
	<div
		class="pointer-events-none absolute bottom-1/4 right-1/4 hidden h-12 w-12 rounded-full bg-zinc-800/20 opacity-40 floating md:block"
		style="animation-delay: 3s; transform: translate({mouseX * -20}px, {mouseY * -20}px)"
	></div>

	<!-- Header Section -->
	<div class="flex flex-col gap-6">
		<p class="page-title md:text-display-1-medium text-center text-h1 text-gray-50">
			{#each data.project.title.split(' ') as word, i}
				<span class="title-word" style="animation-delay: {i * 80}ms">{word}</span>{' '}
			{/each}
		</p>

		<div class="flex flex-wrap content-center items-start justify-center gap-2 self-stretch">
			{#each data.project.tags as tag, i}
				<div
					class="project-tag flex items-center justify-center gap-2 rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
					style="animation-delay: {400 + i * 80}ms"
				>
					<p class="text-caption-2-medium text-gray-50 md:text-caption-1-medium">
						{tag}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto flex flex-col justify-center gap-y-8 md:max-w-[864px]">
		<!-- Hero Image with clip-path reveal -->
		<div class="hero-image-container flex justify-center overflow-hidden rounded-[12px]">
			<img
				src={data.project.image}
				alt={data.project.title}
				class="hero-image h-auto w-full rounded-3xl md:h-[560px] md:w-[864px]"
			/>
		</div>

		<!-- Metadata Section -->
		<div class="flex flex-col justify-center gap-y-8 md:max-w-[864px]">
			<div class="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-8">
				<div class="meta-block flex flex-col items-start gap-3 self-stretch md:flex-1">
					<p class="text-body-2-medium text-gray-100">Services provided</p>
					<p class="text-h5 text-gray-50">{data.project.servicesProvided}</p>
				</div>
				<div class="meta-block flex flex-col items-start gap-3 self-stretch md:flex-1">
					<p class="text-body-2-medium text-gray-100">Project Duration</p>
					<p class="text-h5 text-gray-50">{data.project.projectDuration}</p>
				</div>
			</div>

			<!-- Description -->
			<p class="content-reveal self-stretch text-body-2-regular text-gray-50 md:text-body-1-regular">
				{data.project.description}
			</p>
		</div>

		<!-- Gallery Image 1 -->
		<div class="content-reveal gallery-image overflow-hidden rounded-[12px] border border-gray-400 bg-work-card">
			<img src={data.project.projectImage1} alt={data.project.title} class="h-auto w-full" />
		</div>

		<!-- Optional Description 2 -->
		{#if data.project.description2}
			<p class="content-reveal self-stretch text-body-2-regular text-gray-50 md:text-body-1-regular">
				{data.project.description2}
			</p>
		{/if}

		<!-- Next Project Button -->
		<div class="next-btn flex flex-col gap-4">
			<Button
				rightIcon="arrowright"
				variant="secondary"
				size="sm"
				iconType="linear"
				on:click={handleNextProject}
			>
				<span class="flex items-center gap-2">
					Next Project
					<span class="arrow-icon"></span>
				</span>
			</Button>
		</div>
	</div>
</div>
