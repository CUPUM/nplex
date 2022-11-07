<!--
	@component
	## Map Toolbar
	Adds a toolbar inside a map pane.

 -->
<script lang="ts" context="module">
	const CTX_KEY = 'map-toolbar-context';

	interface MapToolbarContext {}

	export function getMapToolbarContext() {
		return getContext<MapToolbarContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { getMapContext } from './Map.svelte';

	export let direction: 'row' | 'column' = 'row';
	export let position:
		| 'top left'
		| 'top'
		| 'top right'
		| 'left'
		| 'right'
		| 'bottom left'
		| 'bottom'
		| 'bottom right' = 'top';

	const mapContext = getMapContext();

	const map = mapContext.getMap();

	setContext<MapToolbarContext>(CTX_KEY, {});

	onMount(() => {});

	onDestroy(() => {});
</script>

<menu class="toolbar {direction} {position}">
	<slot />
</menu>

<style lang="scss">
	.toolbar {
		--margin: 1em;
		--padding: 5px;
		--x: 0;
		--y: 0;
		font-size: var(--size-xsmall);
		position: absolute;
		display: flex;
		flex-direction: row;
		margin: var(--margin);
		padding: var(--padding);
		background-color: var(--color-base-100);
		border-radius: calc(var(--default-radius) + var(--padding));
		max-width: calc(100% - 2 * var(--margin));
		opacity: 0;
		transform: translate(var(--x), var(--y));
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
		max-height: calc(100% - 2 * var(--margin));
		:global(hr) {
			margin-block: 0.5em;
			margin-inline: auto;
			height: 1px;
		}
	}

	:global(figure):hover > :global(*) > .toolbar {
		opacity: 1;
		transform: translate(0);
	}

	.top {
		--y: -0.25em;
		top: 0;
	}

	.bottom {
		--y: 0.25em;
		bottom: 0;
	}

	.left {
		--x: -0.25em;
		left: 0;
	}

	.right {
		--x: 0.25em;
		right: 0;
	}
</style>
