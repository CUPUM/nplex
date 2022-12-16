<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { EDITOR_BASE_ROUTE } from '$utils/routes';
	import type { Page } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { EDITOR_FORM_ID, routes } from './common';

	export let data: PageData;
	export let form: ActionData;

	$: if (data.project) console.log('Running project load');

	let mount = false;
	let sections = false;

	function href(page: Page, destination: typeof routes[number] | null) {
		const base = `${EDITOR_BASE_ROUTE.pathname}/projet/${page.params.projectId}`;
		if (!destination) {
			return base;
		}
		const tag = destination.tag ? `#${destination.tag}` : '';
		return base + destination.subpath + tag;
	}

	function current(page: Page) {
		const seg = page.url.pathname.replace(
			EDITOR_BASE_ROUTE.pathname + '/projet/' + page.params.projectId,
			''
		);
		return routes.findIndex((r) => r.subpath === seg);
	}

	$: cindex = current($page);
	$: next = cindex >= routes.length - 1 ? null : routes[cindex + 1];
	$: prev = cindex === 0 ? null : routes[cindex - 1];

	onMount(() => {
		mount = true;
	});
</script>

<header>
	<hgroup>
		<span>Éditeur de projet</span>
		<h1>{data.project.title}</h1>
	</hgroup>
</header>
<slot />
{#if mount}
	<div class="toolbar">
		{#if sections}
			<nav
				class="nest"
				in:fly={{ y: 20, opacity: 0, duration: 200, easing: expoOut }}
				out:scale|local={{ duration: 150, start: 0.96 }}
			>
				{#each routes as r}
					<Button variant="ghost" href={href($page, r)}>
						{r.title}
					</Button>
				{/each}
			</nav>
		{/if}
		<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
			<Tooltip message={prev?.title}>
				<Button href={href($page, prev)} disabled={!prev} equi variant="ghost">
					<Icon name="chevron-left" />
				</Button>
			</Tooltip>
			<Tooltip message="Sauvegarder">
				<Button type="submit" variant="ghost" form={EDITOR_FORM_ID} equi>
					<Icon name="save" />
				</Button>
			</Tooltip>
			<Tooltip message="Voir les sections">
				<Button equi as="label" variant="ghost">
					<Icon name={sections ? 'cross' : 'dots-horizontal'} />
					<input type="checkbox" hidden bind:checked={sections} />
				</Button>
			</Tooltip>
			<Tooltip message={next?.title}>
				<Button href={href($page, next)} disabled={!next} equi variant="ghost">
					<Icon name="chevron-right" />
				</Button>
			</Tooltip>
		</menu>
	</div>
{/if}

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-block: calc(var(--navbar-height-px) + 4rem);
		padding-inline: 2rem;
	}

	hgroup {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: center;
		max-width: var(--ui-size-lg);
	}

	span {
		font-size: var(--ui-text-xl);
		font-weight: 600;
	}

	.toolbar {
		padding: 0 var(--ui-gutter);
		width: 100%;
		position: sticky;
		bottom: var(--ui-gutter);
		display: flex;
		flex-direction: column;
		align-items: center;
		pointer-events: none;
	}

	menu {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		pointer-events: all;
		display: inline-flex;
		flex-direction: row;
		gap: 0;
		margin: 0 auto;
		background: col(bg, 000, 0.9);
		border-radius: var(--radius);
		padding: var(--inset);
		backdrop-filter: blur(8px);
		transition: box-shadow 0.2s ease-out;

		&:hover {
			box-shadow: 0 0.5em 1.5em -1em rgb(0, 20, 40, 0.2);
		}
	}

	nav {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		position: absolute;
		pointer-events: all;
		bottom: 100%;
		margin-bottom: var(--ui-gutter);
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		left: 50%;
		transform: translateX(-50%);
		background: col(bg, 000, 0.9);
		backdrop-filter: blur(8px);
		border-radius: var(--radius);
		padding: var(--inset);
		transform-origin: bottom center;
	}
</style>
