<script lang="ts">
	import TranslationsTabs from '$lib/components/TranslationsTabs.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Check, Plus, X } from 'lucide-svelte';
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

	const { form, enhance, submitting, delayed, constraints, tainted } = superForm(data.form, {
		dataType: 'json',
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
	<ul>
		{#each $form.types as type, i (type.id)}
			<li
				in:receiveType={{ key: type.id }}
				out:sendType={{ key: type.id }}
				animate:flip={{ duration: (l) => 150 + l / 10 }}
			>
				<TranslationsTabs let:locale>
					<svelte:fragment slot="legend">
						{type.id}
					</svelte:fragment>
					<svelte:fragment slot="menu">
						<button
							class="button ghost round danger"
							type="submit"
							formaction="?/delete&type_id={type.id}"
						>
							<X class="button-icon" />
						</button>
					</svelte:fragment>
					<label>
						<span>
							{$t.title}
						</span>
						<input
							class="input"
							type="text"
							bind:value={$form.types[i].translations[locale].title}
							name="{type.id}.{locale}.title"
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
			<button class="button cta" in:fly={{ y: 6 }}>
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
		gap: 3rem;
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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		gap: 0.5rem;
		font-size: var(--size-sm);
	}
</style>
