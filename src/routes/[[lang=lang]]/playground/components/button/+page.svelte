<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { options } from '../states.svelte';

	const data = [
		{ name: 'Default', class: '' },
		{ name: 'Bordered', class: 'button-bordered' },
		{ name: 'Dashed', class: 'button-dashed' },
		{ name: 'Ghost', class: 'button-ghost' },
		{ name: 'Call to action', class: 'button-cta' },
		{ name: 'Link', class: 'button-link' },
		{ name: 'Nav', class: 'button-nav' },
	];
</script>

<Variants title="Button" {data}>
	{#snippet children(data)}
		<button class="button {data.class} {options.sizeMod}" use:ripple>{data.name}</button>
	{/snippet}
</Variants>
<Variants title="Danger button" {data}>
	{#snippet children(data)}
		<button class="button {data.class} {options.sizeMod}" data-danger use:ripple>
			{data.name}
		</button>
	{/snippet}
</Variants>

<style>
</style>
