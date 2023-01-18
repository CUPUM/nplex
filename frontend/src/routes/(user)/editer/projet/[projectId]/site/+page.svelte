<script lang="ts">
	import { enhance } from '$app/forms';
	import { FORMID } from '../common';
	import type { PageData } from './$types';
	import SiteLocation from './SiteLocation.svelte';

	export let data: PageData;

	function usages(category: number | null) {
		if (category === null) {
			return [];
		}
		const filtered = data.descriptors.siteUsages.filter((u) => {
			u.category_ids.includes(category);
		});
		return filtered;
	}
</script>

<form
	id={FORMID}
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
	<section class="ownership">
		<h3>Propriété du lieu</h3>
		<ul>
			{#each data.descriptors.siteOwnerships as ownership}
				<li>
					<label>
						<span>{ownership.title}</span>
						<input
							type="radio"
							name="site_ownership_id"
							value={ownership.id}
							bind:group={data.project.site_ownership_id}
						/>
					</label>
				</li>
			{/each}
		</ul>
	</section>
	<section class="columns">
		<div class="map">
			<SiteLocation project={data.project} />
		</div>
		<div class="fields">
			<fieldset>
				<h3>Situez votre projet</h3>
				<!-- Add input here instead of in SiteLocation -->
			</fieldset>
			<fieldset>
				<h3>Arrondissement</h3>
				<p>Confirmez dans quel arrondissement se situe le site du projet.</p>
				<ul>
					<li>Choix...</li>
				</ul>
				<h3>Quartier</h3>
				<p>Confirmez dans quel quartier se situe le site du projet.</p>
				<ul>
					<li>Choix...</li>
				</ul>
			</fieldset>
			<fieldset>
				<h3>Superficie du terrain</h3>
				<p>
					Note: Vous pouvez utiliser la règle sur la carte pour vous aider à évaluer la superficie
					du lieu.
				</p>
				<input
					type="number"
					name="site_area"
					placeholder="Superficie"
					bind:value={data.project.site_area}
				/>m<sup>2</sup>
				<input type="range" min="1" max="1000" step="1" bind:value={data.project.site_area} />
			</fieldset>
			<fieldset>
				<h3>Usage principal</h3>
				<fieldset>
					<h4>Catégorie</h4>
					<select name="site_usage_category_id" bind:value={data.project.site_usage_category_id}>
						{#each data.descriptors.siteUsagesCategories as uc}
							<option value={uc.id}>{uc.title}</option>
						{/each}
					</select>
					<h4>Usage principal</h4>
					{#if typeof data.project.site_usage_category_id === 'number'}
						<select
							placeholder="Usage principal"
							name="site_usage_id"
							bind:value={data.project.site_usage_id}
						>
							{#each usages(data.project.site_usage_category_id) as u}
								<option value={u.id}>{u.title}</option>
							{/each}
						</select>
					{/if}
				</fieldset>
				<h3>Usage(s) secondaire(s)</h3>
				<fieldset>
					<p>Ajouter...</p>
				</fieldset>
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
		</div>
	</section>
</form>

<style lang="scss">
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
	}

	.ownership {
	}

	.columns {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		max-width: var(--ui-width-main);
		width: 100%;
		margin: 0 auto;

		> div {
			width: 100%;
			flex: auto;
		}
	}

	.map {
		// --top: var(--ui-nav-px);
		// --bottom: 1.5rem;
		position: sticky;
		// top: var(--top);
		// height: calc(100vh - var(--top) - var(--bottom));
		top: 0;
		height: 100vh;
		padding: 1.5rem;
		border-radius: var(--ui-radius-lg);
	}

	.fields {
		display: flex;
		flex-direction: column;
		border-radius: var(--ui-block-radius);
		gap: 1.5rem;

		> fieldset {
			padding: 2rem;
			min-height: 400px;
			border: 1px solid col(bg, 900);
			border-radius: var(--ui-radius-lg);
		}
	}
</style>
