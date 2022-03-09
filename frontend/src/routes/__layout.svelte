<script lang="ts" context="module">
</script>

<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Nav from '$components/Nav.svelte';
	import Search from '$components/search/Search.svelte';
	import { topRoute } from '$stores/route';
	import { rootRoute } from '$utils/routes';
	import { parseCSSValue } from '$utils/helpers/strings';

	let key;
</script>

<svelte:body class="test" />

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

	.test {
		color: red !important;
	}
</style>
