<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	// Props for scroll-based animation
	let { scrollY = 0 }: { scrollY?: number } = $props();

	// Scroll progress (0-1 for first viewport height)
	let scrollProgress = $derived(Math.min(scrollY / 800, 1));

	// Refs for all meshes
	let mesh1: THREE.Mesh;
	let mesh2: THREE.Mesh;
	let mesh3: THREE.Mesh;
	let mesh4: THREE.Mesh;
	let mesh5: THREE.Mesh;
	let mesh6: THREE.Mesh;

	// Animation time
	let t = $state(0);

	onMount(() => {
		let animationId: number;

		const animate = () => {
			t += 0.016; // ~60fps

			// Rotate all meshes
			if (mesh1) {
				mesh1.rotation.x += 0.004;
				mesh1.rotation.y += 0.003;
			}
			if (mesh2) {
				mesh2.rotation.x += 0.003;
				mesh2.rotation.z += 0.002;
			}
			if (mesh3) {
				mesh3.rotation.x += 0.002;
				mesh3.rotation.y += 0.004;
			}
			if (mesh4) {
				mesh4.rotation.x += 0.003;
				mesh4.rotation.z += 0.004;
			}
			if (mesh5) {
				mesh5.rotation.x += 0.005;
				mesh5.rotation.y += 0.003;
			}
			if (mesh6) {
				mesh6.rotation.z += 0.004;
			}

			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => cancelAnimationFrame(animationId);
	});
</script>

<div class="absolute inset-0 z-0 opacity-90 pointer-events-none">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />

		<T.AmbientLight intensity={0.5} />
		<T.DirectionalLight position={[5, 5, 5]} intensity={0.8} />
		<T.PointLight position={[-5, -5, -5]} intensity={0.4} color="#a1a1aa" />
		<T.PointLight position={[3, 3, 3]} intensity={0.3} color="#ffffff" />

		<!-- Icosahedron -->
		<T.Mesh
			bind:ref={mesh1}
			position.x={-3 + scrollProgress * -2}
			position.y={1.5 + Math.sin(t * 0.6) * 0.4 + scrollProgress * 3}
			position.z={scrollProgress * -2}
		>
			<T.IcosahedronGeometry args={[1.4, 0]} />
			<T.MeshStandardMaterial
				color="#d4d4d8"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.9 - scrollProgress * 0.5)}
			/>
		</T.Mesh>

		<!-- Octahedron -->
		<T.Mesh
			bind:ref={mesh2}
			position.x={3 + scrollProgress * 3}
			position.y={-1 + Math.sin(t * 0.5 + 1) * 0.5 + scrollProgress * -2}
			position.z={-1 + scrollProgress * -1}
		>
			<T.OctahedronGeometry args={[1.2, 0]} />
			<T.MeshStandardMaterial
				color="#a1a1aa"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.85 - scrollProgress * 0.5)}
			/>
		</T.Mesh>

		<!-- Torus Knot -->
		<T.Mesh
			bind:ref={mesh3}
			position.x={scrollProgress * 2}
			position.y={-2 + Math.sin(t * 0.4 + 2) * 0.35 + scrollProgress * -3}
			position.z={1 + scrollProgress * 2}
		>
			<T.TorusKnotGeometry args={[0.7, 0.2, 80, 12]} />
			<T.MeshStandardMaterial
				color="#71717a"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.8 - scrollProgress * 0.4)}
			/>
		</T.Mesh>

		<!-- Dodecahedron -->
		<T.Mesh
			bind:ref={mesh4}
			position.x={-1.5 + scrollProgress * -3}
			position.y={-0.5 + Math.sin(t * 0.7 + 3) * 0.3 + scrollProgress * 2}
			position.z={-2 + scrollProgress * -2}
		>
			<T.DodecahedronGeometry args={[0.9, 0]} />
			<T.MeshStandardMaterial
				color="#52525b"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.75 - scrollProgress * 0.4)}
			/>
		</T.Mesh>

		<!-- Tetrahedron -->
		<T.Mesh
			bind:ref={mesh5}
			position.x={2 + scrollProgress * 2}
			position.y={2.5 + Math.sin(t * 0.9) * 0.2 + scrollProgress * 3}
			position.z={-1.5 + scrollProgress * -1}
		>
			<T.TetrahedronGeometry args={[0.5, 0]} />
			<T.MeshStandardMaterial
				color="#a1a1aa"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.6 - scrollProgress * 0.3)}
			/>
		</T.Mesh>

		<!-- Box -->
		<T.Mesh
			bind:ref={mesh6}
			position.x={-2.5 + scrollProgress * -2}
			position.y={-2.5 + Math.sin(t * 1.1 + 1) * 0.15 + scrollProgress * -2}
			position.z={0.5 + scrollProgress * 1}
		>
			<T.BoxGeometry args={[0.4, 0.4, 0.4]} />
			<T.MeshStandardMaterial
				color="#71717a"
				wireframe={true}
				transparent={true}
				opacity={Math.max(0.1, 0.5 - scrollProgress * 0.3)}
			/>
		</T.Mesh>
	</Canvas>
</div>
