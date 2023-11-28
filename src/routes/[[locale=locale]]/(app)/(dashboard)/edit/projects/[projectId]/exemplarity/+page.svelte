<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { switchCrossfade } from '$lib/transitions/presets';

	export let data;

	const {
		form,
		enhance,
		tainted,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null,
	});

	const [send, receive] = switchCrossfade;
</script>

<DashboardForm {enhance} action="?/update" {tainted} {submitter}>
	<svelte:fragment slot="header">
		<h2>
			<LangKey>
				{m.project_exemplarityIndicators}
			</LangKey>
		</h2>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam facilis ipsum pariatur
			voluptas placeat veniam quod. Voluptates, pariatur nemo. Voluptas voluptates molestias
			molestiae quia at voluptate, doloribus neque quasi obcaecati inventore. Cum, sunt aliquam?
			Animi dicta debitis, atque laboriosam asperiores accusamus aut repellat ratione officia eaque
			dignissimos omnis rem.
		</p>
	</svelte:fragment>
	{#each data.categorizedIndicators as category, i (category.id)}
		<DashboardFormSection title={category.title ?? undefined}>
			<ul id="interventions">
				{#if category.indicators}
					{#each category.indicators as indicator}
						<label class="chip" use:ripple>
							<input
								type="checkbox"
								class="visually-hidden"
								bind:group={$form.indicatorIds}
								value={indicator.id}
							/>
							<span class="chip-label">
								{indicator.title}
							</span>
						</label>
					{/each}
				{/if}
			</ul>
		</DashboardFormSection>
	{/each}
</DashboardForm>

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
