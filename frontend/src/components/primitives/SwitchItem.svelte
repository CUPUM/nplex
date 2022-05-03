<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { Ctx } from '$utils/contexts';
	import { getContext, onMount } from 'svelte';
	import type { SwitchContext } from './Switch.svelte';

	export let group;
	export let id: string;
	export let value;

	const ctx = getContext<SwitchContext>(Ctx.Switch);
	const current = ctx.current;
	const variant = ctx.variant;
	let label: HTMLElement;

	// To do:
	// Should temporarily set current on hover too for animation handling.
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
	class={variant}
	on:click
	on:focus
	on:mouseover
	on:mouseleave
	use:ripple={{ startColor: 'var(--color-primary-500)' }}
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
	<span id="content">
		<slot />
	</span>
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
		color: var(--color-primary-900);
		transition: all 0.3s;

		&:hover:not(.current) {
			transition: all 0s;
			/* background-color: var(--color-light-100); */
		}

		&.current {
			cursor: default;
			opacity: 1;
			color: var(--color-dark-900);
		}
	}

	#content {
		position: relative;
		top: -0.1em;
	}

	input {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
		max-width: 0;
	}

	/* Variants */
</style>
