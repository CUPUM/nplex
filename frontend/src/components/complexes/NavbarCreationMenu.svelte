<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';

	import { creationRoutes } from '$utils/routes';
</script>

<div class="creation-cards">
	{#each creationRoutes as r}
		<a class="card button-parent" href={r.pathname}>
			<h4>{r.title}</h4>
			<div>
				<Button href={r.pathname} iconPosition="trailing" icon="arrow-right">Lancer ou reprendre</Button>
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	.creation-cards {
		display: flex;
		flex-direction: column;
		// flex-wrap: wrap;
		gap: 1rem;

		.card {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: space-between;
			text-decoration: none;
			width: 250px;
			aspect-ratio: 1;
			padding: 1rem;
			border-radius: 1rem;
			border: 1px solid rgba(var(--rgb-dark-500), 0.1);
			transition: all 0.15s ease-out;

			&:hover {
				transform: scale(0.95);
			}
		}
	}
</style>
