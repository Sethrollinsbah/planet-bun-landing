<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Layers2, Calculator, ShieldQuestion, Rss } from 'lucide-svelte';
	import { backOut } from 'svelte/easing';
	import Logo from './logo.svelte';
	import { fly } from 'svelte/transition';

	// Define the navigation routes with their icons
	const routes = [
		{ label: 'Works', icon: Layers2, href: 'works' },
		{ label: 'Services', icon: Calculator, href: 'services' },
		{ label: 'Select', icon: ShieldQuestion, href: 'select' },
		{ label: 'Blog', icon: Rss, href: 'blog' }
	] as const;

	let { lang = 'en' } = $props();
	let hoverId: number | null = $state(null);
	let show = $state(false);

	// Handle initial animation
	setTimeout(() => (show = true), 600);

	function handleNavigation(route: (typeof routes)[number]) {
		goto(`/${lang}/${route.href}`);
	}

	function isCurrentRoute(href: string): boolean {
		return $page.url.pathname === `/${lang}/${href}`;
	}

	function getBackgroundPosition(): string {
		const index =
			hoverId !== null ? hoverId : routes.findIndex((route) => isCurrentRoute(route.href));
		return index !== -1 ? `left: ${(index * 100) / routes.length}%` : 'left: -20%; opacity: 0';
	}
	$inspect(hoverId);
</script>

{#if show}
	<div
		in:fly={{ y: 100, delay: 500, duration: 1200, easing: backOut }}
		out:fly={{ y: 100, delay: 300, easing: backOut }}
		class="sticky bottom-6 z-50 mx-4 flex h-16 w-auto flex-row items-center justify-center overflow-clip rounded-full border-t-[1px] border-primary/20 bg-background bg-gradient-to-b from-primary-foreground/50 via-primary-foreground/40 to-primary-foreground p-2 shadow ring-1 ring-primary-foreground md:mx-auto md:max-w-xl"
	>
		<button
			class="z-10 flex h-full w-fit min-w-20 flex-col items-center justify-center rounded-full bg-gradient-to-t from-primary/[1%] via-primary/[7%] to-primary/[10%] ring-1 ring-primary-foreground transition-all duration-300"
			onclick={() => goto(`/${lang}/home`)}
		>
			<Logo size="size-8" small />
		</button>

		<div class="relative mx-2 flex h-full w-full flex-row">
			<!-- Sliding background -->
			<div
				class="absolute h-full w-1/4 rounded-full bg-accent-foreground transition-all duration-300"
				style={getBackgroundPosition()}
			></div>

			{#each routes as route, i}
				<button
					class="z-10 flex h-full w-full min-w-14 flex-row items-center justify-center text-sm transition-all duration-300 focus:ring-1 focus:ring-ring lg:min-w-24"
					class:text-primary-foreground={hoverId === i || isCurrentRoute(route.href)}
					onclick={() => handleNavigation(route)}
					onmouseover={() => (hoverId = i)}
					onmouseleave={() => (hoverId = null)}
				>
					<span class="block">
						<svelte:component this={route.icon} class="size-4" />
						<span class="sr-only">{route.label}</span>
					</span>
				</button>
			{/each}
		</div>
	</div>
{/if}
