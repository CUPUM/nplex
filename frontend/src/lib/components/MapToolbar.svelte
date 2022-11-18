<!--
	@component
	## Map Toolbar
	Adds a toolbar inside a map pane.

 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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

	onMount(() => {});

	onDestroy(() => {});
</script>

<menu class="toolbar nest compact {direction} {position}">
	<slot />
</menu>

<style lang="scss">
	.toolbar {
		--margin: 1em;
		--inset: 3px;
		--x: 0;
		--y: 0;
		font-size: var(--size-small);
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: var(--margin);
		padding: var(--inset);
		background: col(bg, 100);
		border-radius: var(--ui-radius);
		max-width: calc(100% - 2 * var(--margin));
		opacity: 0;
		gap: 1px;
		transform: translate(var(--x), var(--y));
		transition: all 0.25s 0.5s cubic-bezier(0.25, 0, 0.5, 1);
		:global(hr) {
			border: none;
			margin-inline: var(--inset);
			width: 50%;
			padding: 0.5px;
			background: col(fg, 100, 0.05);
			align-self: stretch;
		}
	}

	.column {
		flex-direction: column;
		max-height: calc(100% - 2 * var(--margin));
		:global(hr) {
			margin-block: var(--inset);
			margin-inline: auto;
			height: 1px;
		}
	}

	:global(figure):hover > :global(*) > .toolbar {
		opacity: 1;
		transform: translate(0);
		transition: all 0.15s cubic-bezier(0.25, 0, 0.5, 1);
	}

	.top {
		--y: -3px;
		top: 0;
	}

	.bottom {
		--y: 3px;
		bottom: 0;
	}

	.left {
		--x: -3px;
		left: 0;
	}

	.right {
		--x: 3px;
		right: 0;
	}
</style>
