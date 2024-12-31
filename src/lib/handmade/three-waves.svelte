<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let { gridSpacing = 102.4, externalcontainer } = $props();

	const canvasWidth = gridSpacing * 9.9;
	let canvasHeight = $state(gridSpacing * 5);
	if (window.innerWidth < 640) {
		canvasHeight = gridSpacing * 8;
	}

	/**
	 * @type {HTMLDivElement}
	 */
	let container;
	/**
	 * @type {THREE.Scene}
	 */
	let scene;
	/**
	 * @type {THREE.PerspectiveCamera}
	 */
	let camera;
	/**
	 * @type {THREE.WebGLRenderer}
	 */
	let renderer;
	let waves;
	let pointLight;
	let mouse = new THREE.Vector2();
	let targetMouse = new THREE.Vector2();
	const lerpFactor = 0.05; // Adjust this value to control the delay (0-1, lower = more delay)

	function vertexShader() {
		return `
    #define PI 3.14159265359

    uniform float u_time;
    uniform float u_pointsize;
    uniform float u_noise_amp_1;
    uniform float u_noise_freq_1;
    uniform float u_spd_modifier_1;
    uniform float u_noise_amp_2;
    uniform float u_noise_freq_2;
    uniform float u_spd_modifier_2;
    uniform vec2 u_mouse;

    varying vec2 vUv;
    varying vec3 vPosition;

    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    mat2 rotate2d(float angle){
        return mat2(cos(angle),-sin(angle),
                  sin(angle),cos(angle));
    }

    void main() {
        vUv = uv;
        vPosition = position;
        
        gl_PointSize = u_pointsize;

        vec3 pos = position;
        pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;
        pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;

        vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvm;
    }`;
	}

	function fragmentShader() {
		return `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Calculate distance from current point to mouse position
      float dist = distance(vPosition.xy, u_mouse);
      
      // Create a circular gradient
      float radius = 5.0; // Adjust this value to change the size of the highlighted area
      float brightness = 1.0 - smoothstep(0.0, radius, dist);
      
      // Base color (b45309 - convert to RGB)
      // Convert hex to decimal: 
      // b4 = 180, 45 = 69, 09 = 9 
      vec3 baseColor = vec3(180.0/255.0, 69.0/255.0, 9.0/255.0); 
      // vec3 baseColor = vec3(.1531, .1531, 0.1649); 

      
      // Calculate highlight color based on base color
      vec3 highlightColor = vec3(.1531, .1531, 0.1649);
//baseColor + vec3(0.3, 0.3, 0.3); // Adjust brightness
      highlightColor = clamp(highlightColor, 0.0, 1.0); // Ensure values stay within 0-1 range

      // Mix between base color and highlight based on distance to mouse
      vec3 finalColor = mix(baseColor, highlightColor, brightness);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
	}

	// Linear interpolation function
	/**
	 * @param {number} start
	 * @param {number} end
	 * @param {number} t
	 */
	function lerp(start, end, t) {
		return start + (end - start) * t;
	}

	const uniforms = {
		u_time: { value: 0.0 },
		u_mouse: { value: new THREE.Vector2() },
		u_resolution: {
			value: {
				x: canvasWidth,
				y: canvasHeight
			}
		},
		u_pointsize: { value: 2.0 },
		u_noise_freq_1: { value: 3.0 },
		u_noise_amp_1: { value: 0.2 },
		u_spd_modifier_1: { value: 1.0 },
		u_noise_freq_2: { value: 2.0 },
		u_noise_amp_2: { value: 0.3 },
		u_spd_modifier_2: { value: 0.8 }
	};

	onMount(() => {
		scene = new THREE.Scene();
		scene.background = null;

		camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 3;

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(canvasWidth, canvasHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		const wavesGeometry = new THREE.PlaneGeometry(20, 12, 128, 128);
		const wavesMaterial = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader(),
			fragmentShader: fragmentShader()
		});

		waves = new THREE.Points(wavesGeometry, wavesMaterial);
		waves.position.x = 0;
		waves.position.y = 0;
		waves.rotation.x = -1;
		waves.position.z = -2;

		scene.add(waves);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
		pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(5, 5, 5);

		scene.add(ambientLight);
		scene.add(pointLight);

		// Mouse move handler
		const onMouseMove = (/** @type {{ clientX: number; clientY: number; }} */ event) => {
			// Calculate mouse position in normalized device coordinates (-1 to +1)
			const rect = externalcontainer.getBoundingClientRect();
			targetMouse.x = ((event.clientX - rect.left) / rect.width) * 20 - 10;
			targetMouse.y = -((event.clientY - rect.top) / rect.height) * 12 + 6;
		};

		externalcontainer.addEventListener('mousemove', onMouseMove);

		const animate = () => {
			requestAnimationFrame(animate);

			// Interpolate mouse position
			mouse.x = lerp(mouse.x, targetMouse.x, lerpFactor);
			mouse.y = lerp(mouse.y, targetMouse.y, lerpFactor);

			// Update uniform with interpolated position
			uniforms.u_mouse.value.x = mouse.x;
			uniforms.u_mouse.value.y = mouse.y;

			uniforms.u_time.value += 0.01;
			renderer.render(scene, camera);
		};

		animate();

		const handleResize = () => {
			camera.aspect = canvasWidth / canvasHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvasWidth, canvasHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			container.removeEventListener('mousemove', onMouseMove);
			renderer.dispose();
		};
	});
</script>

<div
	class="z-10 bg-gradient-to-b from-transparent via-background to-background"
	bind:this={container}
	style={'height: ' + canvasHeight + 'px; width: ' + canvasWidth + ';'}
></div>
