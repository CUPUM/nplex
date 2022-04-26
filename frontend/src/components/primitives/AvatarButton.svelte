<script lang="ts">
	import { ripple } from '$actions/ripple';
	import Loading from './Loading.svelte';

	export let size: string | number = '1em';
	export let warning: boolean = false;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	use:ripple={{ startColor: 'currentColor' }}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	id="button"
	class:active
	class:warning
	style:font-size={typeof size === 'number' ? size + 'px' : size}
	disabled={disabled || loading}
	{href}
	{...$$restProps}
>
	<div>
		<span>E</span>
	</div>
	{#if loading}
		<Loading
			style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
		/>
	{/if}
</svelte:element>

<style lang="postcss">
	#button {
		--size: 2.8em;
		display: inline-block;
		position: relative;
		height: var(--size);
		width: var(--size);
		background-color: var(--color-primary-500);
		border-radius: 50%;
	}

	div {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
	}
</style>
