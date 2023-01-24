<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { EDITOR_BASE_ROUTE } from '$utils/routes';
	import { THEMES } from '$utils/themes';
	import type { Page } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import { EDITOR_ROUTES } from '../../common';
	import { FORMID, PROJECT_EDITOR_ROUTES } from './common';

	let mount = false;
	let sections = false;

	const lookup = Object.values(PROJECT_EDITOR_ROUTES);

	function pathname(page: Page, destination: ValueOf<typeof PROJECT_EDITOR_ROUTES> | null) {
		const base = `${EDITOR_ROUTES.project.pathname}/${page.params.projectId}`;
		if (!destination) {
			return base;
		}
		const hash = 'hash' in destination ? `#${destination.hash}` : '';
		return base + destination.subpath + hash;
	}

	function getcurrent(page: Page) {
		const seg = page.url.pathname.replace(
			EDITOR_BASE_ROUTE.pathname + '/projet/' + page.params.projectId,
			''
		);
		return lookup.findIndex((r) => r.subpath === seg);
	}

	$: current = getcurrent($page);
	$: next = current >= lookup.length - 1 ? null : lookup[current + 1];
	$: prev = current === 0 ? null : lookup[current - 1];

	onMount(() => {
		mount = true;
	});
</script>

{#if mount}
	<div class="toolbar" data-theme={THEMES.dark}>
		{#if sections}
			<nav
				in:fly={{ y: 20, opacity: 0, duration: 200, easing: expoOut }}
				out:scale|local={{ duration: 150, start: 0.96 }}
			>
				{#each lookup as r}
					{@const href = pathname($page, r)}
					<a {href} data-current={$page.url.pathname === href.split('#')[0]}>
						<span>
							{r.title}
						</span>
					</a>
				{/each}
			</nav>
		{/if}
		<menu class="nest" in:fly={{ y: 30, easing: expoOut, delay: 500, duration: 750 }}>
			<Tooltip
				message={prev ? `Revenir vers: ${prev.title}` : undefined}
				disabled={!prev}
				align="start"
			>
				<Button href={pathname($page, prev)} disabled={!prev} equi variant="ghost">
					<Icon name="arrow-left" />
				</Button>
			</Tooltip>
			<Button as="label" variant="ghost" active={sections}>
				<Icon name={sections ? 'chevron-down' : 'hamburger'} slot="trailing" />
				Sections
				<input type="checkbox" hidden bind:checked={sections} />
			</Button>
			<Button type="submit" variant="ghost" form={FORMID}>
				Sauvegarder
				<Icon name="save" slot="trailing" />
			</Button>
			<Tooltip
				message={next ? `Continuer vers: ${next.title}` : undefined}
				disabled={!next}
				align="end"
			>
				<Button href={pathname($page, next)} disabled={!next} equi variant="ghost">
					<Icon name="arrow-right" />
				</Button>
			</Tooltip>
		</menu>
	</div>
{/if}

<style lang="scss">
	.toolbar {
		z-index: 10;
		pointer-events: none;
		padding: 0 1.5rem;
		width: 100%;
		position: sticky;
		bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: var(--ui-text-md);
		font-weight: 600;
		margin-top: 1.5rem;
	}

	menu {
		--radius: var(--ui-radius-md);
		--outset: 3px;
		pointer-events: all;
		display: inline-flex;
		flex-direction: row;
		gap: 1px;
		margin: 0 auto;
		background: col(bg, 000);
		// backdrop-filter: blur(8px);
		border-radius: calc(var(--radius) + var(--outset));
		padding: var(--outset);
		transition: all 0.25s var(--ui-ease-out);

		&:hover,
		nav:hover + & {
			border-color: col(bg, 000);
			box-shadow: 0 0 0 6px col(bg, 000, 0.5);
		}
	}

	nav {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		font-size: var(--ui-text-sm);
		font-weight: 450;
		position: absolute;
		pointer-events: all;
		bottom: 100%;
		margin-bottom: var(--ui-inset);
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		left: 50%;
		transform: translateX(-50%);
		background: col(bg, 000);
		// backdrop-filter: blur(8px);
		border-radius: calc(var(--inset) + var(--radius));
		padding: var(--inset);
		transform-origin: bottom center;
		transition: all 0.25s var(--ui-ease-out);

		&:hover {
			box-shadow: 0 0 0 6px col(bg, 000, 0.5);
		}

		a {
			height: var(--ui-height);
			border-radius: var(--radius);
			display: flex;
			align-items: center;
			padding-inline: var(--ui-pad-x);
			color: col(fg, 100);
			transition: all 0.15s var(--ui-ease-out);

			&:hover {
				color: col(primary, 700);
				background: col(primary, 700, 0.1);
			}

			&[data-current='true'] {
				color: col(primary, 500);
			}

			span {
				position: relative;
				top: -0.1em;
			}
		}
	}
</style>
