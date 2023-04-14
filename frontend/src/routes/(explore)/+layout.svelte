<script lang="ts">
	import { PROJECTS_FILTERS_W, PROJECTS_LIST_W } from './projets/common.js';

	export let data;
</script>

<div
	class="explore"
	style:--projects-filters-w="{PROJECTS_FILTERS_W}px"
	style:--projects-list-w="{PROJECTS_LIST_W}px"
>
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
