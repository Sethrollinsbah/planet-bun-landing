<script lang="ts">
	import CheckAnimate from '$lib/handmade/check-animate.svelte';
	import ContactForm from '$lib/handmade/contact-form.svelte';

	let { data } = $props();
	let selectedPlanet = $state(data.planet);
	let gradientStyle = $derived.by(() => {
		let color = selectedPlanet.color || [0, 0, 0, 0];
		return `
    background: radial-gradient(
      circle closest-side, 
      rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]}) 0%, 
      rgba(0, 128, 0, 0) 100%
    );
    backdrop-filter: blur(5px);
    z-index: -1;
  `;
	});
</script>

{#if selectedPlanet}
	<div class="relative flex h-full w-screen flex-col items-center justify-center overflow-x-clip">
		<div class="flex h-full w-full flex-col items-center justify-start">
			<div class=" mx-auto w-[90%] max-w-4xl">
				<div class="relative mx-auto flex h-full flex-col items-start justify-between">
					<div
						class="absolute left-0 top-0 flex aspect-square h-[80%] max-w-4xl flex-col items-start justify-between overflow-clip"
						style={gradientStyle}
					></div>

					<div class="relative my-[5%] aspect-video w-full max-w-full">
						<div
							class="absolute left-0 top-0 h-full w-full rounded-2xl bg-background/90 bg-center object-fill opacity-5"
							style="background-image: url({selectedPlanet.image});				
         z-index: -1; "
						></div>
						<img
							class="relative mx-auto max-w-sm -translate-y-[5%] rounded-2xl object-cover opacity-100 shadow"
							src={selectedPlanet.image}
							alt={selectedPlanet.name}
							style:--planet="image-{selectedPlanet.name}"
						/>
					</div>
					<div class="space-y-2">
						<p class="text-4xl font-light">{selectedPlanet.name}</p>
						<p class="mt-2 max-w-sm font-light text-muted-foreground/50">
							{selectedPlanet.projectDescription}
						</p>
						<p class="mt-6 text-lg font-medium">Scopes</p>
						{#each selectedPlanet.scopes as s}
							<div class="flex items-start justify-start text-muted-foreground/40">
								<div class="mr-4">
									<CheckAnimate checked={false}></CheckAnimate>
								</div>

								<div>
									<p class="font-medium capitalize text-muted-foreground/90">{s.title}</p>
									<p class="line-clamp-1 font-light text-muted-foreground/40">{s.problem}</p>
								</div>
							</div>
						{/each}
						<div class="mt-8">
							{#each selectedPlanet.scopes as s}
								<div class="relative mt-8 grid grid-cols-2 space-x-4">
									<div class=" sticky top-8 h-fit">
										<p class="text-2xl font-light text-primary">{s.title}</p>
										<p class="mt-2 max-w-sm font-light text-muted-foreground/50">
											High end microphones, headphones and professional audio tools for the modern
											sound engineer, producer, musician, recordist and content creator.
										</p>
									</div>
									<div class="sticky top-8 space-y-4">
										{#each s.img as si}
											<img class=" max-h-[80dvh] rounded-2xl" src={si} />
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				{#if selectedPlanet.finalResults}
					<p class="mt-8">Here are the final results:</p>

					<img
						class="mt-4 w-full rounded-2xl"
						src={selectedPlanet.finalResults || '/cilitos.png'}
					/>
					<ContactForm></ContactForm>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	img {
		width: 100%;
		margin-block: 4rem;
		view-transition-name: var(--planet);
	}
</style>
