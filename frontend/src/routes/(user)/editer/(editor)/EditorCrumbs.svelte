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

	// let mounted = false;

	// onMount(() => {mounted = true})
</script>

<nav in:fly={{ y: -6, delay: 250 }}>
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

<style lang="scss">
	nav {
		--scroll-size: 0;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		justify-content: flex-start;
		margin-top: 0.75rem;
		padding: var(--ui-inset);
		height: var(--ui-height);
		font-weight: 400;
		max-width: var(--ui-nav-center-w);
		border: 1px solid col(primary, 300, 0.1);
		color: col(primary, 300);
		border-radius: 99px; //var(--ui-radius-md);
		overflow-x: auto;
	}

	a {
		display: flex;
		flex: none;
		align-items: center;
		padding-inline: 1em;
		border-radius: inherit;
		transition: all 0.25s;

		&:first-of-type {
			padding-inline-start: 1.5em;
		}

		&:last-of-type {
			padding-inline-end: 1.5em;
		}

		&:hover {
			color: col(primary, 700);
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
