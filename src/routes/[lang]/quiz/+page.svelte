<script lang="ts">
	import { goto } from '$app/navigation';
	import { lang } from '$lib';
	import Quiz from '$lib/handmade/quiz.svelte';

	const questions = [
		{
			key: 'project_type',
			type: 'choice' as const,
			title: 'What you want to do?',
			choices: ['Build a MVP', 'Build a MLP', 'Continue working on a current project']
		},
		{
			key: 'household',
			type: 'choice' as const,
			title: 'What is your household size?',
			choices: ['1', '2', '3', '4', '5+']
		},
		{
			key: 'pregnant',
			type: 'choice' as const,
			title: 'Are you and your spouse currently pregnant?',
			choices: ['Yes', 'No']
		},
		// {
		// 	key: 'zip',
		// 	type: 'zip' as const,
		// 	title: 'What is your zip code?',
		// 	validation: (value: string) => /^\d{5}$/.test(value),
		// 	errorMessage: 'Please enter a valid zip code'
		// },

		{
			key: 'phone',
			type: 'phone' as const,
			title: 'What is your phone number?',
			validation: (value: { code: string; number: string }) =>
				value?.number?.replace(/[^0-9]/g, '').length > 0,

			errorMessage: 'Please enter a valid phone number'
		},
		{
			key: 'email',
			type: 'email' as const,
			title: 'What is your email?',
			validation: (value: string) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value),
			errorMessage: 'Please enter a valid email address'
		},
		{
			key: 'age',
			type: 'age' as const,
			title: 'What is your availability?',
			validation: (value: DateValue) => value !== null,
			errorMessage: 'Please select your availability'
		}
	];
</script>

<section class="flex flex-col items-center justify-start pb-20">
	<Quiz
		onSubmit={() => {
			goto('/' + lang + '/completion');
		}}
		{questions}
	></Quiz>
</section>
