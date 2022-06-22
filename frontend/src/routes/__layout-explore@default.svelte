<!--
	This layout inherits from the adjacent unnamed (default) layout.
-->
<script lang="ts">
	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import { backgroundColor } from '$stores/backgroundColor';
	import { category, showCategory, showSearchbar } from '$stores/search';
	import { cssSize } from '$utils/helpers/css';
	import { onDestroy, onMount } from 'svelte';

	const searchWidth = cssSize(400);
	let searchbarHeight = 0;

	showSearchbar.set(true);
	showCategory.set(true);

	onMount(() => {
		backgroundColor.reset();
	});

	onDestroy(() => {
		showSearchbar.set(false);
		showCategory.set(false);
		category.set(null);
	});
</script>

<div id="searchbar-container" bind:offsetHeight={searchbarHeight} style:--search-width={searchWidth}>
	<ExploreSearchbar />
</div>
<div style:--searchbar-height={cssSize(searchbarHeight)} style:--search-width={searchWidth}>
	<slot />
</div>

<style lang="scss">
	#searchbar-container {
		position: relative;
		display: block;
		top: var(--navbar-height);
		width: 100%;
	}
</style>
