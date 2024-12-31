<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browserLoaded, selectedWork } from '$lib';
	import { Briefcase, Calculator, Layers2, ShieldQuestion } from 'lucide-svelte';
	import Logo from './logo.svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Route = {
		link: string;
	};
	let { lang = 'en' } = $props();
	const routes: Route[] = [
		{
			link: 'Works'
		},
		{
			link: 'Services'
		},
		{
			link: 'Select'
		}
	];
	let hoverId: number | null = $state(null);
	console.log($page.url.pathname);
	let show = $state(false);
	$effect(() => {
		if ($browserLoaded) {
			show = false;
		}
		if ($browserLoaded) {
			setTimeout(() => {
				show = true;
			}, 600);
		}
	});
</script>

{#if show}
	<div
		in:fly={{
			y: 100,
			delay: 500,
			duration: 1200,
			easing: backOut
		}}
		out:fly={{
			y: 100,
			delay: 300,
			easing: backOut
		}}
		class="sticky bottom-6 mx-4 flex h-16 w-auto flex-row items-center justify-center overflow-clip rounded-full border-t-[1px] border-primary/20 bg-background bg-gradient-to-b from-primary-foreground/50 via-primary-foreground/40 to-primary-foreground p-2 shadow ring-1 ring-primary-foreground md:mx-auto md:max-w-xl"
	>
		<button
			class="flex h-full w-fit min-w-20 flex-col items-center justify-center rounded-full bg-gradient-to-t from-primary/[1%] via-primary/[7%] to-primary/[10%] ring-1 ring-primary-foreground"
			onclick={() => {
				goto('/' + lang + '/home');
			}}><Logo size="size-8" small={true} /></button
		>
		<div class="relative mx-2 flex h-full w-full flex-row">
			<div
				class="absolute h-full w-1/3
			rounded-full
			{hoverId !== null ? 'bg-accent-foreground transition-all duration-300' : ''}
			{hoverId === 0
					? 'left-0 top-0'
					: hoverId === 1
						? 'left-1/3 top-0'
						: hoverId === 2
							? 'left-2/3 top-0'
							: hoverId === null && $page.url.pathname === '/' + lang + '/works'
								? 'left-0 bg-accent-foreground/10 transition-all duration-300'
								: hoverId === null && $page.url.pathname === '/' + lang + '/services'
									? 'left-1/3 bg-accent-foreground/10 transition-all duration-300'
									: hoverId === null && $page.url.pathname === '/' + lang + '/select'
										? 'left-2/3 bg-accent-foreground/10 transition-all duration-300'
										: ''}"
			></div>
			{#each routes as route, i}
				<button
					id={i.toString()}
					onclick={() => {
						goto('/' + lang + '/' + route.link.toLowerCase());
						$selectedWork = null;
					}}
					onfocus={(event) => {
						console.log(event);
					}}
					onmouseleave={(event) => {
						hoverId = null;
					}}
					onmouseover={(event) => {
						console.log(event.target.id);
						hoverId = i;
					}}
					class="z-10 flex h-full w-full min-w-14 flex-row items-center justify-center text-sm transition-all duration-300 focus:ring-1 focus:ring-ring lg:min-w-24"
					class:text-primary-foreground={hoverId === i}
					><span class="block">
						{#if i === 0}
							<Layers2 class="size-4" />
						{:else if i === 1}
							<Calculator class="size-4" />
						{:else if i === 2}<ShieldQuestion class="size-4" />
						{/if}</span
					></button
				>
			{/each}
		</div>
		<button
			class="flex h-full w-fit min-w-20 flex-col items-center justify-center rounded-full bg-gradient-to-t from-primary/[1%] via-primary/[7%] to-primary/[10%] text-sm ring-1 ring-primary-foreground hover:bg-primary/[5%]"
			onclick={() => {
				goto('/login');
			}}>Login</button
		>
	</div>
{/if}
