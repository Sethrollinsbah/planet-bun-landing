<script>
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { Reflect } from './reflect';

	export let gridSpacing = 102.4;
	const canvasWidth = gridSpacing * 10;
	const canvasHeight = gridSpacing * 3.5;

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;

	onMount(() => {
		// Scene setup
		const scene = new THREE.Scene();
		scene.background = null;

		// Camera setup
		const camera = new THREE.OrthographicCamera(
			-canvasWidth / 2,
			canvasWidth / 2,
			canvasHeight / 2,
			-canvasHeight / 2,
			1,
			1000
		);
		camera.position.z = 10;

		// Renderer setup
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		renderer.setSize(canvasWidth, canvasHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// renderer.setClearColor(0x000000, 0);

		// Add reflecting surfaces
		const walls = [
			new THREE.Mesh(
				new THREE.PlaneGeometry(canvasWidth, 10),
				new THREE.MeshBasicMaterial({ color: 0x444444 })
			),
			new THREE.Mesh(
				new THREE.PlaneGeometry(canvasWidth, 10),
				new THREE.MeshBasicMaterial({ color: 0x444444 })
			),
			new THREE.Mesh(
				new THREE.PlaneGeometry(10, canvasHeight),
				new THREE.MeshBasicMaterial({ color: 0x444444 })
			),
			new THREE.Mesh(
				new THREE.PlaneGeometry(10, canvasHeight),
				new THREE.MeshBasicMaterial({ color: 0x444444 })
			)
		];

		walls.forEach((wall) => scene.add(wall));
		// Add obstacles
		const obstacles = [
			new THREE.Mesh(
				new THREE.BoxGeometry(100, 100, 10),
				new THREE.MeshBasicMaterial({ color: 0x666666 })
			),
			new THREE.Mesh(
				new THREE.BoxGeometry(80, 80, 10),
				new THREE.MeshBasicMaterial({ color: 0x666666 })
			)
		];

		obstacles[0].position.set(-200, 0, 0);
		obstacles[1].position.set(200, 100, 0);

		obstacles.forEach((obstacle) => scene.add(obstacle));

		// Load textures
		const textureLoader = new THREE.TextureLoader();
		const streakTexture = textureLoader.load(
			'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1LRW0uiGloWqJcY0WOxREA/61737e55cab34a414d746acb9d0a9400/download.png'
		);
		const glowTexture = textureLoader.load(
			'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2NKOrPD3iq75po1v0AA6h2/fc0d49ba0917bcbfd3d8a63688045a0c/download.jpeg'
		);

		// Enhanced materials for better texture visibility
		const streakMaterial = new THREE.MeshBasicMaterial({
			map: streakTexture,
			color: 0xffffff,
			transparent: false,
			opacity: 0.9,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			side: THREE.DoubleSide
		});

		const glowMaterial = new THREE.MeshBasicMaterial({
			map: glowTexture,
			color: 0x00ffff,
			transparent: true,
			opacity: 0.7,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			side: THREE.DoubleSide
		});

		// Create instanced meshes with enhanced materials
		const streaks = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), streakMaterial, 100);
		// streaks.setClearColor(0x000000, 0);

		scene.add(streaks);

		const glow = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), glowMaterial, 100);
		scene.add(glow);

		// Initialize reflection system
		const reflect = new Reflect({ scene, streaks, glow, streakTexture, glowTexture });

		// Track mouse for ray direction
		let mouse = new THREE.Vector2();
		let isMouseDown = false;

		canvas.addEventListener('mousemove', (event) => {
			const rect = canvas.getBoundingClientRect();
			mouse.x = ((event.clientX - rect.left) / canvasWidth) * 2 - 1;
			mouse.y = -((event.clientY - rect.top) / canvasHeight) * 2 + 1;

			if (isMouseDown) {
				const worldMouse = new THREE.Vector3(
					(mouse.x * canvasWidth) / 2,
					(mouse.y * canvasHeight) / 2,
					0
				);
				reflect.setRay([0, 0, 0], [worldMouse.x, worldMouse.y, 0]);
			}
		});

		canvas.addEventListener('mouseover', () => {
			isMouseDown = true;
		});

		canvas.addEventListener('mouseleave', () => {
			isMouseDown = false;
		});

		// Enhanced animation loop with improved texture handling
		const animate = () => {
			reflect.updateRay();
			const range = reflect.getRange();

			// Update streak instances with enhanced scaling and rotation
			const streakObj = new THREE.Object3D();
			for (let i = 0; i < range - 1; i++) {
				const progress = i / range;
				const position = reflect.getPositionAt(progress);
				const nextPosition = reflect.getPositionAt((i + 1) / range);

				const direction = new THREE.Vector3().subVectors(nextPosition, position).normalize();
				const angle = Math.atan2(direction.y, direction.x);

				// Enhanced scaling for better texture visibility
				const length = position.distanceTo(nextPosition);
				streakObj.position.copy(position);
				streakObj.rotation.z = angle;
				streakObj.scale.set(length * 1.5, 4.0, 1.0); // Adjusted scale for better texture visibility
				streakObj.updateMatrix();

				streaks.setMatrixAt(i, streakObj.matrix);
			}
			streaks.count = range - 1;
			streaks.instanceMatrix.needsUpdate = true;

			// Update glow instances with pulsating effect
			const glowObj = new THREE.Object3D();
			const pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.9; // Subtle pulsating effect
			for (let i = 1; i < range; i++) {
				const progress = i / range;
				const position = reflect.getPositionAt(progress);

				glowObj.position.copy(position);
				glowObj.scale.set(15.0 * pulseScale, 15.0 * pulseScale, 1.0);
				glowObj.updateMatrix();

				glow.setMatrixAt(i, glowObj.matrix);
			}
			glow.count = range;
			glow.instanceMatrix.needsUpdate = true;

			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};

		animate();
	});
</script>

<div class="overflow-clip" style="width: {canvasWidth}px; height: {canvasHeight}px;">
	<canvas bind:this={canvas}></canvas>
</div>
