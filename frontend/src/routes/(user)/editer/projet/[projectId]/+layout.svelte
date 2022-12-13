<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { editorBase } from '$utils/routes';
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
		const base = `${editorBase.pathname}/projet/${page.params.projectId}`;
		if (!destination) {
			return base;
		}
		const tag = destination.tag ? `#${destination.tag}` : '';
		return base + destination.subpath + tag;
	}

	function current(page: Page) {
		const seg = page.url.pathname.replace(
			editorBase.pathname + '/projet/' + page.params.projectId,
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
		<p>Éditeur de projet</p>
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
		width: 100%;
		position: relative;
		padding-block: calc(var(--navbar-height-px) + 4rem);
		margin-top: calc(-1 * var(--navbar-height-px));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;

		&:before {
			content: '';
			z-index: -1;
			position: absolute;
			// height: max(1px, calc(100% - 2.5 * var(--scroll-px)));
			height: 100%;
			bottom: 0;
			left: min(2rem, calc(0.2 * var(--scroll-px)));
			right: min(2rem, calc(0.2 * var(--scroll-px)));
			justify-self: center;
			background: col(bg, 900);
			border-radius: min(var(--ui-radius-xl), calc(0.5 * var(--scroll-px)));
			transition: all 0.2s ease-out;
		}
	}

	hgroup {
		display: flex;
		flex-direction: column;
		max-width: var(--ui-size-xl);
		width: 100%;
		margin: 0 auto;
		padding-inline: 4rem;
		gap: 1rem;
	}

	h1 {
		width: 100%;
	}

	p {
		color: col(fg, 500, 0.5);
		font-size: var(--ui-text-xl);
		// color: transparent;
		// -webkit-text-stroke: 1.25px col(fg, 100, 0.25);
	}

	.toolbar {
		padding: 0 2rem;
		width: 100%;
		position: sticky;
		bottom: 2rem;
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
		margin-bottom: 0.5rem;
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
