<script>
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
</script>

<div class="relative flex h-full w-screen flex-col items-center justify-center">
	<div
		in:fly={{
			y: 100,
			delay: 200,
			duration: 1200,
			easing: backOut
		}}
		out:fly={(event) => {
			return {
				y: 100,
				delay: 100,
				easing: backOut
			};
		}}
		class="flex h-full w-full flex-col items-center justify-start"
	>
		<div class="aspect-video w-full rounded-xl bg-green-500"></div>
		<div class="aspect-video w-full rounded-xl bg-green-500"></div>
		<div class="aspect-video w-full rounded-xl bg-green-500"></div>
		<div class="aspect-video w-full rounded-xl bg-green-500"></div>
		<div class="aspect-video w-full rounded-xl bg-green-500"></div>
	</div>
</div>
