<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Logo from '$lib/handmade/logo.svelte';

	// Props for invoice data
	let data = {
		invoiceNumber: '123',
		created: 'January 5, 2025',
		dueDate: 'February 5, 2025',
		company: {
			name: 'Planet Bun',
			address: '19 Madiera Street',
			city: 'Nassau, New Providence, Bahamas'
		},
		client: {
			name: 'Padon Investments',
			contactPerson: 'Hugh Rollins',
			email: 'hprollins@gmail.com'
		},
		items: [
			{ description: 'Website design', amount: 300.0 },
			{ description: 'Hosting (3 months)', amount: 75.0 },
			{ description: 'Domain name (1 year)', amount: 10.0 }
		]
	};

	// Calculate total
	$: total = data.items.reduce((sum, item) => sum + item.amount, 0);

	// Format currency
	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	};
</script>

<div class="flex w-screen max-w-3xl flex-col justify-center px-8 py-6">
	<div class="mb-4 grid grid-cols-2 gap-4">
		<Button variant="outline">Download</Button>
		<Button>Pay with Stripe</Button>
	</div>
	<div class="mx-auto w-full overflow-hidden rounded-xl bg-white shadow-lg">
		<div class="px-8 py-6">
			<table class="w-full">
				<tbody>
					<tr class="border-b border-gray-200">
						<td colspan="2" class="pb-6">
							<table class="w-full">
								<tbody>
									<tr>
										<td class="text-3xl font-bold text-gray-700"><Logo size="size-20"></Logo></td>
										<td class="text-right">
											<div class="text-sm text-gray-600">
												Invoice #: {data.invoiceNumber}<br />
												Created: {data.created}<br />
												Due: {data.dueDate}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>

					<tr>
						<td colspan="2" class="py-6">
							<table class="w-full">
								<tbody>
									<tr>
										<td class="text-sm text-gray-600">
											{data.company.name}<br />
											{data.company.address}<br />
											{data.company.city}
										</td>
										<td class="text-right text-sm text-gray-600">
											{data.client.name}<br />
											{data.client.contactPerson}<br />
											{data.client.email}
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>

			<table class="mt-6 w-full">
				<thead>
					<tr class="bg-muted">
						<th class="px-4 py-2 text-left font-semibold">Item</th>
						<th class="px-4 py-2 text-right font-semibold">Price</th>
					</tr>
				</thead>
				<tbody>
					{#each data.items as item}
						<tr class="border-b border-gray-100">
							<td class="px-4 py-2 text-gray-600">{item.description}</td>
							<td class="px-4 py-2 text-right text-gray-600">{formatCurrency(item.amount)}</td>
						</tr>
					{/each}
					<tr>
						<td></td>
						<td class="px-4 py-4 text-right font-bold text-gray-800">
							Total: {formatCurrency(total)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		margin: 0;
		padding: 0;
	}
</style>
