<script lang="ts" context="module">
</script>

<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Nav from '$components/complexes/Nav.svelte';
	import Search from '$components/complexes/Search.svelte';
	import { topRoute } from '$stores/route';
	import { rootRoute } from '$utils/routes';

	let key;
</script>

<Nav />
{#if $topRoute == rootRoute}
	<Search />
{/if}
<main>
	<slot />
</main>

<style>
	main {
	}
</style>
