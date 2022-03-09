<script lang="ts">
	import { topRoutes } from '$utils/routes';
	import Button from '$components/primitives/Button.svelte';
</script>

<nav>
	<a href="/" id="logo">Logo nplex</a>
	<section id="main">
		{#each topRoutes as route}
			<Button size="small" href={route.href}>
				{route.title}
			</Button>
		{/each}
	</section>
	<section id="user">
		<Button icon="home" />
		<Button icon="user" />
	</section>
</nav>

<style lang="postcss">
	nav {
		position: relative;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background-color: var(--color-light-500);
	}
</style>
