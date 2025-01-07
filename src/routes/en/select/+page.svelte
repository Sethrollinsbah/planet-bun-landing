<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge';
	import { fly, blur } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import services from '$lib/services.json';

	let tags = {
		use_case: Array.from(new Set(services.flatMap((service) => service.tags)))
	};

	// Generate checked state object dynamically from tags
	let tags_checked = $state({});
	tags.use_case.forEach((tag) => {
		tags_checked[tag] = false; // Initialize all tags as unchecked
	});
	import QuizAlert from '$lib/handmade/quiz-alert.svelte';
	import SortBy from '$lib/handmade/sort-by.svelte';
	import UseCase from '$lib/handmade/use-case.svelte';
	import SelectServices from '$lib/handmade/select-services.svelte';
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center">
	<p class="mx-auto w-[90%] pb-16 text-center font-light text-primary/70">
		Select from prebundled packages that have worked for others in the past.
	</p>
	<div
		class="relative grid h-full w-full gap-4 px-8 sm:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]"
	>
		<div
			class="top-8 h-fit sm:sticky"
			in:blur|global={{
				duration: 100
			}}
			out:blur|global={{
				duration: 100
			}}
		>
			<QuizAlert></QuizAlert>

			<UseCase {tags} {tags_checked}></UseCase>
			<SortBy></SortBy>
		</div>
		<div
			in:fly={{
				y: 100,
				delay: 200,
				duration: 1200,
				easing: backOut
			}}
			out:fly={{
				y: 100,
				delay: 100,
				easing: backOut
			}}
			class="flex h-full w-full flex-col items-center justify-start"
		>
			<div
				class="flex w-full flex-row flex-wrap items-center justify-start space-x-1 space-y-1 py-2"
			>
				{#each Object.entries(tags_checked) as [key, value]}{#if key && value}
						<Badge variant="secondary">{key}</Badge>
					{/if}{/each}
			</div>
			<div class="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
				<SelectServices {tags} {tags_checked}></SelectServices>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
