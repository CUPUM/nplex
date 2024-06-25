<script lang="ts">
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { ArrowRight, Search, X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	let {
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
	}: ExtendedSuperFormData<PageData['filtersForm']> = $props();

	let clearRef = $state<HTMLButtonElement>();
	let searchRef = $state<HTMLButtonElement>();
</script>

<div class="input-group text-md">
	<Search />
	<input
		type="search"
		name="search"
		bind:value={$form.search}
		{...$constraints.search}
		class="input"
	/>
	<div class="input-peer">
		{#if $form.search}
			<button
				class="button button-ghost aspect-square"
				transition:scale={{ start: 0.5, duration: 250, easing: expoOut, opacity: 0 }}
				bind:this={clearRef}
				type="submit"
			>
				<IconSpinner icon={X} busy={clearRef === $submitter} />
			</button>
		{/if}
		<button
			class="button aspect-square"
			bind:this={searchRef}
			type="submit"
			disabled={!isTainted($tainted?.search)}
		>
			<IconSpinner icon={ArrowRight} busy={searchRef === $submitter} />
		</button>
	</div>
</div>
