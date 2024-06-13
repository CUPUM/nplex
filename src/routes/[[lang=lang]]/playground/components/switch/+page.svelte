<script lang="ts">
	import Variants from '$lib/components/patterns/variants.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { switchCrossfade } from '$lib/motion/presets';

	const switches = [
		{ name: 'Default', class: '' },
		{ name: 'Bordered', class: 'switch-bordered' },
		{ name: 'Dashed', class: 'switch-dashed' },
		{ name: 'Ghost', class: 'switch-ghost' },
	];

	const options = ['Option 1', 'Option 2', 'Yeehaw'] as const;

	let current = $state(options[0]);

	let toggled = $state(false);
</script>

<Variants title="Switch" data={switches}>
	{#snippet children(datum)}
		{@const key1 = {}}
		{@const key2 = {}}
		<div class="gap-gutter flex flex-col">
			<h1 class="font-bold">{datum.name}</h1>
			<h2>Multi-switch</h2>
			<menu class="switch {datum.class}" use:ripple>
				{#each options as o}
					<label class="switch-item">
						{o}
						{#if o === current}
							<div
								class="switch-thumb"
								in:switchCrossfade.receive={{ key: key1 }}
								out:switchCrossfade.send={{ key: key1 }}
							></div>
						{/if}
						<input type="radio" class="sr-only" value={o} bind:group={current} />
					</label>
				{/each}
			</menu>
			<h2>Toggle switch</h2>
			<label class="switch {datum.class}" use:ripple>
				<span class="switch-item" aria-checked={toggled}>
					On
					{#if toggled}
						<div
							class="switch-thumb"
							in:switchCrossfade.receive={{ key: key2 }}
							out:switchCrossfade.send={{ key: key2 }}
						></div>
					{/if}
				</span>
				<span class="switch-item" aria-checked={!toggled}>
					Off
					{#if !toggled}
						<div
							class="switch-thumb"
							in:switchCrossfade.receive={{ key: key2 }}
							out:switchCrossfade.send={{ key: key2 }}
						></div>
					{/if}
				</span>
				<input type="checkbox" class="sr-only" bind:checked={toggled} />
			</label>
		</div>
	{/snippet}
</Variants>
