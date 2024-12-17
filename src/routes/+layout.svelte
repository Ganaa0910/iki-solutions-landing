<script lang="ts">
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import Button from '../components/ui/Button.svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	let { children } = $props();
	const navItems = [
		{ href: '/services', text: 'Services' },
		{ href: '/work', text: 'Work' },
		{ href: '/process', text: 'Process' },
		{ href: '/team', text: 'Team' }
	];

	let isActive = (href: string) => $page.url.pathname === href;

	onMount(() => {
		const navLinks = document.querySelectorAll('.nav-link');

		navLinks.forEach((link) => {
			const timeline = gsap
				.timeline({ paused: true })
				.to(link.querySelector('.top-right'), {
					top: 0,
					right: 0,
					duration: 0.3,
					ease: 'power2.inOut'
				})
				.to(
					link.querySelector('.bottom-left'),
					{
						bottom: 0,
						left: 0,
						duration: 0.3,
						ease: 'power2.inOut'
					},
					'<'
				);

			link.addEventListener('mouseenter', () => timeline.play());
			link.addEventListener('mouseleave', () => timeline.reverse());
		});
	});
</script>

<div class="min-h-screen no-scrollbar overflow-x-hidden bg-gray-600 text-gray-base no-scrollbar">
	<section>
		<nav class="mx-auto flex max-w-[1440px] justify-between px-16 py-5">
			<a href="/" draggable="false" class="flex items-center">
				<img
					src="/Logo.svg"
					alt="Company Logo"
					class="h-10 w-[172px] shrink-0"
					width="172"
					draggable="false"
					height="40"
				/>
			</a>
			<div class="flex items-center gap-10">
				<div class="flex items-center gap-6 font-bold">
					{#each navItems as link}
						<a
							href={link.href}
							draggable="false"
							class="nav-link relative overflow-visible px-4 py-2 text-btn-40 transition-all duration-200 select-none"
							class:text-gray-base={isActive(link.href)}
							class:text-gray-100={!isActive(link.href)}
						>
							<!-- Top right corner -->
							<div
								class="top-right pointer-events-none absolute right-3 top-3 opacity-0 transition-opacity duration-200"
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
								class="bottom-left pointer-events-none absolute bottom-3 left-3 opacity-0 transition-opacity duration-200"
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
									in:fade={{ duration: 200 }}
									out:fade={{ duration: 200 }}
								>
									<img src="/Star.svg" alt="" class="h-6 w-6" style="height: 24px; width: 24px;" />
								</div>
							{/if}
						</a>
					{/each}
				</div>
				<Button size="md">
					<span class="text-gray-600">Get in touch</span>
				</Button>
			</div>
		</nav>
	</section>
	{#key $page.url.pathname}
		<main
			in:fly={{ y: 20, duration: 150, delay:150 }}
			out:fade={{ duration: 150 }}
			class="mx-auto max-w-[1440px] px-16 "
		>
			{#if children}
				{@render children()}
			{/if}
		</main>
	{/key}
</div>

<style>
	.nav-link:hover .top-right,
	.nav-link:hover .bottom-left {
		opacity: 1;
	}
</style>