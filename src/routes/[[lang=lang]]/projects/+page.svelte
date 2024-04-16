<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link.svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import type { Snapshot } from './$types';

	export let data;

	let filtersOpen = true;

	export const snapshot: Snapshot<{ filtersOpen: boolean }> = {
		capture() {
			return {
				filtersOpen,
			};
		},
		restore(snapshot) {
			filtersOpen = snapshot.filtersOpen;
		},
	};
</script>

<header class="header">
	{#if data.search}
		<LangKey>
			{m.filtered_projects()}
		</LangKey>
	{:else}
		<LangKey>
			{m.all_projects()}
		</LangKey>
	{/if}
	<button on:click={() => (filtersOpen = !filtersOpen)}>Toggle</button>
</header>
<div class="panes">
	{#if filtersOpen}
		<form
			method="GET"
			class="filters"
			data-sveltekit-keepfocus
			data-sveltekit-noscroll
			in:slide={{ axis: 'x', duration: 250 }}
			out:slide={{ axis: 'x', duration: 350 }}
		>
			<ul
				class="filters-inner"
				in:fly={{ x: '-100%', opacity: 0, duration: 250, easing: expoOut }}
				out:fly={{ x: '-100%', opacity: 0, duration: 350, easing: cubicOut }}
			>
				<section class="filter-block">
					<input class="search" type="search" name="search" value={data.search} />
				</section>
			</ul>
		</form>
	{/if}
	<ul class="results">
		{#each data.filtered as p, i (p.id)}
			<li>
				<a {...$link(`/projects/${p.id}`)}>
					{#if p.title}
						{p.title}
					{:else}
						<span class="no-title">
							<LangKey>{m.no_title()}</LangKey>
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.header {
		/* position: stickt; */
	}

	.panes {
		display: flex;
		flex-direction: row;
		gap: 0;
		align-items: stretch;
	}

	.filters {
		position: sticky;
		top: var(--sticky-top);
		overflow: visible !important;
		border-right: var(--border);
		max-height: 100vh;
		padding: var(--gutter);
	}

	.filters-inner {
		left: 0;
		width: 200px;
		display: flex;
		flex-direction: column;
	}

	.filter-block {
		padding: 1rem;
		background: red;
		border-radius: var(--radius-md);
	}

	.results {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: var(--gutter);
		padding: var(--gutter);

		a {
			position: relative;
			display: flex;
			aspect-ratio: 3 / 4;
			width: 100%;
			background: red;
			border-radius: var(--radius-md);
		}
	}

	.no-title {
		color: var(--muted-fg);
	}
</style>
