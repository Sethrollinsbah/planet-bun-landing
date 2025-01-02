<script lang="ts">
	import { Sparkles } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
</script>

<Alert.Root class="group mb-2 rounded-2xl">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 group-hover:animate-ping"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path
			d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
		/><path d="M20 3v4" class="group-hover:hidden" />
		<path d="M22 5h-4" class="group-hover:hidden" /><path
			d="M4 17v2"
			class="group-hover:hidden"
		/><path d="M5 18H3" class="group-hover:hidden" /></svg
	>
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description class="font-light text-primary/50"
		>Take 5 minute onboarding quiz to see which of our Select offerings you may be looking for.</Alert.Description
	>
</Alert.Root>
