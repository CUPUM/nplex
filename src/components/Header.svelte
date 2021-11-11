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
				{route.title}
			</a>
		{/each}
	</nav>
	<nav id="user">
		{#if logged}
			<button>se déconnecter</button>
		{:else}
			<button>se connecter</button>
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
		gap: .5rem;
	}

	#pages {

		a {
			text-decoration: none;
			color: rgb(var(--contrast500));
			padding: .7em 1.3em;
			border-radius: 1.5em;
			transition: all .3s;

			&:hover:not(.current) {
				box-shadow: 0px 20px 16px -8px #94de1333;
			}

			&.current {
				background-color: rgb(var(--primary300));
				color: rgb(var(--primary900));
				box-shadow: 0px 20px 16px -8px #94de1333;
			}
		}
	}

	#user {
	}
</style>
