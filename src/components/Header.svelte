<script lang="ts">
	import { currentRoute, rootRoute } from '$stores/currentRoute';
	import { exploreRoutes, mainRoutes } from '$utils/routes';
</script>


<header>
	<div id="logo">Logo nplex</div>
	<nav id="pages">
		{#each mainRoutes as route}
			<a
				href={route.href}
				class:current={$currentRoute[0] == route}
			>
				<span>{route.title}</span>
			</a>
		{/each}
	</nav>
	<nav id="user">
		<a href="inscription">Ouvrir un compte</a>
	</nav>
</header>

{#if $currentRoute[0] === rootRoute}
	<section id="explore">
		<form>
			<input
				type="search"
				placeholder="Chercher..."
				name=""
			>
		</form>
		<nav>
			{#each exploreRoutes as route}
				<a
					href={route.href}
					class:current={$currentRoute[1] == route}
				>
					<span>{route.title}</span>
				</a>
			{/each}
		</nav>
	</section>
{/if}



<style lang="postcss">
	header {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;

		#pages {
			display: flex;
			flex-direction: row;
			font-size: get(sm);
			gap: 1em;

			a {
				text-decoration: none;
				color: color(contrast500);
				padding: .8em 1.2em;
				border-radius: 1em;
				transition: all .25s;

				&:hover:not(.current) {
					background-color: color(base100);
					box-shadow: 0px 24px 16px -8px color(base500);
				}

				&.current {
					cursor: default;
					background-color: color(primary300);
					color: color(primary900);
					box-shadow: 0px 16px 12px -6px color(primary500, .3);
				}

				span {
					position: relative;
					top: -1px;
				}
			}
		}
	}

	#explore {
		display: flex;
		flex-direction: column;
		align-items: center;

		form {
			padding: 1rem;
			padding-top: 0;

			input[type='search'] {
				border: none;
				border-radius: 1em;
				padding: 1em;
				outline: none;
				transition: all .25s;

				&:focus {
					box-shadow: 0px 0px 4px 0px color(primary500);
				}
			}
		}

		nav {
			display: flex;
			flex-direction: row;
			font-size: get(sm);
			gap: 3px;
			background-color: color(base500);
			padding: 3px;
			border-radius: 1.2em;

			a {
				text-decoration: none;
				padding: 1em 1.5em;
				color: color(contrast300);
				border-radius: 1em;
				transition: all .25s;

				&:hover:not(.current) {
					box-shadow: 0px 0px 0px 4px color(base100, 1);
				}

				&.current {
					background-color: color(base100);
					color: color(primary700);
				}
			}
		}
	}
</style>
