<script lang="ts" context="module">
	export const PROJECT_EDITOR_ROUTES = {
		General: {
			pathname: '',
			title: 'Général',
		},
		Site: {
			pathname: '/site',
			title: 'Site',
		},
		Gallery: {
			pathname: '/gallery',
			title: 'Galerie',
		},
		Processus: {
			pathname: '/processus',
			title: 'Processus',
		},
	} as const satisfies Routes;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Ripple from '$components/Ripple.svelte';
	import type { Routes } from '$utils/routes';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { EDITOR_ROUTES } from '../../common';
	import type { PageData } from './$types';

	$: ({ id } = ($page.data as PageData).project);
	$: base = `${EDITOR_ROUTES.project.pathname}/${id}`;
	$: current = $page.url.pathname.replace(base, '');
</script>

<nav in:fly={{ y: 12, delay: 250, easing: expoOut }}>
	{#each Object.values(PROJECT_EDITOR_ROUTES) as route}
		<a href="{base}{route.pathname}" data-current={current === route.pathname || undefined}>
			<Ripple />
			<span class="inner">
				{route.title}
			</span>
		</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		position: sticky;
		font-size: var(--ui-text-md);
		top: 1rem; // calc(1rem - var(--ui-inset) - (1em - var(--ui-text-sm)))
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: col(bg, 300, 0.5);
		backdrop-filter: blur(8px);
		// border-radius: var(--ui-radius-md);
		border-radius: calc(var(--ui-radius-md) + var(--ui-inset));
		padding: var(--ui-inset);
	}

	a {
		position: relative;
		display: flex;
		align-items: center;
		font-weight: 500;
		flex: none;
		height: var(--ui-height);
		border-radius: var(--ui-radius-md);
		padding-inline: var(--ui-pad-x);
		transition: all 0.15s ease-out;

		&:hover:not([data-current]) {
			color: col(primary, 900);
			background: col(primary, 100, 0.2);
		}

		&[data-current] {
			color: col(primary, 500);
			background: transparent;

			&::after {
				width: calc(100% - 3rem);
				left: 1.5rem;
				opacity: 1;
			}
		}

		.inner {
			position: relative;
			top: -0.1em;
		}

		&::after {
			content: '';
			position: absolute;
			// bottom: 0;
			top: 100%;
			left: 50%;
			width: 0%;
			height: var(--ui-inset);
			opacity: 0;
			background: currentColor;
			border-radius: 3px 3px 0 0;
			transition: all 0.25s var(--ui-ease-out);
		}
	}
</style>
