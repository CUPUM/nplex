<script lang="ts">
	import { page } from '$app/stores';
	import ExploreSearchbar from '$components/complexes/ExploreSearchbar.svelte';
	import { backgroundColor } from '$stores/backgroundColor';

	let searchbarHeight;

	backgroundColor.reset();
</script>

<div id="explore" style:--searchbar-height="{searchbarHeight || 0}px">
	{#if $page.data.showExploreSearchbar}
		<div id="searchbar-container" bind:offsetHeight={searchbarHeight}>
			<ExploreSearchbar />
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	#explore {
		--search-width: 400px;
		flex: 1;
	}

	#searchbar-container {
		position: absolute;
		display: block;
		width: 100%;
	}
</style>
