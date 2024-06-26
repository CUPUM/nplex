<script lang="ts">
	import * as m from '$i18n/messages';
	import SelectIcon from '$lib/components/SelectArrow.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { customProxy } from '$lib/crud/validation/forms/proxy';
	import type { SuperFormData } from '$lib/crud/validation/forms/types';
	import { createSelect, melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';

	export let form: SuperFormData<PageData['form']>['form'];
	export let siteOwnerships: PageData['siteOwnerships'];

	const ownershipProxy = customProxy(form, 'siteOwnershipId', {
		to(value) {
			return {
				value,
				label: siteOwnerships.find((pso) => pso.id === value)?.title ?? undefined,
			};
		},
		from(value) {
			return value.value;
		},
	});

	const {
		elements: { trigger, menu, option, label, hiddenInput },
		states: { selectedLabel, open, selected },
		helpers: { isSelected },
	} = createSelect({
		forceVisible: true,
		positioning: { placement: 'bottom', fitViewport: true, sameWidth: false },
		preventScroll: false,
		selected: ownershipProxy,
	});
</script>

<fieldset class="dashboard-subsection">
	<legend class="dashboard-subsection-header h5">
		{m.project_ownership_type()}
	</legend>
	<div class="dashboard-subsection-content">
		<input type="text" name="siteOwnershipId" use:melt={$hiddenInput} />
		<button type="button" class="input select" use:melt={$trigger}>
			{$selectedLabel || m.project_ownership_type_placeholder()}
			<SelectIcon open={$open} />
		</button>
		<SelectMenu {menu} {open}>
			{#each siteOwnerships as ownership}
				<SelectOption
					{isSelected}
					{option}
					value={ownership.id}
					label={ownership.title}
					hasDescription={ownership.description}
				>
					{ownership.title}
					<svelte:fragment slot="description">
						{ownership.description}
					</svelte:fragment>
				</SelectOption>
			{/each}
		</SelectMenu>
	</div>
</fieldset>

<style>
	@import '$styles/scoped/dashboard';

	.select {
		align-self: center;
	}
</style>
