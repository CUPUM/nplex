<script lang="ts">
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import TranslationsField from '$lib/components/TranslationsField.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { switchCrossfade } from '$lib/transitions/crossfades';
	import { Save } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import ProjectForm from './ProjectForm.svelte';
	import ProjectFormGroup from './ProjectFormGroup.svelte';
	import { projectT } from './translations';

	export let data;

	const { form, enhance, constraints, errors, delayed, submitting, tainted } = superForm(
		data.form,
		{
			dataType: 'json',
		}
	);

	const t = createTranslations({
		fr: {
			heading: 'Information générale',
			title: 'Titre',
			summary: 'Sommaire',
			description: 'Description',
			type: 'Type de projet',
			interventions: 'Intervention',
		},
		en: {
			heading: 'General information',
			title: 'Title',
			summary: 'Summary',
			description: 'Description',
			type: 'Project type',
			interventions: 'Intervention',
		},
	});

	const [send, receive] = switchCrossfade;
</script>

<ProjectForm {enhance} let:element let:loading action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.heading}</h1>
		<p class="prose dim subhead">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis accusantium, eius vero
			tenetur voluptatibus ducimus harum itaque praesentium qui cupiditate!
		</p>
	</svelte:fragment>
	<ProjectFormGroup>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.title}</svelte:fragment>
			<input type="text" class="input title" bind:value={$form.translations[locale].title} />
		</TranslationsField>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.summary}</svelte:fragment>
			<textarea rows="5" class="input" bind:value={$form.translations[locale].summary} />
		</TranslationsField>
		<TranslationsField centered let:locale>
			<svelte:fragment slot="legend">{$t.description}</svelte:fragment>
			<textarea rows="10" class="input" bind:value={$form.translations[locale].description} />
		</TranslationsField>
		<section>
			<div>
				{$t.type}
			</div>
			<fieldset class="switch">
				{#each data.descriptors.types as pt}
					<label class="switch-item">
						<input type="radio" name="typeId" bind:group={$form.typeId} value={pt.id} hidden />
						{pt.id}
					</label>
				{/each}
			</fieldset>
		</section>
	</ProjectFormGroup>
	<DashboardMenu>
		{#if $tainted}
			<button
				class="button cta"
				type="submit"
				{...element()}
				use:loading
				transition:scale={{ start: 0.95, opacity: 0, easing: expoOut, duration: 150 }}
			>
				<Save class="button-icon" />{$projectT.save}
			</button>
		{/if}
	</DashboardMenu>
</ProjectForm>

<style lang="postcss">
	.title {
		font-size: var(--size-lg);
	}

	.subhead {
		max-width: 65ch;
	}
</style>
