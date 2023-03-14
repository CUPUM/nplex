<!--
	@component
	# Menu
	Used for list menus such as drop downs.
-->
<script lang="ts">
</script>

<menu>
	<slot />
</menu>

<style lang="scss">
	menu {
		--radius: var(--ui-radius-md); //nestable prop
		--inset: 2px; // nestable prop
		--menu-outset: 6px;
		--menu-padding: calc(var(--menu-outset) + var(--inset));
		color: col(fg, 300);
		position: relative;
		background: col(bg, 000);
		// backdrop-filter: blur(8px);
		display: flex;
		flex-direction: column;
		// gap: var(--ui-inset);
		border-radius: calc(var(--radius) + var(--menu-outset));
		padding: var(--menu-padding);

		> :global(:where(hr)) {
			margin-inline: calc(-1 * var(--pad));
			margin-block: calc(var(--inset) + var(--menu-outset));
			align-self: stretch;
			padding: 0.5px;
			background: col(fg, 500, 0.1);
		}
	}
</style>
