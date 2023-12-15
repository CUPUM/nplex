<script lang="ts" context="module">
	import { defineContext } from '$lib/utils/context';
	import { defineChildIndexContext } from '$lib/utils/index-context';
	import { fade } from 'svelte/transition';

	const [getSidebarIndex, setSidebarIndex] = defineChildIndexContext({});
	const [getSidebarKey, setSidebarKey] = defineContext({});

	export { getSidebarIndex, getSidebarKey };
</script>

<script lang="ts">
	setSidebarIndex();
	setSidebarKey({});
</script>

<div class="sidebar" in:fade|global>
	<slot />
</div>

<style lang="postcss">
	.sidebar {
		grid-column: sidebar;
		grid-column: sidebar;
		font-size: var(--size-md);
		position: sticky;
		/* top: calc(var(--navbar-height) + var(--dashboard-gutter)); */
		top: var(--navbar-height);
		display: flex;
		flex-direction: column;
		align-self: flex-start;
		overflow-x: visible;
		overflow-y: auto;
		gap: var(--dashboard-gutter);
		width: var(--sidebar-width);
	}
</style>
