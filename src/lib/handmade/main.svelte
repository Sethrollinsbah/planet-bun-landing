<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import Companies from './companies.svelte';
	import FeaturedWorks from './featured-works.svelte';
	import TopicSwitch from './topic-switch.svelte';
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
	import TitleSvg from './title-svg.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { lang } from '$lib';
	import { goto } from '$app/navigation';

	// State declarations
	let gridSpacing = $state(102.4);
	let gridColor = $state('#232323');
	let ThreeWaves: ComponentType | undefined = $state(undefined);
	let buttonHover = $state(false);
	let externalcontainer = $state();

	let animate = $state(false);
	// Derived state declarations
	let gridStyle = $derived(
		`background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${gridSpacing}" height="${gridSpacing}" fill="none" stroke="${encodeURIComponent(
			gridColor
		)}"><line x1="0" y1="0" x2="0" y2="${gridSpacing}" stroke-width="1"/><line x1="0" y1="0" x2="${gridSpacing}" y2="0" stroke-width="1"/></svg>');
        background-size: ${gridSpacing}px ${gridSpacing}px;
        background-position: 0 0;`
	);

	let dynamicPadding = $derived(`pb-[calc(${gridSpacing * 2}px)] pt-[80px]`);

	// Window resize handler
	function updateGridSpacing() {
		if (!browser) return;

		const width = window.innerWidth;
		if (width >= 1280) {
			gridSpacing = 102.4;
		} else if (width >= 1024) {
			gridSpacing = 89.6;
		} else if (width >= 768) {
			gridSpacing = 67.2;
		} else if (width >= 640) {
			gridSpacing = 51.2;
		} else {
			gridSpacing = 38.4;
		}
	}

	onMount(() => {
		if (browser) {
			animate = true;
			// Initial call to set correct spacing
			updateGridSpacing();

			// Add resize listener
			window.addEventListener('resize', updateGridSpacing);

			// Load ThreeWaves component
			import('./three-waves.svelte').then((module) => {
				ThreeWaves = module.default;
			});

			// Cleanup
			return () => {
				window.removeEventListener('resize', updateGridSpacing);
			};
		}
	});
</script>

<main
	class="relative flex h-full min-h-20 w-full max-w-sm flex-col border-[1px] border-[#232323] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
