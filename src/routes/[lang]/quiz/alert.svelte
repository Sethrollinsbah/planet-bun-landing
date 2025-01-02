<script lang="ts">
	import { lang } from '$lib';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	let { open = false } = $props();
</script>

<AlertDialog.Root
	{open}
	onOpenChange={() => {
		open = !open;
	}}
>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Welcome to the Quiz!</AlertDialog.Title>
			<AlertDialog.Description>
				You're about to take a quiz designed to help us understand your needs and preferences
				better. By clicking "Start Quiz," you agree to our
				<a href={'/' + lang + '/terms'} target="_blank" class="text-blue-500 underline"
					>Terms of Service</a
				>
				and
				<a href={'/' + lang + '/privacy'} target="_blank" class="text-blue-500 underline"
					>Privacy Policy</a
				>.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action>Start Quiz</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
