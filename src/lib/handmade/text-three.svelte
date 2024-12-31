<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	export let gridSpacing = 102.4;
	const canvasWidth = gridSpacing * 9.9;
	const canvasHeight = gridSpacing * 6.5;

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
	/**
	 * @type {THREE.Object3D<THREE.Object3DEventMap>}
	 */
	let plane;
	let waves;

	/**
	 * @type {THREE.Object3D<THREE.Object3DEventMap>}
	 */
	let pointLight;

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

    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    mat2 rotate2d(float angle){
        return mat2(cos(angle),-sin(angle),
                  sin(angle),cos(angle));
    }

    void main() {
      gl_PointSize = u_pointsize;

      vec3 pos = position;
      // pos.xy is the original 2D dimension of the plane coordinates
      pos.z += noise(pos.xy * u_noise_freq_1 + u_time * u_spd_modifier_1) * u_noise_amp_1;
      // add noise layering
      // minus u_time makes the second layer of wave goes the other direction
      pos.z += noise(rotate2d(PI / 4.) * pos.yx * u_noise_freq_2 - u_time * u_spd_modifier_2 * 0.6) * u_noise_amp_2;

      vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvm;
    }`;
	}
	/**
	 * Initializes a reasonable uniforms object ready to be used in fragments
	 * @returns a uniforms object with u_time, u_mouse and u_resolution
	 */
	const getDefaultUniforms = () => {
		return {
			u_time: { value: 0.0 },
			u_mouse: {
				value: {
					x: 0.0,
					y: 0.0
				}
			},
			u_resolution: {
				value: {
					x: window.innerWidth * window.devicePixelRatio,
					y: window.innerHeight * window.devicePixelRatio
				}
			}
		};
	};

	function fragmentShader() {
		return `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359
    #define TWO_PI 6.28318530718
    
    uniform vec2 u_resolution;

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;

      gl_FragColor = vec4(vec3(0.0, st),1.0);
    }
    `;
	}
	const uniforms = {
		...getDefaultUniforms(),
		u_pointsize: { value: 2.0 },
		// wave 1
		u_noise_freq_1: { value: 3.0 },
		u_noise_amp_1: { value: 0.2 },
		u_spd_modifier_1: { value: 1.0 },
		// wave 2
		u_noise_freq_2: { value: 2.0 },
		u_noise_amp_2: { value: 0.3 },
		u_spd_modifier_2: { value: 0.8 }
	};

	onMount(() => {
		scene = new THREE.Scene();
		scene.background = null; // Important for scene transparency

		camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 3;

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Crucial: alpha: true
		renderer.setSize(canvasWidth, canvasHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0); // Explicitly set clear color to transparent
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

		scene.add(waves);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
		pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(5, 5, 5);

		scene.add(ambientLight);
		scene.add(pointLight);
		let isMouseOver = false; // Track mouse state

		container.addEventListener('mouseover', () => {
			isMouseOver = true;
			pointLight.intensity = 2; // Increase intensity on mouseover
		});

		container.addEventListener('mouseout', () => {
			isMouseOver = false;
			pointLight.intensity = 1; // Restore original intensity on mouseout
		});
		waves.position.z = -2; // Move the waves farther behind the plane
		const animate = () => {
			requestAnimationFrame(animate);

			// Update the u_time uniform
			uniforms.u_time.value += 0.01; // Adjust the increment value for desired speed
			// Optional: Animate light position while mouse is over
			// if (isMouseOver) {
			// 	console.log('mouseOver');
			// 	pointLight.position.x = Math.sin(Date.now() * 0.001) * 6; // Example animation
			// 	pointLight.position.z = Math.cos(Date.now() * 0.001) * 6;
			// }

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
			renderer.dispose();
		};
	});
</script>

<div
	class="z-10 bg-gradient-to-b from-transparent via-background to-background"
	bind:this={container}
	style={'height: ' + canvasHeight + 'px; width: ' + canvasWidth + ';'}
></div>
