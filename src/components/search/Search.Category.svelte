<script lang="ts">
	import type { ExploreCategory } from '$utils/routes';
	import { goto, prefetch } from '$app/navigation';
	import { category } from '$stores/search';
	import { exploreRoutes } from '$utils/routes';
	import { onMount } from 'svelte';
</script>

<fieldset>
	<!-- <div
		id="indicator"
		style:top="{currentLabel?.offsetTop}px"
		style:left="{currentLabel?.offsetLeft}px"
		style:width="{currentLabel?.offsetWidth}px"
		style:height="{currentLabel?.offsetHeight}px"
	/> -->
	{#each exploreRoutes as route}
		<input
			type="radio"
			name="explore-category"
			id={route.category}
			value={route.category}
			bind:group={$category}
			on:mouseover={() => prefetch(route.href)}
			on:focus={() => prefetch(route.href)}
		/>
		<label for={route.category}>{route.title}</label>
	{/each}
</fieldset>

<style>
	fieldset {
		font-family: var(--font-misc);
		font-weight: 600;
		position: relative;
		padding: 4px;
		margin: 0;
		border: none;
		display: flex;
		flex-direction: row;
		color: var(--color-dark-300);
		/* background-color: var(--color-light-100); */
		border-radius: 1.1em;
		box-shadow: 0 0.2em 1em -0.5em rgba(0, 0, 0, 0.2);
		justify-content: center;
		align-items: center;
		gap: 0;
	}

	input {
		opacity: 0;
		width: 0;
		height: 0;
		padding: 0;
		margin: 0;
	}

	label {
		position: relative;
		cursor: pointer;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-inline: 0.8em;
		border-radius: 0.9em;
		transition: all 0.3s ease;
	}

	label:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	input:checked + label {
		color: var(--color-dark-900);
		background-color: var(--color-light-100);
	}

	/* #indicator {
		background-color: rgba(0, 0, 0, 0.05);
		width: 50px;
		height: 50px;
		position: absolute;
		transition: all 0.2s cubic-bezier(0.5, 0, 0.3, 1);
		border-radius: 0.7em;
	} */
</style>
