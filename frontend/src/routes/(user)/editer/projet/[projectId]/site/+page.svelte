<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { EDITOR_FORM_ID } from '../common';
	import type { PageData } from './$types';
	import { INPUT_NAMES } from './common';
	import SiteLocation from './SiteLocation.svelte';

	export let data: PageData;

	function usages(category: number | null) {
		if (category === null) {
			return [];
		}
		return data.descriptors.siteUsages.filter((u) => u.category_ids.includes(category));
	}
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
	<header>
		<h2>Détails du site</h2>
	</header>
	<fieldset class="ownership">
		<h3>Propriété du lieu</h3>
		<ul>
			{#each data.descriptors.siteOwnerships as ownership}
				<li>
					<label>
						<span>{ownership.title}</span>
						<input
							type="radio"
							name={INPUT_NAMES.OWNERSHIP}
							value={ownership.id}
							bind:group={data.project.site_ownership_id}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</fieldset>
	<article>
		<section class="map">
			<SiteLocation project={data.project} />
		</section>
		<fieldset class="fields">
			<h3>Situez votre projet</h3>
			<!-- Add input here instead of in SiteLocation -->
		</fieldset>
		<fieldset class="fields">
			<h3>Superficie du terrain</h3>
			<p>
				Note: Vous pouvez utiliser la règle sur la carte pour vous aider à évaluer la superficie du
				lieu.
			</p>
			<input
				type="number"
				name={INPUT_NAMES.AREA}
				placeholder="Superficie"
				bind:value={data.project.site_area}
			/>m<sup>2</sup>
			<input type="range" min="1" max="1000" step="1" bind:value={data.project.site_area} />
		</fieldset>
		<fieldset class="fields">
			<h3>Usage principal</h3>
			<fieldset>
				<h4>Catégorie</h4>
				<select
					name={INPUT_NAMES.MAIN_USAGE_CATEGORY}
					bind:value={data.project.site_usage_category_id}
				>
					{#each data.descriptors.siteUsagesCategories as uc}
						<option value={uc.id}>{uc.title}</option>
					{/each}
				</select>
				<h4>Usage principal</h4>
				{#if typeof data.project.site_usage_category_id === 'number'}
					<select
						placeholder="Usage principal"
						name={INPUT_NAMES.MAIN_USAGE}
						bind:value={data.project.site_usage_id}
					>
						{#each usages(data.project.site_usage_category_id) as u}
							<option value={u.id}>{u.title}</option>
						{/each}
					</select>
				{/if}
			</fieldset>
			<fieldset class="fields">
				<h3>Usage(s) secondaire(s)</h3>
			</fieldset>
			<fieldset>
				<h3>Rues/ruelles adjacentes</h3>
				<input
					type="number"
					name="adjacent_streets"
					bind:value={data.project.adjacent_streets}
					placeholder="Nombre de rue(s) ou de ruelle(s) bordant le site"
					id=""
				/>
			</fieldset>
		</fieldset>
	</article>
</form>

<style lang="scss">
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--ui-gutter);
		padding: var(--ui-gutter);
	}

	.ownership {
		border-radius: var(--ui-block-radius);
		background: red;
	}

	article {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--ui-gutter);
		flex-direction: row;
	}

	.map {
		--top: calc(var(--navbar-height-px) + var(--ui-gutter));
		position: sticky;
		top: var(--top);
		height: calc(100vh - var(--top) - var(--ui-gutter));
		border-radius: var(--ui-block-radius);
		grid-row: 1 / -1;
		grid-column: 1;
	}

	.fields {
		padding: 2rem;
		border-radius: var(--ui-block-radius);
		background: col(bg, 900);
		grid-column: 2;
	}
</style>
