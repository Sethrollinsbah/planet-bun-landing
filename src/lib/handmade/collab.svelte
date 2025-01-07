<script>
	import { Megaphone, MessageCircle, MousePointer2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let timerAnimation = $state(3);
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
				if (timerAnimation === 9) {
					timerAnimation = -1;
				}
				timerAnimation += 1;
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
	class="relative h-full w-full overflow-clip text-muted-foreground"
>
	<div class="relative z-[1] bg-background p-4">
		<div class="flex flex-row items-center justify-start">
			<MessageCircle class="mr-1 size-4" />
			<p class="font-light">Constant contact</p>
		</div>
		<p class="text-xl font-light sm:text-2xl lg:text-3xl">
			<b class="font-medium text-primary">Feel involved</b> throughout the lifecycle of your project
		</p>
		<div
			class="absolute bottom-0 h-28 w-full translate-y-full bg-gradient-to-b from-background to-transparent"
		></div>
	</div>
	<div class="absolute bottom-0 h-full w-full p-4">
		<div
			class={`absolute bottom-0 left-4 flex h-full w-full transform-gpu flex-col space-y-2 py-4 transition-all duration-700 ease-in-out ${timerAnimation === 0 || timerAnimation === 1 ? 'translate-y-[80%]' : timerAnimation === 2 || timerAnimation === 3 ? 'translate-y-[0%]' : timerAnimation === 4 || timerAnimation === 5 ? 'translate-y-[-100%]' : timerAnimation === 6 || timerAnimation === 7 ? 'translate-y-[-200%]' : timerAnimation === 8 || timerAnimation === 9 ? 'translate-y-[-300%]' : 'translate-y-[80%]'}`}
		>
			<div class="mt-2 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<p class="flex items-center justify-start text-xs text-green-600">
				<Megaphone class="mr-1 stroke-1" />This task has been assigned to Ava
			</p>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="mt-2 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<p class="flex items-center justify-start text-xs text-green-600">
				<Megaphone class="mr-1 stroke-1" />This task has been assigned to Ava
			</p>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="mt-2 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<p class="flex items-center justify-start text-xs text-green-600">
				<Megaphone class="mr-1 stroke-1" />This task has been assigned to Ava
			</p>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="mt-2 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<p class="flex items-center justify-start text-xs text-green-600">
				<Megaphone class="mr-1 stroke-1" />This task has been assigned to Ava
			</p>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="mt-2 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<p class="flex items-center justify-start text-xs text-green-600">
				<Megaphone class="mr-1 stroke-1" />This task has been assigned to Ava
			</p>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
			<div class="max-w-60 rounded-xl p-4 ring-1 ring-muted">
				Hey, thanks for helping a lot here you are the best
			</div>
		</div>
		<div
			class="{`absolute left-[40%] z-[1] size-4 transform-gpu transition-all duration-700 ease-in-out ${timerAnimation === 0 ? 'bottom-4  opacity-100' : timerAnimation === 2 ? 'bottom-16  opacity-100' : timerAnimation === 4 ? 'bottom-24  opacity-100' : timerAnimation === 6 ? 'bottom-32  opacity-100' : timerAnimation === 8 ? ' bottom-24  opacity-100' : timerAnimation === 9 ? 'bottom-4  opacity-100' : timerAnimation === 10 ? 'bottom-4  opacity-100' : 'bottom-4  '}`}}}"
		>
			<MousePointer2 class="fill-muted"></MousePointer2>
		</div>
	</div>
</div>
