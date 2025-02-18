<script lang="ts">
	import { currentProject, projects } from '$lib/store';
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types';

	const navigateToProject = (projectData: Project) => {
		currentProject.set(projectData);
		goto('/id');
	};
</script>

<div class="flex min-h-screen flex-col">
	<main class="flex-1">
		<div class="container mx-auto">
			<div class="flex flex-col gap-y-8 overflow-hidden">
				<!-- Hero Section -->
				<div
					class="relative flex flex-col overflow-hidden border-b border-gray-400 bg-gradient-radial-bottom px-5 py-12"
				>
					<div
						class="absolute -left-[10px] bottom-0 top-4 h-[160px] w-[160px] md:-left-0 md:top-4 md:h-[240px] md:w-[240px]"
					>
						<img src="/work-star.svg" alt="Radial svg" draggable="false" />
					</div>
					<div class="flex flex-col gap-y-6 md:w-[640px]">
						<h1 class="z-10 mb-4 text-display-4 font-bold text-white md:text-display-2">
							Discover Our Innovations
						</h1>
						<p class="z-10 text-body-2-regular text-gray-100 md:text-body-1-regular">
							Discover how we're pushing boundaries and delivering real-world blockchain solutions.
						</p>
					</div>
				</div>

				<!-- Cards Grid Section -->
				<div class="grid grid-cols-1 gap-8 md:grid-cols-[752px_528px]">
					<!-- First Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/Mintpark.png"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg bg-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/id" onclick={() => navigateToProject(projects.mintpark)}>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/id" onclick={() => navigateToProject(projects.mintpark)}>
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
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Cross-Chain Marketplace</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">CaaS</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Creator Program</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/Lumi.png"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg bg-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/id" onclick={() => navigateToProject(projects.lumi)}>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
              <a href="/id" onclick={() => navigateToProject(projects.lumi)}>
							<p class="text-h5 text-gray-50">Lumi</p>
              </a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Capture, share, and savor life’s flavors – your way. Snap a photo of your culinary
								adventures, share stories, and post them as moments that vanish after 72 hours –
								perfect for spontaneous, in-the-now connections.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Social Media</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Restaurant Loyalty</p>
							</div>
              <div
              class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
            >
              <p class="text-caption-2-medium text-gray-50">EVM</p>
            </div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-[528px_752px]">
					<!-- First Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/PepePunks.png"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/id" onclick={() => navigateToProject(projects.pepepunks)}>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
              <a href="/id" onclick={() => navigateToProject(projects.pepepunks)}>
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
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Rare Sat</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Dual-Inscription</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Recursive Inscriptions</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/SatoshiPunks.webp"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg bg-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a
									href="/id"
									onclick={() => navigateToProject(projects.satoshipunks)}
								>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
              <a
              href="/id"
              onclick={() => navigateToProject(projects.satoshipunks)}
            >
							<p class="text-h5 text-gray-50">Satoshi Punks</p>
              </a>
							<p class="self-stretch text-caption-1-regular text-gray-100">
								Satoshi Punks (#36151-#73597) is a trailblazing Bitcoin NFT collection from the rare
								sub-100k Ordinals, featuring 100 unique Punks that have already driven 10 BTC in
								trading volume. As one of only eight collections featured on Magic Eden’s Bitcoin
								NFT launch, Satoshi Punks represents authenticity, decentralization, and the future
								of digital ownership on Bitcoin.
							</p>
						</div>
						<div class="flex flex-wrap content-center items-center gap-2 self-stretch">
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Ordinals</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Sub100k Ordinal</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Inscriptions</p>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-[752px_528px]">
					<!-- First Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/ShapeTown.png"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg bg-cover md:h-[416px]"
							/>

							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/id" onclick={() => navigateToProject(projects.shapetown)}>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>

						<div class="flex flex-col gap-3">
              <a href="/id" onclick={() => navigateToProject(projects.shapetown)}>
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
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Play 2 Earn</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Phaser</p>
							</div>
						</div>
					</div>

					<!-- Second Card -->
					<div
						class="group flex flex-col items-start gap-6 rounded-[20px] border border-gray-400 bg-work-card p-5 md:p-8"
					>
						<div class="relative h-[240px] w-full md:h-[416px]">
							<img
								src="/Araafal.png"
								alt="Mintpark"
								draggable="false"
								class="h-[240px] w-full self-stretch rounded-lg bg-cover md:h-[416px]"
							/>
							<div
								class="group-hover:clip-path-corner absolute bottom-0 right-0 hidden h-[72px] w-[72px] bg-gray-600 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100"
							></div>
							<div
								class="absolute bottom-0 right-0 flex h-[72px] w-[72px] translate-x-0 translate-y-0 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
							>
								<a href="/id" onclick={() => navigateToProject(projects.araafal)}>
									<div
										class="absolute bottom-0 right-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 p-3 text-gray-600 transition-transform duration-500 ease-in-out group-hover:scale-105"
									>
										<img src="/ArrowRight.svg" alt="arrow" />
									</div>
								</a>
							</div>
						</div>
						<div class="flex flex-col gap-3">
							<a href="/id" onclick={() => navigateToProject(projects.araafal)}>
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
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">Ordinals</p>
							</div>
							<div
								class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
							>
								<p class="text-caption-2-medium text-gray-50">BRC20</p>
							</div>
              <div
              class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
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
