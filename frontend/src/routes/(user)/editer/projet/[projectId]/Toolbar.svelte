<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { EDITOR_BASE_ROUTE, EDITOR_ROUTES } from '$utils/routes';
	import { THEMES } from '$utils/themes';
	import type { Page } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { EDITOR_FORM_ID, EDITOR_NAV_ROUTES_ARR, type EditorNavRoute } from './common';

	let mount = false;
	let sections = false;

	function href(page: Page, destination: EditorNavRoute | null) {
		const base = `${EDITOR_ROUTES.project.pathname}/${page.params.projectId}`;
		if (!destination) {
			return base;
		}
		const hash = destination.hash ? `#${destination.hash}` : '';
		return base + destination.subpath + hash;
	}

	function current(page: Page) {
		const seg = page.url.pathname.replace(
			EDITOR_BASE_ROUTE.pathname + '/projet/' + page.params.projectId,
			''
		);
		return EDITOR_NAV_ROUTES_ARR.findIndex((r) => r.subpath === seg);
	}

	$: cindex = current($page);
	$: next = cindex >= EDITOR_NAV_ROUTES_ARR.length - 1 ? null : EDITOR_NAV_ROUTES_ARR[cindex + 1];
	$: prev = cindex === 0 ? null : EDITOR_NAV_ROUTES_ARR[cindex - 1];

	onMount(() => {
		mount = true;
	});
</script>

{#if mount}
	<div class="toolbar">
		{#if sections}
			<nav
				in:fly={{ y: 20, opacity: 0, duration: 200, easing: expoOut }}
				out:scale|local={{ duration: 150, start: 0.96 }}
			>
				{#each EDITOR_NAV_ROUTES_ARR as r}
					<Button variant="ghost" href={href($page, r)}>
						{r.title}
					</Button>
				{/each}
			</nav>
		{/if}
		<menu
			class="nest"
			data-theme={THEMES.dark}
			in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}
		>
			<Tooltip message="Éditer&nbsp;: {prev?.title}" disabled={!prev}>
				<Button href={href($page, prev)} disabled={!prev} equi variant="ghost">
					<Icon name="arrow-left" />
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
			<Tooltip message="Éditer&nbsp;: {next?.title}" disabled={!next}>
				<Button href={href($page, next)} disabled={!next} equi variant="ghost">
					<Icon name="arrow-right" />
				</Button>
			</Tooltip>
		</menu>
	</div>
{/if}

<style lang="scss">
	.toolbar {
		padding: 0 var(--ui-gutter);
		width: 100%;
		position: sticky;
		bottom: var(--ui-gutter);
		display: flex;
		flex-direction: column;
		align-items: center;
		pointer-events: none;
		font-size: var(--ui-text-md);
	}

	menu {
		--radius: var(--ui-radius-md);
		--outset: 1.5px;
		pointer-events: all;
		display: inline-flex;
		flex-direction: row;
		gap: 0;
		margin: 0 auto;
		background: col(bg, 000, 0.9);
		border-radius: calc(var(--radius) + var(--outset));
		border: var(--outset) solid transparent;
		backdrop-filter: blur(8px);
		transition: all 0.25s ease-out;

		&:hover {
			border-color: col(bg, 900);
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
