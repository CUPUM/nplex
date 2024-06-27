<script lang="ts">
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
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

	// const dialog = new Dialog();
</script>

<!-- {#if dialog.open}
	<dialog
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
		class="p-padding m-auto w-lg rounded-lg bg-transparent"
		transition:fly|global={{ y: 6, duration: 250, easing: expoOut }}
	>
		<fieldset {...dialog.contentAttributes} class="input-group big w-full text-lg backdrop-blur-md">
			<Search />
			<input type="search" bind:value={$form.search} {...$constraints.search} class="input" />
			<div class="input-peer flex-row-reverse">
				<button
					class="button aspect-square"
					bind:this={searchRef}
					type="submit"
					form={$formId}
					disabled={!isTainted($tainted?.search)}
				>
					<IconSpinner icon={ArrowRight} busy={searchRef === $submitter} />
				</button>
				{#if $form.search}
					<button
						class="button button-ghost aspect-square"
						transition:scale={{ start: 0.5, duration: 250, easing: expoOut, opacity: 0 }}
						bind:this={clearRef}
						onclick={(e) => ($form.search = undefined)}
						type="submit"
						form={$formId}
					>
						<IconSpinner icon={X} busy={clearRef === $submitter} />
					</button>
				{/if}
			</div>
		</fieldset>
	</dialog>
{/if} -->

<div class="input-group big rounded-full text-sm">
	<Search />
	<input
		type="search"
		name="search"
		bind:value={$form.search}
		{...$constraints.search}
		class="input"
	/>
	<div class="input-peer flex-row-reverse">
		<button
			class="button aspect-square"
			bind:this={searchRef}
			type="submit"
			disabled={!isTainted($tainted?.search)}
		>
			<IconSpinner icon={ArrowRight} busy={searchRef === $submitter} />
		</button>
		{#if $form.search}
			<button
				class="button button-ghost aspect-square"
				transition:scale={{ start: 0.5, duration: 250, easing: expoOut, opacity: 0 }}
				bind:this={clearRef}
				onclick={(e) => ($form.search = undefined)}
				type="submit"
			>
				<IconSpinner icon={X} busy={clearRef === $submitter} />
			</button>
		{/if}
	</div>
</div>
