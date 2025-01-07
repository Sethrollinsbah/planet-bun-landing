<script lang="ts">
	import { goto } from '$app/navigation';
	import { lang } from '$lib';
	import Quiz from '$lib/handmade/quiz.svelte';
	import Alert from './alert.svelte';

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
			choices: ['Web', 'iOS', 'Android', 'Desktop', 'Cross-platform']
		},
		{
			key: 'core_features_auth',
			type: 'choice',
			title: 'Is a user authentication a core feature needed within your product?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'core_features_dashboard',
			type: 'choice',
			title: 'Is a dashboard a core feature needed within your product?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'core_features_notifications',
			type: 'choice',
			title: 'Will your users need to be sent notifications from your product?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'core_features_thirdPartyIntegrations',
			type: 'choice',
			title: "Will your product need to integrate with any other third party services or api's?",
			choices: ['Yes', 'No', 'Not sure yet']
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
			key: 'existing_assets_mockups',
			type: 'choice',
			title: 'Do you have any existing design mockups for the project?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'existing_assets_wireframes',
			type: 'choice',
			title: 'Do you have any existing wireframes for the project?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'existing_assets_codebase',
			type: 'choice',
			title: 'Has an existing codebase/git repository been initialized for this project?',
			choices: ['Yes', 'No', 'Not sure yet']
		},
		{
			key: 'user_flow',
			type: 'choice',
			title:
				'What is the estimated complexity of the desired user flow or journey for your product?',
			choices: ['Simple and intuitive', 'Highly interactive', 'Data-heavy workflows', 'Other']
		},
		{
			key: 'scalability',
			type: 'choice',
			title: 'How important is scalability for this iteration of your product?',
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
			title: 'Estimate a count of the main competitors are in your market, if any?',
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
			title:
				'Are you looking to add any AI/ML capabilities features in this iteration or the future?',
			choices: ['Yes', 'No', 'Not sure yet']
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
		{
			key: 'contact',
			type: 'form',
			title: 'Please fill out this final form',
			validation: null,
			errorMessage: 'Please fill out your contact information'
		}
	];
	let open = $state(true);
</script>

<section class="relative flex min-h-[90vh] flex-col items-center justify-start pb-20">
	<Quiz
		onSubmit={() => {
			goto('/' + lang + '/completion');
		}}
		{questions}
	></Quiz>
</section>
<Alert {open}></Alert>
