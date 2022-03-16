<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Nav from '$components/complexes/Nav.svelte';
	import Search from '$components/complexes/Search.svelte';
	import { route, topRoute } from '$stores/route';
	import { rootRoute } from '$utils/routes';
	import { onMount } from 'svelte';
	import Loading from '$components/primitives/Loading.svelte';
</script>

<Nav />
{#if $route.searchable}
	<Search />
{/if}
<slot />

<!-- {#if !mounted}
	<Loading type="logo" />
{/if} -->
<style>
</style>
