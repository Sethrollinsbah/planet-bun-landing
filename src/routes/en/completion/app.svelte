<script>
	import { Mail, Instagram, Linkedin } from 'lucide-svelte';
	let agent = {
		name: 'Seth',
		title: '',
		image: '/Seth.webp',
		instagram: '',
		linkedin: '',
		email: 'Seth@cobrasolutions.org'
	};
	export let name = '';
	import CountdownTimer from '$lib/countdown-timer.svelte';
</script>

<section class="flex h-full w-full flex-col space-y-8 py-16 text-primary">
	<div class="mx-auto w-[90%] max-w-xl text-center">
		<h1 className="m-auto uppercase  text-4xl sm:text-5xl md:text-6xl text-center font-light">
			{name}we got your request
		</h1>
		<h1 class="mx-auto max-w-sm text-lg font-light">
			<span class="inline"> <CountdownTimer /> </span>
		</h1>
	</div>

	<div
		class="border-clip-radius group relative mx-auto flex aspect-square h-full w-full max-w-sm items-center justify-center rounded-md px-0 shadow-lg"
	>
		<img
			src={agent.image}
			class="border-clip-radius relative flex aspect-square h-full w-full w-full items-center justify-center overflow-clip rounded-md object-center shadow-lg grayscale transition-all duration-100 group-hover:grayscale-0"
		/>
		<div class="absolute bottom-4 left-[1rem] w-[calc(100%-2rem)] rounded-md bg-gray-200 p-4">
			<b class="text-lg">{agent.name}</b><br /><span class="font-light">{agent.title}</span>
			<div class="absolute -bottom-12 left-4 flex space-x-2">
				{#if agent.linkedin}
					<a href={agent.linkedin} target="_blank">
						<Linkedin class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
				{#if agent.instagram}
					<a href={agent.instagram} target="_blank">
						<Instagram class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
				{#if agent.email}
					<a href={agent.email} target="_blank">
						<Mail class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
			</div>
		</div>
	</div>

	<h1 class="mx-auto mt-8 w-[90%] max-w-md text-center text-lg font-light">
		We've been blown away by the support from Seth. Within a few days, he found a better alternative
		that fit our needs, saving us both money and stress!
	</h1>
	<img class="mx-auto h-12 w-12 rounded-full bg-black" src="/customer.webp" />
</section>

<div class="flex flex-col items-center justify-center">
	<h1>Next Steps</h1>

	<h1 class="mx-auto w-[90%] max-w-xl text-center text-lg font-light">
		Your part is complete. We are currently evaluating your information and matching you with
		another agent. While you wait, feel free to review the rest of out website.
	</h1>
</div>
