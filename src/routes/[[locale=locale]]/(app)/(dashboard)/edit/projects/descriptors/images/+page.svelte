<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { melt } from '@melt-ui/svelte';
	import { Pen } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	export let data;

	const {
		enhance: typesEnhance,
		form: typesForm,
		errors: typesErrors,
		tainted: typesTainted,
		loadable: {
			submitter: { root: typesSubmitter },
			formaction: { root: typesFormaction },
		},
	} = superForm(data.imageTypesForm, { dataType: 'json' });

	const {
		enhance: temporalitiesEnhance,
		form: temporalitiesForm,
		errors: temporalitiesErrors,
		tainted: temporalitiesTainted,
		loadable: {
			submitter: { root: temporalitiesSubmitter },
			formaction: { root: temporalitiesFormaction },
		},
	} = superForm(data.imageTemporalitiesForm, { dataType: 'json' });
</script>

<DescriptorsForm enhance={typesEnhance}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">
			<LangKey>{m.project_descriptors_imageTypes()}</LangKey>
		</h2>
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
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.title()}</LangKey>
						</span>
						<input type="text" class="input" bind:value={type.translations[locale].title} />
					</label>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.description()}</LangKey>
						</span>
						<textarea class="input" bind:value={type.translations[locale].description} />
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu tainted={typesTainted} submitter={typesSubmitter}>
		<button class="button outlined" use:melt={$typesFormaction('?/createImageType')} type="submit">
			<Pen class="button-icon" />
			<LangKey>{m.project_descriptors_createImageType()}</LangKey>
		</button>
	</DashboardMenu>
</DescriptorsForm>
<DescriptorsForm enhance={temporalitiesEnhance}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">
			<LangKey>{m.project_descriptors_imageTemporalities()}</LangKey>
		</h2>
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
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.title()}</LangKey>
						</span>
						<input type="text" class="input" bind:value={temporality.translations[locale].title} />
					</label>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.description()}</LangKey>
						</span>
						<textarea class="input" bind:value={temporality.translations[locale].description} />
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu tainted={temporalitiesTainted} submitter={temporalitiesSubmitter}>
		<button
			class="button outlined"
			use:melt={$temporalitiesFormaction('?/createImageType')}
			type="submit"
		>
			<Pen class="button-icon" />
			<LangKey>{m.project_descriptors_createImageTemporality()}</LangKey>
		</button>
	</DashboardMenu>
</DescriptorsForm>

<style lang="postcss">
</style>
