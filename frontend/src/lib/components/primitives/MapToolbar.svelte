<script lang="ts" context="module">
	export interface MapToolbarContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import type { MapContext } from './Map.svelte';

	export let direction: 'row' | 'column' = 'row';
	export let position:
		| 'top left'
		| 'top'
		| 'top right'
		| 'left'
		| 'right'
		| 'bottom left'
		| 'bottom'
		| 'bottom right';

	const mapCtx = getContext<MapContext>(Ctx.Map);

	const map = mapCtx.getMap();

	setContext<MapToolbarContext>(Ctx.MapToolbar, {});

	onMount(() => {});

	onDestroy(() => {});
</script>

<menu class="{direction} {position}">
	<slot />
</menu>

<style lang="scss">
	menu {
		font-size: var(--size-small);
		--outset: var(--default-inset);
		z-index: 1000;
		position: absolute;
		display: flex;
		flex-direction: row;
		margin: 0;
		background-color: var(--color-light-100);
		padding: var(--outset);
		border-radius: 1.2em;
		max-width: 100%;
		opacity: 0;
		transition: all 0.25s cubic-bezier(0.25, 0, 0.5, 1);

		:global(hr) {
			width: 75%;
			margin-inline: 0.5em;
			background-color: var(--color-dark-100);
			padding: 0.5px;
			border: none;
			opacity: 0.1;
		}
	}

	.column {
		flex-direction: column;
		max-height: 100%;

		:global(hr) {
			margin-block: 0.5em;
			margin-inline: auto;
			height: 1px;
		}
	}

	:global(figure):hover > menu {
		opacity: 1;
		transform: translate(0);
	}

	.top {
		top: 1em;
		transform: translate(0, -0.5em);
	}

	.bottom {
		bottom: 1em;
		transform: translate(0, 0.5em);
	}

	.left {
		left: 1em;
		transform: translate(-0.5em, 0);
	}

	.right {
		right: 1em;
		transform: translate(0.5em), 0;
	}
</style>
