<script lang="ts">
	export let style: string | undefined = undefined;
</script>

<aside {style}>
	<div class="inner">
		<slot />
	</div>
</aside>

<style lang="scss">
	aside {
		--ui-sidebar-width: 220px;
		flex: none;
		position: sticky;
		top: var(--ui-nav-h);
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		overflow-y: auto;

		@include tablet {
			width: 0;
			padding: 0;
		}
	}

	.inner {
		position: relative;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		width: var(--ui-sidebar-width);
		gap: var(--ui-inset);
	}
</style>
