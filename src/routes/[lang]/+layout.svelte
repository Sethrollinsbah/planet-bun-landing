<script lang="ts">
	import NavMenu from '$lib/handmade/nav-menu.svelte';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { browserLoaded, calDialog } from '$lib';
	import CalDialog from '$lib/handmade/cal-dialog.svelte';
	let { children } = $props();
	let show = $state(false);
	$effect(() => {
		if ($browserLoaded) {
			show = false;
		}
		if ($browserLoaded) {
			setTimeout(() => {
				show = true;
			}, 500);
		}
	});
</script>

<div class="flex flex-col items-center justify-center">
	<div
		class="flex flex-col items-center justify-center"
		in:fly={{
			y: 100,
			duration: 1200,
			easing: backOut
		}}
		out:fly={{
			y: 100,
			delay: 300,
			easing: backOut
		}}
	>
		{#if show}
			{@render children()}
		{/if}
	</div>

	<NavMenu></NavMenu>
</div>
<CalDialog></CalDialog>
