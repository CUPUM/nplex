<script lang="ts">
	import Token from '$components/Token/Token.svelte';
	import {
		CITY_DISTRICT_SOURCES,
		type CityDistrictData,
	} from '$routes/api/geo/[city]/districts.json/common';
	import type { GeoJSONFeature } from 'maplibre-gl';
	import EditorFormgroup from '../../../EditorFormgroup.svelte';

	const districts = fetch(CITY_DISTRICT_SOURCES.montreal, {
		cache: 'force-cache',
		// headers: { 'cache-control': 'max-age=30' },
	})
		.then(async (res) => {
			if (!res.ok) {
				throw new Error('Error while fetching districts data.');
			}
			const json = await res.json();
			// console.log(json);
			return json as CityDistrictData['montreal'];
		})
		.catch((rej) => {
			console.error(rej);
			return null;
		});

	async function getOverlappingDistricts(location: GeoJSONFeature) {
		// return new Promise();
	}
</script>

<EditorFormgroup legend="Arrondissement & quartier">
	<p class="ui-info">
		Sélectionnez confirmez l'arrondissement dans la liste suivante établie en fonction de votre
		localisation du projet:
	</p>
	<ul>
		<!-- {await getOverlappingDistricts()} -->
		<li>
			<Token>Test</Token>
		</li>
	</ul>
</EditorFormgroup>

<style lang="scss">
</style>
