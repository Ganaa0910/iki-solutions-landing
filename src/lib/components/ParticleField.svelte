<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	onMount(() => {
		if (!browser) return;

		// Detect Safari - it's notoriously slow with canvas
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		// Aggressive reduction for Safari
		const particleCount = isSafari ? 25 : 50;
		const drawConnections = !isSafari; // No connections on Safari
		const connectionDistance = 80;

		// Pre-computed values - avoid runtime calculations
		const particleColor = 'rgba(161, 161, 170, 0.25)';
		const connectionColor = 'rgba(113, 113, 122, 0.05)';

		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
		}

		let particles: Particle[] = [];
		let width = window.innerWidth;
		let height = window.innerHeight;

		// Frame timing
		let lastFrameTime = 0;
		const targetFPS = isSafari ? 24 : 60; // Even lower for Safari
		const frameInterval = 1000 / targetFPS;

		function resize() {
			// Always use DPR of 1 for performance
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			width = window.innerWidth;
			height = window.innerHeight;
			createParticles();
		}

		function createParticles() {
			particles = [];
			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					vx: (Math.random() - 0.5) * 0.2,
					vy: (Math.random() - 0.5) * 0.2,
					size: Math.random() * 1.5 + 0.5
				});
			}
		}

		function animate(currentTime: number) {
			// Frame rate limiting
			const elapsed = currentTime - lastFrameTime;
			if (elapsed < frameInterval) {
				animationId = requestAnimationFrame(animate);
				return;
			}
			lastFrameTime = currentTime - (elapsed % frameInterval);

			ctx.clearRect(0, 0, width, height);

			// Update positions
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;

				// Wrap around
				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;
			}

			// Draw all particles in single batch - use fillRect (faster than arc)
			ctx.fillStyle = particleColor;
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				const s = p.size;
				ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
			}

			// Connections - only on non-Safari, and simplified
			if (drawConnections) {
				ctx.strokeStyle = connectionColor;
				ctx.lineWidth = 0.5;
				ctx.beginPath(); // Single path for all lines

				const distSq = connectionDistance * connectionDistance;
				for (let i = 0; i < particles.length; i++) {
					const p1 = particles[i];
					// Only check next 10 particles, not all
					const end = Math.min(i + 10, particles.length);
					for (let j = i + 1; j < end; j++) {
						const p2 = particles[j];
						const dx = p1.x - p2.x;
						const dy = p1.y - p2.y;
						if (dx * dx + dy * dy < distSq) {
							ctx.moveTo(p1.x, p1.y);
							ctx.lineTo(p2.x, p2.y);
						}
					}
				}
				ctx.stroke(); // Single stroke call
			}

			animationId = requestAnimationFrame(animate);
		}

		resize();
		animationId = requestAnimationFrame(animate);

		// Debounced resize
		let resizeTimeout: number;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resize, 150);
		};
		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(resizeTimeout);
		};
	});

	onDestroy(() => {
		if (browser && animationId) {
			cancelAnimationFrame(animationId);
		}
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0"
	aria-hidden="true"
></canvas>

<!-- Static CSS blobs instead of animated SVG - WAY cheaper -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
	<div
		class="absolute rounded-full blur-3xl opacity-[0.04]"
		style="
			width: 500px;
			height: 500px;
			background: radial-gradient(circle, rgb(113, 113, 122) 0%, transparent 70%);
			top: 10%;
			left: 5%;
			animation: float1 20s ease-in-out infinite;
		"
	></div>
	<div
		class="absolute rounded-full blur-3xl opacity-[0.03]"
		style="
			width: 400px;
			height: 400px;
			background: radial-gradient(circle, rgb(161, 161, 170) 0%, transparent 70%);
			top: 40%;
			right: 10%;
			animation: float2 25s ease-in-out infinite;
		"
	></div>
	<div
		class="absolute rounded-full blur-3xl opacity-[0.03]"
		style="
			width: 350px;
			height: 350px;
			background: radial-gradient(circle, rgb(82, 82, 91) 0%, transparent 70%);
			bottom: 15%;
			left: 30%;
			animation: float3 22s ease-in-out infinite;
		"
	></div>
</div>

<style>
	@keyframes float1 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(30px, 20px); }
	}
	@keyframes float2 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-20px, 30px); }
	}
	@keyframes float3 {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(25px, -15px); }
	}
</style>
