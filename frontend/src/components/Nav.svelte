<script lang="ts">
	import { topRoutes } from '$utils/routes';
	import Button from './primitives/Button.svelte';
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
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
