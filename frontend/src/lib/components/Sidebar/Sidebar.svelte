<script lang="ts">
	import type { Variant } from '$utils/enums';

	export let variant: Extract<Variant, 'default' | 'outlined'> = 'default';
</script>

<aside class={variant}>
	<slot />
</aside>

<style lang="scss">
	aside {
		--sidebar-inset: var(--aside-inset, 6px);
		--sidebar-gap: var(--sidebar-inset);
		--sidebar-radius: var(--ui-radius-lg);
		flex: none;
		position: sticky;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		top: calc(var(--ui-nav-h));
		padding: var(--sidebar-inset);
		border-radius: var(--sidebar-radius);
		overflow-x: hidden;
		overflow-y: auto;
		gap: var(--sidebar-gap);
		width: var(--ui-sidebar-width);

		> :global(hr) {
			align-self: stretch;
			margin: var(--ui-border-thickness) calc(-1 * var(--sidebar-gap));
			position: relative;
		}
	}

	.default {
		--sidebar-inset: 0px;
		--sidebar-gap: 3px;
		--sidebar-radius: var(--ui-radius-md);
		// background-color: col(bg, 000, 0.5);
		// border: var(--ui-border-thickness) solid col(secondary, 100, 0.1);
		> :global(hr) {
			border-bottom: var(--ui-border-thickness) solid col(bg, 000, 0.2);
		}
	}

	.outlined {
		border: var(--ui-border-thickness) dashed col(secondary, 300, 0.25);
		> :global(hr) {
			border-bottom: var(--ui-border-thickness) dashed col(secondary, 300, 0.25);
		}
	}
</style>
