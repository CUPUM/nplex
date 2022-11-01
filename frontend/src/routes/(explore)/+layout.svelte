<script lang="ts">
	import ExploreSearchbar from './ExploreSearchbar.svelte';
</script>

<div id="explore">
	<ExploreSearchbar />
	<slot />
</div>

<style lang="scss">
	#explore {
		position: relative;
		width: 100%;
	}

	nav {
		position: sticky;
		top: 0;
		height: 100vh;
		background-color: pink;
		width: 100px;
	}

	#searchbar-container {
		position: absolute;
		display: block;
		width: 100%;
	}
</style>
