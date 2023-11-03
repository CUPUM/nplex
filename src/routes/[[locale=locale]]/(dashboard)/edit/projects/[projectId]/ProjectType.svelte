<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import type { SuperFormPageData } from '$lib/forms/types';
	import { createTranslations } from '$lib/i18n/translate';
	import { switchCrossfade } from '$lib/transitions/presets';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			type: 'Type de projet',
		},
		en: {
			type: 'Project type',
		},
	});

	const [send, receive] = switchCrossfade;

	export let form: SuperFormPageData<PageData['form']>['form'];
	export let types: PageData['descriptors']['types'];
</script>

<DashboardFormSection title={$t.type}>
	<fieldset class="switch" use:ripple>
		{#await types}
			<Loading />
		{:then _types}
			{#each _types as pt}
				<label class="switch-item">
					<input
						type="radio"
						name="typeId"
						bind:group={$form.typeId}
						value={pt.id}
						class="switch-input"
					/>
					{#if $form.typeId === pt.id}
						<div class="switch-thumb" in:receive={{ key: 'type' }} out:send={{ key: 'type' }} />
					{/if}
					{pt.title}
				</label>
			{/each}
		{/await}
	</fieldset>
</DashboardFormSection>

<style lang="postcss">
</style>
