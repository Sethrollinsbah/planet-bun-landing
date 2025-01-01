<script lang="ts">
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	// Dynamic list of routes
	let routes = ['Design', 'Mobile', 'Web', 'Cloud']; // Add or remove items here easilyservice
	let hoverId: number | null = null; // For hover effect
	let selected = 0; // Track selected index
	const itemCount = routes.length; // Total number of items

	// Dynamically calculate width percentage for each item
	$: itemWidth = 100 / itemCount + '%';
</script>

<div class="flex h-full flex-col-reverse justify-between md:flex-col">
	<div class="aspect-video">
		{#if selected === 0}
			<p in:fly={{ duration: 100, y: 50, delay: 100 }} out:fly={{ duration: 100, y: 50 }}>
				runway Logo build times went from 7m to 40s.leonardo-ai Logo saw a 95% reduction in page
				load times. zapier Logo saw 24x faster builds.
			</p>
		{:else if selected === 1}
			<p in:fly={{ duration: 100, y: 50, delay: 100 }} out:fly={{ duration: 100, y: 50 }}>
				m 7m to 40s.leonardo-ai Logo saw a 95% reduction in page load times. zapier Logo saw 24x
				faster builds.
			</p>
		{:else if selected === 2}
			<p in:fly={{ duration: 100, y: 50, delay: 100 }} out:fly={{ duration: 100, y: 50 }}>
				m 7m to 40s.leonardo-ai Logo saw a 95% reduction in page load times. z4x faster builds.
			</p>
		{:else if selected === 3}
			<p in:fly={{ duration: 100, y: 50, delay: 100 }} out:fly={{ duration: 100, y: 50 }}>
				m 7m to 40s.uction in page load times. zapier Logo saw 24x faster builds.
			</p>
		{/if}
	</div>

	<!-- </p> -->
	<div
		class="mb-4 mt-auto flex h-12 w-auto flex-row items-center justify-center overflow-clip rounded-full border-t-[1px]
	border-muted p-1 shadow ring-1 ring-primary-foreground md:mb-0"
	>
		<div class="relative flex h-full w-full">
			<!-- Highlight Background -->
			<div
				class="absolute h-full rounded-full shadow ring-1 ring-muted transition-all duration-300"
				style="
				width: {itemWidth};
				left: {hoverId !== null ? (hoverId * 100) / itemCount : (selected * 100) / itemCount}%;
			"
			></div>

			<!-- Buttons -->
			{#each routes as route, i}
				<button
					class="z-10 flex h-full w-full items-center justify-center rounded-full text-sm transition-all duration-300"
					class:text-muted={selected !== i}
					class:text-primary={selected === i}
					style="width: {itemWidth};"
					onmouseover={() => (hoverId = i)}
					onmouseleave={() => (hoverId = null)}
					onclick={() => (selected = i)}
				>
					{route}
				</button>
			{/each}
		</div>
	</div>
</div>
