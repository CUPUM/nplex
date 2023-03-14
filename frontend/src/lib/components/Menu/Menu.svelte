<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<menu class:mounted>
	<slot />
</menu>

<style lang="scss">
	menu {
		--radius: var(--ui-radius-md);
		--inset: 2px;
		--outset: 6px;
		--pad: calc(var(--outset) + var(--inset));
		color: col(fg, 300);
		position: relative;
		background: col(bg, 000);
		// backdrop-filter: blur(8px);
		display: flex;
		flex-direction: column;
		// gap: var(--ui-inset);
		border-radius: calc(var(--radius) + var(--outset));
		padding: var(--pad);
		box-shadow: 0 0 0.5rem -0.5rem rgb(0, 0, 0, 0);
		transition: box-shadow 0.25s;

		> :global(:where(hr)) {
			margin-inline: calc(-1 * var(--pad));
			margin-block: calc(var(--inset) + var(--outset));
			align-self: stretch;
			padding: 0.5px;
			background: col(fg, 500, 0.1);
		}
	}

	.mounted {
		box-shadow: var(--ui-shadow-md);
	}
</style>
