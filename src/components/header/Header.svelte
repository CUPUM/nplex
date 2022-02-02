<script lang="ts">
	import { currentMainRoute } from '$stores/route';
	import { mainRoutes } from '$utils/routes';
	import HeaderButton from './Header.Button.svelte';
</script>

<header>
	<div id="logo">Logo nplex</div>
	<nav id="main">
		{#each mainRoutes as r}
			<HeaderButton href={r.href} text={r.title} highlight={$currentMainRoute === r} />
		{/each}
	</nav>
	<nav id="user">
		<!-- <HeaderButton type="secondary" iconName="home" /> -->
		<HeaderButton href="/inscription" iconName="home" />
		<HeaderButton href="/inscription" iconName="user" />
	</nav>
</header>

<style>
	header {
		position: relative;
		top: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 8px var(--size-medium);
		--gap: 6px;
	}

	#logo {
		justify-content: flex-start;
		flex: 1;
	}

	#main {
		display: flex;
		gap: var(--gap);
	}

	#user {
		display: flex;
		gap: var(--gap);
		flex: 1;
		justify-content: flex-end;
	}
</style>
