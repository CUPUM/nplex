<script lang="ts">
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Fourchette de coûts',
		},
		en: {
			title: 'Cost range',
		},
	});

	export let form: SuperFormPageData<PageData['form']>['form'];
</script>

<DashboardFormSection title={$t.title}>
	<div id="cost">
		<label class="labeled-group">
			<span class="label">Min</span>
			<div class="input-group">
				<span class="input-affix">CA$</span>
				<input type="number" class="input" bind:value={$form.costRange[0]} />
			</div>
		</label>
		<label class="labeled-group">
			<span class="label">Max</span>
			<div class="input-group">
				<span class="input-affix">CA$</span>
				<input type="number" class="input" bind:value={$form.costRange[1]} />
			</div>
		</label>
	</div>
</DashboardFormSection>

<style lang="postcss">
</style>
