<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldButtonReset from '$components/Field/FieldButtonReset.svelte';
	import Icon from '$components/Icon.svelte';
	import { PUBLIC_GEOAPIFY_KEY } from '$env/static/public';
	import { KEY } from '$utils/enums';
	import { throttle } from '$utils/modifiers';
	import type { ComponentProps } from 'svelte';
	import { getMapContext } from './Map.svelte';

	type $$Props = ComponentProps<Field<string>>;

	const { getMap } = getMapContext();

	export let value: string;
	export let flyTo: boolean = true;

	let lnglat: [number, number];

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
			if (json.results.length) {
				lnglat = [json.results[0].lon, json.results[0].lat] as [number, number];
				if (flyTo) {
					map.flyTo({ center: lnglat, zoom: 15 });
				}
			}
		} catch (err) {
			console.log(err);
		}
	}, 1000);

	function clear() {
		lnglat = undefined as any;
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

{#if lnglat}
	<slot {lnglat} />
{/if}

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
