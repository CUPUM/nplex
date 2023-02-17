<script lang="ts" context="module">
	export type Crumb = {
		label: string;
		pathname: string;
	};

	export const crumbs = writable<Crumb[]>([]);
</script>

<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import OverflowEffect from '$components/OverflowEffect.svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	let baseCrumb: Crumb = {
		label: 'Éditeur',
		pathname: '/editer',
	};
</script>

<header>
	<nav in:fly={{ y: -6, delay: 500 }} class="no-scrollbar">
		<OverflowEffect>
			{#each [baseCrumb, ...$crumbs] as crumb (crumb.pathname + crumb.label)}
				<span class="sep"><Icon name="chevron-right" strokeWidth={1.5} /></span>
				<a href={crumb.pathname}>
					<span>
						{crumb.label}
					</span>
				</a>
			{/each}
		</OverflowEffect>
	</nav>
</header>

<style lang="scss">
	header {
		--inset: var(--ui-inset);
		position: sticky;
		top: 0;
		width: 100%;
		padding-block: calc(1rem - var(--inset));
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
		background: var(--editor-bg);
		border-bottom: 1px solid col(fg, 500, 0.05);
	}

	nav {
		--overflow-outset: var(--ui-inset);
		--overflow-color: #{col(bg, 700)};
		--radius: var(--ui-radius-md);
		justify-self: center;
		grid-column: full;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		justify-content: flex-start;
		padding: var(--inset);
		height: var(--ui-height);
		font-weight: 500;
		max-width: var(--ui-nav-center-w);
		background: col(bg, 700);
		color: col(fg, 000);
		border-radius: var(--radius);
		overflow-x: auto;
		z-index: 1;
	}

	a {
		font-size: var(--ui-text-sm);
		display: flex;
		flex: none;
		align-items: center;
		padding-inline: 1em;
		border-radius: calc(var(--radius) - var(--inset));
		transition: all 0.25s;

		&:first-of-type {
			padding-inline-start: 1.5em;
		}

		&:last-of-type {
			padding-inline-end: 1.5em;
		}

		&:hover {
			color: col(primary, 500);
			background: col(primary, 100, 0.1);
			transition: all 0.1s;
		}
	}

	span {
		position: relative;
		top: -0.1em;
	}

	.sep {
		opacity: 0.25;
		top: -0.2em;
		align-self: center;

		&:first-of-type {
			display: none;
		}
	}
</style>
