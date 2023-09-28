<script lang="ts">
	import { createLoading } from '$lib/actions/loading';
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { crossfade, fly, scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	const t = createTranslations({
		fr: {
			save: 'Enregistrer',
			create: 'Ajouter un type de projet',
			title: 'Titre',
			description: 'Description',
		},
		en: {
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
		action: submittingAction,
		state: submittingState,
		element: submittingElement,
	} = createLoading({
		state: submitting,
	});

	$: console.log($submitting);
	$: console.log($submitting);

	const [sendType, receiveType] = crossfade({
		duration: 150,
		easing: expoOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 150, easing: cubicOut });
		},
	});
</script>

<form action="?/update" use:enhance method="POST">
	<ul>
		{#each $form.types as type, i (type.id)}
			<li
				in:receiveType={{ key: type.id }}
				out:sendType={{ key: type.id }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsTabs legend={type.id} deleteFormaction="?/delete&typeId={type.id}" let:locale>
					<label>
						<span>
							{$t.title}
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.types[i].translations[locale].title}
						/>
					</label>
					<label>
						<span>
							{$t.description}
						</span>
						<textarea class="input" bind:value={$form.types[i].translations[locale].description} />
					</label>
				</TranslationsTabs>
			</li>
		{/each}
	</ul>
	<menu>
		<button class="button" type="submit" formaction="?/create">
			<Plus class="button-icon" />
			{$t.create}
		</button>
		{#if $tainted}
			<button class="button cta" in:fly={{ y: 6 }} {...submittingElement} use:submittingAction>
				<Check class="button-icon" />
				{$t.save}
			</button>
		{/if}
	</menu>
</form>

<style lang="scss">
	form {
		align-self: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	ul {
		position: relative;
		display: flex;
		flex-direction: column;
		container-type: inline-size;
		max-width: var(--width-md);
		padding: 3rem 1rem;
		gap: 1rem;
		align-self: center;
		width: 100%;
	}

	li {
	}

	textarea {
		min-height: 6em;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		span {
			font-size: var(--size-xs);
			text-indent: 1em;
			opacity: 0.5;
		}
	}

	menu {
		position: sticky;
		bottom: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		gap: 0.5rem;
		font-size: var(--size-sm);

		.button {
			backdrop-filter: blur(8px);
			// box-shadow: var(--shadow-md);
		}
	}
</style>
