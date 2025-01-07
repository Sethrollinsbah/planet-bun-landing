<script lang="ts">
	import { selectedWork } from '$lib';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	const works = [
		[
			{
				image: '/cilitos.png',
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

<!-- in:fly={{ -->
<!-- 		y: 100, -->
<!-- 		delay: 200, -->
<!-- 		duration: 1200, -->
<!-- 		easing: backOut -->
<!-- 	}} -->
<!-- 	out:fly={{ -->
<!-- 		y: 100, -->
<!-- 		delay: 100, -->
<!-- 		easing: backOut -->
<!-- 	}} -->
<div class="relative flex h-full w-screen flex-col items-center justify-center overflow-x-clip">
	<div class="flex h-full w-full flex-col items-center justify-start">
		<div
			out:blur|global={{ duration: 300 }}
			in:fly={{ y: 100, duration: 500, delay: 300 }}
			class="grid w-full grid-cols-2 gap-2 px-2 md:grid-cols-3"
		>
			<!-- Column 1 -->
			<div class="flex flex-col justify-between gap-2">
				<a
					href="/en/works/1"
					class="aspect-[9/10] w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img src="/cilitos.png" class="h-full w-full" />
				</a>
				<a
					href="/en/works/1"
					class="aspect-[5/4] w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img src="/cilitos.png" class="h-full w-full" /></a
				>
				<a
					href="/en/works/1"
					class="aspect-[3/2] w-full rounded-2xl bg-gray-200 bg-[url('/cilitos.png')] bg-cover bg-center shadow"
				></a>
			</div>
			<!-- Column 2 -->
			<div class="flex flex-col gap-2">
				<a
					href="/en/works/1"
					class="aspect-[1] w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img src="/cilitos.png" class="h-full w-full" /></a
				>
				<a
					href="/en/works/1"
					class="aspect-[5/8] w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img src="/cilitos.png" class="h-full w-full" /></a
				>
			</div>
			<!-- Column 3 -->
			<div class="col-span-full flex flex-row gap-2 md:col-span-1 md:flex-col">
				<a
					href="/en/works/1"
					class="aspect-[8/5] h-full w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img src="/cilitos.png" class="h-full w-full" /></a
				>
				<a
					href="/en/works/1"
					class="aspect-[1] h-full w-full overflow-clip rounded-2xl bg-gray-200 shadow"
				>
					<img
						src="/cilitos.png"
						style="view-transition-name: work-image;"
						class="h-full w-full"
					/></a
				>
			</div>
		</div>
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

<style>
	/* Ensure the image maintains its aspect ratio during transition */
	:global(::view-transition-old(work-image)),
	:global(::view-transition-new(work-image)) {
		height: 100%;
		object-fit: cover;
	}

	/* Optional: Add custom animation styles */
	:global(::view-transition-old(work-image)) {
		animation: fade-out 0.5s ease-out;
	}

	:global(::view-transition-new(work-image)) {
		animation: fade-in 0.5s ease-in;
	}

	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
