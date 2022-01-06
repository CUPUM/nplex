<script lang="ts">
	import { currentMainRoute } from '$stores/currentRouteStore';
	import { mainRoutes } from '$utils/routes';
</script>


<header>
	<div id="logo">Logo nplex</div>
	<nav id="main">
		{#each mainRoutes as r}
			<a
				href={r.href}
				class:current={$currentMainRoute === r}
			>
				<span>{r.title}</span>
			</a>
		{/each}
	</nav>
	<nav id="user">
		<a href="inscription">Ouvrir un compte</a>
	</nav>
</header>


<style lang="postcss">
	header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		font-size: 14px;
	}

	nav {
		display: flex;
		gap: 4px;
	}

	#logo {
		justify-content: flex-start;
		flex: 1;
	}

	#main {
	}

	#user {
		flex: 1;
		justify-content: flex-end;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: lightgrey;
		height: 2.5em;
		border-radius: 1em;
		padding: 0 1em;
		text-decoration: none;
	}

	span {
		position: relative;
		top: -1px;
	}

	.current {
		background-color: green;

		& span {
			color: white;
		}
	}
</style>
