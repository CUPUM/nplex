<script lang="ts">
	import { ripple } from '$actions/ripple';

	import { getContext, onMount } from 'svelte';
	import type { SwitchSetContext } from './SwitchSet.svelte';

	export let group;
	export let id: string;
	export let value;

	let label: HTMLElement;

	const ctx = getContext<SwitchSetContext>('switchset');
	const current = ctx.current;

	function setCurrent() {
		current.set(label);
	}

	onMount(() => {
		if ((label.querySelector('input[type=radio]') as HTMLInputElement)?.checked) {
			setCurrent();
		}
	});
</script>

<label
	for={id}
	bind:this={label}
	class:current={$current === label}
	style={$$restProps.style}
	on:click
	on:focus
	on:mouseover
	on:mouseleave
	use:ripple
>
	<input
		{id}
		{value}
		name={ctx.name}
		type="radio"
		bind:group
		on:change
		on:input
		on:input={setCurrent}
		{...$$restProps}
	/>
	<slot />
</label>

<style lang="postcss">
	label {
		user-select: none;
		position: relative;
		cursor: pointer;
		font-weight: 500;
		display: inline-flex;
		padding: 0 0.8em;
		justify-content: center;
		align-items: center;
		border-radius: 0.85em;
		background-color: transparent;
		color: var(--color-dark-100);
		transition: all 0.25s;
		opacity: 0.7;

		&:hover:not(.current) {
			background-color: var(--color-light-100);
			opacity: 0.9;
		}

		&.current {
			cursor: default;
			opacity: 1;
		}
	}

	input {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
		max-width: 0;
	}
</style>
