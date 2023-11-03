<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormGroup from '$lib/components/DashboardFormSection.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import TranslationsField from '$lib/components/TranslationsField.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Save } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { dt } from '../../translations';

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

	const { form, tainted, enhance } = superForm(data.form, { dataType: 'json' });
</script>

<DashboardForm action="?/update" {enhance} let:element let:loading>
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.heading}</h1>
		<p class="prose dim">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dolorem, obcaecati error
			natus harum at iste dicta doloremque rerum repudiandae, eaque aut nam debitis quia eius
			aliquam modi inventore. Mollitia, quo qui vero dolorem explicabo temporibus dolor quibusdam
			cumque corporis aliquid ab ducimus a ut perspiciatis quam autem deserunt doloremque.
		</p>
	</svelte:fragment>
	<DashboardFormGroup>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.name}</svelte:fragment>
			<input type="text" class="input title" bind:value={$form.translations[locale].name} />
		</TranslationsField>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.summary}</svelte:fragment>
			<textarea rows="5" class="input resize" bind:value={$form.translations[locale].summary} />
		</TranslationsField>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.description}</svelte:fragment>
			<textarea
				rows="10"
				class="input resize"
				bind:value={$form.translations[locale].description}
			/>
		</TranslationsField>
	</DashboardFormGroup>
	<DashboardFormGroup centered>
		<select class="button" bind:value={$form.typeId}>
			{#each data.descriptors.types as type}
				<option value={type.id}>{type.title}</option>
			{/each}
		</select>
	</DashboardFormGroup>
	<DashboardMenu>
		{#if $tainted}
			<button
				class="button cta"
				type="submit"
				{...element()}
				use:loading
				transition:scale={{ start: 0.95, opacity: 0, easing: expoOut, duration: 150 }}
			>
				<Save class="button-icon" />{$dt.save}
			</button>
		{/if}
	</DashboardMenu>
</DashboardForm>

<style lang="postcss">
	.prose {
		max-width: 65ch;
	}
</style>
