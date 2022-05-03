<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { page } from '$app/stores';
	import { route } from '$stores/route';
	import Switch from '$components/primitives/Switch.svelte';
	import { category } from '$stores/search';
	import type { ExploreRoute } from '$utils/routes';
	import { exploreRoutes } from '$utils/routes';
	import { onDestroy, onMount } from 'svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { expoIn } from 'svelte/easing';

	if (($route as ExploreRoute)?.category) {
		category.set(($route as ExploreRoute).category);
	}
</script>

<div in:fly={{ y: 30, duration: 500, easing: expoOut, delay: 150 }}>
	<Switch name="category" orientation="row">
		{#each exploreRoutes as r, i}
			<SwitchItem
				id={r.category}
				value={r.category}
				bind:group={$category}
				on:mouseover={() => prefetch(r.pathname)}
				on:focus={() => prefetch(r.pathname)}
				on:input={() => goto(r.pathname)}
			>
				{r.title}
			</SwitchItem>
		{/each}
	</Switch>
</div>

<style>
</style>
