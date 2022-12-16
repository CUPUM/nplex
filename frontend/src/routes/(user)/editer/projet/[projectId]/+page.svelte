<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
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
>
	<h2>Général</h2>
	<fieldset>
		<Field name="title" bind:value={data.project.title}>
			<svelte:fragment slot="label">Titre du projet</svelte:fragment>
		</Field>
	</fieldset>
	<fieldset>
		<h3>Type de projet</h3>
		<ul>
			{#each data.descriptors.types as d}
				<li>
					<label>
						{d.title}
						<input type="radio" name="type_id" bind:group={data.project.type_id} value={d.id} />
					</label>
				</li>
			{/each}
		</ul>
	</fieldset>
	<fieldset>
		<h3>Travaux</h3>
		<ul>
			{#if data.project.type_id}
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
			{/if}
		</ul>
	</fieldset>
	<fieldset>
		<h3>Fourchette de coûts</h3>
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
		<textarea
			name="description"
			value={data.project.description}
			rows="10"
			placeholder="Décrivez votre projet"
		/>
	</fieldset>
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		max-width: var(--ui-size-xl);
		padding: 2rem;
		margin: 0 auto;
		align-items: flex-start;
	}

	textarea {
		width: 100%;
	}

	h3 {
		padding-bottom: 2rem;
	}

	fieldset {
		width: 100%;
		padding: 2rem 0;
	}
</style>
