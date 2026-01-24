<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;
	let animationId: number;
	let morphPath1: SVGPathElement;
	let morphPath2: SVGPathElement;
	let morphPath3: SVGPathElement;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
		pulse: number;
		pulseSpeed: number;
	}

	// Blob paths for morphing
	const blobPaths = {
		blob1: [
			'M60,30 Q90,0 120,30 Q150,60 120,90 Q90,120 60,90 Q30,60 60,30',
			'M55,35 Q95,5 125,40 Q145,75 110,100 Q70,115 45,80 Q25,45 55,35',
			'M65,25 Q85,-5 115,25 Q155,55 125,95 Q85,125 55,95 Q15,65 65,25'
		],
		blob2: [
			'M40,20 Q70,-10 100,20 Q130,50 100,80 Q70,110 40,80 Q10,50 40,20',
			'M45,25 Q80,0 105,30 Q125,65 95,90 Q55,105 35,70 Q15,35 45,25',
			'M35,15 Q65,-15 95,15 Q135,45 105,85 Q65,115 35,85 Q5,55 35,15'
		],
		blob3: [
			'M50,25 Q80,-5 110,25 Q140,55 110,85 Q80,115 50,85 Q20,55 50,25',
			'M55,30 Q90,5 115,35 Q135,70 100,95 Q60,110 40,75 Q25,40 55,30',
			'M45,20 Q75,-10 105,20 Q145,50 115,90 Q75,120 45,90 Q5,60 45,20'
		]
	};

	onMount(() => {
		if (!browser) return;

		// Canvas particle system
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let particles: Particle[] = [];
		const particleCount = 80;
		let mouseX = 0;
		let mouseY = 0;

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			createParticles();
		}

		function createParticles() {
			particles = [];
			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.5,
					vy: (Math.random() - 0.5) * 0.5,
					size: Math.random() * 2 + 1,
					opacity: Math.random() * 0.4 + 0.1,
					pulse: Math.random() * Math.PI * 2,
					pulseSpeed: Math.random() * 0.02 + 0.01
				});
			}
		}

		function animateParticles() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((p) => {
				// Update position
				p.x += p.vx;
				p.y += p.vy;

				// Pulse animation
				p.pulse += p.pulseSpeed;
				const pulseFactor = 1 + Math.sin(p.pulse) * 0.3;

				// Mouse repulsion
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < 150 && distance > 0) {
					const force = (150 - distance) / 150;
					p.vx += (dx / distance) * force * 0.02;
					p.vy += (dy / distance) * force * 0.02;
				}

				// Apply friction
				p.vx *= 0.99;
				p.vy *= 0.99;

				// Wrap around edges
				if (p.x < -10) p.x = canvas.width + 10;
				if (p.x > canvas.width + 10) p.x = -10;
				if (p.y < -10) p.y = canvas.height + 10;
				if (p.y > canvas.height + 10) p.y = -10;

				// Draw particle with glow
				const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * pulseFactor * 2);
				gradient.addColorStop(0, `rgba(161, 161, 170, ${p.opacity * pulseFactor})`);
				gradient.addColorStop(1, 'rgba(161, 161, 170, 0)');

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size * pulseFactor * 2, 0, Math.PI * 2);
				ctx.fillStyle = gradient;
				ctx.fill();

				// Core
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size * pulseFactor * 0.5, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(212, 212, 216, ${p.opacity * pulseFactor})`;
				ctx.fill();
			});

			// Draw connections
			particles.forEach((p1, i) => {
				particles.slice(i + 1).forEach((p2) => {
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 120) {
						const opacity = 0.08 * (1 - distance / 120);
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.strokeStyle = `rgba(113, 113, 122, ${opacity})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				});
			});

			animationId = requestAnimationFrame(animateParticles);
		}

		// Track mouse
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		resize();
		animateParticles();
		window.addEventListener('resize', resize);

		// SVG Morph animations with AnimeJS (dynamically imported)
		import('animejs').then(({ animate }) => {
			if (morphPath1 && morphPath2 && morphPath3) {
				// Blob 1 - slow morph
				animate(morphPath1, {
					d: blobPaths.blob1,
					ease: 'inOutQuad',
					duration: 8000,
					loop: true,
					alternate: true
				});

				// Blob 2 - medium morph
				animate(morphPath2, {
					d: blobPaths.blob2,
					ease: 'inOutSine',
					duration: 6000,
					loop: true,
					alternate: true
				});

				// Blob 3 - faster morph
				animate(morphPath3, {
					d: blobPaths.blob3,
					ease: 'inOutCubic',
					duration: 5000,
					loop: true,
					alternate: true
				});
			}
		});

		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	onDestroy(() => {
		if (browser && animationId) {
			cancelAnimationFrame(animationId);
		}
	});
</script>

<!-- Canvas particles -->
<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0"
	aria-hidden="true"
></canvas>

<!-- SVG Morphing blobs -->
<svg
	class="pointer-events-none fixed inset-0 z-0 w-full h-full"
	viewBox="0 0 1440 900"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
>
	<defs>
		<linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color: rgba(113, 113, 122, 0.08)" />
			<stop offset="100%" style="stop-color: rgba(82, 82, 91, 0.04)" />
		</linearGradient>
		<linearGradient id="blob-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" style="stop-color: rgba(161, 161, 170, 0.06)" />
			<stop offset="100%" style="stop-color: rgba(113, 113, 122, 0.02)" />
		</linearGradient>
		<linearGradient id="blob-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
			<stop offset="0%" style="stop-color: rgba(82, 82, 91, 0.07)" />
			<stop offset="100%" style="stop-color: rgba(63, 63, 70, 0.03)" />
		</linearGradient>

		<filter id="blob-blur">
			<feGaussianBlur in="SourceGraphic" stdDeviation="20" />
		</filter>
	</defs>

	<!-- Morphing blobs -->
	<g filter="url(#blob-blur)">
		<path
			bind:this={morphPath1}
			d="M60,30 Q90,0 120,30 Q150,60 120,90 Q90,120 60,90 Q30,60 60,30"
			fill="url(#blob-gradient-1)"
			transform="translate(100, 100) scale(3)"
		/>
		<path
			bind:this={morphPath2}
			d="M40,20 Q70,-10 100,20 Q130,50 100,80 Q70,110 40,80 Q10,50 40,20"
			fill="url(#blob-gradient-2)"
			transform="translate(900, 300) scale(2.5)"
		/>
		<path
			bind:this={morphPath3}
			d="M50,25 Q80,-5 110,25 Q140,55 110,85 Q80,115 50,85 Q20,55 50,25"
			fill="url(#blob-gradient-3)"
			transform="translate(400, 500) scale(2.8)"
		/>
	</g>
</svg>