>
	<section
		bind:this={externalcontainer}
		id="main"
		class="relative aspect-[2/3] h-full w-full overflow-clip sm:aspect-[9/10] md:aspect-[9/8] lg:aspect-[6/5] xl:aspect-[5/4]"
		style={gridStyle}
	>
		<div
			style={`margin: ${Math.ceil(gridSpacing)}px;`}
			class={`z-0 w-auto space-y-2 bg-gradient-to-b from-background via-background to-transparent text-center`}
		>
			<!-- TODO: add Blogs link -->
			<!-- <a -->
			<!-- 	href={'/en/blogs?id=123'} -->
			<!-- 	class="rounded-full p-1 px-4 text-xs font-light ring-1 ring-muted sm:text-base" -->
			<!-- 	>Announcing our Official Release</a -->
			<!-- > -->
			<!---->
			<TitleSvg {animate}></TitleSvg>

			<div class="grid grid-cols-1 gap-y-4">
				<p class="z-50 text-base font-light text-muted-foreground sm:text-lg lg:text-xl">
					Narrow down your projects scope by taking our product selection quiz.
				</p>
				<Button
					href={'/' + lang + '/quiz'}
					class="z-50 mx-auto mt-4 h-12 w-full max-w-sm rounded-full">Take Quiz</Button
				>
				<button class="group z-50 m-auto flex w-fit rounded-full text-center"
					>Contact Us<ChevronRight
						class="-ml-2 opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:opacity-100"
					></ChevronRight></button
				>
			</div>
		</div>
		<div
			class="absolute bottom-0 -z-0 flex h-1/2 w-full flex-col items-center justify-center overflow-clip"
		>
			{#if ThreeWaves}
				<svelte:component this={ThreeWaves} {externalcontainer} {buttonHover} {gridSpacing} />
			{:else}
				<p>Loading...</p>
			{/if}
		</div>
	</section>
	<section id="companies" class="w-full border-b-[1px] border-t-[1px] border-muted px-4 py-5">
		<Companies></Companies>
	</section>
	<section class=" flex h-full w-full flex-col items-start justify-start space-y-8 p-8 py-12">
		<div class="flex w-full flex-col items-start justify-start space-y-4">
			<h1>Planet Bun is a Miami Based Dev Shop</h1>
			<h2 class="text-center">
				Empowering Miami businesses with cutting-edge, customized software solutions that drive
				growth, efficiency, and success in the competitive, evolving marketplace.
			</h2>
		</div>
		<div class="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-2">
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
			<div
				class="col-span-full grid grid-cols-3 gap-x-8 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6"
			>
				<a
					target="_blank"
					href="https://partners.amazonaws.com/partners/001aq000007teyaAAA/"
					class="flex aspect-video w-full flex-col items-center justify-center overflow-clip rounded-2xl bg-[url('/aws-partner-net.png')] bg-cover bg-center"
				>
				</a>
				<!-- TODO:: Add link for upwork -->
				<!-- <a -->
				<!-- 	target="_blank" -->
				<!-- 	class="flex aspect-video w-full flex-col items-center justify-center overflow-clip rounded-2xl bg-[url('/upwork.png')] bg-cover bg-center" -->
				<!-- > -->
				<!-- </a> -->
			</div>
		</div>
	</section>
	<section
		id="testimonial"
		class="grid h-full grid-cols-1 gap-8 border-t-[1px] border-muted p-8 md:grid-cols-[1fr_300px]"
	>
		<TopicSwitch></TopicSwitch>
		<div class="h-full">
			<p class="aspect-video text-lg font-light text-muted-foreground">
				View some of the prebuilt project bundles that we have to see if they suite your compnanies
				needs.
			</p>
			<Button
				variant="outline"
				href={'/' + lang + '/services'}
				class="mt-4 h-12 w-full rounded-full">View Services</Button
			>
		</div>
	</section>
	<section class="border-t-[1px] border-muted py-4">
		<FeaturedWorks></FeaturedWorks>
	</section>
	<section
		class=" test-start flex h-full w-full flex-col items-start justify-start space-y-8 border-t-[1px] border-muted p-8"
	>
		<div class="flex w-full flex-col items-start justify-start">
			<h1>First Class Product Experience</h1>
			<h2 class="text-start">We're a team of developers that love building things</h2>
			<h2 class="text-start">
				Our goal is to create the email platform we've always wished we had — one that just works.
			</h2>
		</div>
		<div class="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-2">
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
		</div>
	</section>
	<section
		class=" test-start flex h-full w-full flex-col items-start justify-start space-y-8 border-t-[1px] border-muted p-8 py-4"
	>
		<div class="flex w-full flex-col items-start justify-start space-y-4">
			<h1>First Class Product Experience</h1>
			<h2 class="text-start">We're a team of developers that love building things</h2>
			<h2 class="text-start">
				Our goal is to create the email platform we've always wished we had — one that just works.
			</h2>
		</div>
		<div class="grid h-full w-full grid-cols-1 gap-8 md:grid-cols-2">
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
			<div class="aspect-video w-full rounded-xl ring-1 ring-muted"></div>
		</div>
	</section>
	<section></section>
</main>

<style>
	h1 {
		@apply bg-gradient-to-r from-primary/80 via-primary/50 to-primary bg-clip-text text-center text-5xl text-transparent;
	}
	h2 {
		@apply bg-gradient-to-r from-primary/60 via-primary/50 to-primary/70 bg-clip-text text-center text-xl text-transparent;
	}
	b {
		@apply font-righteous font-light text-[#DB9057];
	}
</style>
