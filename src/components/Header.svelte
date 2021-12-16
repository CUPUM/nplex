<script lang="ts">
	import { currentRoute } from '$stores/currentRoute';
	import { mainRoutes } from '$utils/routes';
</script>


<header>
	<div id="logo">Logo nplex</div>
	<nav id="main">
		{#each mainRoutes as r}
			<a
				href={r.href}
				class:current={$currentRoute === r}
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
		font-size: 14px;
		padding: 1em 2em;
	}

	nav {
		display: flex;
		gap: 4px;
	}

	#main {
	}

	#user {
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
