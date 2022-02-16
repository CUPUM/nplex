<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Header from '$components/header/Header.svelte';
	import Search from '$components/search/Search.svelte';
	import { currentMainRoute, rootRoute } from '$stores/route';
	import { mainScroll } from '$stores/scroll';
	import Nav from '$components/Nav.svelte';

	// mainScroll.init();
</script>

<header>
	<Nav />
</header>
{#if $currentMainRoute === rootRoute}
	<Search />
{/if}
<slot />

<style>
</style>
