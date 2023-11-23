<script lang="ts">
	import { page } from '$app/stores';
	import DashboardMenu from '$lib/components/DashboardFormMenu.svelte';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			heading: 'Types d’organisation',
			entity: 'type d’organisation',
			title: 'Titre',
			description: 'Description',
		},
		en: {
			heading: 'Organization types',
			entity: 'organization type',
			title: 'Titre',
			description: 'Description',
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
		},
	} = superForm(data.form, {
		dataType: 'json',
	});
</script>

<DescriptorsForm action="?/update" {enhance}>
	<svellte:fragment slot="header">
		<h2 class="heading lg">{$t.heading}</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</svellte:fragment>
	<DescriptorsCardsList>
		{#each $form.types as type, i (type.id)}
			<li
				in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}
				out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={type.id}
					legendMinimized={type.translations[$page.data.locale].title}
					deleteFormaction="?/delete&typeId={type.id}"
					let:locale
				>
					<label class="labeled-group">
						<span class="label with-hover">
							{$t.title}
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.types[i].translations[locale].title}
						/>
					</label>
					<label class="labeled-group">
						<span class="label with-hover">
							{$t.description}
						</span>
						<textarea
							class="input resize"
							bind:value={$form.types[i].translations[locale].description}
						/>
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu {submitter} {tainted}></DashboardMenu>
</DescriptorsForm>

<style lang="postcss">
</style>
