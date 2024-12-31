<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import Companies from '$lib/handmade/companies.svelte';
	const reviews = [
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		},
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		},
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		},
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		},
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		},
		{
			message: 'We first hired ...',
			author: 'Josh Warren',
			username: '@joshbaren'
		}
	];
</script>

<Carousel.Root class="h-full w-full">
	<div class="flex flex-row justify-between py-8 pl-8">
		<b>Featured Works</b>
		<div class="relative -translate-x-20">
			<Carousel.Previous />
			<Carousel.Next />
		</div>
	</div>
	<Carousel.Content class="-ml-1 px-4">
		{#each reviews as r, i (i)}
			<Carousel.Item class="pl-1 ">
				<div class="grid grid-cols-1 gap-4 p-1">
					<Card.Root class="aspect-video rounded-2xl">
						<Card.Content class="flex  min-h-80 flex-col items-start  justify-between p-10">
							<p>"{r.message}"</p>
							<div class="aspect-square">
								<p>{r.author}</p>
								<p>{r.username}</p>
							</div>
							<div class="flex flex-col items-start justify-center">
								<h1>Logo</h1>
								<h1>Name of project</h1>
								<p>Longer description about what its about</p>
							</div>
							<button
								class="flex h-12 w-full max-w-40 flex-row items-center justify-center overflow-clip rounded-2xl border-t-[1px] border-primary/20 bg-background bg-gradient-to-b from-primary-foreground/50 via-primary-foreground/40 to-primary-foreground px-8 font-medium text-primary/30 shadow ring-1 ring-primary-foreground transition-all duration-300 hover:bg-accent/50"
								>View Project</button
							>
						</Card.Content>
					</Card.Root>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>
