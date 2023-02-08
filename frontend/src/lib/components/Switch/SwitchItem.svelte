<!--
	@component
	# Switch Item
	Atomic component for options slotable into the Switch component.
 -->
<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';

	import { onMount } from 'svelte';
	import { getSwitchContext } from './Switch.svelte';

	export let id: string | undefined = undefined;
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;
	export let value: any;
	export let loading: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let itemRef: HTMLElement;

	const { name, group, currentRef } = getSwitchContext();

	$: if ($group === value) {
		currentRef.set(itemRef);
	}

	onMount(() => {
		if ($group === value) {
			currentRef.set(itemRef);
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={as ? as : 'label'}
	bind:this={itemRef}
	class="switch-item {className}"
	class:current={$group === value}
	{style}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
>
	<Ripple />
	<input {id} {value} {name} type="radio" bind:group={$group} hidden />
	<span class="slot">
		<slot />
	</span>
	{#if loading}
		<slot name="loading">
			<Loading />
		</slot>
	{/if}
</svelte:element>

<style lang="scss">
	.switch-item {
		--item-height: calc(var(--ui-height) - 2 * var(--switch-inset));
		--item-radius: calc(var(--switch-radius) - var(--switch-inset));
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(var(--item-height), auto);
		align-items: center;
		justify-content: center;
		border-radius: var(--item-radius);
		font-weight: 400;
		padding: 0;
		margin: 0;
		gap: 0;
		cursor: pointer;
		transition: all 0.15s ease-out;
	}
	.disabled {
		pointer-events: none;
	}
	.slot {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: inherit;
		padding: 0 var(--ui-pad-x);
		padding-bottom: calc(0.5em - 0.5ex);
		white-space: nowrap;
	}
	.current .slot {
		animation: press 0.25s ease-in-out;
	}

	// Variants

	:global(.default) > :where(.switch-item) {
		color: currentColor;
		&:hover,
		&:focus-within {
			color: col(fg, 700);
			background: col(bg, 900);
		}
		&.current {
			cursor: default;
			color: col(bg, 500);
			background: col(fg, 100, 0);
		}
	}

	:global(.outlined) > :where(.switch-item) {
		color: currentColor;
		&:hover,
		&:focus-within {
			color: col(fg, 700);
			background: col(fg, 100, 0.1);
		}
		&.current {
			cursor: default;
			color: col(bg, 500);
		}
	}

	:global(.colored) > :where(.switch-item) {
		color: currentColor;
		// border: 1px solid transparent;
		&:hover:not(.current) {
			color: col(primary, 500);
			// border: 1px solid col(primary, 500, 0.2);
		}
		&.current {
			cursor: default;
			color: col(primary, 700);
		}
	}
</style>
