<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children } = $props<{ children: Snippet }>();

	let cardRef: HTMLDivElement;
	let rotateX = $state(0);
	let rotateY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		if (!cardRef) return;

		const rect = cardRef.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// Calculate rotation (max +-10 degrees)
		rotateX = ((y - centerY) / centerY) * -10;
		rotateY = ((x - centerX) / centerX) * 10;
	}

	function handleMouseLeave() {
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div
	bind:this={cardRef}
	class="project-card-3d"
	style="transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	role="presentation"
>
	{@render children()}
</div>

<style>
	.project-card-3d {
		transition: transform 0.15s ease-out;
		transform-style: preserve-3d;
		will-change: transform;
	}
</style>
