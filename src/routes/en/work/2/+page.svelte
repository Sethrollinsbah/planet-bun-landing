<div class="planets">
	{#each planets as { name, image }}
		<a href="planets/{name.toLowerCase()}" class="planet">
			<img src={image} alt={name} style:--planet="image-{name}" />
			<h2 style:--title="title-{name}">{name}</h2>
		</a>
	{/each}
</div>

<style>
	.planets {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 4rem;

		& h2 {
			view-transition-name: var(--title);
		}

		& .planet {
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
