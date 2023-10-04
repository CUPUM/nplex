<script lang="ts">
	import { page } from '$app/stores';
	import { createLoading } from '$lib/actions/loading';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import TranslationsCard from '$lib/components/TranslationsCard.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { crossfade, fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			heading: 'Types de projet',
			save: 'Enregistrer',
			create: 'Ajouter un type de projet',
			title: 'Titre',
			description: 'Description',
		},
		en: {
			heading: 'Project types',
			save: 'Save',
			create: 'Create a new project type',
			title: 'Title',
			description: 'Description',
		},
	});

	export let data;

	const { form, enhance, submitting, constraints, tainted } = superForm(data.form, {
		dataType: 'json',
	});

	const {
		action: updatingAction,
		state: updatingState,
		element: updatingElement,
	} = createLoading({
		state: submitting,
	});

	const [sendType, receiveType] = crossfade({
		duration: 150,
		easing: expoOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 150, easing: cubicOut });
		},
	});
</script>

<form action="?/update" use:enhance method="POST">
	<header>
		<h2 class="heading lg">{$t.heading}</h2>
		<p class="prose md dimmer">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur magni quo accusantium
			perferendis quis, minus iste commodi error nostrum tempora?
		</p>
	</header>
	<ul>
		{#each $form.types as type, i (type.id)}
			<li
				in:receiveType={{ key: type.id }}
				out:sendType={{ key: type.id }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsCard
					legend={type.id}
					minimized={false}
					legendMinimized={type.translations[$page.data.locale].title}
					deleteFormaction="?/delete&typeId={type.id}"
					let:locale
				>
					<label class="labeled-input">
						<span class="input-label">
							{$t.title}
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.types[i].translations[locale].title}
						/>
					</label>
					<label class="labeled-input">
						<span class="input-label">
							{$t.description}
						</span>
						<textarea class="input" bind:value={$form.types[i].translations[locale].description} />
					</label>
				</TranslationsCard>
			</li>
		{/each}
	</ul>
	<DashboardMenu>
		<button
			class="button outlined"
			{...updatingElement}
			use:updatingAction
			type="submit"
			formaction="?/create"
		>
			<Plus class="button-icon" />
			{$t.create}
		</button>
		{#if $tainted}
			<button class="button cta" in:fly={{ y: 6 }} {...updatingElement} use:updatingAction>
				<Check class="button-icon" />
				{$t.save}
			</button>
		{/if}
	</DashboardMenu>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		container-type: inline-size;
	}

	header {
		padding: 1rem 2rem;
		padding-top: 0;
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		max-width: var(--width-md);
		padding: 1rem;
		gap: 1rem;
		width: 100%;

		@container (width > 1000px) {
			align-self: center;
			margin-right: var(--dashboard-sidebar-width);
		}
	}
</style>
