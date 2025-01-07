<script lang="ts">
	import { blur, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import Main from '$lib/handmade/main.svelte';
</script>

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
	class="flex w-full flex-col items-center justify-start"
>
	<Main></Main>
</div>
