<script lang="ts">
	import { page } from '$app/stores';
	import { EXPLORE_ROUTES } from '$utils/routes';
	import NavbarButton from './NavbarButton.svelte';

	const categories = Object.values(EXPLORE_ROUTES);
</script>

<nav class="category" hidden={!$page.data.showCategoryNavbar}>
	{#each categories as c}
		<NavbarButton
			category
			href={c.pathname}
			current={$page.url.pathname.startsWith(c.pathname) || undefined}
		>
			{c.title}
		</NavbarButton>
	{/each}
</nav>

<style lang="scss">
	.category {
		--i: 1;
		--inset: var(--ui-inset-sm);
		--radius: 99px;
		pointer-events: initial;
		position: relative;
		display: flex;
		flex: none;
		align-items: center;
		flex-direction: row;
		gap: 2px;
		grid-column: category;
		justify-self: center;
		padding: var(--inset);
		border-radius: var(--radius);
		z-index: 1;

		&::before {
			z-index: -2;
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			background: var(--navbar-bg);
			opacity: 1;
			border: var(--ui-border-size) solid col(fg, 100, 0.1);
			transition: opacity 0.25s, background var(--navbar-transition),
				filter var(--navbar-transition);
		}
	}
</style>
