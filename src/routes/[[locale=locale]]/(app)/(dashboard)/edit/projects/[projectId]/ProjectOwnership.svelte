<script lang="ts">
	import DashboardFormField from '$lib/components/DashboardFormSection.svelte';
	import SelectIcon from '$lib/components/SelectArrow.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { customProxy } from '$lib/forms/proxy';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import { createSelect, melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			ownership: 'Type de propriétaire',
			placeholder: 'Sélectionnez un type de propriétaire',
		},
		en: {
			ownership: 'Ownership',
			placeholder: 'Select a type of owner',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
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

<DashboardFormField title={$t.ownership}>
	<input type="text" name="siteOwnershipId" use:melt={$hiddenInput} />
	<button type="button" class="input select" use:melt={$trigger}>
		{$selectedLabel || $t.placeholder}
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
</DashboardFormField>

<style lang="postcss">
	.select {
		align-self: center;
	}
</style>
