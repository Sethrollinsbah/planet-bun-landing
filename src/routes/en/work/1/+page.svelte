<script lang="ts">
	import { selectedWork } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from 'lucide-svelte';
	import CheckAnimate from '$lib/handmade/check-animate.svelte';
	import ContactForm from '$lib/handmade/contact-form.svelte';
	let gradientStyle = $derived.by(() => {
		let color = $selectedWork.color || [0, 0, 0, 0];
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

<div class="relative flex h-full w-screen flex-col items-center justify-center overflow-x-clip">
	<div class="flex h-full w-full flex-col items-center justify-start">
		<div class=" mx-auto w-[90%] max-w-4xl">
			<!-- <Button -->
			<!-- 	on:click={() => { -->
			<!-- 		$selectedWork = null; -->
			<!-- 	}} -->
			<!-- 	variant="outline" -->
			<!-- 	size="icon" -->
			<!-- 	class="z-40 mb-4 mr-auto size-8 rounded-full text-muted-foreground/60  {!$selectedWork.link -->
			<!-- 		? 'hidden' -->
			<!-- 		: 'block'}" -->
			<!-- > -->
			<!-- 	<ChevronLeft class="m-auto size-4" /> -->
			<!-- </Button> -->
			<div class="relative mx-auto flex h-full flex-col items-start justify-between">
				<div
					class="absolute left-0 top-0 flex aspect-square h-[80%] max-w-4xl flex-col items-start justify-between overflow-clip"
					style={gradientStyle}
				></div>

				<div
					class="relative my-[5%] aspect-video w-full max-w-full rounded-2xl bg-opacity-5 object-fill"
					style="background-image: url({$selectedWork.image});				
         backdrop-filter: blur(10px); /* Optional for added depth */
         z-index: -1; /* Ensure it's behind other elements */"
				>
					<div class="absolute left-0 top-0 h-full w-full bg-background/90"></div>
					<img
						class="relative mx-auto h-[110%] w-fit -translate-y-[5%] rounded-2xl object-cover shadow"
						src={$selectedWork.image}
						alt=""
					/>
				</div>
				<div class="space-y-2">
					<p class="text-4xl font-light">{$selectedWork.projectTitle}</p>
					<p class="mt-2 max-w-sm font-light text-muted-foreground/50">
						{$selectedWork.projectDescription}
					</p>
					<p class="mt-6 text-lg font-medium">Scopes</p>
					{#each $selectedWork.scopes as s}
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
						{#each $selectedWork.scopes as s}
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
			<p class="mt-8">Here are the final results:</p>

			<img class="mt-4 w-full rounded-2xl" src={$selectedWork.productImage || '/cilitos.png'} />
			<ContactForm></ContactForm>
		</div>
	</div>
</div>
