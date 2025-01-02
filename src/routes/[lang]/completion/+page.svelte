<script lang="ts">
	import App from './app.svelte';
	import { page } from '$app/stores'; // Import page store to access the URL

	let name: string;
	// Accessing searchParams from the $page store reactively
	$: $page.url.searchParams.get('name')
		? (name = `Hey ${$page.url.searchParams.get('name') || ''}, `)
		: (name = '');

	const currentUrl = $page.url.href;
</script>

<App {name}></App>
