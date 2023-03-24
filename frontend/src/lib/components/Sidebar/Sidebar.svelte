<script lang="ts">
	export let variant: 'default' | 'editor' = 'default';
</script>

<!-- <button class={variant}><Icon name="hamburger" /></button> -->
<aside class={variant}>
	<slot />
</aside>

<style lang="scss">
	button {
		@include tablet {
		}
	}

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
		max-height: calc(100vh - var(--ui-nav-h) - 1.5rem);
		gap: var(--sidebar-gap);
		width: var(--ui-sidebar-w);

		> :global(hr) {
			align-self: stretch;
			margin: var(--ui-border-size) calc(-1 * var(--sidebar-gap));
			position: relative;
		}

		@include laptop {
			position: absolute;
		}
	}

	.default {
		--sidebar-inset: calc(2 * var(--ui-inset));
		--sidebar-gap: var(--ui-inset);
		--sidebar-radius: var(--ui-radius-lg);
		background-color: col(bg, 100);
		// border: var(--ui-border-size) solid col(secondary, 100, 0.1);
		> :global(hr) {
			border-bottom: var(--ui-border-size) solid col(bg, 000, 0.2);
		}
	}

	.editor {
		--sidebar-inset: 0.75rem;
		--sidebar-gap: 3px;
		--sidebar-radius: var(--ui-radius-lg);
		background-color: col(secondary, 100, 0.1);
		> :global(hr) {
			border-bottom: var(--ui-border-size) solid col(secondary, 100, 0.1);
		}
	}

	.outlined {
		// background: col(bg, 100);
		// border: var(--ui-border-size) dashed col(secondary, 300, 0.25);
		border: var(--ui-border-size) solid col(secondary, 100, 0.1);
		> :global(hr) {
			border-bottom: var(--ui-border-size) dashed col(secondary, 300, 0.25);
		}
	}
</style>
