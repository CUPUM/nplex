<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { creationRoutes } from '$utils/routing/routes';

	let loading: string | null = null;

	beforeNavigate(({ to }) => {
		if (to && creationRoutes.map((r) => r.pathname).includes(to.url.pathname)) {
			loading = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loading = null;
	});
</script>

<div class="creation-cards">
	{#each creationRoutes as r}
		<a class="card button-parent" href={r.pathname}>
			<span>{r.title}</span>
			<div>
				<Button
					href={r.pathname}
					active={$page.url.pathname.startsWith(r.pathname)}
					loading={!!loading && loading.startsWith(r.pathname)}
				>
					Lancer ou reprendre
					<Icon name="arrow-right" slot="trailing" />
				</Button>
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	.creation-cards {
		display: flex;
		flex-direction: column;
		gap: 0rem;
		color: var(--color-contrast-500);

		span {
			font-weight: 500;
			display: block;
			padding: 1rem;
			font-size: 1.5rem;
		}

		.card {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: space-between;
			text-decoration: none;
			width: 250px;
			padding: 1rem;
			border-radius: 0.9rem;
			background-color: transparent;
			transform: scale(0.98);
			transition: all 0.15s ease-out;

			&:hover {
				transform: scale(1);
				color: var(--color-contrast-900);
				background-color: var(--color-base-500);
				// box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
			}
		}
	}
</style>
