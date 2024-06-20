<script lang="ts">
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { ArrowRight, Search } from 'lucide-svelte';
	import type { Snapshot } from './$types.js';

	let { data } = $props();

	const { enhance, form, submitter, submitting, constraints } = extendedSuperForm(data.searchForm);

	let searchButtonRef = $state<HTMLButtonElement>();
	let showFilters = $state(true);

	export const snapshot: Snapshot<{ showFilters: boolean }> = {
		capture() {
			return {
				showFilters,
			};
		},
		restore(v) {
			showFilters = v.showFilters;
		},
	};
</script>

<article class="flex flex-row">
	<form method="GET" class="w-sidebar-width">
		<label class="field">
			<span class="field-label">Search</span>
			<div class="input-group big">
				<Search />
				<input
					type="search"
					name="search"
					bind:value={$form.search}
					{...$constraints.search}
					class="input"
				/>
				<div class="input-peer">
					<button
						class="button button-ghost aspect-square"
						bind:this={searchButtonRef}
						type="submit"
					>
						<IconSpinner icon={ArrowRight} busy={searchButtonRef === $submitter} />
					</button>
				</div>
			</div>
		</label>
	</form>
	<ul>
		{#each data.searchResults as p}
			<li>
				{p.id}
			</li>
		{/each}
	</ul>
</article>
