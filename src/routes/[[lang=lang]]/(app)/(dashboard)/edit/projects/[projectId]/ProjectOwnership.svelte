<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import SelectIcon from '$lib/components/SelectArrow.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { customProxy } from '$lib/forms/proxy';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createSelect, melt } from '@melt-ui/svelte';
	import type { PageData } from './$types';

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

<fieldset class="dashboard-subsection">
	<legend class="dashboard-subsection-header h5">
		<LangKey>{m.project_ownership_type()}</LangKey>
	</legend>
	<div class="dashboard-subsection-content">
		<input type="text" name="siteOwnershipId" use:melt={$hiddenInput} />
		<button type="button" class="input select" use:melt={$trigger}>
			{$selectedLabel || $langKey(m.project_ownership_type_placeholder())}
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

<style lang="postcss">
	@import '$styles/scoped/dashboard.css';

	.select {
		align-self: center;
	}
</style>
