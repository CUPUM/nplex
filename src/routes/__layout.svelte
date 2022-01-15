<script lang="ts">
	import '../app.css';
	import Header from '$components/header/Header.svelte';
	import MainSearch from '$components/MainSearch.svelte';
	import { cssColors } from '$utils/colors';
	import { cssSizes } from '$utils/sizes';
	import { currentMainRoute, rootRoute } from '$stores/route';
</script>

<svelte:head>
	{@html // Need to declare 'style' tag this way because of a bug with prettier
	`<${'style'}>
			:root {
				${cssColors}
				${cssSizes}
			}
		</${'style'}>`}
</svelte:head>

<Header />
{#if $currentMainRoute === rootRoute}
	<MainSearch />
{/if}
<slot />

<style>
	.test {
		color: red;
		fill: pink;
	}
</style>
