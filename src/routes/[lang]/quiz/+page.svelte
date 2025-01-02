<script lang="ts">
	import { goto } from '$app/navigation';
	import { lang } from '$lib';
	import Quiz from '$lib/handmade/quiz.svelte';

	const questions = [
		{
			key: 'project_type',
			type: 'choice',
			title: 'What type of project are you looking to build?',
			choices: ['MVP (Minimum Viable Product)', 'MLP (Minimum Lovable Product)', 'Prototype']
		},
		{
			key: 'primary_goal',
			type: 'choice',
			title: 'What is the primary goal of your MVP?',
			choices: ['Validate an idea', 'Attract investors', 'Test market demand', 'Launch quickly']
		},
		{
			key: 'target_audience',
			type: 'choice',
			title: 'Who is your target audience?',
			choices: ['Consumers', 'Businesses', 'Developers', 'Non-profit organizations', 'Other']
		},
		{
			key: 'platform',
			type: 'choice',
			title: 'Which platform(s) will the MVP be built for?',
			choices: ['Web', 'iOS', 'Android', 'Cross-platform']
		},
		{
			key: 'core_features',
			type: 'choice',
			title: 'What core features should the MVP include?',
			choices: [
				'User authentication',
				'Dashboard',
				'Payment gateway',
				'Notifications',
				'Integration with third-party services'
			]
		},
		{
			key: 'timeline',
			type: 'choice',
			title: 'What is your desired timeline for the MVP?',
			choices: ['1 month', '2-3 months', '3-6 months', 'Flexible']
		},
		{
			key: 'budget',
			type: 'choice',
			title: 'What is your budget for the MVP?',
			choices: [
				'Less than $10,000',
				'$10,000 - $25,000',
				'$25,000 - $50,000',
				'Greater than $50,000'
			]
		},
		{
			key: 'existing_assets',
			type: 'choice',
			title: 'Do you have any existing assets for the project?',
			choices: ['Design mockups', 'Wireframes', 'Codebase', 'No assets available']
		},
		{
			key: 'user_flow',
			type: 'choice',
			title: 'What is the desired user flow or journey for your MVP?',
			choices: ['Simple and intuitive', 'Highly interactive', 'Data-heavy workflows', 'Other']
		},
		{
			key: 'scalability',
			type: 'choice',
			title: 'How important is scalability for your MVP?',
			choices: ['Not important', 'Moderately important', 'Very important']
		},
		{
			key: 'tech_stack',
			type: 'choice',
			title: 'Do you have a preferred technology stack?',
			choices: ['Yes, I have specific requirements', 'No, I’m open to suggestions']
		},
		{
			key: 'maintenance',
			type: 'choice',
			title: 'Will you need ongoing maintenance and support after the MVP is built?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'competitors',
			type: 'choice',
			title: 'Who are your main competitors, if any?',
			choices: ['None', '1-3 competitors', '3-5 competitors', 'More than 5 competitors']
		},
		{
			key: 'analytics',
			type: 'choice',
			title: 'Do you need analytics integrated into the MVP?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'testing',
			type: 'choice',
			title: 'What level of testing is required?',
			choices: ['Basic functionality testing', 'Extensive testing with QA team', 'None']
		},
		{
			key: 'future_features',
			type: 'choice',
			title: 'What features would you like to add in the future?',
			choices: ['More integrations', 'Advanced analytics', 'AI/ML capabilities', 'Other']
		},
		{
			key: 'team',
			type: 'choice',
			title: 'Do you have an internal team working on the project?',
			choices: ['Yes, a full team', 'Partially', 'No, I’m outsourcing everything']
		},
		{
			key: 'communication',
			type: 'choice',
			title: 'How do you prefer to communicate about the project?',
			choices: ['Weekly updates', 'Bi-weekly updates', 'Ad-hoc updates', 'Daily standups']
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
