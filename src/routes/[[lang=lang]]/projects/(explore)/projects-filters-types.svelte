<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarFilterGroup from '$lib/components/patterns/sidebar-filter-group.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';
	let {
		form,
		constraints,
		submitter,
		tainted,
		isTainted,
		lists,
	}: ExtendedSuperFormData<PageData['filtersForm']> & Pick<PageData, 'lists'> = $props();
</script>

<SidebarFilterGroup>
	{#snippet legend()}
		{m.project_types()}
	{/snippet}
	<ul class="gap-menu-gutter flex flex-col items-start">
		{#await lists.types}
			...
		{:then awaitedProjectTypes}
			{#each awaitedProjectTypes as type}
				<label class="button button-dashed compact rounded-full">
					{type.title}
					<input
						type="checkbox"
						class="sr-only"
						value={type.id}
						bind:group={$form.types}
						name="types"
					/>
				</label>
			{/each}
		{/await}
	</ul>
</SidebarFilterGroup>
