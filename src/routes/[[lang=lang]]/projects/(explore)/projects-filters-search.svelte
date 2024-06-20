<script lang="ts">
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { ArrowRight, Search } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { form, constraints, submitter }: ExtendedSuperFormData<PageData['filtersForm']> = $props();

	let buttonRef = $state<HTMLButtonElement>();
</script>

<label class="field text-md">
	<span class="field-label">Search</span>
	<div class="input-group">
		<Search />
		<input
			type="search"
			name="search"
			bind:value={$form.search}
			{...$constraints.search}
			class="input"
		/>
		<div class="input-peer">
			<button class="button button-ghost aspect-square" bind:this={buttonRef} type="submit">
				<IconSpinner icon={ArrowRight} busy={buttonRef === $submitter} />
			</button>
		</div>
	</div>
</label>
