<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorsCardsList from '$lib/components/DescriptorsCardsList.svelte';
	import DescriptorsForm from '$lib/components/DescriptorsForm.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { melt } from '@melt-ui/svelte';
	import { Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

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
		<h2 class="heading lg">
			<LangKey>{m.project_descriptors_levelTypes()}</LangKey>
		</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</svelte:fragment>
	<DescriptorsCardsList>
		{#each $form.buildingLevelTypes as levelType, i (levelType.id)}
			<li
				in:fly|global={{ y: -6, delay: i * 25, easing: expoOut, duration: 350 }}
				out:scale={{ start: 0.95, duration: 250, easing: expoOut }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={levelType.id}
					legendMinimized={levelType.translations[$page.data.lang].title}
					deleteFormaction="?/delete&levelTypeId={levelType.id}"
					let:lang
				>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.title()}</LangKey>
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.buildingLevelTypes[i].translations[lang].title}
						/>
					</label>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.description()}</LangKey>
						</span>
						<textarea
							class="input"
							bind:value={$form.buildingLevelTypes[i].translations[lang].description}
						/>
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
	<DashboardMenu {tainted} {submitter}>
		<button
			class="button outlined"
			use:melt={$formaction(`?/create&verticalIndex=${$form.buildingLevelTypes.length}`)}
			type="submit"
		>
			<Plus class="button-icon" />
			<LangKey>{m.project_descriptors_createLevelType()}</LangKey>
		</button>
	</DashboardMenu>
</DescriptorsForm>

<style lang="postcss">
</style>
