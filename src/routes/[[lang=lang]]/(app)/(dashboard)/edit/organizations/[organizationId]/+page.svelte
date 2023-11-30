<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import TranslationsInput from '$lib/components/TranslationsInput.svelte';
	import { superForm } from '$lib/forms/super-form';

	export let data;

	const {
		form,
		tainted,
		enhance,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, { dataType: 'json' });

	const t = $langKey(m.login());
</script>

<DashboardForm action="?/update" {enhance} {submitter} {tainted}>
	<svelte:fragment slot="header">
		<h1 class="heading lg">
			<LangKey>{m.org_general()}</LangKey>
		</h1>
		<p class="prose dim">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dolorem, obcaecati error
			natus harum at iste dicta doloremque rerum repudiandae, eaque aut nam debitis quia eius
			aliquam modi inventore. Mollitia, quo qui vero dolorem explicabo temporibus dolor quibusdam
			cumque corporis aliquid ab ducimus a ut perspiciatis quam autem deserunt doloremque.
		</p>
	</svelte:fragment>
	<DashboardFormSection title={$langKey(m.org_name())}>
		<TranslationsInput let:lang>
			<input type="text" class="input title" bind:value={$form.translations[lang].name} />
		</TranslationsInput>
	</DashboardFormSection>
	<DashboardFormSection title={$langKey(m.summary())}>
		<TranslationsInput let:lang>
			<textarea rows="5" class="input resize" bind:value={$form.translations[lang].summary} />
		</TranslationsInput>
	</DashboardFormSection>
	<DashboardFormSection title={$langKey(m.description())}>
		<TranslationsInput let:lang>
			<textarea rows="10" class="input resize" bind:value={$form.translations[lang].description} />
		</TranslationsInput>
	</DashboardFormSection>
	<DashboardFormSection>
		<select class="button" bind:value={$form.typeId}>
			{#each data.descriptors.types as type}
				<option value={type.id}>{type.title}</option>
			{/each}
		</select>
	</DashboardFormSection>
</DashboardForm>

<style lang="postcss">
	.prose {
		max-width: 65ch;
	}
</style>
