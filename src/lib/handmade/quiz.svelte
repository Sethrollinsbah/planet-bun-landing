<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { fly } from 'svelte/transition';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Calendar from './calendar.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { cn, getLocation } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { isNumericLiteral } from 'typescript';

	// Define strict types for the question types
	type QuestionType = 'name' | 'email' | 'age' | 'zip' | 'phone' | 'choice';

	interface BaseQuestion {
		key: string;
		type: QuestionType;
		title: string;
		validation?: (value: any) => boolean;
		errorMessage?: string;
	}

	interface ChoiceQuestion extends BaseQuestion {
		type: 'choice';
		choices: string[];
	}

	interface OtherQuestion extends BaseQuestion {
		type: Exclude<QuestionType, 'choice'>;
		choices?: never;
	}

	type Question = ChoiceQuestion | OtherQuestion;

	export let questions: Question[];
	export let onSubmit: (answers: Record<string, any>) => void;

	let show = 0;
	// Initialize answers with proper structure for name fields
	let answers: Record<string, any> = {};
	questions.forEach((q) => {
		if (q.type === 'name') {
			answers[q.key] = { firstName: '', lastName: '' };
		} else if (q.type === 'phone') {
			answers[q.key] = { code: 'US', number: '' };
		} else {
			answers[q.key] = '';
		}
	});

	let show_percent = ((questions.length - show) / questions.length) * 100;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function handleNext() {
		const currentQuestion = questions[show];
		const currentAnswer = answers[currentQuestion.key];

		if (currentQuestion.validation && !currentQuestion.validation(currentAnswer)) {
			toast.error(currentQuestion.errorMessage || 'Please complete this field');
			return;
		}

		if (show < questions.length - 1) {
			show += 1;
			show_percent = ((questions.length - show) / questions.length) * 100;
		} else {
			onSubmit(answers);
		}
	}

	function handleBack() {
		if (show > 0) {
			show -= 1;
			show_percent = ((questions.length - show) / questions.length) * 100;
		}
	}
	let zipcodemessage;
</script>

<div
	class="relative z-20 h-full w-full min-w-[30rem] max-w-4xl overflow-clip rounded-3xl bg-background pb-8 shadow-xl ring-1 ring-muted"
>
	<p
		class="flex h-full w-full max-w-md justify-between bg-background px-4 py-4 text-center font-bold text-primary"
	>
		<span class="my-auto size-5">
			<button aria-label="back" class:hidden={show === 0} class="size-5" on:click={handleBack}>
				<svg
					viewBox="0 0 24 24"
					class="size-full stroke-red-800 stroke-2"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M14.5 17L9.5 12L14.5 7" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</button>
		</span>
		<span class="max-w-xs text-center">
			{questions[show].title}
		</span>
		<span class="size-5"></span>
	</p>

	<div class="relative h-full w-full px-8 transition-all duration-300">
		<div class="relative mb-8 h-4 w-full overflow-clip rounded-full ring-1 ring-muted">
			<div
				class="absolute left-0 top-0 flex h-4 w-full justify-end rounded-full bg-accent transition-all duration-300 ease-in-out"
				style="transform: translateX({-show_percent}%);"
			>
				<p class="z-10 ml-auto pr-2 text-xs text-white">
					{(100 - show_percent).toFixed(0)}%
				</p>
			</div>
		</div>
		{#each questions as question, i}
			{#if show === i}
				<div
					in:fly={{
						y: 100,
						duration: 200
					}}
					class="relative col-span-full w-full max-w-md space-y-1"
				>
					{#if question.type === 'choice' && 'choices' in question}
						{#each question.choices as choice, i}
							<button
								class:rounded-t-xl={i === 0}
								class:rounded-b-xl={i === question.choices.length - 1}
								class="h-fit w-full rounded-md py-4 capitalize shadow ring-1 ring-muted transition-all duration-300 hover:bg-amber-800 hover:text-gray-100 active:scale-95"
								on:click={() => {
									answers[question.key] = choice;
									handleNext();
								}}
							>
								{choice}
							</button>
						{/each}
					{:else if question.type === 'multiselect'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Label for="phone-2">Phone</Label>
							<Input
								type="tel"
								on:input={(event) => {
									// Allow only numeric characters
									const input = event.target.value;

									answers[question.key] = { number: input.replace(/\D/g, ''), code: 'US' }; // Remove non-numeric characters
								}}
								bind:value={answers[question.key].number}
								id="phone-2"
								placeholder="phone"
							/>
							<p class="text-sm text-muted-foreground">Enter your phone.</p>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'text'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Label for="phone-2">Phone</Label>
							<Input
								type="tel"
								on:input={(event) => {
									// Allow only numeric characters
									const input = event.target.value;

									answers[question.key] = { number: input.replace(/\D/g, ''), code: 'US' }; // Remove non-numeric characters
								}}
								bind:value={answers[question.key].number}
								id="phone-2"
								placeholder="phone"
							/>
							<p class="text-sm text-muted-foreground">Enter your phone.</p>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'phone'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Label for="phone-2">Phone</Label>
							<Input
								type="tel"
								on:input={(event) => {
									// Allow only numeric characters
									const input = event.target.value;

									answers[question.key] = { number: input.replace(/\D/g, ''), code: 'US' }; // Remove non-numeric characters
								}}
								bind:value={answers[question.key].number}
								id="phone-2"
								placeholder="phone"
							/>
							<p class="text-sm text-muted-foreground">Enter your phone.</p>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'age'}
						<div class="relative col-span-full mx-auto flex h-full w-fit flex-col">
							<Calendar {handleNext} bind:value={answers[question.key]} initialFocus />
						</div>
					{:else if question.type === 'email'}
						<div class="relative col-span-full flex h-full w-full flex-col gap-1.5">
							<Label for="email-2">Email</Label>
							<Input
								type="email"
								on:input={(event) => {
									console.log(event);
								}}
								bind:value={answers[question.key]}
								id="email-2"
								placeholder="email"
							/>
							<p class="text-sm text-muted-foreground">Enter your email address.</p>

							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'zip'}
						<div class="relative col-span-full flex h-full w-full flex-col gap-1.5">
							<Label for="zip-2">Zip</Label>
							<Input
								type="zip"
								on:input={(event) => {
									console.log(event);
								}}
								bind:value={answers[question.key]}
								id="zip-2"
								placeholder="zip"
							/>
							<p class="text-sm text-muted-foreground">Enter your zip address.</p>
							<button
								type="button"
								on:click={async () => {
									try {
										const zipCode = await getLocation();
										console.log();
										zipcodemessage = 'Found: ' + zipCode;
										answers[question.key] = zipCode;
									} catch (error) {
										zipcodemessage = error.message;
									}
								}}
								class="mt-0 pt-0 text-xs hover:underline"
								>Get location <i class="font-light">
									{#if zipcodemessage}{zipcodemessage}{/if}</i
								></button
							>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
