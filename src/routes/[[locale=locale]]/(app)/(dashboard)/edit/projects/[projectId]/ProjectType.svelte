<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardFormField from '$lib/components/DashboardFormSection.svelte';
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
	export let types: PageData['types'];
</script>

<DashboardFormField title={$t.type}>
	<fieldset class="switch" use:ripple>
		{#each types as pt}
			<label class="switch-item">
				<input
					type="radio"
					name="typeId"
					bind:group={$form.typeId}
					value={pt.id}
					class="visually-hidden"
				/>
				{#if $form.typeId === pt.id}
					<div class="switch-thumb" in:receive={{ key: 'type' }} out:send={{ key: 'type' }} />
				{/if}
				{pt.title}
			</label>
		{/each}
	</fieldset>
</DashboardFormField>

<style lang="postcss">
	.switch {
		align-self: center;
	}
</style>
