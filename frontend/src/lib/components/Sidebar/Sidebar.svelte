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
		--ui-sidebar-width: 200px;
		flex: none;
		position: sticky;
		top: var(--ui-nav-h);
		overflow-y: auto;
		padding: 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	.inner {
		position: relative;
		display: flex;
		flex-direction: column;
		width: var(--ui-sidebar-width);
		gap: var(--ui-inset);
	}
</style>
