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

	let mount = false;
	let sections = false;

	function href(page: Page, subpath: `/${string}` | '') {
		return `${editorBase.pathname}/projet/${page.params.projectId}${subpath}`;
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
	<h1>Éditeur de projet</h1>
	<h2>{data.project.title}</h2>
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
					<Button variant="ghost" href={href($page, r.subpath)}>
						{r.title}
					</Button>
				{/each}
			</nav>
		{/if}
		<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
			<Tooltip message={prev?.title}>
				<Button
					href={href($page, prev?.subpath ?? '')}
					disabled={!prev}
					equi
					variant="ghost"
				>
					<Icon name="chevron-left" />
				</Button>
			</Tooltip>
			<Tooltip message="Sauvegarder">
				<Button type="submit" variant="ghost" form={EDITOR_FORM_ID} equi>
					<Icon name="save" />
				</Button>
			</Tooltip>
			<Tooltip message="Voir les sections">
				<Button equi as="label"
					><Icon name={sections ? 'cross' : 'dots-horizontal'} /><input
						type="checkbox"
						hidden
						bind:checked={sections}
					/></Button
				>
			</Tooltip>
			<Tooltip message={next?.title}>
				<Button
					href={href($page, next?.subpath ?? '')}
					disabled={!next}
					equi
					variant="ghost"
				>
					<Icon name="chevron-right" />
				</Button>
			</Tooltip>
		</menu>
	</div>
{/if}

<style lang="scss">
	header {
		padding: 4rem 2rem;
	}

	.toolbar {
		padding: 0 2rem;
		width: 100%;
		position: sticky;
		bottom: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	menu {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		display: inline-flex;
		flex-direction: row;
		gap: 0;
		margin: 0 auto;
		background: col(bg, 000, 0.9);
		border-radius: var(--radius);
		padding: var(--inset);
		backdrop-filter: blur(8px);
	}

	nav {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		position: absolute;
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
