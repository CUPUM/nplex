<script lang="ts">
	import {
		CITY_DISTRICT_SOURCES,
		type CityDistrictData,
	} from '$routes/api/geo/[city]/districts.json/common';

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

	// $: overlapping = districts.then(data => {
	// 	if (!data) {
	// 		return []
	// 	}
	// 	const filtered = data.features.filter(f => )
	// });
</script>

<fieldset>
	<legend>Arrondissement & quartier</legend>
	<p>
		Sélectionnez confirmez l'arrondissement dans la liste suivante établie en fonction de votre
		localisation du projet:
	</p>
	<ul>
		<li>
			<label>
				<input type="radio" name="" id="" />
			</label>
		</li>
	</ul>
</fieldset>

<style lang="scss">
</style>
