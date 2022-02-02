<script lang="ts">
	import '$styles/app.css';
	import '$styles/vars.css';
	import '$styles/scrollbars.css';
	import Header from '$components/header/Header.svelte';
	import Search from '$components/search/Search.svelte';
	import { currentMainRoute, rootRoute } from '$stores/route';
	import { mainScroll } from '$stores/scroll';

	mainScroll.init();
</script>

<Header />
{#if $currentMainRoute === rootRoute}
	<Search />
{/if}
<slot />

<style>
</style>
