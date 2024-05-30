<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';

	const data = [
		{ name: 'Default', class: '' },
		{ name: 'Bordered', class: 'toggle-bordered' },
	];
</script>

<Variants title="Toggle" {data}>
	{#snippet children(datum)}
		<label class="toggle {datum.class}"><input type="checkbox" name="" id="" /></label>
	{/snippet}
</Variants>
