<script lang="ts">
	import ContactModal from '../../components/ContactModal.svelte';
	import Button from '../../components/ui/Button.svelte';
	import { Isax } from 'isaxvelte';

  let isModalOpen = $state(false);
  function handleCloseModal() {
    isModalOpen = false;
}
</script>

<div class="mx-auto max-w-[1440px]">
	<div
		class="relative flex flex-col gap-6 border-b border-gray-400 bg-gradient-radial-bottom px-5 py-[64px] md:px-[64px] md:py-[160px]"
	>
		<div
			class="absolute -left-[10px] bottom-0 top-4 h-[160px] w-[160px] md:-left-0 md:top-4 md:h-[240px] md:w-[240px]"
		>
			<img src="/work-star.svg" alt="Radial svg" draggable="false" />
		</div>
		<div class="flex flex-col gap-y-8">
			<h1 class="z-10 mb-4 text-center text-display-4 font-bold text-white md:text-display-2">
				Crafting Solutions, Step by Step
			</h1>
			<p class="z-10 text-center text-body-2-regular text-gray-100 md:text-body-1-regular">
				Discover the journey behind every innovative blockchain solution we deliver.
			</p>
		</div>
		<img
			src="/Star.svg"
			alt="star"
			class="absolute -bottom-[12px] left-1/2 h-6 w-6 -translate-x-1/2 md:-bottom-6 md:h-12 md:w-12"
		/>
	</div>

	<div class="flex w-full flex-col items-start overflow-x-hidden">
		<!-- Card 1 -->
		<div
			class="flex w-full flex-col px-6 pb-12 pt-16 md:flex-row md:gap-[80px] md:px-[176px] md:py-[60px]"
		>
			<div class="w-full shrink-0 md:w-[416px]">
				<img src="/Ignite.svg" alt="" class="aspect-square w-full" draggable="false" />
			</div>
			<div
				class="flex flex-1 shrink-0 flex-col items-start gap-5 self-stretch md:gap-6 md:pt-[96px]"
			>
				<div class="flex gap-4 rounded-3xl bg-gray-500 px-3 py-2">
					<p class="text-caption-1-medium text-gray-50">Step 1</p>
				</div>
				<p class="text-h4 text-gray-50">Ignite</p>
				<p class="text-body-2-regular text-gray-100">
					We ignite the journey with bold ideas and comprehensive planning, transforming
					possibilities into actionable goals.
				</p>
			</div>
		</div>

		<!-- Card 2 -->
		<div
			class="flex w-full flex-col px-6 pb-12 pt-16 md:flex-row-reverse md:gap-[80px] md:px-[176px] md:py-[60px]"
		>
			<div class="w-full shrink-0 md:w-[416px]">
				<img src="/Forge.svg" alt="" class="aspect-square w-full" draggable="false" />
			</div>
			<div
				class="flex flex-1 shrink-0 flex-col items-start gap-5 self-stretch md:gap-6 md:pt-[96px]"
			>
				<div class="flex gap-4 rounded-3xl bg-gray-500 px-3 py-2">
					<p class="text-caption-1-medium text-gray-50">Step 2</p>
				</div>
				<p class="text-h4 text-gray-50">Forge</p>
				<p class="text-body-2-regular text-gray-100">
          Through cutting-edge development, we forge secure, innovative blockchain solutions tailored to your needs.
				</p>
			</div>
		</div>

		<!-- Card 3 -->
		<div
			class="flex w-full flex-col px-6 pb-12 pt-16 md:flex-row md:gap-[80px] md:px-[176px] md:py-[60px]"
		>
			<div class="w-full shrink-0 md:w-[416px]">
				<img src="/Elevate.svg" alt="" class="aspect-square w-full" draggable="false" />
			</div>
			<div
				class="flex flex-1 shrink-0 flex-col items-start gap-5 self-stretch md:gap-6 md:pt-[96px]"
			>
				<div class="flex gap-4 rounded-3xl bg-gray-500 px-3 py-2">
					<p class="text-caption-1-medium text-gray-50">Step 3</p>
				</div>
				<p class="text-h4 text-gray-50">Elevate</p>
				<p class="text-body-2-regular text-gray-100">
          Seamlessly elevate your systems with scalable integrations and optimized performance.
				</p>
			</div>
		</div>

		<!-- Card 4 -->
		<div
			class="flex w-full flex-col px-6 pb-12 pt-16 md:flex-row-reverse md:gap-[80px] md:px-[176px] md:py-[60px]"
		>
			<div class="w-full shrink-0 md:w-[416px]">
				<img src="/Thrive.svg" alt="" class="aspect-square w-full" draggable="false" />
			</div>
			<div
				class="flex flex-1 shrink-0 flex-col items-start gap-5 self-stretch md:gap-6 md:pt-[96px]"
			>
				<div class="flex gap-4 rounded-3xl bg-gray-500 px-3 py-2">
					<p class="text-caption-1-medium text-gray-50">Step 4</p>
				</div>
				<p class="text-h4 text-gray-50">Thrive</p>
				<p class="text-body-2-regular text-gray-100">
					Delivering solutions that empower your success, with ongoing support to ensure you thrive in the digital era.
				</p>
			</div>
		</div>

		<!-- Ideas Section -->
		<div class="flex flex-col items-center gap-6 px-5 py-6">
			<!-- Mobile Layout -->
			<div class="flex flex-col xl:hidden">
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
								<Isax name="flash1" type="outline" size="20px" />
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
								Innovative
							</p>
						</div>
						<div
							class="group absolute left-[174px] top-[208px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
						>
							<span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
								<Isax name="flash1" type="outline" size="20px" />
							</span>
							<p
								class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
							>
								Innovative
							</p>
						</div>
						<div
							class="group absolute bottom-[208px] right-[63px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
						>
							<span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
								<Isax name="flash1" type="outline" size="20px" />
							</span>
							<p
								class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
							>
								Innovative
							</p>
						</div>
						<div
							class="group absolute bottom-[124px] left-[63px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
						>
							<span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
								<Isax name="flash1" type="outline" size="20px" />
							</span>
							<p
								class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
							>
								Innovative
							</p>
						</div>
						<div
							class="group absolute bottom-[104px] right-[190px] inline-flex items-center justify-center gap-2 rounded-2xl border border-opacity-white4 bg-opacity-white4 px-4 py-3 backdrop-blur-8 transition-all duration-300 hover:bg-gray-50 hover:shadow-hover"
						>
							<span class="text-gray-50 transition-colors duration-300 group-hover:text-gray-600">
								<Isax name="flash1" type="outline" size="20px" />
							</span>
							<p
								class="text-caption-1-medium text-gray-50 transition-colors duration-300 group-hover:text-gray-600"
							>
								Innovative
							</p>
						</div>
					</div>
					<div class="flex w-[640px] shrink-0 flex-col gap-y-8">
						<p class="text-h4 text-white">Let's Make Ideas Happen!</p>
						<p class="self-stretch text-caption-1-medium text-gray-100">
							Share your vision, and we'll bring it to life with innovation, passion, and expertise.
							Let's start something extraordinary together!
						</p>
						<div class="">

              <Button size="md" on:click={() => isModalOpen = true}>Let's work together!</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<ContactModal 
isOpen={isModalOpen} 
onClose={handleCloseModal}
/>

