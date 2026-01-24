<script lang="ts">
	import { page } from '$app/stores';
	import Button from '../components/ui/Button.svelte';
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
	<div class="flex flex-col gap-4">
		<h1 class="text-display-2 font-bold text-gray-50">
			{$page.status}
		</h1>
		<p class="text-h4 text-gray-100">
			{#if $page.status === 404}
				Page not found
			{:else}
				Something went wrong
			{/if}
		</p>
		<p class="text-body-2-regular text-gray-200">
			{#if $page.error?.message}
				{$page.error.message}
			{:else if $page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else}
				An unexpected error occurred. Please try again.
			{/if}
		</p>
	</div>

	<a href="/">
		<Button size="md">Back to Home</Button>
	</a>
</div>
