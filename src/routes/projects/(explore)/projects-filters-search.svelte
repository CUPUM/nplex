<script lang="ts">
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import { ArrowRight, Search, X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	let {
		formId,
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
	}: ExtendedSuperFormData<PageData['filtersForm']> = $props();

	let clearRef = $state<HTMLButtonElement>();
	let searchRef = $state<HTMLButtonElement>();
</script>

<div
	class="input-group text-md transition-width duration-medium w-full rounded-full backdrop-blur-md ease-out has-[.input:focus]:w-[calc(100vw-2*var(--spacing-padding))]"
>
	<Search />
	<input
		type="search"
		name="search"
		bind:value={$form.search}
		{...$constraints.search}
		class="input"
		data-sveltekit-keepfocus
	/>
	<div class="input-peer flex-row-reverse">
		<button
			use:ripple
			class="button aspect-square"
			bind:this={searchRef}
			type="submit"
			disabled={!isTainted($tainted?.search)}
			data-sveltekit-keepfocus
		>
			<IconSpinner icon={ArrowRight} busy={searchRef === $submitter} />
		</button>
		{#if $form.search}
			<button
				use:ripple
				class="button button-ghost aspect-square"
				transition:scale={{ start: 0.5, duration: 250, easing: expoOut, opacity: 0 }}
				bind:this={clearRef}
				onclick={(e) => ($form.search = undefined)}
				type="submit"
				data-sveltekit-keepfocus
			>
				<IconSpinner icon={X} busy={clearRef === $submitter} />
			</button>
		{/if}
	</div>
</div>
