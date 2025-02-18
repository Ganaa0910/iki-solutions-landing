<script lang="ts">
	import { Isax } from 'isaxvelte';
  import { currentProject, projects } from '$lib/store';
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types';
	import Button from '../components/ui/Button.svelte';
  import ContactModal from '../components/ContactModal.svelte';

  import { onMount, onDestroy } from 'svelte';
	let textContainer: HTMLElement;
  import gsap from 'gsap';
  let isModalOpen = $state(false);
  let displayWord = $state('')
  let wordElement: HTMLSpanElement;
  let currentWordIndex = 0;
  const words = ['Building', 'Developing', 'Designing'];
  displayWord = words[currentWordIndex];
  let interval: ReturnType<typeof setInterval>;
    let tl: GSAPTimeline;




  function animateWord() {
    tl = gsap.timeline();
    tl.to(wordElement, {
      opacity: 0,
      y: -50,
      duration: 0.3,
      ease: "expo.in",
      onComplete: () => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        displayWord = words[currentWordIndex];
      }
    });

    tl.to(wordElement, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "expo.out"
    });
  }

  onMount(() => {
    // Set initial state
    gsap.set(wordElement, { opacity: 1, y: 0 });
    
    // Start the interval
    interval = setInterval(animateWord, 3000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
    if (tl) tl.kill();
  });

	interface ServiceCardProps {
		icon: string;
		title: string;
		direction: string;
		description: string;
		isDark?: boolean;
	}


	const navigateToProject = (projectData: Project) => {
		currentProject.set(projectData);
		goto('/id');
	};

  function handleCloseModal() {
    isModalOpen = false;
}

	let cards: ServiceCardProps[] = [
		{
			icon: 'mobileprogramming',
			title: 'Mobile Application Development',
			direction: 'br',
			description:
				'We create seamless and scalable mobile applications designed to meet the needs of a connected and ever-evolving digital world, ensuring robust performance and an exceptional user experience.',
			isDark: true
		},
		{
			icon: 'box2',
			title: 'Smart Contract Development',
			direction: 'bl',
			description:
				'Our smart contracts are built with precision to deliver secure, efficient, and transparent solutions, enabling trust and automation in your blockchain-based transactions.',
			isDark: false
		},
		{
			icon: 'data',
			title: 'Decentralized Application Development',
			direction: 'tr',
			description:
				'We specialize in crafting decentralized applications that prioritize user autonomy and innovation, redefining how systems operate in the blockchain ecosystem.',
			isDark: true
		},
		{
			icon: 'pentool2',
			title: 'UX/UI Design',
			direction: 'tl',
			description:
				'Our design process focuses on creating intuitive and visually engaging user experiences, ensuring every platform is as functional as it is beautiful.',
			isDark: false
		}
	];

	const processes = [
		{
			number: 1,
      icon: 'glass',
			title: 'Ignite',
			description:
				'We ignite the journey with bold ideas and comprehensive planning, transforming possibilities into actionable goals.'
		},
		{
			number: 2,
      icon: 'security',
			title: 'Forge',
			description: 'Through cutting-edge development, we forge secure, innovative blockchain solutions tailored to your needs.'
		},
		{
			number: 3,
      icon: 'code`',
			title: 'Elevate',
			description: 'Seamlessly elevate your systems with scalable integrations and optimized performance.'
		},
		{
			number: 4,
      icon: 'ranking1',
			title: 'Thrive',
			description: 'Delivering solutions that empower your success, with ongoing support to ensure you thrive in the digital era.'
		}
	];


	const tags = [
		'Decentralized Finance',
		'Smart Contract',
		'Blockchain Development',
		'Web3',
		'Real World Asset',
		'Cross-Chain',

	];

</script>

<style>
	.word-container {
		position: relative;
		display: inline-block;
		height: 1em;
		vertical-align: bottom;
		overflow: hidden;
	}

	.word {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		will-change: transform, opacity;
	}
</style>

<div class="scrol no-scrollbar flex w-full justify-center overflow-hidden">
 
	<img
		src="/Pattern.svg"
		alt=""
		class="absolute max-h-[472px] w-full shrink-0 select-none"
		draggable="false"
	/>
	<div class="z-10 mt-16 flex flex-col justify-between gap-8">
		<div class="mb-16 flex flex-col md:flex-row">
      <div class="flex-1 items-start">
        <div class="font-bold text-4xl md:text-display-2 text-gray-base">
          <div class="flex flex-wrap items-center gap-2 md:gap-3" bind:this={textContainer}>
            <span
              bind:this={wordElement}
              class="inline-block font-bold text-display-3 md:text-display-2 text-gray-base"
            >
              {displayWord}
            </span>
            <span class=" text-display-3 md:text-display-2 font-bold text-gray-base">with</span>
          </div>
          <div class="mt-4 md:mt-4 text-display-3 md:text-display-2 font-bold text-gray-base">
            trust and passion
          </div>
        </div>
      </div>
			<div class="flex-1 items-center justify-center py-8">
				<p class="text-body-2-regular md:text-body-1-regular text-gray-50">
					Your trusted partner in Web3 innovation. Numad Labs blends deep blockchain expertise and exceptional craftsmanship to bring your decentralized vision to life.
				</p>
			</div>
		</div>
		<div
			class="relative mb-[200px] flex h-[520px] flex-col-reverse rounded-[32px] bg-[url('/Hero.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden"
			draggable="false"
		>
			<div class="absolute bottom-4 right-0 xl:bottom-12 xl:right-12 flex w-full xl:w-[40vw] flex-row-reverse px-4 pt-[120px] flex-wrap gap-3 ">
				{#each tags as tag}
					<div class="flex items-center justify-center rounded-xl md:rounded-[24px] bg-opacity-300 px-5 py-3 md:px-8 md:py-6 backdrop-blur-40">
						<p class="text-caption-1-medium md:text-body-1-medium">{tag}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="">
			<div class="flex justify-center">
				<div class="flex items-center justify-center gap-3 rounded-[40px] border border-gray-300 bg-gray-500 px-4 py-3 mb-8">
					<p class="text-gray-100">
						<Isax name="flash1" type="twotone" size="20px" />
					</p>
					<p class="text-caption-1-medium text-gray-50">Our Services</p>
				</div>
			</div>

			<div class="flex-col items-center justify-center">
				<p class="text-center text-h1">Empowering the Future of Web3 and Beyond</p>
				<p class="mt-5 text-center text-body-2-medium text-gray-100">
					We design and develop cutting-edge Web3 solutions to transform ideas into scalable
					platforms.
				</p>
			</div>
			<div class="flex mt-12">
				<div class="relative grid sm:grid-cols-1 md:grid-cols-2 w-full">
					<img
						src="/Line2.svg"
						alt="horizontal divider"
						class="absolute hidden md:block left-0 top-[50%] w-full -translate-y-1/2"
					/>
					<img
						src="/Line1.svg"
						alt="vertical divider"
						class="absolute hidden md:block left-[50%] top-0 h-[50%] -translate-x-1/2"
					/>
					<img
						src="/Line3.svg"
						alt="vertical divider"
						class="absolute hidden md:block left-[50%] bottom-0 h-[50%] -translate-x-1/2"
					/>
					{#each cards as card}
						<div
							class={`group flex h-[320px] justify-center items-center p-4 md:p-8 gap-y-5 text-center duration-300 transition-all 
							${card.direction === 'br'
								? 'hover:bg-gradient-to-br'
								: card.direction === 'bl'
								? 'hover:bg-gradient-to-bl'
								: card.direction === 'tr'
								? 'hover:bg-gradient-to-tr'
								: 'hover:bg-gradient-to-tl'}
							from-gray-600 from-80% to-gray-500`}
						>
							<div class="flex-col gap-5">
								<p class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
									<Isax name={card.icon} type="outline" size="40px" />
								</p>
								<p class="text-h5 text-gray-50 group-hover:-translate-y-3 transition-transform duration-300">
									{card.title}
								</p>
								<div class="px-8">
									<p class="text-body-2-regular text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
										{card.description}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

    <div class="mb-20">
			<div class="flex justify-center">
				<div class="flex items-center justify-center gap-3 rounded-[40px] border border-gray-300 bg-gray-500 px-4 py-3 mb-8">
					<p class="text-gray-100">
						<Isax name="flash1" type="twotone" size="20px" />
					</p>
					<p class="text-caption-1-medium text-gray-50">Our Process</p>
				</div>
			</div>

			<div class="flex-col items-center justify-center">
				<p class="text-center text-h1">Turning Ideas into Innovation</p>
				<p class="mt-5 text-center text-body-2-medium text-gray-100">
          From bold ideas to seamless solutions, our process drives innovation every step of the way.
				</p>
			</div>
      </div>
<div class="relative ">
  
  <div class="space-y-12 md:space-y-0 max-w-[1440px]">
    {#each processes as process, i}
      <div class="relative flex {i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}">
        <div class="w-full md:w-[calc(50%-0px)] p-5 flex flex-col gap-4 border rounded-2xl border-gray-400 bg-gray-600/95 backdrop-blur-sm relative z-10">
          <div class="flex gap-4 items-center">
            <div class="p-2 rounded-lg bg-gray-50 aspect-square justify-center items-center w-9 h-9 shadow-hover">
              <span class="text-gray-600">
                <Isax 
                  name={i === 0 ? "glass" : 
                       i === 1 ? "security" : 
                       i === 2 ? "code1" : "ranking"} 
                  type="outline" 
                  size="20px" 
                />
              </span>
            </div>
            <p class="text-body-1-bold">{process.title}</p>
          </div>
          <p class="text-gray-100 text-caption-1-regular">
            {process.description}
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="mt-[200px]">
  <div class="">
  <div class="flex justify-start">
    <div class="flex items-center justify-center gap-3 rounded-[40px] border border-gray-300 bg-gray-500 px-4 py-3 mb-8">
      <p class="text-gray-100">
        <Isax name="box1" type="linear" size="20px" />
      </p>
      <p class="text-caption-1-medium text-gray-50">Our Works</p>
    </div>
  </div>
  <div class="flex flex-col justify-start gap-5 mb-16">
    <p class=" text-h1 text-white">Projects That Define Us</p>
    <p class=" text-body-2-medium text-gray-100">Explore the projects that define our commitment to innovation, quality, and impact.</p>
  </div>
  <div class="">
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
          <p class="text-h5 text-gray-50">Mint Park</p>
          <p class="self-stretch text-caption-1-regular text-gray-100">
            MintPark is a cutting-edge NFT marketplace built on Bitcoin's Layer 2, designed to offer fast, low-cost transactions and seamless minting of digital assets. It provides a no-code tool for artists, enabling creators to easily mint and manage their NFTs without technical expertise. 
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
          <p class="text-h5 text-gray-50">Lumi</p>
          <p class="self-stretch text-caption-1-regular text-gray-100">
            Capture, share, and savor life’s flavors – your way. Snap a photo of your culinary adventures, share stories, and post them as moments that vanish after 72 hours – perfect for spontaneous, in-the-now connections.
          </p>
        </div>
        <div class="flex flex-wrap content-center items-center gap-2 self-stretch">
          <div
            class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
          >
            <p class="text-caption-2-medium text-gray-50">Restaurant Royalty Platform</p>
          </div>
          <div
            class="flex items-center justify-center rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
          >
            <p class="text-caption-2-medium text-gray-50">Mobile App</p>
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
            class="h-[240px] w-full self-stretch rounded-lg bg-contain md:h-[416px]"
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
          <p class="text-h5 text-gray-50">Pepe Punks</p>
          <p class="self-stretch text-caption-1-regular text-gray-100">
            Pepe Punks represents a breakthrough in Bitcoin Ordinals, pushing the limits of digital artifact creation through advanced inscription techniques. Our team implemented cursed inscriptions, re-inscriptions, and recursive inscriptions on a specially selected Block 9 sat.
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
          <p class="text-h5 text-gray-50">Satoshi Punks</p>
          <p class="self-stretch text-caption-1-regular text-gray-100">
            Satoshi Punks (#36151-#73597) is a trailblazing Bitcoin NFT collection from the rare sub-100k Ordinals, featuring 100 unique Punks that have already driven 10 BTC in trading volume. As one of only eight collections featured on Magic Eden’s Bitcoin NFT launch, Satoshi Punks represents authenticity, decentralization, and the future of digital ownership on Bitcoin.
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
            <p class="text-caption-2-medium text-gray-50">Earliest Collection on BTC</p>
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
    </div>

    </div>
    </div>
    <div class="flex justify-center mt-16">
      <a href="/work">
        <Button variant='secondary' rightIcon={'arrowright'}>
          Go to All Projects
        </Button>
      </a>
    </div>
  </div>

  
  </div>
  
 
  </div>
  <div class="flex flex-col xl:hidden mt-[240px]">
    <img src="/Get-in-touch.png" alt="visual" class="w-full" />
    <div class="mt-6 flex flex-col items-center gap-4">
      <p class="text-center text-h4 text-white">Let's Make Ideas Happen!</p>
      <p class="text-center text-caption-1-medium text-gray-100">
        Share your vision, and we'll bring it to life with innovation, passion, and expertise.
        Let's start something extraordinary together!
      </p>
      <Button size="md" on:click={() => isModalOpen = true}>Let's work together!</Button>
    </div>
  </div>
  <div class="flex flex-col items-center mt-[240px] gap-6 px-5 py-6 w-[1440px]">
    <!-- Mobile Layout -->


    <!-- Desktop Layout -->
    <div class="hidden xl:block w-[1440px]">
      <div class="flex flex-row gap-8 px-16 items-center">
        <div class="relative h-[480px] w-[640px] flex-1 shrink-0 px-[80px]">
          <img
            src="/Circle.svg"
            alt="circle"
            class="absolute bottom-0 bg-gradient-radial-center"
          />
          <div
            class="group absolute left-[101px] top-[104px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="star1" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
              Innovative
            </p>
          </div>
          <div
            class="group absolute right-[195px] top-[124px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="flash1" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
            Clutch
            </p>
          </div>
          <div
            class="group absolute left-[174px] top-[208px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="weight1" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
            Empowering
            </p>
          </div>
          <div
            class="group absolute bottom-[208px] right-[63px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="magicpen" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
            Creativity
            </p>
          </div>
          <div
            class="group absolute bottom-[124px] left-[63px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="blur" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
            Dependable
            </p>
          </div>
          <div
            class="group absolute bottom-[104px] right-[190px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
          >
            <span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
              <Isax name="timer" type="outline" size="20px" />
            </span>
            <p
              class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
            >
            Efficient
            </p>
          </div>
        </div>
        <div class="flex max-w-[640px] shrink-0 flex-col gap-y-8">
          <p class="text-h4 text-white ">Let's Make Ideas Happen!</p>
          <p class="self-stretch text-caption-1-medium text-gray-100">
            Share your vision, and we'll bring it to life with innovation, passion, and expertise.
            Let's start something extraordinary together!
          </p>
          <div class="">
            <Button variant="primary">Let's work together!</Button>
          </div>
        </div>

      </div>
      </div>
  </div>
  <ContactModal 
  isOpen={isModalOpen} 
  onClose={handleCloseModal}
/>
