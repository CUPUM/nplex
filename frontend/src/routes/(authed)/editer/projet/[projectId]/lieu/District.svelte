<script lang="ts">
	import Token from '$components/Token/Token.svelte';
	import {
		CITY_DISTRICT_SOURCES,
		type CityDistrictData,
	} from '$routes/api/geo/[city]/districts.json/common';
	import type { GeoJSONFeature } from 'maplibre-gl';

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

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Arrondissement et quartier</h3>
	<p class="subtle">
		Confirmez que l'arrondissement et le quartier correspondent sont justement identifiés à partir
		du cercle de localisation.
	</p>
	<!-- {await getOverlappingDistricts()} -->
	<Token>Arrondissement</Token>
	<Token>Quartier</Token>
</fieldset>

<style lang="scss">
</style>
