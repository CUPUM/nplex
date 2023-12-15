<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import ButtonSaveAll from '$lib/components/ButtonSaveAll.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { switchCrossfade } from '$lib/motion/presets.js';

	export let data;

	const {
		form,
		enhance,
		tainted,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null,
	});

	const [send, receive] = switchCrossfade;
</script>

<form use:enhance action="?/update" class="dashboard-section" method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				<LangKey>
					{m.project_exemplarity_indicators()}
				</LangKey>
			</h2>
			<p class="dim">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam facilis ipsum
				pariatur voluptas placeat veniam quod. Voluptates, pariatur nemo. Voluptas voluptates
				molestias molestiae quia at voluptate, doloribus neque quasi obcaecati inventore. Cum, sunt
				aliquam? Animi dicta debitis, atque laboriosam asperiores accusamus aut repellat ratione
				officia eaque dignissimos omnis rem.
			</p>
		</hgroup>
	</header>
	{#each data.categorizedIndicators as category, i (category.id)}
		<section class="dashboard-subsection">
			<legend class="dashboard-subsection-header">
				<LangKey>{category.title}</LangKey>
			</legend>
			<div class="dashboard-subsection-content">
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
			</div>
		</section>
	{/each}
	<menu class="dashboard-section-menu">
		{#if $tainted}
			<ButtonSaveAll {submitter} />
		{/if}
	</menu>
</form>

<style lang="postcss">
	@import '../../../../dashboard.css';

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
