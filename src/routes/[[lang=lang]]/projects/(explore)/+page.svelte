<script lang="ts">
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { projectCardCrossfade } from '$lib/motion/presets';
	import { RefreshCw } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import ProjectCard from './project-card.svelte';
	import ProjectsFilters from './projects-filters.svelte';

	let { data } = $props();

	const filtersForm = extendedSuperForm(data.filtersForm);
	const { formId, submitter } = filtersForm;

	let sizeRef = $state<HTMLButtonElement>();
</script>

<div class="px-padding mb-lg flex flex-1 flex-row">
	<ProjectsFilters {...filtersForm} lists={data.lists} />
	<section class="gap-lg flex flex-1 flex-col">
		<ul
			class="gap-gap flex flex-1 grid-flow-dense grid-cols-[repeat(auto-fill,minmax(var(--width-xs),1fr))] flex-col place-content-start group-data-[view-mode=masonry]/explore:grid"
		>
			{#each data.result as project, i (project.id)}
				{@const rowspan = 2 + Math.round(Math.random() * 2)}
				<li
					animate:flip={{
						duration(l) {
							return 150 + l / 5;
						},
					}}
					style:--rowspan={rowspan}
					class="relative col-span-1 row-span-[var(--rowspan)] flex h-full w-full flex-col group-data-[view-mode=masonry]/explore:aspect-[2/var(--rowspan)]"
					in:projectCardCrossfade.receive|global={{
						key: project.id,
						delay: i * 25,
					}}
					out:projectCardCrossfade.send|global={{ key: project.id }}
				>
					<ProjectCard {project} />
				</li>
			{/each}
		</ul>
		<menu class="gap-input-group-gap flex flex-row self-center">
			<button
				disabled
				type="submit"
				class="button button-dashed rounded-full text-sm"
				name="size"
				value="50"
				form={$formId}
				bind:this={sizeRef}
			>
				<IconSpinner icon={RefreshCw} busy={$submitter === sizeRef} />{m.load_more()}
			</button>
		</menu>
	</section>
</div>
