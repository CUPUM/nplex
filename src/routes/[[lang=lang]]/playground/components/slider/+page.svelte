<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';

	const data = [
		{
			name: 'Default',
			class: '',
		},
	];
</script>

<Variants title="Slider" {data}>
	{#snippet children(datum)}
		<input type="range" name="" id="" />
	{/snippet}
</Variants>
