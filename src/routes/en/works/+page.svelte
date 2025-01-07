<script lang="ts">
	let { data } = $props();
</script>

<div class="h-full w-screen px-4">
	<div class="planets grid grid-cols-3 gap-4">
		<div class="space-y-4">
			{#each data.planets as { name, image }, i}
				{#if i >= 0 && i <= 2}
					<a href={`/en/works/` + name.replaceAll(' ', '-').toLowerCase()} class={`planet `}>
						<img src={image} alt={name} style:--planet="image-{name}" />
					</a>
				{/if}
			{/each}
		</div>
		<!-- <div> -->
		<!-- 	{#each planets as { name, image }, i} -->
		<!-- 		{#if i > 3 && i <= 5} -->
		<!-- 			<a href="/en/works/{name.toLowerCase()}" class={`planet `}> -->
		<!-- 				<img src={image} alt={name} style:--planet="image-{name}" /> -->
		<!-- 			</a> -->
		<!-- 		{/if} -->
		<!-- 	{/each} -->
		<!-- </div> -->
		<!-- <div> -->
		<!-- 	{#each planets as { name, image }, i} -->
		<!-- 		{#if i > 6 && i <= 8} -->
		<!-- 			<a href="/en/works/{name.toLowerCase()}" class={`planet `}> -->
		<!-- 				<img src={image} alt={name} style:--planet="image-{name}" /> -->
		<!-- 			</a> -->
		<!-- 		{/if} -->
		<!-- 	{/each} -->
		<!-- </div> -->
	</div>
</div>

<style>
	.planets {
		gap: 4rem;

		& .planet {
			width: 100%;
			display: grid;
			place-content: center;
			text-align: center;

			& img {
				width: 280px;
				opacity: 0.8;
				transition: opacity 0.3s ease;
				user-select: none;
				view-transition-name: var(--planet);

				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
