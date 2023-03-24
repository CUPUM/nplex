<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldButtonReset from '$components/Field/FieldButtonReset.svelte';
	import Icon from '$components/Icon.svelte';
	import { PUBLIC_GEOAPIFY_KEY } from '$env/static/public';
	import { KEY } from '$utils/enums';
	import { throttle } from '$utils/modifiers';
	import { THEME_PALETTES } from '$utils/themes';
	import { Marker } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';
	import { getMapContext } from './Map.svelte';

	type $$Props = ComponentProps<Field<string>>;

	export let value: string;

	const { getMap } = getMapContext();

	const map = getMap();

	let marker = new Marker({
		draggable: false,
		scale: 0.75,
		color: THEME_PALETTES.dark.secondary[100],
	});

	const search = throttle(async () => {
		try {
			const map = getMap();
			const res = await fetch(
				'https://api.geoapify.com/v1/geocode/search?text=' +
					value +
					'&format=json' +
					'&bias=rect:' +
					map
						.getBounds()
						.toArray()
						.map((c) => c.join(','))
						.join(',') +
					'&apiKey=' +
					PUBLIC_GEOAPIFY_KEY
			);
			const json = await res.json();
			console.log(json);
			if (json.results.length) {
				const coords = [json.results[0].lon, json.results[0].lat] as [number, number];
				marker.setLngLat(coords);
				marker.addTo(map);
				// To do: Add marker pulse and keyboard marker delete?
				map.flyTo({ center: coords, zoom: 15 });
			}
		} catch (err) {
			console.log(err);
		}
	}, 1000);

	function clear() {
		marker.remove();
	}
</script>

<div class="map-search">
	<Field
		type="search"
		{...$$restProps}
		bind:value
		on:keydown={(e) => {
			if (e.key === KEY.Enter) {
				e.preventDefault();
				search();
			}
		}}
		variant="opaque"
	>
		<svelte:fragment slot="leading">
			<Button type="button" equi disabled={!value} on:click={search}>
				<Icon name="search" />
			</Button>
		</svelte:fragment>
		<svelte:fragment slot="trailing">
			<FieldButtonReset on:click={clear} />
		</svelte:fragment>
	</Field>
</div>

<style lang="scss">
	.map-search {
		width: 300px;
		opacity: 0.35;
		transform: scale(0.98);
		transition: all 0.25s var(--ui-ease-out);

		:global(figure:hover) &,
		&:focus-within {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
