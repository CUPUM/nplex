<script lang="ts">
	import * as m from '$i18n/messages';
	import ButtonDelete from '$lib/components/ButtonDelete.svelte';
	import ButtonSave from '$lib/components/ButtonSave.svelte';
	import DialogRoute, { createDialogRoute } from '$lib/components/DialogRoute.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { link } from '$lib/i18n/link';
	import DescriptorForm from '../../DescriptorForm.svelte';

	export let data;

	const formid = `ownership-${data.form.data.id}`;

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
		<LangKey>{m.project_ownership_type()}</LangKey>
	</svelte:fragment>
	<DescriptorForm id={formid} {enhance}>
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
		<ButtonSave form={formid} {submitter} disabled={!$tainted} formaction="?/update" />
		<ButtonDelete form={formid} {submitter} formaction="?/delete" value={$form.id} name="del" />
	</svelte:fragment>
</DialogRoute>

<style lang="postcss">
</style>
