<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Range from '$components/Range.svelte';
	import RangeGroup from '$components/RangeGroup.svelte';
	import RangeThumb from '$components/RangeThumb.svelte';
	import Switch from '$components/Switch.svelte';
	import SwitchItem from '$components/SwitchItem.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Token from '$components/Token.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';
	import { formid } from './common';

	export let data: PageData;
	export let form: ActionData;

	$: types = data.descriptors.types.find((t) => t.id === data.project.type_id)?.works ?? [];
</script>

<form
	id={formid}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<fieldset>
		<legend>Type de projet </legend>
		<section>
			<Switch bind:group={data.project.type_id} name="type_id">
				{#each data.descriptors.types as d}
					<SwitchItem value={d.id}>
						{d.title}
					</SwitchItem>
				{/each}
			</Switch>
		</section>
	</fieldset>
	<hr />
	<fieldset class="works">
		<header>
			<h3>Travaux</h3>
			<Field type="search">
				<FieldIcon name="search" slot="leading" />
			</Field>
		</header>
		{#if data.project.type_id}
			<ul>
				{#each types as w, i (w.id)}
					<li
						animate:flip={{ delay: i * 20, duration: 150 }}
						transition:scale|local={{ delay: i * 20 }}
					>
						<Token>
							{w.title}
							<input
								type="checkbox"
								name="work_id"
								bind:group={data.project.work_ids}
								value={w.id}
							/>
						</Token>
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
		<Range min={0} max={500000} step={1}>
			<RangeGroup bind:from={data.project.cost_range[0]} bind:to={data.project.cost_range[1]} />
			<RangeThumb name="cost_range_min" bind:value={data.project.cost_range[0]} />
			<RangeThumb name="cost_range_max" bind:value={data.project.cost_range[1]} />
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
		display: flex;
		align-items: stretch;
		flex-direction: column;
		margin: 0 auto;
	}

	fieldset {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: var(--ui-gutter);
	}

	legend {
		position: sticky;
		top: var(--ui-nav-px);
		flex: 1;
		float: left; // Required to clear outset by vendor styling.
		appearance: none;
		font-size: var(--ui-text-lg);
		font-weight: 550;
	}

	section {
		flex: 2;
	}
</style>
