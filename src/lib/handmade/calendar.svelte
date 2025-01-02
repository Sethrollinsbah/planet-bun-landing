<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import * as Calendar from '$lib/components/ui/calendar';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CircleX, Clock, Globe, Phone } from 'lucide-svelte';

	type $$Props = CalendarPrimitive.Props;

	export let handleNext;
	async function process() {}
	// Set default date to current date
	const currentDate = today(getLocalTimeZone());
	const defaultDate = currentDate.set({ year: currentDate.year });

	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = defaultDate;
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	// Calculate the next 6 months from current date
	const monthFmt = new DateFormatter('en-US', { month: 'long' });

	const monthOptions = Array.from({ length: 6 }, (_, i) => {
		const futureDate = new Date();
		futureDate.setMonth(currentDate.month - 1 + i); // -1 because months are 0-based in JS Date

		return {
			value: futureDate.getMonth() + 1, // +1 to match the 1-based month format
			label: monthFmt.format(futureDate)
		};
	});

	// Calculate year options for the next 6 months
	const currentYear = currentDate.year;
	const endDate = new Date();
	endDate.setMonth(endDate.getMonth() + 5);
	const endYear = endDate.getFullYear();

	const yearOptions = Array.from(
		new Set([currentYear, endYear]) // Remove duplicates if spans only one year
	).map((year) => ({
		label: String(year),
		value: year
	}));

	// Set default year and month based on current date
	$: defaultYear = {
		value: placeholder.year,
		label: String(placeholder.year)
	};

	$: defaultMonth = {
		value: placeholder.month,
		label: monthFmt.format(placeholder.toDate(getLocalTimeZone()))
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	let availableDates = [
		{
			date: '13-1-2025',
			times: [{ start: 13.5 }]
		},
		{
			date: '17-1-2025',
			times: [{ start: 13.5 }, { start: 14 }, { start: 14.5 }, { start: 14 }]
		},
		{
			date: '15-1-2025',
			times: [
				{ start: 13.5 },
				{ start: 14 },
				{ start: 14.5 },
				{ start: 14 },
				{ start: 14.5 },
				{ start: 15 },
				{ start: 15.5 },
				{ start: 16 },
				{ start: 16.5 },
				{ start: 17 },
				{ start: 17.5 },
				{ start: 18 }
			]
		}
	];
	// $: value ? console.log(value) : null;
	let timeSpaces = [];
	//TODO:control when timespaces shows
	function setTimeSpacesForDate(selectedDate: string) {
		// Find the date in `availableDates`
		const dateEntry = availableDates.find((entry) => entry.date === selectedDate);

		// Set `timeSpaces` to the times for the selected date, or an empty array if not found
		timeSpaces = dateEntry ? dateEntry.times : [];
	}

	/**
	 * Converts a decimal time (e.g., 13.5) to a formatted time string (e.g., 1:30 PM).
	 * @param {number} decimalTime - The time in decimal format (e.g., 13.5).
	 * @returns {string} The formatted time string.
	 */
	function formatTimeSlot(decimalTime: number): string {
		// Extract hours and minutes
		const hours = Math.floor(decimalTime); // Get the whole number part for hours
		const minutes = Math.round((decimalTime - hours) * 60); // Convert the fractional part to minutes

		// Determine AM/PM
		const period = hours >= 12 ? 'PM' : 'AM';

		// Convert to 12-hour format
		const displayHours = hours % 12 === 0 ? 12 : hours % 12;

		// Pad minutes with leading zero if needed
		const formattedMinutes = minutes.toString().padStart(2, '0');

		// Combine parts into the formatted string
		return `${displayHours}:${formattedMinutes} ${period}`;
	}
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	// Assuming timeSpaces and formatTimeSlot are already defined
	let currentPage = 0;
	const itemsPerPage = 4;

	$: totalPages = Math.ceil(timeSpaces.length / itemsPerPage);
	$: paginatedTimeSpaces = timeSpaces.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	function nextPage() {
		if (currentPage < totalPages - 1) currentPage++;
	}

	function prevPage() {
		if (currentPage > 0) currentPage--;
	}
</script>

<CalendarPrimitive.Root
	{weekdayFormat}
	class={cn('min-w-none rounded-md border p-3', className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
	bind:value
	bind:placeholder
>
	<Calendar.Header class="min-w-none">
		<Calendar.Heading class="flex w-full items-center justify-between gap-2">
			<Select.Root
				selected={defaultMonth}
				items={monthOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.month) return;
					placeholder = placeholder.set({ month: v.value });
				}}
			>
				<Select.Trigger aria-label="Select month" class="w-[60%]">
					<Select.Value placeholder="Select month" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each monthOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			{#if yearOptions}
				<p class="mx-auto">{yearOptions[0].label}</p>
			{:else}
				<Select.Root
					selected={defaultYear}
					items={yearOptions}
					onSelectedChange={(v) => {
						if (!v || !placeholder) return;
						if (v.value === placeholder?.year) return;
						placeholder = placeholder.set({ year: v.value });
					}}
				>
					<Select.Trigger aria-label="Select year" class="w-[40%]">
						<Select.Value placeholder="Select year" />
					</Select.Trigger>
					<Select.Content class="max-h-[200px] overflow-y-auto">
						{#each yearOptions as { value, label }}
							<Select.Item {value} {label}>
								{label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/if}
		</Calendar.Heading>
	</Calendar.Header>
	<Calendar.Months>
		{#each months as month}
			<Calendar.Grid class="">
				<Calendar.GridHead>
					<div class="grid md:grid-cols-2">
						<Calendar.GridRow class="flex">
							{#each weekdays as weekday}
								<Calendar.HeadCell>
									{weekday.slice(0, 2)}
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
						<div class="hidden md:block">
							{#if value}
								<p>Available Slots</p>
							{:else}
								<p>Immigration Consultation</p>
							{/if}
						</div>
					</div>
				</Calendar.GridHead>
				<Calendar.GridBody>
					<div class="grid md:grid-cols-2">
						<div>
							{#each month.weeks as weekDates}
								<Calendar.GridRow class="mt-2 w-fit rounded-full">
									{#each weekDates as date}
										<Calendar.Cell class="rounded-full" {date}>
											<Calendar.Day
												on:click={() => {
													console.log(
														availableDates.some(
															(el) => el.date === `${date.day}-${date.month}-${date.year}`
														)
													);
													setTimeSpacesForDate(`${date.day}-${date.month}-${date.year}`);
												}}
												available={availableDates.some(
													(el) => el.date === `${date.day}-${date.month}-${date.year}`
												)
													? true
													: false}
												class={availableDates.some(
													(el) => el.date === `${date.day}-${date.month}-${date.year}`
												)
													? 'opacity-100'
													: 'opacity-50'}
												{date}
												month={month.value}
											/>
										</Calendar.Cell>
									{/each}
								</Calendar.GridRow>
							{/each}
						</div>
						<div class="flex w-fit flex-col space-y-1">
							{#if value}
								<div class="mx-auto flex h-full w-60 flex-col space-y-1 pt-2">
									{#if timeSpaces.length === 0}
										<p class="m-auto flex text-center text-xs text-destructive">
											<span><CircleX class="mr-1 size-4" /></span>Timeslots for this date are
											unavailble
										</p>
									{:else if timeSpaces.length === 1}
										{#each timeSpaces as m, i}
											<AlertDialog.Root>
												<AlertDialog.Trigger asChild let:builder>
													<Button builders={[builder]} variant="outline" class="rounded-xl"
														>{formatTimeSlot(m.start)}</Button
													>
												</AlertDialog.Trigger>
												<AlertDialog.Content>
													<AlertDialog.Header>
														<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
														<AlertDialog.Description>
															This action cannot be undone. This will permanently delete your
															account and remove your data from our servers.
														</AlertDialog.Description>
													</AlertDialog.Header>
													<AlertDialog.Footer>
														<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
														<AlertDialog.Action on:click={handleNext}>Continue</AlertDialog.Action>
													</AlertDialog.Footer>
												</AlertDialog.Content>
											</AlertDialog.Root>
										{/each}
									{:else if timeSpaces.length < 5}
										{#each timeSpaces as m, i}
											<AlertDialog.Root>
												<AlertDialog.Trigger asChild let:builder>
													{#if i === 0}
														<Button
															variant="outline"
															builders={[builder]}
															class="rounded-sm  rounded-t-xl">{formatTimeSlot(m.start)}</Button
														>
													{:else if timeSpaces.length === i + 1}
														<Button
															variant="outline"
															builders={[builder]}
															class="rounded-sm  rounded-b-xl">{formatTimeSlot(m.start)}</Button
														>
													{:else}
														<Button variant="outline" builders={[builder]} class="rounded-sm"
															>{formatTimeSlot(m.start)}</Button
														>
													{/if}
												</AlertDialog.Trigger>
												<AlertDialog.Content>
													<AlertDialog.Header>
														<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
														<AlertDialog.Description>
															This action cannot be undone. This will permanently delete your
															account and remove your data from our servers.
														</AlertDialog.Description>
													</AlertDialog.Header>
													<AlertDialog.Footer>
														<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
														<AlertDialog.Action on:click={handleNext}>Continue</AlertDialog.Action>
													</AlertDialog.Footer>
												</AlertDialog.Content>
											</AlertDialog.Root>
										{/each}
									{:else}
										<div>
											<div class="flex flex-col gap-2">
												<AlertDialog.Root>
													<AlertDialog.Trigger asChild let:builder>
														<div class="flex flex-col space-y-1">
															{#each paginatedTimeSpaces as m, i}
																{#if i === 0}
																	<Button
																		builders={[builder]}
																		variant="outline"
																		class="rounded-sm rounded-t-xl"
																	>
																		{formatTimeSlot(m.start)}
																	</Button>
																{:else if paginatedTimeSpaces.length === i + 1}
																	<Button
																		builders={[builder]}
																		variant="outline"
																		class="rounded-sm rounded-b-xl"
																	>
																		{formatTimeSlot(m.start)}
																	</Button>
																{:else}
																	<Button builders={[builder]} variant="outline" class="rounded-sm">
																		{formatTimeSlot(m.start)}</Button
																	>
																{/if}
															{/each}
														</div>
													</AlertDialog.Trigger>
													<AlertDialog.Content>
														<AlertDialog.Header>
															<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
															<AlertDialog.Description>
																This action cannot be undone. This will permanently delete your
																account and remove your data from our servers.
															</AlertDialog.Description>
														</AlertDialog.Header>
														<AlertDialog.Footer>
															<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
															<AlertDialog.Action on:click={handleNext}>Continue</AlertDialog.Action
															>
														</AlertDialog.Footer>
													</AlertDialog.Content>
												</AlertDialog.Root>

												<div class="flex h-8 w-full items-center justify-between">
													<Button
														variant="ghost"
														size="icon"
														disabled={currentPage === 0}
														on:click={prevPage}
													>
														<ChevronLeft class="h-4 w-4" />
													</Button>
													<span class="text-sm">
														Page {currentPage + 1} of {totalPages}
													</span>
													<Button
														variant="ghost"
														size="icon"
														disabled={currentPage === totalPages - 1}
														on:click={nextPage}
													>
														<ChevronRight class="h-4 w-4" />
													</Button>
												</div>
											</div>
										</div>
									{/if}
								</div>
							{:else}
								<div class=" w-60 space-y-1">
									<p class="block md:hidden">Software Consultation</p>
									<p class="text-xs font-light opacity-50">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto iure facere
										rem, incidunt provident animi minus.
									</p>
									<div class="flex space-x-1 pt-4">
										<Clock class="size-4 " />
										<p class="text-xs">30 minutes</p>
									</div>
									<div class="mt-1 flex space-x-1">
										<Phone class="size-4 " />
										<p class="text-xs">Phone call to: +1 (305) 923-9282</p>
									</div>
									<div class="mt-1 flex space-x-1">
										<div class="size-4 rounded-full bg-[url(/upwork.png)] bg-cover bg-center" />
										<p class="text-xs">Seth Rollins</p>
									</div>
									<div class="mt-1 flex space-x-1">
										<Globe class="size-4 " />
										<p class="text-xs">Miami, Fl</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	</Calendar.Months>
</CalendarPrimitive.Root>
