<script context="module" lang="ts">
	export type ComponentSample = {
		name: string;
		constructor: any;
		variants: {
			key: string;
			values: string[];
			variants?: ComponentSample;
		};
	};
</script>

<script lang="ts">
	export let comp: ComponentSample;
</script>

{#each comp.variants.values as variant}
	{#if comp.variants.variants}
		<svelte:self comp={{ ...comp, variants: comp.variants.variants }} />
	{:else}
		<svelte:component this={comp.constructor} />
	{/if}
{/each}
