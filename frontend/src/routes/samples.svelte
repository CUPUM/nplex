<!-- <script lang="ts" context="module">
</script>

<script lang="ts">
	import type { SampleParams } from '$components/_samples/Sample.svelte';
	import Sample from '$components/_samples/Sample.svelte';
	import Button, { buttonIconPositions, buttonVariants, buttonSizes } from '$components/primitives/Button.svelte';
	import Checkbox, { checkboxKinds } from '$components/primitives/Checkbox.svelte';
	import Loading from '$components/primitives/Loading.svelte';

	const samples: SampleParams[] = [
		{
			name: 'Button',
			comp: Button,
			props: {
				kind: buttonVariants,
				size: buttonSizes,
				slot: 'text',
				href: 'href',
				icon: 'icon',
				iconPosition: buttonIconPositions,
			},
		},
		{
			name: 'Checkbox',
			comp: Checkbox,
			props: {
				kind: checkboxKinds,
				slot: 'text',
			},
		},
		{
			name: 'Loading',
			comp: Loading,
			props: {
				logo: 'boolean',
			},
		},
	];

	let current = samples[0];
</script>

<div>
	<ul>
		{#each samples as sample}
			<li class:current={sample === current} on:click={() => (current = sample)}>
				{sample.name}
			</li>
		{/each}
	</ul>
	{#key current}
		<Sample params={current} />
	{/key}
</div>

<style lang="postcss">
	div {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: stretch;
	}

	ul {
		display: inline-flex;
		gap: 3px;
		flex-direction: column;
		font-size: var(--size-small);
		font-weight: 400;
		margin: 1em;
		padding: 3px;
		border-radius: 1.2em;
		overflow-y: auto;
		overflow-x: hidden;
		width: 250px;
		background-color: var(--color-light-300);
	}

	li {
		cursor: pointer;
		display: block;
		padding: 1em;
		margin: 0;
		border-radius: 1em;
		transition: all 0.15s ease-out;

		&:not(.current):hover {
			background-color: var(--color-light-700);
		}
	}

	.current {
		cursor: default;
		pointer-events: none;
		color: var(--color-dark-900);
		background-color: var(--color-light-900);
	}
</style> -->
