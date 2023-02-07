<script lang="ts">
	import type { LayoutData } from './$types';
	import ExploreSearch from './ExploreSearch.svelte';

	export let data: LayoutData;
</script>

<div class="explore">
	<ExploreSearch />
	<slot />
</div>

<style lang="scss" module>
	.explore {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
		align-items: center;
	}
</style>
