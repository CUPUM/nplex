<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import { route } from '$stores/route';
	import SwitchSet from '$components/primitives/SwitchSet.svelte';
	import { category } from '$stores/search';
	import type { ExploreRoute } from '$utils/routes';
	import { exploreRoutes } from '$utils/routes';
	import { onDestroy, onMount } from 'svelte';
	import Switch from '$components/primitives/Switch.svelte';

	if (($route as ExploreRoute)?.category) {
		category.set(($route as ExploreRoute).category);
	}
</script>

<SwitchSet name="category">
	{#each exploreRoutes as r, i}
		<Switch
			id={r.category}
			value={r.category}
			bind:group={$category}
			on:mouseover={() => prefetch(r.href)}
			on:focus={() => prefetch(r.href)}
			on:input={() => goto(r.href)}
		>
			{r.title}
		</Switch>
	{/each}
</SwitchSet>

<style>
</style>
