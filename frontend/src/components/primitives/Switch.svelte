<script lang="ts">
	import { getContext } from 'svelte';
	import type { SwitchSetContext } from './SwitchSet.svelte';

	export let group;
	export let id: string;
	export let value;

	const ctx = getContext<SwitchSetContext>('switchset');

	function setCurrent(e) {
		ctx.current.set(e.target.parentElement);
	}
</script>

<label for={id} style={$$restProps.style} on:click on:focus on:mouseover on:mouseleave>
	<input
		{id}
		{value}
		type="radio"
		on:input
		on:input={setCurrent}
		on:change
		{...$$restProps}
		bind:group
		name={ctx.name}
	/>
	<slot />
</label>

<style lang="postcss">
	label {
		position: relative;
		cursor: pointer;
		font-weight: 400;
		display: inline-flex;
		padding: 0 1em;
		justify-content: center;
		align-items: center;
		border-radius: 1em;
		background-color: transparent;

		&:not(:checked) {
			color: red;
		}
	}

	input {
		opacity: 0;
		position: absolute;
		width: 0;
		height: 0;
	}
</style>
