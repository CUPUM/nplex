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
		background: col(bg, 000, 0.85);
		backdrop-filter: blur(8px);
		display: flex;
		flex-direction: column;
		gap: var(--ui-inset);
		border-radius: calc(var(--radius) + var(--outset));
		padding: var(--pad);
		box-shadow: 0 0 0 1px col(bg, 500, 0.25), 0 3em 5em -4em rgb(0, 10, 30, 0.25);

		> :global(:where(hr)) {
			margin-inline: calc(-1 * var(--pad));
			margin-block: var(--inset);
		}
	}
</style>
