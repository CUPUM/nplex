<script lang="ts">
	export let style: string | undefined = undefined;
</script>

<aside {style}>
	<slot />
</aside>

<style lang="scss">
	aside {
		--ui-aside-inset: var(--aside-inset, var(--ui-inset));
		flex: none;
		position: sticky;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		top: var(--ui-nav-h);
		padding-top: 1.5rem;
		overflow-x: hidden;
		overflow-y: auto;
		gap: var(--ui-aside-inset);
		width: var(--ui-sidebar-width);

		> :global(hr) {
			align-self: stretch;
			border: var(--ui-border-thickness) dashed col(fg, 500, 0.2);
			border-top: none;
			margin: 1.5rem var(--ui-border-thickness);
			position: relative;
			overflow: visible;

			&::after {
				content: '';
				position: absolute;
				height: 12px;
				width: calc(100% + 2 * var(--ui-border-thickness));
				top: 0;
				left: calc(-1 * var(--ui-border-thickness));
				transform: translateY(-50%);
				border-inline: inherit;
			}
		}
	}
</style>
