<!--
	@component
	Lazyload a component to reduce first render delay. Use sparingly as it can hinder tree-shaking and optimization.
	
-->
<script lang="ts">
	export let cue = false;
	export let useViewport = false;
	let getComponent: () => Promise<{ default: C }>;
	export { getComponent as this };

	type C = $$Generic;

	let component: C;
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
		<div class="ui-skeleton-fill" />
	</slot>
{/if}

<style lang="scss">
</style>
