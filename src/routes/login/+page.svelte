<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import { Label } from '$lib/components/ui/label/index.js';
	let login = $state({ email: null });
</script>

<Tabs.Root value="account" class="w-[400px]">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="password">Existing Client</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">
		<Card.Root>
			<Card.Header>
				<Card.Title>Account</Card.Title>
				<Card.Description>
					Make changes to your account here. Click save when you're done.
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="name">Name</Label>
					<Input id="name" value="Pedro Duarte" />
				</div>
				<div class="space-y-1">
					<Label for="username">Username</Label>
					<Input id="username" value="@peduarte" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save changes</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="password">
		<Card.Root>
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>
					Enter your email address and we’ll send you a password-free link to sign in
				</Card.Description>
			</Card.Header>

			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="current">Company Email</Label>
					<Input bind:value={login.email} id="current" type="email" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button
					on:click={async () => {
						try {
							const res = await fetch('/api/auth/login', {
								body: JSON.stringify(login),
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								}
							});
							if (!res.ok) {
								const error = await res.json();
								console.error('Error:', error.message || 'Failed to send login link.');
								alert('Failed to send login link. Please try again.');
								return;
							}
							const data = await res.json();
							alert('Login link sent! Check your email.');
							console.log('Success:', data);
						} catch (error) {
							console.error('Fetch error:', error);
							alert('An error occurred. Please try again.');
						}
					}}
				>
					Send Link
				</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
