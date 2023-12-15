<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorsCardsList from '$lib/components/DashboardDescriptorsList.svelte';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { superForm } from '$lib/forms/super-form';
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
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		dataType: 'json',
	});
</script>

<DashboardForm action="?/update" {enhance} {submitter} {tainted}>
	<svellte:fragment slot="header">
		<h2 class="heading lg">
			<LangKey>{m.org_types()}</LangKey>
		</h2>
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
					legendMinimized={type.translations[$page.data.lang].title}
					deleteFormaction="?/delete&typeId={type.id}"
					let:lang
				>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.title()}</LangKey>
						</span>
						<input class="input" type="text" bind:value={$form.types[i].translations[lang].title} />
					</label>
					<label class="label-group">
						<span class="label with-hover">
							<LangKey>{m.description()}</LangKey>
						</span>
						<textarea
							class="input resize"
							bind:value={$form.types[i].translations[lang].description}
						/>
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</DescriptorsCardsList>
</DashboardForm>

<style lang="postcss">
</style>
