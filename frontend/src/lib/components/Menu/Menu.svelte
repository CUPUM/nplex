<script lang="ts" context="module">
	import { getContext } from 'svelte';

	const CTX_KEY = 'menu-context';

	interface MenuContext {}

	export function getMenuContext() {
		return getContext<MenuContext>(CTX_KEY);
	}
</script>

<script lang="ts">
</script>

<menu>
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
		box-shadow: var(--ui-shadow-lg);

		> :global(:where(hr)) {
			margin-inline: calc(-1 * var(--pad));
			margin-block: calc(var(--inset) + var(--outset));
			align-self: stretch;
			padding: 0.5px;
			background: col(fg, 500, 0.1);
		}
	}
</style>
