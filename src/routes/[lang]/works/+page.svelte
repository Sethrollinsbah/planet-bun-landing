<script lang="ts">
	import { selectedWork } from '$lib';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	const works = [
		[
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'How can we resolve banking',
						desc: 'Explain what happened',
						img: [
							'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
							'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg'
						]
					},
					{
						title: 'First',
						problem: 'How can we resolve banking',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				productImage: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',

				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 200, 90, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'How can we resolve banking',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [10, 200, 90, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [0, 200, 90, 0.9]
			}
		],
		[
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 200, 0, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 0, 90, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 20, 9, 0.9]
			}
		],
		[
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 0, 0, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [100, 200, 90, 0.9]
			},
			{
				image: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
				scopes: [
					{
						title: 'First',
						problem: 'Why',
						desc: 'Explain what happened',
						img: ['']
					}
				],
				projectDescription: 'Lorem',
				companyName: '',
				projectTitle: 'Revolutionizing the health space',
				link: null,
				color: [0, 128, 0, 0.7]
			}
		]
	];
	let newWorks = $state(works);
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

	import { blur, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
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
	<div
		in:fly={{
			y: 100,
			delay: 200,
			duration: 1200,
			easing: backOut
		}}
		out:fly={{
			y: 100,
			delay: 100,
			easing: backOut
		}}
		class="flex h-full w-full flex-col items-center justify-start"
	>
		{#if !$selectedWork}
			<div
				out:blur|global={{ duration: 300 }}
				in:fly={{ y: 100, duration: 500, delay: 300 }}
				class="grid w-full grid-cols-2 gap-2 md:grid-cols-3"
			>
				{#each newWorks as workSection, id}
					<div
						class:col-span-2={id === 2}
						class:grid-cols-3={id === 2}
						class:md:grid-cols-1={id === 2}
						class:md:col-span-1={id === 2}
						class="grid gap-2"
					>
						{#each workSection as work, wid}
							<div
								onclick={() => {
									window.scrollTo({ top: 0, behavior: 'smooth' });
									$selectedWork = work;
								}}
								class="overflow-clip rounded-2xl transition-all duration-300 hover:blur-sm"
							>
								<img class="h-auto max-w-full rounded-2xl" src={work.image} alt="" />
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<div class=" mx-auto w-[90%] max-w-4xl">
				<Button
					on:click={() => {
						$selectedWork = null;
					}}
					variant="outline"
					size="icon"
					class="z-40 mb-4 mr-auto size-8 rounded-full text-muted-foreground/60  {!$selectedWork.link
						? 'hidden'
						: 'block'}"
				>
					<ChevronLeft class="m-auto size-4" />
				</Button>
				<div
					class="relative mx-auto flex h-full flex-col items-start justify-between"
					in:fly={{
						y: 100,
						delay: 200,
						duration: 1200,
						easing: backOut
					}}
					out:fly={{
						y: 100,
						delay: 100,
						easing: backOut
					}}
				>
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
				{#if $selectedWork.productImage}
					<p class="mt-8">Here are the final results:</p>

					<img class="mt-4 w-full rounded-2xl" src={$selectedWork.productImage} />
				{/if}
				<ContactForm></ContactForm>
			</div>
		{/if}
		<Carousel.Root class="h-full w-full py-10">
			<div class="flex flex-row justify-between py-8 pl-8">
				<h1>Client Testimonials</h1>
				<div class="relative -translate-x-20">
					<Carousel.Previous />
					<Carousel.Next />
				</div>
			</div>
			<Carousel.Content class="-ml-1 px-4">
				{#each reviews as r, i (i)}
					<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root class="rounded-2xl">
								<Card.Content class="flex aspect-video flex-col items-start justify-between  p-10">
									<p>"{r.message}"</p>
									<div>
										<p>{r.author}</p>
										<p>{r.username}</p>
									</div>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>
</div>
