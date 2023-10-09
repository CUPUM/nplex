<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { switchCrossfade } from '$lib/transitions/crossfades';
	import { Save } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import ProjectForm from '../ProjectForm.svelte';
	import ProjectFormGroup from '../ProjectFormGroup.svelte';
	import { projectT } from '../translations';

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
			heading: 'Indicateurs d’exemplarité',
		},
		en: {
			heading: 'Exemplarity indicators',
		},
	});

	const [send, receive] = switchCrossfade;
</script>

<ProjectForm {enhance} let:element let:loading action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.heading}</h1>
		<p class="prose dim subhead">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam facilis ipsum pariatur
			voluptas placeat veniam quod. Voluptates, pariatur nemo. Voluptas voluptates molestias
			molestiae quia at voluptate, doloribus neque quasi obcaecati inventore. Cum, sunt aliquam?
			Animi dicta debitis, atque laboriosam asperiores accusamus aut repellat ratione officia eaque
			dignissimos omnis rem.
		</p>
	</svelte:fragment>
	<ProjectFormGroup>
		{#each data.descriptors.exemplarityCategories as category, i (category.id)}
			<h4 class="prose sm dim">{category.title}</h4>
			<ul id="interventions">
				{#if category.indicators}
					{#each category.indicators as indicator}
						<label class="token" use:ripple>
							<input
								type="checkbox"
								class="token-input"
								bind:group={$form.indicatorIds}
								value={indicator.id}
							/>
							<span class="token-label">
								{indicator.title}
							</span>
						</label>
					{/each}
				{/if}
			</ul>
		{/each}
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

	#interventions {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		font-size: var(--size-sm);
		flex-wrap: wrap;
	}

	#cost {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
