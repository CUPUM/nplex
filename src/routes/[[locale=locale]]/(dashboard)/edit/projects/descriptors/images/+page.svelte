<script lang="ts">
	import { page } from '$app/stores';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Pen } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { dt } from '../../../translations';

	const t = createTranslations({
		fr: {
			types: {
				heading: 'Types d’image',
				entity: 'un type d’image',
			},
			temporalities: {
				heading: 'Temporalitées d’image',
				entity: 'une temporalité d’image',
			},
		},
		en: {
			types: {
				heading: 'Image types',
				entity: 'an image type',
			},
			temporalities: {
				heading: 'Image temporalities',
				entity: 'an image temporality',
			},
		},
	});

	export let data;

	const {
		enhance: typesEnhance,
		form: typesForm,
		errors: typesErrors,
		tainted: typesTainted,
	} = superForm(data.imageTypesForm, { dataType: 'json' });

	const {
		enhance: temporalitiesEnhance,
		form: temporalitiesForm,
		errors: temporalitiesErrors,
		tainted: temporalitiesTainted,
	} = superForm(data.imageTemporalitiesForm, { dataType: 'json' });
</script>

<DescriptorsForm enhance={typesEnhance} let:element let:loading>
	<svelte:fragment slot="header">
		<h2 class="heading lg">{$t.types.heading}</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</svelte:fragment>
	<DescriptorsCardsList>
		{#each $typesForm.imageTypes as type, i (type.id)}
			<li
				in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}
				out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={type.id}
					legendMinimized={type.translations[$page.data.locale].title}
					let:locale
					deleteFormaction="?/deleteImageType&imageTypeId={type.id}"
				>
					<label class="labeled-group">
						<span class="label with-hover">{$dt.title}</span>
						<input type="text" class="input" bind:value={type.translations[locale].title} />
					</label>
					<label class="labeled-group">
						<span class="label with-hover">{$dt.description}</span>
						<textarea class="input" bind:value={type.translations[locale].description} />
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu>
		<button class="button outlined" {...element('?/createImageType')} use:loading type="submit">
			<Pen class="button-icon" />
			{$dt.create($t.types.entity)}
		</button>
		{#if $typesTainted}
			<button class="button cta" in:fly={{ y: 6 }} type="submit" {...element()} use:loading>
				<Check class="button-icon" />
				{$dt.save}
			</button>
		{/if}
	</DashboardMenu>
</DescriptorsForm>
<DescriptorsForm enhance={temporalitiesEnhance} let:element let:loading>
	<svelte:fragment slot="header">
		<h2 class="heading lg">{$t.temporalities.heading}</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</svelte:fragment>
	<DescriptorsCardsList>
		{#each $temporalitiesForm.imageTemporalities as temporality, i (temporality.id)}
			<li
				in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}
				out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={temporality.id}
					legendMinimized={temporality.translations[$page.data.locale].title}
					let:locale
					deleteFormaction="?/deleteImageType&imageTypeId={temporality.id}"
				>
					<label class="labeled-group">
						<span class="label with-hover">{$dt.title}</span>
						<input type="text" class="input" bind:value={temporality.translations[locale].title} />
					</label>
					<label class="labeled-group">
						<span class="label with-hover">{$dt.description}</span>
						<textarea class="input" bind:value={temporality.translations[locale].description} />
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu>
		<button class="button outlined" {...element('?/createImageType')} use:loading type="submit">
			<Pen class="button-icon" />
			{$dt.create($t.temporalities.entity)}
		</button>
		{#if $typesTainted}
			<button class="button cta" in:fly={{ y: 6 }} type="submit" {...element()} use:loading>
				<Check class="button-icon" />
				{$dt.save}
			</button>
		{/if}
	</DashboardMenu>
</DescriptorsForm>

<style lang="postcss">
</style>
