<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Range from '$components/Range.svelte';
	import RangeLine from '$components/RangeLine.svelte';
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import TextArea from '$components/TextArea.svelte';
	import type { ActionData, PageData } from './$types';
	import { EDITOR_FORM_ID } from './common';

	export let data: PageData;
	export let form: ActionData;
</script>

<form
	id={EDITOR_FORM_ID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
	on:change={() => console.log('change!')}
>
	<h2>Général</h2>
	<fieldset>
		<Field name="title" bind:value={data.project.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
	</fieldset>
	<fieldset>
		<h3>Type de projet</h3>
		<Switch bind:group={data.project.type_id} name="type_id">
			{#each data.descriptors.types as d}
				<SwitchItem value={d.id}>
					{d.title}
				</SwitchItem>
			{/each}
		</Switch>
	</fieldset>
	<fieldset>
		<h3>Travaux</h3>
		{#if data.project.type_id}
			<ul>
				{#each data.descriptors.types.find((t) => t.id === data.project.type_id)?.works ?? [] as w}
					<li>
						<label>
							{w.title}
							<input
								type="checkbox"
								name="work_id"
								bind:group={data.project.work_ids}
								value={w.id}
							/>
						</label>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="notice">
				<Icon name="info-circle" />
				<p>Sélectionnez d'abord un type de projet.</p>
			</div>
		{/if}
	</fieldset>
	<fieldset>
		<h3>Fourchette de coûts</h3>
		<Range>
			Test
			<RangeLine>
				<!-- <RangeThumb />
				<RangeThumb /> -->
			</RangeLine>
		</Range>
		<label>
			Min
			<input
				type="range"
				min="0"
				max="500000"
				step="1"
				bind:value={data.project.cost_range[0]}
				name="cost_range_min"
				id=""
			/>
		</label>
		<label>
			Max
			<input
				type="range"
				min="0"
				max="500000"
				step="1"
				bind:value={data.project.cost_range[1]}
				name="cost_range_max"
				id=""
			/>
		</label>
		<input type="hidden" name="cost_range" value={JSON.stringify(data.project.cost_range)} />
	</fieldset>
	<fieldset>
		<h3>Description</h3>
		<TextArea
			name="description"
			value={data.project.description}
			placeholder="Décrivez votre projet"
		/>
	</fieldset>
</form>

<style lang="scss" module>
	form {
		width: 100%;
		max-width: var(--ui-width-main);
		padding: var(--ui-gutter);
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		align-items: flex-start;
	}

	h3 {
		padding-bottom: 2rem;
	}

	.notice {
		opacity: 0.5;
		display: flex;
		flex-direction: row;
		gap: 1em;
		align-items: center;
	}

	fieldset {
		width: 100%;
		padding: 2rem 0;
	}
</style>
