<script lang="ts">
	import { browser } from '$app/environment';
	import { browserLoaded } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import Footer from '$lib/handmade/footer.svelte';
	import Logo from '$lib/handmade/logo.svelte';
	import { backOut } from 'svelte/easing';
	import '../app.css';
	let { children } = $props();
	let remove = $state(true);
	import { blur, fly } from 'svelte/transition';
	$effect(() => {
		if (browser) {
			$browserLoaded = true;
		}
		if ($browserLoaded) {
			setTimeout(() => {
				remove = false;
			}, 1500);
		}
	});

	let currentUrl = 'https://PlanetBun.com';
	let show = $state(false);
	$effect(() => {
		if ($browserLoaded) {
			show = false;
		}
		if ($browserLoaded) {
			setTimeout(() => {
				show = true;
			}, 1700);
		}
	});
	let title = 'Planet Bun | Miami Dev Shop';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<!-- <meta name="robots" content="index, follow" /> -->
	<meta name="title" content="Miami's Startup Focused Dev Shop" />
	<meta
		name="description"
		content="Tell us about your projects requirements to allow us to return to you a project that you will love."
	/>
	<meta
		name="keywords"
		content={[
			'software development company',
			'custom software development',
			'software development services',
			'software engineering company',
			'software development firm',
			'software outsourcing company',
			'top software development companies',
			'software development companies near me',
			'Web development company',
			'Ai software development',
			'Rust development services',
			'mobile app development company',
			'web application development services',
			'healthcare software development company',
			'financial software solutions',
			'retail software development services',
			'custom application development company',
			'enterprise software development',
			'software engineering consultancy',
			'software development company in Miami, FLorida',
			'Miami, Florida software development services'
		].join(',')}
	/>
	<title>{title}</title>
	<meta name="author" content="Seth Rollins" />
	<meta property="og:type" content="website" />
	<meta name="image" content="/bigCard.png" />
	<meta name="og:image" content="/bigCard.png" />
	<meta name="og:title" content="Miami's Startup Focused Dev Shop" />
	<meta
		name="og:description"
		content="Tell us about your projects requirements to allow us to return to you a project that you will love."
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content="Planet Bun" />

	<meta name="og:image:alt" content="Banner Card" />
	<meta name="image:alt" content="Banner Card" />
	<meta name="twitter:image" content="/bigCard.png" />
	<meta name="twitter:image:alt" content="Banner Card" />
	<!-- Schema.org for Google -->
	<script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": currentUrl,
      "image": meta.image,
      "author": {
        "@type": "Organization",
        "name": meta.author,
      },
    })}
	</script>
</svelte:head>

<div class="relative">
	{#if show}
		<div
			in:fly={{
				y: -50,
				delay: 50,
				duration: 1000,
				easing: backOut
			}}
			class=" sticky top-0 z-[999] flex h-20 w-full flex-row items-center justify-between border-y-[1px] border-muted bg-background px-4 text-xl sm:px-12"
		>
			<a href="/">
				<Logo size="w-32  h-20" small={false}></Logo>
			</a>
			<Button class="mt-4" variant="outline">Request a Quote</Button>
		</div>
		{#if $browserLoaded}
			<div class="flex w-full flex-col items-center justify-center py-16">
				{@render children()}
			</div>
			<Footer></Footer>
		{/if}
	{/if}
</div>
{#if !$browserLoaded}
	<div
		out:blur|global={{ delay: 1900, duration: 800 }}
		class="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-stone-950"
	></div>
{/if}
{#if remove}
	<div
		out:blur={{ duration: 800 }}
		class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
	>
		<Logo hide={false}></Logo>
	</div>
{/if}

<Toaster></Toaster>
