<script lang="ts">
	export let style: string | undefined = undefined;
</script>

<aside {style}>
	<slot />
</aside>

<style lang="scss">
	aside {
		--sidebar-inset: var(--aside-inset, 6px);
		--sidebar-radius: var(--ui-radius-lg);
		flex: none;
		position: sticky;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		top: calc(var(--ui-nav-h));
		padding: var(--sidebar-inset);
		border-radius: var(--sidebar-radius);
		// background-color: col(bg, 500);
		border: var(--ui-border-thickness) dashed col(secondary, 300, 0.25);
		// border: var(--ui-border-thickness) solid col(fg, 100, 0.1);
		overflow-x: hidden;
		overflow-y: auto;
		gap: var(--sidebar-inset);
		width: var(--ui-sidebar-width);

		> :global(hr) {
			align-self: stretch;
			border: var(--ui-border-thickness) dashed col(secondary, 300, 0.25);
			border-top: none;
			margin: 0 calc(-1 * var(--sidebar-inset));
			position: relative;
			overflow: visible;

			// &::after {
			// 	content: '';
			// 	position: absolute;
			// 	height: 12px;
			// 	width: calc(100% + 2 * var(--ui-border-thickness));
			// 	top: 0;
			// 	left: calc(-1 * var(--ui-border-thickness));
			// 	transform: translateY(-50%);
			// 	border-inline: inherit;
			// }
		}
	}
</style>
