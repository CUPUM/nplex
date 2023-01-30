<script lang="ts">
	import { enhance } from '$app/forms';
	import Map from '$components/Map.svelte';
	import MapAttributionControl from '$components/MapAttributionControl.svelte';
	import MapDraw from '$components/MapDraw.svelte';
	import MapDrawCircle from '$components/MapDrawCircle.svelte';
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import type { ActionData, PageData } from './$types';
	import AdjacentStreets from './AdjacentStreets.svelte';
	import { descriptors, map, mapdraw, _banner_id } from './common';
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import District from './District.svelte';
	import Gallery from './Gallery.svelte';
	import Header from './Header.svelte';
	import Location from './Location.svelte';
	import Menu from './Menu.svelte';
	import ProjectMapToolbar from './ProjectMapToolbar.svelte';
	import SiteOwnership from './SiteOwnership.svelte';
	import SiteSecondaryUsages from './SiteSecondaryUsages.svelte';
	import SiteUsage from './SiteUsage.svelte';
	import Type from './Type.svelte';
	import Visibility from './Visibility.svelte';
	import Works from './Works.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: descriptors.set({ ...data.descriptors });
	$: _banner_id.set(data.project.banner_id);

	$: if (form) {
		console.log(form);
	}
</script>

<form
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
	data-theme={THEMES.dark}
	use:overlapNavbarStyle={{ theme: THEMES.dark, background: col('bg', '300') }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.dark.bg[300] }}
>
	<!--
		One-way data bindings (downward) for reference "clean" data from the db.
		Two-way bindings are done with local variables, or shared stores when necessary.
	-->
	<Header title={data.project.title} />
	<Description description={data.project.description} />
	<hr />
	<Type type_id={data.project.type_id} />
	<hr />
	<Works work_ids={data.project.work_ids} />
	<hr />
	<CostRange cost_range={data.project.cost_range} />
	<hr />
	<Gallery gallery={data.project.gallery} />
	<hr />
	<SiteOwnership ownership_id={data.project.site_ownership_id} />
	<hr />
	<SiteUsage
		usage_id={data.project.site_usage_id}
		usage_category_id={data.project.site_usage_category_id}
	/>
	<SiteSecondaryUsages secondary_usages={data.project.secondary_usages} />
	<hr />
	<!-- Map-related formgroups -->
	<section class="split">
		<div class="mapfields">
			<Location location={data.project.location} />
			<District />
			<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
		</div>
		<div class="map">
			<Map cooperativeGestures={true} bind:map={$map}>
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
	</section>
	<Visibility />
	<Menu />
</form>

<style lang="scss" module>
	form {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		background: col(bg, 300);
		color: col(fg, 100);
		margin-top: calc(-1 * var(--ui-nav-px));
		border-radius: 0 0 var(--ui-radius-xl) var(--ui-radius-xl);

		:global(.formgroup) {
			display: flex;
			flex-direction: column;
			padding: 3rem 1.5rem;
			width: 100%;
			max-width: var(--ui-width-main);
			gap: 1.5rem;
		}

		:global(.formlegend) {
			color: col(primary, 300);
			font-size: var(--ui-text-xl);
			font-weight: 550;
		}

		:global(.formfields) {
		}

		:global(.forminfo) {
			max-width: var(--ui-width-p);
			color: col(fg, 100, 0.35);
			margin-block: 1rem;
			font-weight: 350;
			font-size: 1rem;
		}
	}

	hr {
		background: col(primary, 100, 0.1);
		width: 100%;
	}

	.split {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.map {
		position: sticky;
		width: 100%;
		top: 0;
		height: 100vh;
		border-radius: var(--ui-radius-lg);
		grid-column: 1 / -1;
		grid-row: 1;
		padding: 5rem 3rem;
	}

	.mapfields {
		grid-row: 1;
		grid-column: 1;
		// height: 200vh;
		z-index: 1;
		padding: 1.5rem;
	}
</style>
