<script lang="ts">
	import { dev } from '$app/environment';
	import { ripple } from '$lib/actions/ripple';
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
			taintedMessage: null,
		}
	);

	const t = createTranslations({
		fr: {
			heading: 'Information générale',
			title: 'Titre',
			summary: 'Sommaire',
			description: 'Description',
			type: 'Type de projet',
			interventions: 'Interventions',
			costRange: 'Fourchette de coûts',
			ownership: 'Type de propriétaire',
		},
		en: {
			heading: 'General information',
			title: 'Title',
			summary: 'Summary',
			description: 'Description',
			type: 'Project type',
			interventions: 'Interventions',
			costRange: 'Cost range',
			ownership: 'Ownership',
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
	</ProjectFormGroup>
	<ProjectFormGroup centered>
		<h3 class="label">
			{$t.type}
		</h3>
		<fieldset class="switch" use:ripple>
			{#each data.descriptors.types as pt}
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
		</fieldset>
		{#if dev}
			<h3>{$t.interventions}</h3>
			<fieldset>
				{#each data.descriptors.interventionCategories as category, i (category.id)}
					<h4>{category.title}</h4>
					<ul>
						{#if category.interventions}
							{#each category.interventions as intervention}
								<label class="token" use:ripple>
									<input
										type="checkbox"
										class="token-input"
										value={intervention.id}
										bind:group={$form.interventionIds}
									/>
									<span class="token-label">
										{intervention.title}
									</span>
								</label>
							{/each}
						{/if}
					</ul>
				{/each}
			</fieldset>
		{/if}
	</ProjectFormGroup>
	<ProjectFormGroup centered>
		<h3>{$t.costRange}</h3>
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
	</ProjectFormGroup>
	<ProjectFormGroup centered>
		<h3>{$t.ownership}</h3>
		<select bind:value={$form.siteOwnershipId} class="input">
			{#each data.descriptors.siteOwnerships as ownership}
				<option value={ownership.id}>{ownership.title}</option>
			{/each}
		</select>
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

	#cost {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
