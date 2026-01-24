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

	interface ShootingStar {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
		tailLength: number;
		life: number;
		maxLife: number;
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

		// Detect Safari for performance optimizations
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		const isLowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
		const shouldOptimize = isSafari || isLowPower;

		// Canvas particle system
		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let particles: Particle[] = [];
		let shootingStars: ShootingStar[] = [];

		// Reduce particle count for Safari/low-power devices
		const particleCount = shouldOptimize ? 40 : 60;
		const connectionDistance = shouldOptimize ? 80 : 100;
		const maxConnections = shouldOptimize ? 3 : 5;

		let mouseX = 0;
		let mouseY = 0;
		let lastShootingStarTime = 0;
		const shootingStarInterval = 8000;

		// Frame timing for consistent animation
		let lastFrameTime = 0;
		const targetFPS = shouldOptimize ? 30 : 60;
		const frameInterval = 1000 / targetFPS;

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, shouldOptimize ? 1 : 2);
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			ctx.scale(dpr, dpr);
			createParticles();
		}

		function createParticles() {
			particles = [];
			const width = window.innerWidth;
			const height = window.innerHeight;

			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * width,
					y: Math.random() * height,
					vx: (Math.random() - 0.5) * 0.3,
					vy: (Math.random() - 0.5) * 0.3,
					size: Math.random() * 1.5 + 0.5,
					opacity: Math.random() * 0.3 + 0.1,
					pulse: Math.random() * Math.PI * 2,
					pulseSpeed: Math.random() * 0.015 + 0.005
				});
			}
		}

		function spawnShootingStar() {
			const angle = (Math.random() * 30 + 25) * (Math.PI / 180);
			const speed = Math.random() * 4 + 8;
			const width = window.innerWidth;

			shootingStars.push({
				x: Math.random() * width * 0.8,
				y: -20,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				size: Math.random() * 1 + 1,
				opacity: 0,
				tailLength: Math.random() * 6 + 8,
				life: 0,
				maxLife: 50
			});
		}

		function drawShootingStars() {
			const now = performance.now();
			const height = window.innerHeight;
			const width = window.innerWidth;

			if (now - lastShootingStarTime > shootingStarInterval + Math.random() * 6000) {
				spawnShootingStar();
				lastShootingStarTime = now;
			}

			shootingStars = shootingStars.filter((star) => {
				star.life++;

				const fadeIn = Math.min(star.life / 5, 1);
				const fadeOut = Math.max(0, 1 - (star.life - star.maxLife + 15) / 15);
				star.opacity = fadeIn * fadeOut * 0.5;

				star.x += star.vx;
				star.y += star.vy;

				// Simple line instead of gradient for performance
				const tailX = star.x - (star.vx / Math.sqrt(star.vx ** 2 + star.vy ** 2)) * star.tailLength;
				const tailY = star.y - (star.vy / Math.sqrt(star.vx ** 2 + star.vy ** 2)) * star.tailLength;

				ctx.beginPath();
				ctx.moveTo(tailX, tailY);
				ctx.lineTo(star.x, star.y);
				ctx.strokeStyle = `rgba(200, 200, 205, ${star.opacity})`;
				ctx.lineWidth = star.size;
				ctx.lineCap = 'round';
				ctx.stroke();

				return star.life < star.maxLife && star.x < width + 50 && star.y < height + 50;
			});
		}

		function animateParticles(currentTime: number) {
			// Throttle frame rate
			const elapsed = currentTime - lastFrameTime;
			if (elapsed < frameInterval) {
				animationId = requestAnimationFrame(animateParticles);
				return;
			}
			lastFrameTime = currentTime - (elapsed % frameInterval);

			const width = window.innerWidth;
			const height = window.innerHeight;

			ctx.clearRect(0, 0, width, height);

			// Update and draw particles
			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				p.pulse += p.pulseSpeed;

				const pulseFactor = 1 + Math.sin(p.pulse) * 0.2;

				// Mouse repulsion (simplified)
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const distSq = dx * dx + dy * dy;
				if (distSq < 22500 && distSq > 0) { // 150^2
					const dist = Math.sqrt(distSq);
					const force = (150 - dist) / 150;
					p.vx += (dx / dist) * force * 0.015;
					p.vy += (dy / dist) * force * 0.015;
				}

				p.vx *= 0.99;
				p.vy *= 0.99;

				// Wrap around
				if (p.x < -10) p.x = width + 10;
				if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				if (p.y > height + 10) p.y = -10;

				// Draw simple circle (no gradient for performance)
				const size = p.size * pulseFactor;
				const alpha = p.opacity * pulseFactor;

				ctx.beginPath();
				ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(161, 161, 170, ${alpha})`;
				ctx.fill();
			});

			// Draw connections (optimized - limit per particle)
			ctx.strokeStyle = 'rgba(113, 113, 122, 0.06)';
			ctx.lineWidth = 0.5;

			for (let i = 0; i < particles.length; i++) {
				const p1 = particles[i];
				let connections = 0;

				for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
					const p2 = particles[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const distSq = dx * dx + dy * dy;

					if (distSq < connectionDistance * connectionDistance) {
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.stroke();
						connections++;
					}
				}
			}

			// Draw shooting stars
			drawShootingStars();

			animationId = requestAnimationFrame(animateParticles);
		}

		// Throttled mouse tracking
		let mouseThrottle = 0;
		const handleMouseMove = (e: MouseEvent) => {
			const now = performance.now();
			if (now - mouseThrottle > 16) { // ~60fps throttle
				mouseX = e.clientX;
				mouseY = e.clientY;
				mouseThrottle = now;
			}
		};
		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		resize();
		animationId = requestAnimationFrame(animateParticles);
		window.addEventListener('resize', resize, { passive: true });

		// SVG Morph animations (only if not Safari)
		if (!shouldOptimize) {
			import('animejs').then(({ animate }) => {
				if (morphPath1 && morphPath2 && morphPath3) {
					animate(morphPath1, {
						d: blobPaths.blob1,
						ease: 'inOutQuad',
						duration: 10000,
						loop: true,
						alternate: true
					});

					animate(morphPath2, {
						d: blobPaths.blob2,
						ease: 'inOutSine',
						duration: 8000,
						loop: true,
						alternate: true
					});

					animate(morphPath3, {
						d: blobPaths.blob3,
						ease: 'inOutCubic',
						duration: 7000,
						loop: true,
						alternate: true
					});
				}
			});
		}

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
			<stop offset="0%" style="stop-color: rgba(113, 113, 122, 0.06)" />
			<stop offset="100%" style="stop-color: rgba(82, 82, 91, 0.03)" />
		</linearGradient>
		<linearGradient id="blob-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" style="stop-color: rgba(161, 161, 170, 0.04)" />
			<stop offset="100%" style="stop-color: rgba(113, 113, 122, 0.02)" />
		</linearGradient>
		<linearGradient id="blob-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
			<stop offset="0%" style="stop-color: rgba(82, 82, 91, 0.05)" />
			<stop offset="100%" style="stop-color: rgba(63, 63, 70, 0.02)" />
		</linearGradient>

		<filter id="blob-blur">
			<feGaussianBlur in="SourceGraphic" stdDeviation="15" />
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
