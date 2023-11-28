<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormField from '$lib/components/DashboardFormSection.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import LocaleInput from '$lib/components/LocaleInput.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { langKey } from '$lib/i18n/translate';

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
	<DashboardFormField title={$langKey(m.org_name())}>
		<LocaleInput let:locale>
			<input type="text" class="input title" bind:value={$form.translations[locale].name} />
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField title={$langKey(m.summary())}>
		<LocaleInput let:locale>
			<textarea rows="5" class="input resize" bind:value={$form.translations[locale].summary} />
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField title={$langKey(m.description())}>
		<LocaleInput let:locale>
			<textarea
				rows="10"
				class="input resize"
				bind:value={$form.translations[locale].description}
			/>
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField>
		<select class="button" bind:value={$form.typeId}>
			{#each data.descriptors.types as type}
				<option value={type.id}>{type.title}</option>
			{/each}
		</select>
	</DashboardFormField>
</DashboardForm>

<style lang="postcss">
	.prose {
		max-width: 65ch;
	}
</style>
