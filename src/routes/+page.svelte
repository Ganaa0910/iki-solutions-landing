<script lang="ts">
	import { onMount } from 'svelte';
	import { Isax } from 'isaxvelte';
	import gsap from 'gsap';

	let textContainer;

  interface ServiceCardProps {
    icon: string;
    title: string;
    direction: string;
    description: string;
    isDark?: boolean;
  }

  export let cards: ServiceCardProps[] = [
    {
      icon: "mobileprogramming",
      title: "Mobile Application Development",
      direction: "br",
      description: "We create seamless and scalable mobile applications designed to meet the needs of a connected and ever-evolving digital world, ensuring robust performance and an exceptional user experience.",
      isDark: true
    },
    {
      icon: "box2",
      title: "Smart Contract Development",
      direction: "bl",
      description: "Our smart contracts are built with precision to deliver secure, efficient, and transparent solutions, enabling trust and automation in your blockchain-based transactions.",
      isDark: false
    },
    {
      icon: "data",
      title: "Decentralized Application Development",
      direction: "tr",
      description: "We specialize in crafting decentralized applications that prioritize user autonomy and innovation, redefining how systems operate in the blockchain ecosystem.",
      isDark: true
    },
    {
      icon: "pentool2",
      title: "UX/UI Design",
      direction: "tl",
      description: "Our design process focuses on creating intuitive and visually engaging user experiences, ensuring every platform is as functional as it is beautiful.",
      isDark: false
    },
  ];

	const words = ['Building', 'Developing', 'Designing'];
	const tags = [
		'Decentralized Finance',
		'Smart Contract',
		'Blockchain Development',
		'Web3',
		'Real World Asset',
		'Cross-Chain',
		'Digital Product Design',
		'Tokenized Assets'
	];

	onMount(() => {
		gsap.set('.word', {
			yPercent: 100,
			opacity: 0,
			display: 'none'
		});

		gsap.set('.word:first-child', {
			display: 'block',
			opacity: 1,
			yPercent: 0
		});

		const timeline = gsap.timeline({
			repeat: -1,
			repeatDelay: 1
		});

		words.forEach((_, index) => {
			const nextIndex = (index + 1) % words.length;

			timeline
				.to(`.word-${index}`, {
					yPercent: -100,
					opacity: 0,
					duration: 1.5,
					ease: 'power2.inOut'
				})
				.set(`.word-${index}`, { display: 'none' })
				.set(`.word-${nextIndex}`, {
					display: 'block',
					yPercent: 100
				})
				.to(`.word-${nextIndex}`, {
					yPercent: 0,
					opacity: 1,
					duration: 1.5,
					ease: 'power2.inOut'
				});
		});

		return () => {
			timeline.kill();
		};
	});
</script>

<div class="scrol no-scrollbar flex w-full justify-center">
	<img
		src="/Pattern.svg"
		alt=""
		class="absolute h-[472px] w-[1256px] shrink-0 select-none"
		draggable="false"
	/>
	<div class="z-10 mt-16 flex flex-col justify-between gap-8">
		<div class="mb-16 flex">
			<div class="flex-1 items-start">
				<div class="text-display-2 text-gray-base">
					<div class="relative w-auto overflow-hidden" bind:this={textContainer}>
						{#each words as word, i}
							<p class="word word-{i} absolute w-full">{word}</p>
						{/each}
						<p class="mt-16">with trust and passion</p>
					</div>
				</div>
			</div>
			<div class="flex-1 items-center justify-center py-8">
				<p class="text-body-1-regular text-gray-50">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquet justo quis blandit
					accumsan. Donec suscipit finibus velit nulla sit amet mollis cursus, lorem erat placerat
					diam.
				</p>
			</div>
		</div>
		<div
			class="relative mb-[200px] flex h-[520px] flex-col-reverse rounded-[32px] bg-[url('/Hero.jpg')] bg-cover p-12"
			draggable="false"
		>
			<div class="absolute bottom-12 right-12 flex w-[40vw] flex-row-reverse flex-wrap gap-3">
				{#each tags as tag}
					<div
						class="flex items-center justify-center rounded-[24px] bg-opacity-300 px-8 py-6 backdrop-blur-40"
					>
						<p class="text-body-1-medium">{tag}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="">
			<div class="flex justify-center">
				<div
					class="flex items-center justify-center gap-3 rounded-[40px] border border-gray-300 bg-gray-500 px-4 py-3"
				>
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
        <div class="grid grid-cols-2 w-full">
          {#each cards as card}
            <div 
              class={`group flex h-[320px] justify-center items-center p-8 gap-y-5 text-center duration-300 transition-all ${
                card.direction === 'br' ? 'hover:bg-gradient-to-br' :
                card.direction === 'bl' ? 'hover:bg-gradient-to-bl' :
                card.direction === 'tr' ? 'hover:bg-gradient-to-tr' :
                'hover:bg-gradient-to-tl'
              } from-gray-600 from-80% to-gray-500`}
            >
              <div class="flex-col">
                <p class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                  <Isax
                    name={card.icon}
                    type="outline"
                    size="40px"
                  />
                </p>
                <p class="text-h5 text-gray-50 group-hover:-translate-y-3 transition-transform duration-300">
                  {card.title}
                </p>
                <p class="text-body-2-regular text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  {card.description}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
		</div>
    <div class="">
      <div class="flex justify-center">
				<div
					class="flex items-center justify-center gap-3 rounded-[40px] border border-gray-300 bg-gray-500 px-4 py-3"
				>
					<p class="text-gray-100">
						<Isax name="flash1" type="twotone" size="20px" />
					</p>
					<p class="text-caption-1-medium text-gray-50">Our Services</p>
				</div>
			</div>
    </div>
	</div>
</div>