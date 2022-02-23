<script lang="ts" context="module">
</script>

<script lang="ts">
	import '$styles/app.postcss';
	import '$styles/vars.css';
	import '$styles/scrollbars.postcss';
	import Header from '$components/header/Header.svelte';
	import Search from '$components/search/Search.svelte';
	import { topRoute } from '$stores/route';
	import { mainScroll } from '$stores/scroll';
	import Nav from '$components/Nav.svelte';
	import { rootRoute } from '$utils/routes';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let body: HTMLBodyElement;


	onMount(() => {

	});
</script>

<body bind:this={body}>
	<Nav />
	{#if $topRoute == rootRoute}
		<Search />
	{/if}
	<slot />
</body>

<style>
</style>
