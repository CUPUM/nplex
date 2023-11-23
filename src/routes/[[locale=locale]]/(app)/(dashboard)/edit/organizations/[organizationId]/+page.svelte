<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardMenu from '$lib/components/DashboardFormMenu.svelte';
	import DashboardFormField from '$lib/components/DashboardFormSection.svelte';
	import LocaleInput from '$lib/components/LocaleInput.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Information générale',
			name: 'Nom d’organisation',
			summary: 'Sommaire',
			description: 'Description',
			type: 'Type d’organisation',
		},
		en: {
			heading: 'General information',
			name: 'Organization name',
			summary: 'Summary',
			description: 'Description',
			type: 'Organization type',
		},
	});

	export let data;

	const {
		form,
		tainted,
		enhance,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, { dataType: 'json' });
</script>

<DashboardForm action="?/update" {enhance}>
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.heading}</h1>
		<p class="prose dim">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dolorem, obcaecati error
			natus harum at iste dicta doloremque rerum repudiandae, eaque aut nam debitis quia eius
			aliquam modi inventore. Mollitia, quo qui vero dolorem explicabo temporibus dolor quibusdam
			cumque corporis aliquid ab ducimus a ut perspiciatis quam autem deserunt doloremque.
		</p>
	</svelte:fragment>
	<DashboardFormField title={$t.name} centered>
		<LocaleInput let:locale>
			<input type="text" class="input title" bind:value={$form.translations[locale].name} />
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField title={$t.summary} centered>
		<LocaleInput let:locale>
			<textarea rows="5" class="input resize" bind:value={$form.translations[locale].summary} />
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField title={$t.description} centered>
		<LocaleInput let:locale>
			<textarea
				rows="10"
				class="input resize"
				bind:value={$form.translations[locale].description}
			/>
		</LocaleInput>
	</DashboardFormField>
	<DashboardFormField centered>
		<select class="button" bind:value={$form.typeId}>
			{#each data.descriptors.types as type}
				<option value={type.id}>{type.title}</option>
			{/each}
		</select>
	</DashboardFormField>
	<DashboardMenu {submitter} {tainted}></DashboardMenu>
</DashboardForm>

<style lang="postcss">
	.prose {
		max-width: 65ch;
	}
</style>
