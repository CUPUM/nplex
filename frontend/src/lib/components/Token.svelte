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
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };
	export let checked: any = undefined;
	export let group: any = undefined;

	const _group = writable(group);
	$: group = $_group;
	$: _group.set(group);
</script>

<svelte:element
	this={as ? as : value ? 'label' : 'div'}
	class="token nest {variant}"
	class:active
	class:warning
	class:compact
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
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	:where(.token) {
		--height: calc(var(--ui-height) - 2 * var(--ui-inset-sum));
		--inset: var(--ui-inset);
		--pad-inline: calc(var(--ui-pad-inline) / 3);
		--gutter-inline: calc(2 * var(--ui-pad-inline) / 3);
		position: relative;
		cursor: pointer;
		display: grid;
		grid-template-columns:
			[full-start leading-start]
			minmax(var(--pad-inline), auto)
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			minmax(var(--pad-inline), auto)
			[trailing-end full-end];
		grid-template-rows: minmax(var(--height), auto);
		font-weight: 300;
		flex: none;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border: none;
		padding: var(--inset);
		margin: 0;
		border-radius: 999px;
	}
	.leading {
		grid-column: leading;
	}
	.trailing {
		grid-column: trailing;
	}
	.main {
		grid-column: main;
		padding-inline: var(--gutter-inline);
	}
	.leading,
	.trailing,
	.main {
		padding-bottom: calc(0.5em - 0.5ex);
	}

	.default {
		color: col(fg, 100);
		border: 1px solid currentColor;
		&:hover {
			background: col(fg, 100, 0.1);
		}
	}
</style>
