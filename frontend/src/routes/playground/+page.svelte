<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldDropdown from '$components/Field/FieldDropdown.svelte';
	import Icon from '$components/Icon.svelte';
	import Map from '$components/Map/Map.svelte';
	import Token from '$components/Token/Token.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { icons } from '$utils/icons';
	import { writableQuery } from '$utils/store';
	import { Marker } from 'maplibre-gl';
	import type { ComponentProps } from 'svelte';

	const h = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
	const t = ['xl', 'lg', 'md', 'sm', 'xs'];

	const q = writableQuery('Hello', async (v) => {
		return fetch('/playground/data.json', { method: 'GET' }).then(async (res) => res.json());
	});

	// const sq = fetchStore('I donno', (v) => {
	// 	return browserDb.from('projects_images').select('*', { count: 'exact' }).then(res => {
	// 		if (res.error) throw new Error('');
	// 	});
	// 	// .then((res) => {
	// 	// 	if (res.error) throw res.error;
	// 	// 	return res.data;
	// 	// });
	// });

	let icon: ComponentProps<Icon>['name'] = 'alarm';

	let map: maplibregl.Map;

	$: if (map) {
		const marker = new Marker({ draggable: true }).setLngLat([0, 0]).addTo(map);
	}

	function getBox(e: Event) {
		if (e.target instanceof HTMLElement) {
			// console.log(e.target.offsetLeft);
			if (e.target.parentElement instanceof HTMLElement) {
				const parent = e.target.parentElement;
				// console.log(parent.getBoundingClientRect());
				console.dir(parent);
				// console.log(e.target.parentElement.offsetLeft);
			}
		}
	}

	let place: ComponentProps<Tooltip>['place'] = 'top';
	let align: ComponentProps<Tooltip>['align'] = 'center';
</script>

<article>
	<fieldset>
		<select bind:value={place}>
			{#each ['top', 'bottom', 'left', 'right'] as p}
				<option value={p}>{p}</option>
			{/each}
		</select>
		<select bind:value={align}>
			{#each ['start', 'center', 'end', 'stretch'] as a}
				<option value={a}>{a}</option>
			{/each}
		</select>
	</fieldset>
	<Tooltip message="test de message de tooltip" {place} {align} opened>
		<button>Some useless button</button>
	</Tooltip>
	<Tooltip message="test de message de tooltip" {place} {align}>
		<button>Test 2</button>
	</Tooltip>
	<Tooltip message="test de message de tooltip" {place} {align}>
		<button>Test 34</button>
	</Tooltip>
</article>
<article style="flex-direction: row;">
	<select bind:value={icon}>
		{#each Object.keys(icons) as i}
			<option value={i}>{i}</option>
		{/each}
	</select>
	<Icon name={icon} size="3rem" />
</article>
<article id="map-wrapper">
	<Map bind:map />
</article>
<article>
	<Token --token-color="red">Test</Token>
	<Button --button-side-color="red"><Icon name="settings" slot="leading" />Test</Button>
	<FieldDropdown>
		<Field variant="outlined" slot="field">
			<svelte:fragment slot="label">Test label</svelte:fragment>
			<svelte:fragment slot="leading"><Button>Test</Button></svelte:fragment>
		</Field>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
		<li>Test</li>
	</FieldDropdown>
</article>

<style lang="scss">
	article {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		width: 100%;
		padding: var(--ui-gutter-md);
	}

	#map-wrapper {
		height: 500px;
		width: 500px;
	}

	.wrapper {
		display: contents;
	}

	button {
		// position: relative;
		padding: 1em;
		background-color: pink;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		padding: 3rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
		flex-wrap: wrap;
	}
</style>
