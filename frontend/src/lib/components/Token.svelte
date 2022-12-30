<!--
	@component
	## Token
	Token

 -->
<script lang="ts">
	import { writable } from 'svelte/store';
	import Ripple from './Ripple.svelte';

	export let variant: 'default' | 'outlined' | 'ghost' | 'cta' | 'danger' = 'default';
	export let disabled: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let warning: boolean = false;
	export let active: boolean = false;
	export let value: any = undefined;
	export let type: 'checkbox' | 'radio' | undefined = undefined;
	export let name: string | undefined = undefined;
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let round: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	export let checked: any = undefined;
	export let group: any = undefined;

	$: checked = checked ?? group === value;

	const _group = writable(group);
	$: group = $_group;
	$: _group.set(group);
</script>

<svelte:element
	this={as ? as : value !== undefined ? 'label' : 'div'}
	class="token {variant}"
	class:active
	class:warning
	class:compact
	class:checked
	class:round
	{disabled}
	on:click
	on:focus
	on:blur
	on:keypress
	on:mouseover
	on:mouseenter
	on:mouseleave
>
	{#if value !== undefined}
		{#if type === 'checkbox'}
			<input type="checkbox" {name} hidden {value} bind:checked />
		{:else if type === 'radio'}
			<input type="radio" {name} hidden {value} bind:group={$_group} />
		{/if}
	{/if}
	<Ripple />
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="main">
		<slot {checked} />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	:where(.token) {
		--height: calc(var(--ui-height) - 2 * var(--ui-inset));
		--radius: calc(var(--ui-radius-md) - var(--ui-inset));
		position: relative;
		display: inline-flex;
		height: var(--height);
		align-items: center;
		border-radius: var(--radius);
		background: wheat;
	}

	.round {
		border-radius: 99px;
	}

	.main {
		padding-inline: var(--ui-pad-x);
	}
</style>
