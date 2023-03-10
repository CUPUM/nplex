<script lang="ts">
	import ExploreSearch from './ExploreSearch.svelte';

	export let data;
</script>

<div class="explore">
	<ExploreSearch />
	<slot />
</div>

<style lang="scss" module>
	.explore {
		// Manually retrieved. Could use binding instead.
		--ui-search-h: 52px;
		z-index: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		min-height: calc(100vh - var(--ui-nav-h));
	}
</style>
