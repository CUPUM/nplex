<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/patterns/sidebar-group.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
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

{#await lists.types then awaitedProjectTypes}
	<SidebarGroup>
		{#snippet legend()}
			{m.project_types()}
		{/snippet}
		<ul class="gap-input-group-gap flex flex-col items-start">
			{#each awaitedProjectTypes as type}
				<label
					class="button button-dashed compact overflow-hidden text-ellipsis rounded-full"
					use:ripple
				>
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
		</ul>
	</SidebarGroup>
{/await}
