<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	let {} = $props();

	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';

	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root class="mx-auto  w-full max-w-4xl  rounded-xl">
	<Card.Content class="scrollbar max-h-96 overflow-y-scroll">
		<Collapsible.Root class="space-y-2">
			<div class="flex items-center justify-between space-x-4">
				<h4 class="text-sm font-semibold capitalize">Sort By:</h4>
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
						<ChevronsUpDown class="h-4 w-4" />
						<span class="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="space-y-2">value</Collapsible.Content>
		</Collapsible.Root>
	</Card.Content>
</Card.Root>
