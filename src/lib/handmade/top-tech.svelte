<script>
	import { blur, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let randomNumber = $state(3);
	let startTimer = $state(false);
	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let intervalId = null;

	$effect(() => {
		if (startTimer) {
			// Clear any existing interval first
			if (intervalId) {
				clearInterval(intervalId);
			}

			// Start new interval
			intervalId = setInterval(() => {
				randomNumber = Math.floor(Math.random() * 12);
				logo[randomNumber] = null;
				logo[randomNumber] = nextLogo[0];
				nextLogo = nextLogo.slice(1).concat(logo[randomNumber]);
			}, 700);
		} else {
			// Clear interval when timer is stopped
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}
	});

	// Clean up on component destruction
	onMount(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
	import { MessageCircle } from 'lucide-svelte';

	let nextLogo = $state([
		'/laravel.png',
		'/nuxt.svg',
		'/nextjs.svg',
		'/vue.png',
		'/svelte.png',
		'/swift.svg',
		'/hugo.svg',
		'/docker.svg',
		'/bash.svg',
		'angular.svg',
		'fastapi.svg',
		'electron.svg'
	]);

	let logo = $state([
		'/laravel.png',
		'/nuxt.svg',
		'/nextjs.svg',
		'/vue.png',
		'/svelte.png',
		'/swift.svg',
		'/hugo.svg',
		'/docker.svg',
		'/bash.svg',
		'angular.svg',
		'electron.svg',
		'fastapi.svg'
	]);
</script>

<div
	onmouseleave={() => {
		startTimer = false;
	}}
	onfocus={() => {
		console.log('focus');
		startTimer = true;
	}}
	onmouseover={() => {
		startTimer = true;
	}}
	class="group relative h-full w-full overflow-clip text-muted-foreground"
>
	<div class="relative z-[1] bg-background p-4">
		<div class="flex flex-row items-center justify-start">
			<MessageCircle class="mr-1 size-4" />
			<p class="font-light">Tested Frameworks</p>
		</div>
		<p class="text-xl font-light sm:text-2xl lg:text-3xl">
			Utilize
			<b class="font-medium text-primary"> Next-gen Frameworks</b> implemented by knowledgable agents
		</p>
		<div
			class="absolute bottom-0 h-28 w-full translate-y-full bg-gradient-to-b from-background to-transparent"
		></div>
	</div>
	<div class="absolute bottom-0 flex h-fit w-full flex-wrap gap-4 p-4">
		{#each logo as l, i}
			<div
				style={`background-image: url('/frameworks/${l}')`}
				class=" m-auto size-20 bg-contain bg-center bg-no-repeat"
			></div>
		{/each}
	</div>
</div>
