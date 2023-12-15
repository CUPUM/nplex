<script lang="ts">
	import * as m from '$i18n/messages';
	import ButtonCreate from '$lib/components/ButtonCreate.svelte';
	import DialogRoute, { createDialogRoute } from '$lib/components/DialogRoute.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { link } from '$lib/i18n/link';
	import DescriptorForm from '../../DescriptorForm.svelte';

	export let data;

	const { elements } = createDialogRoute();
	const {
		form,
		enhance,
		tainted,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, { dataType: 'json' });
</script>

<DialogRoute {...elements} close={$link('/edit/projects/descriptors/ownerships')}>
	<svelte:fragment slot="header">
		<LangKey>{m.project_descriptors_create_ownership_type()}</LangKey>
	</svelte:fragment>
	<DescriptorForm id="new-ownership" {enhance}>
		<svelte:fragment slot="translation" let:lang>
			<input
				placeholder={$langKey(m.title())}
				type="text"
				class="input"
				bind:value={$form.translations[lang].title}
			/>
			<textarea
				placeholder={$langKey(m.description())}
				class="input"
				bind:value={$form.translations[lang].description}
			/>
		</svelte:fragment>
	</DescriptorForm>
	<svelte:fragment slot="footer">
		<ButtonCreate form="new-ownership" {submitter} disabled={!$tainted} />
	</svelte:fragment>
</DialogRoute>

<style lang="postcss">
</style>
