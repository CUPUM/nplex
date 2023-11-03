<script lang="ts">
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import DropdownMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { ChevronDown } from 'lucide-svelte';
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
	export let siteOwnerships: PageData['descriptors']['siteOwnerships'];

	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open, selected },
		helpers: { isSelected },
	} = createSelect({
		forceVisible: true,
		positioning: { placement: 'bottom', fitViewport: true, sameWidth: true },
		preventScroll: false,
	});
</script>

<DashboardFormSection title={$t.ownership}>
	<button type="button" class="button outlined" use:melt={$trigger}>
		{$selectedLabel || $t.placeholder}
		<ChevronDown class="button-icon" />
	</button>
	{#await siteOwnerships then _siteOwnerships}
		<DropdownMenu {menu} {open}>
			{#each _siteOwnerships as ownership}
				<SelectOption {isSelected} {option} value={ownership.id} label={ownership.title}>
					{ownership.title}
				</SelectOption>
			{/each}
		</DropdownMenu>
	{/await}
</DashboardFormSection>

<style lang="postcss">
</style>
