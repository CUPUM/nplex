<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { FORM_ID } from './common';
	import Description from './Description.svelte';
	import Title from './Title.svelte';
	import Type from './Type.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if (form) {
		console.log(form);
	}
</script>

<form
	id={FORM_ID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<Title />
	<Description />
	<Type />
	<!-- <Works work_ids={data.project.work_ids} /> -->
	<!-- <CostRange cost_range={data.project.cost_range} /> -->
	<!-- <Gallery gallery={data.project.gallery} /> -->
	<!-- <SiteOwnership ownership_id={data.project.site_ownership_id} /> -->
	<!-- <SiteUsage
		usage_id={data.project.site_usage_id}
		usage_category_id={data.project.site_usage_category_id}
	/> -->
	<!-- <SiteSecondaryUsages secondary_usages={data.project.secondary_usages} /> -->
	<!--
		Map-related formgroups
	-->
	<!-- <section class="split">
		<div class="mapfields">
			<Location location={data.project.location} />
			<Area />
			<District />
			<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
		</div>
		<div class="map">
			<Map cooperativeGestures={true} bind:map={$map} mapStyle={MAP_STYLES.Dark}>
				<MapAttributionControl position="bottom-right" />
				<MapDraw bind:draw={$mapdraw}>
					<ProjectMapToolbar />
					{#if data.project.location.geometry && data.project.location.radius}
						{#key data.project.location}
							<MapDrawCircle
								center={data.project.location.geometry?.coordinates}
								radius={data.project.location.radius}
							/>
						{/key}
					{/if}
				</MapDraw>
			</Map>
		</div>
	</section> -->
	<!-- <fieldset>
		<h2>Détails du bâtiment</h2>
		<fieldset>
			<h3>Mode d'implantation</h3>
			<ul>
				{#each data.descriptors.implantationModes as mode}
					<li>
						<label>
							{mode.title}
							<input
								type="radio"
								name="implantation_mode_id"
								bind:group={data.project.implantation_mode_id}
								value={mode.id}
							/>
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>
		<fieldset>
			<h3>Nombre d'étages</h3>
		</fieldset>
		<fieldset>
			<h3>Année de construction</h3>
		</fieldset>
		<fieldset>
			<h3>Emprise au sol</h3>
		</fieldset>
	</fieldset>
	<fieldset>
		<h2>Processus et déroulement du projet</h2>
		<fieldset>
			<h3>Événements</h3>
		</fieldset>
	</fieldset>
	<fieldset>
		<h3>Indicateurs d'exemplarité</h3>
	</fieldset>
	<Visibility /> -->
</form>

<style lang="scss" module>
	form {
		width: 100%;
		max-width: var(--ui-width-main);
		display: flex;
		align-items: center;
		flex-direction: column;

		:global(.formgroup) {
			display: flex;
			flex-direction: column;
			padding: 3rem;
			width: 100%;
			max-width: var(--ui-width-main);
			gap: 1.5rem;

			@include breakpoint.laptop {
				padding-inline: 1.5rem;
				max-width: var(--ui-width-);
			}
		}

		:global(.formlegend) {
			color: col(primary, 300);
			font-size: var(--ui-text-xl);
			font-weight: 550;
		}

		:global(.formfields) {
		}

		:global(.forminfo) {
			max-width: var(--ui-width-sm);
			color: col(fg, 100, 0.35);
			margin-block: 1rem;
			font-weight: 350;
			font-size: 1rem;
		}
	}

	hr {
		background: col(primary, 100, 0.1);
		width: 100%;

		.split & {
			z-index: -1;
			left: 0;
			position: absolute;
			width: 100vw;
		}
	}

	.split {
		max-width: var(--ui-width-main);
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.map {
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 1;
		height: 100vh;
		border-radius: var(--ui-radius-lg);
		grid-column: 2;
		grid-row: 1;
		justify-self: flex-end;
		padding: 1.5rem;
	}

	.mapfields {
		grid-row: 1;
		grid-column: 1;
		z-index: 1;
		padding-block: 1.5rem;
	}
</style>
