<script lang="ts">
	import '../app.css';
	import { fade, fly, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import Button from '../components/ui/Button.svelte';
	// AnimeJS - dynamically imported to avoid SSR issues
	type AnimeInstance = ReturnType<typeof import('animejs').animate>;
	import ContactModal from '../components/ContactModal.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Lazy load particle background
	let ParticleField: typeof import('$lib/components/ParticleField.svelte').default | null = $state(null);

	let lenis: Lenis;

	onMount(async () => {
		if (browser) {
			const module = await import('$lib/components/ParticleField.svelte');
			ParticleField = module.default;

			// Register GSAP plugin
			gsap.registerPlugin(ScrollTrigger);

			// Initialize Lenis smooth scroll
			lenis = new Lenis({
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				smoothWheel: true
			});

			// Connect Lenis to ScrollTrigger
			lenis.on('scroll', ScrollTrigger.update);

			// Use GSAP ticker for Lenis (smoother than rAF)
			gsap.ticker.add((time) => {
				lenis.raf(time * 1000);
			});
			gsap.ticker.lagSmoothing(0);
		}
	});

	let isModalOpen = $state(false);


	let { children } = $props();
	const navItems = [
		{ href: '/services', text: 'Services' },
		{ href: '/work', text: 'Work' },
		{ href: '/process', text: 'Process' },
		{ href: '/team', text: 'Team' }
	];

  function handleCloseModal() {
    isModalOpen = false;
}

	let isMenuOpen = $state(false);
	let isActive = (href: string) => $page.url.pathname === href;

	import { onDestroy } from 'svelte';

	let cleanupFns: (() => void)[] = [];

	onMount(async () => {
		// Load AnimeJS dynamically (SSR-safe)
		const { animate } = await import('animejs');

		const navLinks = document.querySelectorAll('.nav-link');

		navLinks.forEach((link) => {
			const topRight = link.querySelector('.top-right') as HTMLElement;
			const bottomLeft = link.querySelector('.bottom-left') as HTMLElement;

			const handleEnter = () => {
				animate(topRight, {
					top: 0,
					right: 0,
					duration: 300,
					ease: 'inOutQuad'
				});
				animate(bottomLeft, {
					bottom: 0,
					left: 0,
					duration: 300,
					ease: 'inOutQuad'
				});
			};

			const handleLeave = () => {
				animate(topRight, {
					top: '0.75rem',
					right: '0.75rem',
					duration: 300,
					ease: 'inOutQuad'
				});
				animate(bottomLeft, {
					bottom: '0.75rem',
					left: '0.75rem',
					duration: 300,
					ease: 'inOutQuad'
				});
			};

			link.addEventListener('mouseenter', handleEnter);
			link.addEventListener('mouseleave', handleLeave);

			cleanupFns.push(() => {
				link.removeEventListener('mouseenter', handleEnter);
				link.removeEventListener('mouseleave', handleLeave);
			});
		});
	});

	onDestroy(() => {
		cleanupFns.forEach(fn => fn());
	});
</script>

<!-- Loading Screen -->
<LoadingScreen />

<div class="no-scrollbar no-scrollbar min-h-screen overflow-x-hidden bg-gray-600 text-gray-base">
	<!-- Global Particle Background -->
	{#if ParticleField}
		<ParticleField />
	{/if}

	<section class="h-[72px]">
		<div class="fixed top-0 left-0 right-0 z-50 border-b border-gray-500 bg-opacity-600 backdrop-blur-60">
			<nav class="mx-auto flex w-full max-w-[1440px] justify-between px-5 py-5 md:px-16">
				<a href="/" draggable="false" class="flex items-center gap-3">
					<img
						src="/Logo.svg"
						alt="iki.studio"
						class="h-10 w-auto shrink-0"
						draggable="false"
					/>
					<span class="text-lg font-semibold text-white">Iki solutions</span>
				</a>

			<!-- Desktop Menu -->
			<div class="hidden items-center gap-10 md:flex">
				<div class="flex items-center gap-6 font-bold">
					{#each navItems as link}
						<a
							href={link.href}
							draggable="false"
							class="nav-link relative select-none overflow-visible px-4 py-2 text-btn-40 transition-all duration-300"
							class:text-gray-base={isActive(link.href)}
							class:text-gray-100={!isActive(link.href)}
						>
							<!-- Top right corner -->
							<div
								class="top-right pointer-events-none absolute right-3 top-3 opacity-0 transition-opacity duration-300"
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<mask id="path-1-inside-1_8648_3549" fill="white">
										<path d="M0 0H8C10.2091 0 12 1.79086 12 4V12H0V0Z" />
									</mask>
									<path
										d="M0 -2H8C11.3137 -2 14 0.686292 14 4H10C10 2.89543 9.10457 2 8 2H0V-2ZM12 12H0H12ZM0 12V0V12ZM8 -2C11.3137 -2 14 0.686292 14 4V12H10V4C10 2.89543 9.10457 2 8 2V-2Z"
										fill="#CDCDCD"
										mask="url(#path-1-inside-1_8648_3549)"
									/>
								</svg>
							</div>

							<!-- Bottom left corner -->
							<div
								class="bottom-left pointer-events-none absolute bottom-3 left-3 opacity-0 transition-opacity duration-300"
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<mask id="path-1-inside-1_8648_3385" fill="white">
										<path d="M0 0H12V12H4C1.79086 12 0 10.2091 0 8V0Z" />
									</mask>
									<path
										d="M0 0H12H0ZM12 14H4C0.686292 14 -2 11.3137 -2 8H2C2 9.10457 2.89543 10 4 10H12V14ZM4 14C0.686292 14 -2 11.3137 -2 8V0H2V8C2 9.10457 2.89543 10 4 10V14ZM12 0V12V0Z"
										fill="#CDCDCD"
										mask="url(#path-1-inside-1_8648_3385)"
									/>
								</svg>
							</div>

							{link.text}
							{#if isActive(link.href)}
								<div
									class="absolute left-1/2 top-12 -translate-x-1/2"
									in:fade={{ duration: 300 }}
									out:fade={{ duration: 300 }}
								>
									<img src="/Star.svg" alt="" class="h-6 w-6" style="height: 24px; width: 24px;" />
								</div>
							{/if}
						</a>
					{/each}
				</div>
				<Button size="md" on:click={() => isModalOpen = true}>Get in touch</Button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="flex items-center p-2 md:hidden"
				onclick={() => (isMenuOpen = !isMenuOpen)}
				aria-label="Toggle mobile menu"
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					{#if !isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{/if}
				</svg>
			</button>
			</nav>
		</div>

		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="fixed inset-0 z-50 bg-gray-600 md:hidden" transition:slide={{ duration: 300 }}>
				<div class="flex h-full flex-col items-center justify-center gap-8">
					{#each navItems as link}
						<a
							href={link.href}
							class="text-2xl font-bold"
							class:text-gray-base={isActive(link.href)}
							class:text-gray-100={!isActive(link.href)}
							onclick={() => (isMenuOpen = false)}
						>
							{link.text}
						</a>
					{/each}
					<div class="mt-4">
						<Button size="md" on:click={() => isModalOpen = true}>Get in touch</Button>
					</div>
				</div>
			</div>
		{/if}
	</section>

	{#key $page.url.pathname}
		<main
			class="w-full bg-gray-600 mb-[200px]"
		>
  
			{#if children}
    
				{@render children()}
			{/if}
      <ContactModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal}
  />
		</main>
	{/key}
</div>

<div class="flex  w-full justify-center overflow-hidden bg-gray-600">
	<footer class="flex w-full flex-col px-5 py-8 md:w-[1440px] md:px-16 md:pb-8 md:pt-12 
                    bg-[radial-gradient(circle_at_top,
                    _var(--tw-gradient-stops))]   
                    from-teal-300 via-gray-100  
                    to-blue-300">
		<div class="flex flex-col justify-between  gap-y-10  md:flex-row">
			<a href="/" class="flex items-center gap-3">
				<img
					src="/Logo.svg"
					alt="iki.studio"
					class="h-10 w-auto shrink-0"
					draggable="false"
				/>
				<span class="text-lg font-semibold text-gray-50">Iki solutions</span>
			</a>
			<div class="flex flex-col md:flex-row gap-y-10 waa md:px-0 md:py-0 md:pt-4 md:pb-8 md:w-[864px] md:justify-center md:items-start gap-x-4">
				<div class="flex flex-1 justify-between gap-x-4">
					<div class="flex flex-1 flex-col gap-5 ">
						<p class="mb-1 text-body-2-bold text-gray-50">Projects</p>
            <a href="/projects/goodwine">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								Goodwine
							</p>
						</a>
            <a href="/projects/amuse">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								Amuse-Bouche
							</p>
						</a>
            <a href="/projects/wine">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								GoodWine Web
							</p>
						</a>
            <a href="/projects/nair">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								Nair
							</p>
						</a>
            <a href="/projects/cmm">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								CMM MarketIQ
							</p>
						</a>
            <a href="/projects/mintpark">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								Mint Park
							</p>
						</a>
					</div>
					<div class="flex flex-1 flex-col gap-5 ">
						<p class="mb-1 text-body-2-bold text-gray-50">Company</p>
						<a href="/team">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								About us
							</p>
						</a>
						<a href="/process">
							<p
								class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
							>
								The process
							</p>
						</a>
					</div>
				</div>

				<div class="flex flex-1 flex-col gap-5 ">
					<p class="mb-1 text-body-2-bold text-gray-50">Services</p>
					<a href="/services">
						<p
							class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
						>
							Web Development
						</p>
					</a>
					<a href="/services">
						<p
							class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
						>
							Mobile Apps
						</p>
					</a>
          <a href="/services">
						<p
							class=" text-caption-1-medium text-gray-200 transition-all duration-300 hover:text-gray-100"
						>
							Product Design
						</p>
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright and Social buttons -->
		<div class="flex flex-col justify-between gap-y-8 pt-8 md:flex-row-reverse md:items-center">
			<div class="flex justify-between gap-x-4">
				<!-- <div
					class="x-icon hover:shadow-hover flex flex-1 items-center justify-center gap-[10px] rounded-[8px] bg-opacity-white4 p-3 transition-all duration-300 hover:bg-gray-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
					>
						<path
							d="M1.65467 1.68848L8.51847 10.866L1.61133 18.3278H3.16585L9.21304 11.7949L14.099 18.3278H19.3891L12.1391 8.63399L18.5682 1.68848H17.0137L11.4445 7.70512L6.94477 1.68848H1.65467ZM3.94071 2.83354H6.37099L17.1027 17.1825H14.6724L3.94071 2.83354Z"
						/>
					</svg>
				</div> -->
        
 
				<div
					class="linkedin-icon hover:shadow-hover flex flex-1 items-center justify-center gap-[10px] rounded-[8px] bg-opacity-white4 p-3 transition-all duration-300 hover:bg-gray-50"
				>
        <a href="https://www.linkedin.com/company/ikistudio" aria-label="LinkedIn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.48938 18.6094V7.13263H1.67472V18.6094H5.48938ZM3.58203 5.56567C4.91228 5.56567 5.74025 4.68439 5.74025 3.58303C5.71546 2.45689 4.91228 1.60006 3.60727 1.60006C2.30239 1.60006 1.44922 2.45689 1.44922 3.58303C1.44922 4.68439 2.27701 5.56567 3.55717 5.56567H3.58203Z"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.59961 18.6094H11.4142V12.2003C11.4142 11.8573 11.439 11.5146 11.5397 11.2694C11.8155 10.5841 12.4432 9.87429 13.497 9.87429C14.8773 9.87429 15.4295 10.9267 15.4295 12.4696V18.6094H19.2438V12.0288C19.2438 8.50363 17.3619 6.86332 14.8521 6.86332C12.7942 6.86332 11.8908 8.01358 11.3889 8.79705H11.4143V7.13263H7.59971C7.64977 8.20953 7.59961 18.6094 7.59961 18.6094Z"
						/>
					</svg>
        </a>
				</div>

     

				<div
					class="github-icon hover:shadow-hover flex flex-1 items-center justify-center gap-[10px] rounded-[8px] bg-opacity-white4 p-3 transition-all duration-300 hover:bg-gray-50"
				>
        <a href="https://github.com/ikistudio" aria-label="GitHub">
 
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.5052 1.25C5.58066 1.25 1.59961 5.2604 1.59961 10.2218C1.59961 14.1877 4.15041 17.5448 7.68904 18.733C8.13146 18.8223 8.29351 18.5399 8.29351 18.3024C8.29351 18.0944 8.27893 17.3815 8.27893 16.6386C5.8016 17.1735 5.28571 15.5691 5.28571 15.5691C4.88759 14.5293 4.2977 14.2621 4.2977 14.2621C3.48687 13.7125 4.35676 13.7125 4.35676 13.7125C5.25618 13.7719 5.72813 14.6334 5.72813 14.6334C6.5242 15.9999 7.80698 15.6138 8.32304 15.3761C8.39669 14.7968 8.63276 14.3957 8.88341 14.173C6.90756 13.965 4.82871 13.1926 4.82871 9.7464C4.82871 8.76604 5.18236 7.96396 5.74272 7.34016C5.65431 7.1174 5.34459 6.19628 5.83131 4.96345C5.83131 4.96345 6.58326 4.72574 8.27875 5.88438C9.00465 5.68799 9.75325 5.58809 10.5052 5.58725C11.2572 5.58725 12.0237 5.69134 12.7316 5.88438C14.4272 4.72574 15.1792 4.96345 15.1792 4.96345C15.6659 6.19628 15.356 7.1174 15.2676 7.34016C15.8427 7.96396 16.1818 8.76604 16.1818 9.7464C16.1818 13.1926 14.1029 13.95 12.1123 14.173C12.4368 14.4552 12.7168 14.9898 12.7168 15.8366C12.7168 17.0397 12.7022 18.0053 12.7022 18.3022C12.7022 18.5399 12.8645 18.8223 13.3067 18.7332C16.8453 17.5446 19.3961 14.1877 19.3961 10.2218C19.4107 5.2604 15.4151 1.25 10.5052 1.25Z"
						/>
					</svg>
        </a>
				</div>
			</div>
			<div class="flex justify-start">
				<p class=" text-caption-1-regular text-gray-200">
					© 2025 iki.studio. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	.nav-link:hover .top-right,
	.nav-link:hover .bottom-left {
		opacity: 1;
	}

	.github-icon path {
		fill: #cdcdcd;
		transition: fill 0.3s;
	}

	.github-icon:hover path {
		fill: #06090c;
	}

	/* .x-icon path {
		fill: #cdcdcd;
		transition: fill 0.3s;
	}

	.x-icon:hover path {
		fill: #06090c;
	} */

	.linkedin-icon path {
		fill: #cdcdcd;
		transition: fill 0.3s;
	}

	.linkedin-icon:hover path {
		fill: #06090c;
	}
</style>
