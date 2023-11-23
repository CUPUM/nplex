<script lang="ts">
	import { page } from '$app/stores';
	import DashboardMenu from '$lib/components/DashboardFormMenu.svelte';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { tt } from '$lib/i18n/translations';
	import { melt } from '@melt-ui/svelte';
	import { Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			...tt.fr.editor.client,
			heading: 'Types de propriétaire de site',
			entity: 'type de propriétaire',
		},
		en: {
			...tt.en.editor.client,
			heading: 'Project site ownership',
			entity: 'project site ownership',
		},
	});

	export let data;

	const {
		form,
		enhance,
		submitting,
		constraints,
		tainted,
		loadable: {
			submitter: { root: submitter },
			formaction: { root: formaction },
		},
	} = superForm(data.form, {
		dataType: 'json',
	});
</script>

<DescriptorsForm action="?/update" {enhance}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">{$t.heading}</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</svelte:fragment>
	<DescriptorsCardsList>
		{#each $form.siteOwnerships as ownership, i (ownership.id)}
			<li
				in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}
				out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={ownership.id}
					legendMinimized={ownership.translations[$page.data.locale].title}
					deleteFormaction="?/delete&siteOwnershipId={ownership.id}"
					let:locale
				>
					<label class="labeled-group">
						<span class="label with-hover">
							{$t.title}
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.siteOwnerships[i].translations[locale].title}
						/>
					</label>
					<label class="labeled-group">
						<span class="label with-hover">
							{$t.description}
						</span>
						<textarea
							class="input"
							bind:value={$form.siteOwnerships[i].translations[locale].description}
						/>
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu {tainted} {submitter}>
		<button class="button outlined" use:melt={$formaction('?/create')} type="submit">
			<Plus class="button-icon" />
			{$t.create($t.entity)}
		</button>
	</DashboardMenu>
</DescriptorsForm>

<style lang="postcss">
</style>
