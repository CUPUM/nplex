<script lang="ts">
	import '../app.css';
	import '../vars.css';
	import Header from '$components/header/Header.svelte';
	import MainSearch from '$components/MainSearch.svelte';
	import { cssColors } from '$utils/colors';
	import { cssSizes } from '$utils/sizes';
	import { currentMainRoute, rootRoute } from '$stores/route';
</script>

<Header />
{#if $currentMainRoute === rootRoute}
	<MainSearch />
{/if}
<slot />