<!--
	@component
	Lazyload a component to reduce first render delay. Use sparingly as it can hinder tree-shaking and optimization.
	
-->
<script lang="ts">
	import type { Newable } from 'ts-essentials';
	import Loading from './Loading.svelte';

	export let cue = false;
	export let useViewport = false;
	let getComponent: () => Promise<{ default: C }>;
	export { getComponent as this };

	type C = $$Generic;

	let component: Newable<C>;
	let error: any;

	async function load() {
		getComponent().then(
			(res) => {
				component = res.default as any;
			},
			(rej) => {
				throw new Error('Une erreur est survenue en tentant de charger la composante.');
				error = rej;
			}
		);
	}

	$: if (cue) {
		load();
	}
</script>

{#if component}
	<slot {component} />
{:else}
	<slot name="loading">
		<Loading />
	</slot>
{/if}

<style lang="scss">
</style>
