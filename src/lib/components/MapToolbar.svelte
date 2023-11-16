<!--
	@component
	## Map Toolbar
	Adds a toolbar inside a map pane.

 -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let direction: 'row' | 'column' = 'row';

	onMount(() => {});

	onDestroy(() => {});
</script>

<menu class="toolbar {direction}">
	<slot />
</menu>

<style lang="scss">
	.toolbar {
		--nesting: var(--ui-nesting-md);
		--x: 0;
		--y: 0;
		font-size: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--nesting);
		background: col(bg, 100);
		border-radius: var(--ui-radius-md);
		max-width: 100%;
		font-size: var(--ui-text-sm);
		opacity: 0.35;
		gap: 1px;
		transform: translate(var(--x), var(--y));
		transform: scale(0.98);
		transition: all 0.25s var(--ui-ease-out);
		:global(hr) {
			border: none;
			margin: var(--nesting);
			height: 0;
			border-bottom: var(--ui-border-size) solid col(fg, 100, 0.1);
			align-self: stretch;
		}
	}

	.column {
		flex-direction: column;
		max-height: 100%;
	}

	:global(figure):hover .toolbar {
		opacity: 1;
		transform: translate(0);
		transition: all 0.15s cubic-bezier(0.25, 0, 0.5, 1);
	}
</style>
