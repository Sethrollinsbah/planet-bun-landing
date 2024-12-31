<script lang="ts">
	import * as Card from '$lib/components/ui/card';
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
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root class="mx-auto mb-2  w-full max-w-4xl  rounded-xl">
	<Card.Content class="scrollbar max-h-96 overflow-y-scroll">
		<Collapsible.Root class="space-y-2">
			{#each Object.entries(tags) as [key, value]}
				<div class="flex items-center justify-between space-x-4">
					<h4 class="text-sm font-semibold capitalize">{key.replaceAll('_', ' ')}:</h4>
					<Collapsible.Trigger asChild let:builder>
						<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
							<ChevronsUpDown class="h-4 w-4" />
							<span class="sr-only">Toggle</span>
						</Button>
					</Collapsible.Trigger>
				</div>
				<Collapsible.Content class="space-y-2">
					{#each value as v}
						<div class="rounded-md border px-4 py-3 text-sm">
							<Checkbox
								id={v}
								class="rounded-sm"
								bind:checked={tags_checked[v]}
								aria-labelledby={v + '-label'}
							/>
							<Label
								id={v + '-label'}
								for={v}
								class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{v}
							</Label>
						</div>
					{/each}
				</Collapsible.Content>
			{/each}
		</Collapsible.Root>
	</Card.Content>
</Card.Root>
