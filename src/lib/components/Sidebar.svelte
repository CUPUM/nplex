<script lang="ts" context="module">
	import { defineChildIndexContext } from '$lib/utils/index-context';

	const [getSidebarIndex, setSidebarIndex] = defineChildIndexContext({});

	export { getSidebarIndex };
</script>

<script lang="ts">
	setSidebarIndex();
</script>

<div class="sidebar">
	<slot />
</div>

<style lang="postcss">
	.sidebar {
		--sidebar-width: var(--base-sidebar-width);
		position: sticky;
		top: calc(var(--sticky-top) + var(--base-gap));
		display: flex;
		flex-direction: column;
		align-self: flex-start;
		overflow-x: hidden;
		overflow-y: auto;
		gap: var(--base-gap);
		width: var(--sidebar-width);
	}
</style>
