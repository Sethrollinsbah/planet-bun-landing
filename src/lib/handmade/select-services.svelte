<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge';
	import { fly, blur } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import services from '$lib/services.json';
	let {
		tags = {
			use_case: [
				'AI',
				'Blog',
				'Eccomerce',
				'Web Scraping',
				'Lead Generation',
				'CMS',
				'Web 3',
				'Realtime Apps',
				'Authentication'
			]
		},
		tags_checked = {}
	} = $props();
	// Generate checked state object dynamically from tags
	tags.use_case.forEach((tag) => {
		tags_checked[tag] = false; // Initialize all tags as unchecked
	});
	function isServiceVisible(service) {
		// If no tags are checked, show all services
		if (Object.values(tags_checked).every((value) => value === false)) {
			return true;
		}

		// Get array of selected tags
		const selectedTags = Object.entries(tags_checked)
			.filter(([_, isChecked]) => isChecked)
			.map(([tag, _]) => tag);

		// Check if service has any of the selected tags
		return selectedTags.some((tag) => service.tags.includes(tag));
	}
</script>

{#each services as s}
	{#if isServiceVisible(s)}
		<Dialog.Root>
			<Dialog.Trigger class="rounded-xl focus:ring-white">
				<Card.Root class="mx-auto w-full max-w-4xl rounded-xl ">
					<Card.Header>
						<Card.Title>{s.name}</Card.Title>
						<Card.Description>{s.description}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Card Content</p>
					</Card.Content>
					<Card.Footer>
						<p>Card Footer</p>
					</Card.Footer>
				</Card.Root></Dialog.Trigger
			>
			<Dialog.Content>hi</Dialog.Content>
		</Dialog.Root>
	{/if}
{/each}
