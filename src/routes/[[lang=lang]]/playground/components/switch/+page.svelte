<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';

	const switches = [
		{ name: 'Default', class: '' },
		{ name: 'Bordered', class: 'switch-bordered' },
		{ name: 'Dashed', class: 'switch-dashed' },
		{ name: 'Ghost', class: 'switch-ghost' },
	];

	const options = ['Uno', 'Two', 'Trois'] as const;

	let current = $state(options[0]);
</script>

<Variants title="Switch" data={switches}>
	{#snippet children(datum)}
		<menu class="switch">
			{#each options as o}
				<label class="switch-item">
					{o}
					<!-- <input type="checkbox" class="sr-only" bind:checked={current} /> -->
				</label>
			{/each}
		</menu>
	{/snippet}
</Variants>
