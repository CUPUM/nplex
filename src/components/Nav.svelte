<script lang="ts">
	import { mainRoutes } from '$utils/routes';
	import Button from './primitives/Button.svelte';
</script>

<nav>
	<div id="logo">Logo nplex</div>
	<section id="main">
		{#each mainRoutes as route}
			<Button
				size="small"
				href={route.href}
			>
				{route.title}
			</Button>
		{/each}
	</section>
	<ul id="user">
		<Button
			icon="home"
		/>
		<Button
			icon="user"
		/>
	</ul>
</nav>

<style lang="postcss">
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
