<!--
	@component
	# Token
	A token primitive input akin to a pill-shaped or chip-shaped checkable label.
	
-->
<script lang="ts">
	import type { ComponentStyleProps } from '$types/utils';

	import Ripple from '$components/Ripple.svelte';
	import type { HTMLAnchorAttributes, HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = (HTMLInputAttributes | HTMLAnchorAttributes) &
		ComponentStyleProps<
			'token',
			{
				static: {
					inset: string;
					radius: string;
				};
				dynamic: {
					'color': string;
					'side-color': string;
					'background': string;
					'border': string;
					'shadow': string;
				};
				conditions: 'hover' | 'checked';
			}
		> & {
			variant?: 'default' | 'outlined' | 'dashed' | 'ghost' | 'editor' | 'cta';
			state?: undefined | 'error' | 'warning' | 'success';
			checked?: boolean;
			value?: V;
			group?: V[];
			type?: 'checkbox' | 'radio';
			href?: string;
			disabled?: boolean;
			readonly?: boolean;
			equi?: boolean;
		};

	export let variant: $$Props['variant'] = 'default';
	export let state: $$Props['state'] = undefined;
	export let checked: $$Props['checked'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let group: $$Props['group'] = undefined;
	export let type: $$Props['type'] = 'checkbox';
	export let href: $$Props['href'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let readonly: $$Props['readonly'] = undefined;
	export let equi: $$Props['equi'] = undefined;

	let element: 'a' | 'label' | 'span' | 'button';
	$: element = href ? 'a' : value != null || group ? 'label' : 'span';
	$: type === 'radio' && updateRadio(group, value);
	$: type === 'checkbox' && group && value != null && updateCheckbox(group, value);
	$: type === 'checkbox' && group && updateGroup(checked, value);

	function updateRadio(g: $$Props['group'], v: $$Props['value']) {
		checked = group === value;
	}

	function updateCheckbox(g: NonNullable<$$Props['group']>, v: NonNullable<$$Props['value']>) {
		checked = g.indexOf(v) > -1;
	}

	function updateGroup(c?: boolean, v?: V) {
		if (!group || v == null) {
			return;
		}
		const index = group.indexOf(v);
		if (c) {
			if (index < 0) {
				group.push(v);
				group = group;
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1);
				group = group;
			}
		}
	}
</script>

<svelte:element
	this={element}
	class="token {variant} {state}"
	class:readonly
	class:disabled
	class:checked
	class:equi
	{href}
	{...element === 'label' ? {} : $$restProps}
>
	{#if !readonly && !disabled && element !== 'span'}
		<Ripple />
	{/if}
	{#if element === 'label'}
		{#if type === 'checkbox'}
			<input
				type="checkbox"
				{value}
				bind:checked
				{...$$restProps}
				on:change
				on:input
				on:focus
				on:blur
				on:keydown
			/>
		{:else}
			<input
				type="radio"
				{value}
				bind:group
				{...$$restProps}
				on:change
				on:input
				on:focus
				on:blur
				on:keydown
			/>
		{/if}
	{/if}
	{#if $$slots.leading}
		<span class="token-leading">
			<slot name="leading" {checked} />
		</span>
	{/if}
	<span class="token-main">
		<slot {checked} />
	</span>
	{#if $$slots.trailing}
		<span class="token-trailing">
			<slot name="trailing" {checked} />
		</span>
	{/if}
</svelte:element>

<style lang="scss">
	.token {
		// Dynamic vars
		@include component-dynamic-vars(
			'token',
			('color', 'side-color', 'background', 'border', 'shadow'),
			('hover', 'checked')
		);
		// Exposed static vars
		--ui-token-radius: var(--token-radius, 999px);
		--ui-token-inset: var(--token-inset, var(--ui-inset-md));
		// Not-exposed static vars
		--ui-token-size: var(--ui-block-md);
		--ui-token-gutter: 0.5em;
		--ui-token-padding-inline: calc(var(--ui-pad-md) - var(--ui-token-inset));
		// Base style
		position: relative;
		user-select: none;
		flex: none;
		flex-wrap: nowrap;
		block-size: var(--ui-token-size);
		border-radius: var(--ui-token-radius);
		padding: var(--ui-token-inset);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		flex-wrap: nowrap;
		color: var(--ui-token-color);
		background: var(--ui-token-background);
		box-shadow: var(--ui-token-shadow);
		transition: all 0.1s ease-out;
		// Border pseudo to avoid affecting layout.
		&::after {
			pointer-events: none;
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			border: var(--ui-token-border);
		}
		// Interactive elements.
		&:not(span) {
			cursor: pointer;
			&:hover {
				color: var(--ui-token-hover-color);
				background-color: var(--ui-token-hover-background);
				box-shadow: var(--ui-token-hover-shadow);
				&::after {
					border: var(--ui-token-hover-border);
				}
				.token-leading,
				.token-trailing {
					color: var(--ui-token-hover-side-color);
				}
			}
		}
		&.checked {
			color: var(--ui-token-checked-color);
			background-color: var(--ui-token-checked-background);
			box-shadow: var(--ui-token-checked-shadow);
			&::after {
				border: var(--ui-token-checked-border);
			}
			.token-leading,
			.token-trailing {
				color: var(--ui-token-checked-side-color);
			}
		}
		&.readonly,
		:readonly {
			cursor: default;
		}
		&.disabled,
		:disabled {
			cursor: default;
			opacity: 0.75;
		}
	}
	.token-leading,
	.token-trailing {
		color: var(--ui-token-side-color);
		transition: inherit;
	}
	.equi {
		aspect-ratio: 1;
		flex: none;
		padding-inline: 0;
		gap: 0;
		justify-content: center;
	}
	input {
		position: absolute;
		appearance: none;
	}
	.token-main {
		position: relative;
		top: -0.1em;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		padding-inline-end: var(--ui-token-gutter);
		padding-inline-start: var(--ui-token-padding-inline);
		.equi & {
			padding-inline: 0 !important;
			flex: none;
		}
		.token-leading + & {
			padding-inline-start: var(--ui-token-inset);
		}
		&:last-child {
			padding-right: var(--ui-token-padding-inline);
		}
	}

	// Default variant
	.default {
		--token-variant-color: #{col(fg, 100)};
		--token-variant-background: #{col(fg, 000, 0.1)};
		--token-variant-border: 0px solid #{col(fg, 100, 0)};
		--token-variant-hover-color: #{col(fg, 500)};
		--token-variant-hover-background: #{col(fg, 000, 0.1)};
		--token-variant-hover-border: 0px solid #{col(fg, 100, 0)};
		--token-variant-hover-color: #{col(fg, 500)};
		--token-variant-hover-background: #{col(fg, 000, 0.1)};
		--token-variant-hover-border: 0px solid #{col(fg, 100, 0)};
		// Add state variants? (warning, success, error);
	}

	// Editor variant
	.editor {
		--token-variant-color: #{col(fg, 100)};
		--token-variant-background: #{col(fg, 000, 0.1)};
		--token-variant-border: 0px solid #{col(fg, 100, 0)};
		--token-variant-shadow: 0 0.25em 0.5em 0 rgb(0, 0, 0, 0);
		--token-variant-hover-color: #{col(fg, 500)};
		--token-variant-hover-background: #{col(fg, 000, 0.1)};
		--token-variant-hover-border: 0px solid #{col(fg, 100, 0)};
		--token-variant-hover-color: #{col(fg, 500)};
		--token-variant-hover-background: #{col(fg, 000, 0.1)};
		--token-variant-hover-border: 0px solid #{col(fg, 100, 0)};
		--token-variant-checked-shadow: 0 0.75em 1.25em -0.75em rgb(0, 0, 0, 0.2);
	}

	// Outlined variant.
	.outlined {
		--color: #{col(fg, 500)};
		--background: transparent;
		--border: var(--ui-border-size) solid #{col(fg, 500, 0.1)};
		--hover-color: #{col(fg, 700)};
		--hover-background: #{col(fg, 100, 0.1)};
		--hover-border: 3px solid #{col(fg, 500, 0)};
		--active-color: #{col(fg, 900)};
		--active-background: #{col(fg, 500, 0.1)};
		--active-border: 3px solid #{col(fg, 500, 0)};
		color: var(--color);
		background-color: var(--background);
		border: var(--border);
		&:hover:not(span) {
			color: var(--hover-color);
			background-color: var(--hover-background);
			border: var(--hover-border);
		}
		&.active {
			color: var(--active-color);
			background-color: var(--active-background);
			border: var(--active-border);
		}
		&.warning {
			--token-variant-color: #{col(fg, 500)};
			--token-variant-background: transparent;
			--token-variant-border: var(--ui-border-size) solid #{col(fg, 500, 0.1)};
			--token-variant-hover-color: #{col(fg, 700)};
			--token-variant-hover-background: #{col(fg, 100, 0.1)};
			--token-variant-hover-border: 3px solid #{col(fg, 500, 0)};
			--token-variant-active-color: #{col(fg, 900)};
			--token-variant-active-background: #{col(fg, 500, 0.1)};
			--token-variant-active-border: 3px solid #{col(fg, 500, 0)};
		}
		&.error {
			--color: #{col(error, 700)};
			--background: transparent;
			--border: var(--ui-border-size) solid #{col(error, 500, 0.1)};
			--hover-color: #{col(fg, 700)};
			--hover-background: #{col(fg, 100, 0.1)};
			--hover-border: 3px solid #{col(fg, 500, 0)};
			--active-color: #{col(fg, 900)};
			--active-background: #{col(fg, 500, 0.1)};
			--active-border: 3px solid #{col(fg, 500, 0)};
		}
		&.success {
		}
	}

	// Dashed variant.

	.dashed {
		--ui-token-border: var(--ui-border-size) dashed #{col(fg, 500, 0.1)};
	}

	// Feature variant.
	.feature {
		--ui-token-color: #{col(fg, 000)};
		--ui-token-background: #{col(fg, 500, 0.05)};
		// --ui-token-border: var(--ui-border-size) solid #{col(fg, 100, 0.1)};
		&:hover {
			--ui-token-color: #{col(primary, 900)};
			--ui-token-background: #{col(primary, 300, 0.2)};
			// --ui-token-border: var(--ui-border-size) solid #{col(primary, 300, 0.2)};
		}
		&.active {
			--ui-token-color: #{col(primary, 700)};
			--ui-token-background: #{col(primary, 100, 0.2)};
			// --ui-token-border: var(--ui-border-size) solid #{col(primary, 100, 0)};
		}
	}
</style>
