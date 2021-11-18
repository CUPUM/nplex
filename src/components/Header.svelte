<script lang="ts">
	import { page } from '$app/stores';
	import { mainRoutes } from '$utils/routes';

	let logged = false;
</script>


<header>
	<span>[logo nplex]</span>
	<nav id="pages">
		{#each mainRoutes as route}
			<a
				href={route.href}
				class:current={route.href === $page.path}
			>
				<span>{route.title}</span>
			</a>
		{/each}
	</nav>
	<nav id="user">
		{#if logged}
			<button>se déconnecter</button>
		{:else}
			<a href="signup">se connecter</a>
		{/if}
	</nav>
</header>


<style lang="postcss">
	header {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 2rem;
	}

	nav {
		display: flex;
		flex-direction: row;
		font-size: get(sm);
		gap: 1em;
	}

	#pages {

		a {
			text-decoration: none;
			color: color(contrast500);
			padding: 10px 16px;
			border-radius: 1.5em;
			transition: all .3s;

			&:hover:not(.current) {
				box-shadow: 0px 20px 16px -8px fade(primary500, .5);
			}

			&.current {
				background-color: color(primary300);
				color: color(primary900);
				box-shadow: 0px 20px 16px -8px fade(primary500, .5);
			}
		}

		span {
			position: relative;
			top: -1px;
		}
	}

	#user {
	}
</style>
