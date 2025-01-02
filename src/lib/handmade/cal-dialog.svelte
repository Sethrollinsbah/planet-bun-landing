<script lang="ts">
	import { calDialog } from '$lib';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Calendar from './calendar.svelte';
</script>

<Dialog.Root
	open={$calDialog}
	onOpenChange={() => {
		$calDialog = !calDialog;
	}}
>
	<Dialog.Content
		class=" z-[9999] flex h-[100dvh] w-screen max-w-none flex-col items-center justify-center bg-background"
	>
		<div class="relative col-span-full mx-auto flex h-fit w-fit flex-col bg-background">
			<Calendar initialFocus />
		</div>
		<!-- <div class="absolute left-0 top-0 h-full w-full blur-lg"></div> -->
	</Dialog.Content>
</Dialog.Root>
