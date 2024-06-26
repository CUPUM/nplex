<script lang="ts" context="module">
	import { defineContext } from '$lib/common/context';
	import { defineChildIndexContext } from '$lib/common/index-context';
	import { onDestroy } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';
	import { getSidebarIndex, getSidebarKey } from './Sidebar.svelte';
	import { currentReceive, currentSend } from './SidebarItem.svelte';

	const [getGroupIndex, setGroupIndex] = defineChildIndexContext({});
	const [getGroupDelay, setGroupDelay] = defineContext<number>({});

	export { getGroupDelay, getGroupIndex };
</script>

<script lang="ts">
	type $$Props = { href?: undefined } | ({ href: string } & HTMLAnchorAttributes);

	export let href: $$Props['href'] = undefined;

	$: current = $$restProps['data-current'];

	const needleKey = getSidebarKey();
	const indexCtx = getSidebarIndex();
	const index = indexCtx?.add() ?? 0;
	setGroupIndex();
	const delay = index * 150;
	setGroupDelay(delay);

	onDestroy(() => {
		indexCtx?.remove();
	});
</script>

<section in:scale={{ start: 0.95, duration: 750, easing: expoOut, delay }}>
	{#if current}
		<div
			class="needle"
			in:currentReceive={{ key: needleKey }}
			out:currentSend={{ key: needleKey }}
		></div>
	{/if}
	{#if $$slots.heading}
		<svelte:element this={href ? 'a' : 'h2'} {href} {...$$restProps} class="sidebar-group-heading">
			<slot name="heading" />
		</svelte:element>
	{/if}
	<div class="items">
		<slot />
	</div>
</section>

<style>
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--dashboard-bg);
		border-radius: var(--sidebar-group-radius);
		padding: var(--sidebar-group-nesting);
		margin-bottom: 0;
	}

	.sidebar-group-heading {
		position: relative;
		left: 0;
		padding: 0.75rem 1rem;
		font-size: var(--size-xs);
		font-weight: 300;
		letter-spacing: 0.01em;
		line-height: var(--line-dense);
		color: var(--color-neutral-500);
		transition: all var(--duration-fast) ease-out;

		&a {
			&:hover {
				color: var(--color-neutral-600);
				:global(:--dark) & {
					color: var(--color-neutral-400);
				}
			}

			&[data-current] {
				color: var(--sidebar-needle-bg);
				font-weight: 400;
			}
		}
	}

	.needle {
		position: absolute;
		top: var(--sidebar-group-radius);
		bottom: var(--sidebar-group-radius);
		right: 0;
		width: var(--sidebar-needle-size);
		border-radius: inherit;
		background-color: var(--sidebar-needle-bg);
	}

	.items {
		display: flex;
		flex-direction: column;
	}
</style>
