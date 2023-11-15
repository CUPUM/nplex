<script lang="ts" context="module">
	import { defineContext } from '$lib/utils/context';
	import { defineChildIndexContext } from '$lib/utils/index-context';

	const [getSidebarIndex, setSidebarIndex] = defineChildIndexContext({});
	const [getSidebarKey, setSidebarKey] = defineContext({});

	export { getSidebarIndex, getSidebarKey };
</script>

<script lang="ts">
	setSidebarIndex();
	setSidebarKey({});
</script>

<div class="sidebar">
	<slot />
</div>

<style lang="postcss">
	.sidebar {
		--_sidebar-needle-right: 0;
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
