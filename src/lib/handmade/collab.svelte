<script>
	import { Megaphone, MessageCircle, MousePointer2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let timerAnimation = $state(3);
	let startTimer = $state(false);
	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let intervalId = null;

	$effect(() => {
		if (startTimer) {
			// Clear any existing interval first
			if (intervalId) {
				clearInterval(intervalId);
			}

			// Start new interval
			intervalId = setInterval(() => {
				if (timerAnimation === 9) {
					timerAnimation = -1;
				}
				timerAnimation += 1;
			}, 700);
		} else {
			// Clear interval when timer is stopped
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}
	});

	// Clean up on component destruction
	onMount(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
	const messages = [
		{
			role: 'client',
			message:
				'So, the website. It needs to, you know... *gestures broadly, nearly knocking over a stack of papers* ...resonate. Deeply. On a... cellular level. With the... zeitgeist.',
			time: '2024-10-27T10:00:00Z'
		},
		{
			role: 'agent',
			message:
				"Resonate... with the zeitgeist. Okay. Can you elaborate on what that means in terms of the website's purpose? What are you hoping to achieve?",
			time: '2024-10-27T10:01:30Z'
		},
		{
			role: 'client',
			message:
				"It's about... transcending the mundane. Elevating consciousness. Through... synergistic convergence. We're talking about a paradigm shift, a true... ontological re-calibration.",
			time: '2024-10-27T10:03:00Z'
		},
		{
			role: 'agent',
			message:
				"(Types 'ontological re-calibration' into a private search window) Right. So, are we selling a product? A service? Information?",
			time: '2024-10-27T10:04:30Z'
		},
		{
			role: 'alert',
			message: "Agent is internally panicking, searching for synonyms for 'vague'.",
			time: '2024-10-27T10:04:35Z'
		},
		{
			role: 'client',
			message:
				"We're not 'selling' anything. We're... facilitating. We're unlocking potential. We're providing the... catalyst. For... transformative growth. It's about empowering individuals to... actualize their inherent... quantum entanglement.",
			time: '2024-10-27T10:06:00Z'
		},
		{
			role: 'alert',
			message: 'Agent considers updating their resume.',
			time: '2024-10-27T10:06:05Z'
		},
		{
			role: 'agent',
			message:
				"(Under breath) Quantum entanglement... of course. Okay. Let's try a different approach. Do you have any competitors? Websites you admire?",
			time: '2024-10-27T10:07:30Z'
		},
		{
			role: 'client',
			message:
				"Competitors? We exist in a space beyond competition. We're... sui generis. As for inspiration... have you ever gazed into the infinite expanse of the cosmos? That's the feeling we need to evoke. A sense of... boundless possibility. And also, maybe a touch of... shimmering iridescence.",
			time: '2024-10-27T10:09:00Z'
		},
		{
			role: 'alert',
			message: 'Agent opens a new tab to look at cat videos for stress relief.',
			time: '2024-10-27T10:09:05Z'
		},
		{
			role: 'agent',
			message:
				"Shimmering iridescence... and boundless possibility... like the cosmos. Okay. I'm starting to get a... vague sense of the aesthetic. What about functionality? Are there any specific features you need? E-commerce? A blog? A contact form?",
			time: '2024-10-27T10:10:30Z'
		},
		{
			role: 'client',
			message:
				'Functionality... yes. It needs to be... intuitive. Seamless. Like... thought transference. Users should be able to... intuitively grasp the underlying... energetic frequencies. Without conscious effort.',
			time: '2024-10-27T10:12:00Z'
		},
		{
			role: 'alert',
			message: 'Agent wonders if they accidentally wandered into a new-age seminar.',
			time: '2024-10-27T10:12:05Z'
		},
		{
			role: 'agent',
			message:
				'(Massages temples) Thought transference... right. So, no explicit buttons or navigation then? How will they... find information?',
			time: '2024-10-27T10:13:30Z'
		},
		{
			role: 'client',
			message:
				'They will... *feel* it. The information will... emanate. Like a... subtle vibration. A resonance. It will... draw them in. Through... quantum entanglement. Remember?',
			time: '2024-10-27T10:15:00Z'
		},
		{
			role: 'alert',
			message: 'Agent contemplates early retirement.',
			time: '2024-10-27T10:15:05Z'
		},
		{
			role: 'agent',
			message:
				'Yes, right. Quantum entanglement. (Muttering) I need a coffee... a very strong coffee. Perhaps we can start with a basic wireframe, focusing on the… layout. Just to give us a starting point?',
			time: '2024-10-27T10:16:30Z'
		},
		{
			role: 'client',
			message:
				'A wireframe... if you must. But remember, it must capture the essence of... interdimensional connectivity. And the invisible dots, of course.',
			time: '2024-10-27T10:18:00Z'
		},
		{
			role: 'alert',
			message: 'Agent silently questions their life choices.',
			time: '2024-10-27T10:18:05Z'
		},
		{
			role: 'agent',
			message:
				'(Forces a smile) Of course. The invisible dots. I wouldn’t dream of forgetting them.',
			time: '2024-10-27T10:19:30Z'
		},
		{
			role: 'alert',
			message: "Agent adds 'quantum entanglement' to their personal block list.",
			time: '2024-10-27T10:19:35Z'
		},
		{
			role: 'agent',
			message:
				'So, just to recap... no buttons, intuitive feeling, cosmic vibes... Is there any content you have prepared? Text, images, anything at all?',
			time: '2024-10-27T10:21:00Z'
		},
		{
			role: 'alert',
			message: 'Agent desperately tries to find a concrete starting point.',
			time: '2024-10-27T10:21:05Z'
		},
		{
			role: 'client',
			message:
				"The content... it's... within. It needs to be... drawn out. Through... intuitive design. The website itself will... generate the content. Through... synergistic resonance with the user's subconscious.",
			time: '2024-10-27T10:22:30Z'
		},
		{
			role: 'alert',
			message: 'Agent considers faking a sudden illness.',
			time: '2024-10-27T10:22:35Z'
		},
		{
			role: 'agent',
			message: '(Stares blankly) The website will... generate the content... itself?',
			time: '2024-10-27T10:24:00Z'
		},
		{
			role: 'alert',
			message: "Agent's brain starts emitting smoke.",
			time: '2024-10-27T10:24:05Z'
		},
		{
			role: 'client',
			time: '2024-10-27T10:24:05Z',
			message:
				"Precisely. It's about... tapping into the collective unconscious. The... Akashic records. The website will be a... conduit. For... universal wisdom."
		}
	];
</script>

<div
	onmouseleave={() => {
		startTimer = false;
	}}
	onfocus={() => {
		console.log('focus');
		startTimer = true;
	}}
	onmouseover={() => {
		startTimer = true;
	}}
	class="relative h-full w-full overflow-clip text-muted-foreground grayscale transition-all duration-300 hover:grayscale-0"
>
	<div class="relative z-[1] bg-background p-4">
		<div class="flex flex-row items-center justify-start">
			<MessageCircle class="mr-1 size-4" />
			<p class="font-light">Constant contact</p>
		</div>
		<p class="text-xl font-light sm:text-2xl lg:text-3xl">
			<b class="font-medium text-primary">Feel involved</b> throughout the lifecycle of your project
		</p>
		<div
			class="absolute bottom-0 h-28 w-full translate-y-full bg-gradient-to-b from-background to-transparent"
		></div>
	</div>
	<div class="absolute bottom-0 h-full w-full p-4">
		<div
			class={`absolute bottom-0 left-4 flex h-full w-full transform-gpu flex-col space-y-2 py-4 transition-all duration-700 ease-in-out ${timerAnimation === 0 || timerAnimation === 1 ? 'translate-y-[60%]' : timerAnimation === 2 || timerAnimation === 3 ? 'translate-y-[0%]' : timerAnimation === 4 || timerAnimation === 5 ? 'translate-y-[-100%]' : timerAnimation === 6 || timerAnimation === 7 ? 'translate-y-[-200%]' : timerAnimation === 8 || timerAnimation === 9 ? 'translate-y-[-300%]' : 'translate-y-[60%]'}`}
		>
			{#each messages as { role, agentAlert, message }}
				{#if role === 'agent'}
					<div class="mt-2 max-w-60 rounded-xl bg-blue-800 p-4 ring-1 ring-muted">
						{message}
					</div>
				{:else if role === 'alert'}
					<p class="flex items-center justify-start text-xs text-green-600">
						<Megaphone class="mr-1 stroke-1" />{message}
					</p>
				{:else}
					<div class="ml-auto mr-8 mt-4 max-w-60 rounded-xl p-4 ring-1 ring-muted">
						{message}
					</div>
				{/if}
			{/each}
		</div>
		<div
			class="{`absolute left-[40%] z-[1] size-4 transform-gpu transition-all duration-700 ease-in-out ${timerAnimation === 0 ? 'bottom-4  opacity-100' : timerAnimation === 2 ? 'bottom-16  opacity-100' : timerAnimation === 4 ? 'bottom-24  opacity-100' : timerAnimation === 6 ? 'bottom-32  opacity-100' : timerAnimation === 8 ? ' bottom-24  opacity-100' : timerAnimation === 9 ? 'bottom-4  opacity-100' : timerAnimation === 10 ? 'bottom-4  opacity-100' : 'bottom-4  '}`}}}"
		>
			<MousePointer2 class="fill-muted"></MousePointer2>
		</div>
	</div>
</div>
