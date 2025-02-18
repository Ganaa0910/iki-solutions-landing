<script lang="ts">
	import { currentProject, projects } from '$lib/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '../../components/ui/Button.svelte';


	onMount(() => {
		if (!$currentProject) {
			goto('/');
		}
	});

	// Function to handle navigation to next project
	function handleNextProject() {
		if ($currentProject) {
			// Get all project keys
			const projectKeys = Object.keys(projects);
			
			// Find current project key
			const currentKey = projectKeys.find(key => 
				projects[key].title === $currentProject.title
			);
			
			if (currentKey) {
				// Get index of current project
				const currentIndex = projectKeys.indexOf(currentKey);
				// Get next project key (loop back to start if at end)
				const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
				
				// Update current project and navigate
				currentProject.set(projects[nextKey]);
				goto(`/${nextKey}`);
			}
		}
	}

  
</script>

{#if $currentProject}
	<div class="mt-[60px] flex flex-col gap-10">
		<div class="flex flex-col gap-6">
			<p class="md:text-display-1-medium text-center text-h1 text-gray-50">
				{$currentProject.title}
			</p>

			<div class="flex flex-wrap content-center items-start justify-center gap-2 self-stretch">
				{#each $currentProject.tags as tag}
					<div
						class="flex items-center justify-center gap-2 rounded-[40px] border border-gray-300 bg-gray-400 px-3 py-2"
					>
						<p class="text-caption-2-medium text-gray-50 md:text-caption-1-medium">
							{tag}
						</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="mx-auto flex flex-col justify-center gap-y-8 md:max-w-[864px]">
			<div class="flex justify-center overflow-hidden rounded-[12px]">
				<img
					src={$currentProject.image}
					alt={$currentProject.title}
					class="h-auto w-full rounded-3xl md:h-[560px] md:w-[864px]"
				/>
			</div>
			<div class="flex flex-col justify-center gap-y-8 md:max-w-[864px]">
				<div class="flex flex-col gap-y-8 md:flex-row md:justify-between md:gap-8">
					<div class=" flex flex-col items-start gap-3 self-stretch md:flex-1">
						<p class=" text-body-2-medium text-gray-100">Services provided</p>
						<p class=" text-h5 text-gray-50">{$currentProject.servicesProvided}</p>
					</div>
					<div class=" flex flex-col items-start gap-3 self-stretch md:flex-1">
						<p class=" text-body-2-medium text-gray-100">Project Duration</p>
						<p class=" text-h5 text-gray-50">{$currentProject.projectDuration}</p>
					</div>
				</div>
				<p class=" self-stretch text-body-2-regular text-gray-50 md:text-body-1-regular">
          {$currentProject.description}
				</p>
			</div>
			<div class="overflow-hidden rounded-[12px] border border-gray-400 bg-work-card">
				<img src={$currentProject.projectImage1} alt={$currentProject.projectImage1} class="h-auto w-full" />
			</div>
			<p class=" self-stretch text-body-2-regular text-gray-50 md:text-body-1-regular">
				{$currentProject.description2}
			</p>
			<div class="flex flex-col gap-4">
        <Button 
				rightIcon="arrowright" 
				variant="secondary" 
				size="sm" 
				iconType="linear"
				on:click={handleNextProject}
			>
				Next Project
			</Button>
			</div>
      
		</div>
	</div>
{/if}
