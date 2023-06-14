<!--
	@component
	# Toggle
	A primitive toggle component with optional slotted content.

	## Group binding
	Uses a makeshift fix for nested group binding based on: https://github.com/sveltejs/svelte/issues/2308#issuecomment-539954299.
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { STATES, type State } from '$utils/enums';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type V = $$Generic;

	type $$Props = Pick<
		HTMLInputAttributes,
		'name' | 'tabindex' | 'required' | 'readonly' | 'disabled'
	> & {
		variant?: 'default' | 'dashed' | 'outlined' | 'opaque';
		state?: State;
		group?: V[];
		value?: V;
		checked?: boolean | null;
		type?: 'checkbox' | 'radio';
	};

	export let variant: $$Props['variant'] = 'default';
	export let state: $$Props['state'] = STATES.Normal;
	export let type: $$Props['type'] = 'checkbox';
	export let group: $$Props['group'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let checked: $$Props['checked'] = undefined;

	$: type === 'radio' && updateRadio(group, value);
	$: type === 'checkbox' && group && value != null && updateCheckbox(group, value);
	$: type === 'checkbox' && group && updateGroup(checked, value);

	function updateRadio(g: $$Props['group'], v: $$Props['value']) {
		checked = group === value;
	}

	function updateCheckbox(g: NonNullable<$$Props['group']>, v: NonNullable<$$Props['value']>) {
		checked = g.indexOf(v) > -1;
	}

	function updateGroup(c?: boolean | null, v?: V) {
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

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<label
	class="toggle {variant} {state}"
	class:disabled={$$props.disabled}
	role="switch"
	aria-checked={checked}
>
	<Ripple />
	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{value}
			{...$$restProps}
			bind:checked
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
			{...$$restProps}
			bind:group
			on:change
			on:input
			on:focus
			on:blur
			on:keydown
		/>
	{/if}
	<div class="toggle-inner">
		<!-- {#if $$slots.on} -->
		<div class="toggle-padded">
			<div class="toggle-on">
				<slot name="on" {checked} />
			</div>
			<!-- {/if} -->
			<!-- {#if $$slots.off} -->
			<div class="toggle-off">
				<slot name="off" {checked} />
			</div>
			<!-- {/if} -->
			<div class="toggle-thumb" />
		</div>
	</div>
</label>

<style lang="scss">
	@mixin checked-inner {
	input:checked + .toggle-inner {
		@content;
	}
}

.toggle {
	/* Customizable style props. */
	--toggle-size: var(--ui-block-md);
	--toggle-inset: var(--ui-inset-md);
	--toggle-thumb-size: calc(var(--toggle-size) - 2 * var(--toggle-inset));
	--toggle-radius: 99px;
	--toggle-border: 0px solid transparent;
	--toggle-thumb-outline: 0px solid transparent;
	// --toggle-direction: vertical-rl;
	position: relative;
	display: inline-block;
	cursor: pointer;
	border-radius: var(--toggle-radius);
	block-size: var(--toggle-size);
	outline: var(--ui-outline-inactive);
	font-weight: 400;
	transition: outline 0.15s ease-out;
}

.readonly,
:readonly {
	cursor: default;
}

.disabled {
	pointer-events: none;
	opacity: 0.5;
}

input:first-of-type {
	position: absolute;
	appearance: none;
}

.toggle-inner {
	position: relative;
	height: 100%;
	padding: var(--toggle-inset);
	background-color: var(--toggle-background);
	border-radius: inherit;
	transition: background-color 0.1s ease-out;
}

.toggle-padded {
	position: relative;
	height: 100%;
	display: grid;
	grid-template-columns: max-content;
	flex-direction: row;
	align-items: center;
}

.toggle-thumb {
	position: absolute;
	inset-inline-start: 0;
	block-size: 100%;
	aspect-ratio: 1;
	border-radius: calc(var(--toggle-radius) - var(--toggle-inset));
	background-color: currentColor;
	border: var(--toggle-thumb-outline);
	transform: translateX(0%);
	transition: inset-inline-start 0.2s var(--ui-ease-out), aspect-ratio 0.2s var(--ui-ease-out),
		transform 0.2s var(--ui-ease-out), background-color 0.1s ease-out;

	.toggle:active & {
		aspect-ratio: 1.25;
	}
}

.toggle-on,
.toggle-off {
	user-select: none;
	padding-inline: 0.75em;
	white-space: nowrap;
	text-overflow: ellipsis;
	position: relative;
	grid-column: 1;
	grid-row: 1;
	top: -0.1em;
	flex: 1;
	transition: all 0.2s ease;
}
.toggle-on {
	padding-inline-end: var(--toggle-size);
	opacity: 0;
	text-align: start;
}
.toggle-off {
	padding-inline-start: var(--toggle-size);
	opacity: 0.5;
	text-align: end;
}

@include checked-inner {
	.toggle-thumb {
		transform: translateX(-100%);
		inset-inline-start: 100%;
	}
	.toggle-on {
		opacity: 0.5;
	}
	.toggle-off {
		opacity: 0;
	}
}

// Default variant
.default {
	--ripple-color: #{col(bg, 000)};
	--toggle-background: #{col(fg, 100, 0.1)};
	color: col(fg, 300);
	&:hover {
		color: col(fg, 700);
	}
	@include checked-inner {
		--toggle-background: #{col(fg, 500)};
		color: col(bg, 500);
		&:hover {
			--toggle-background: #{col(fg, 700)};
		}
	}
}

// Opaque variant
.opaque {
	--ripple-color: #{col(bg, 000)};
	--toggle-background: #{col(bg, 900)};
	--toggle-thumb-color: #{col(fg, 300)};
	// --toggle-thumb-outline: 1px solid var(--toggle-thumb-color);
	&:hover {
		--toggle-thumb-color: #{col(fg, 700)};
	}
	@include checked-inner {
		--toggle-background: #{col(fg, 500)};
		color: col(bg, 900);
		// --toggle-thumb-color: #{col(fg, 900)};
		// --toggle-thumb-outline: var(--ui-border-size) solid #{col(bg, 900, 0.8)};
		&:hover {
			--toggle-background: #{col(fg, 700)};
			// --toggle-thumb-color: #{col(bg, 500)};
		}
	}
}

// Outlined variant
.outlined {
	--toggle-background: transparent;
	--toggle-thumb-color: #{col(fg, 100)};
	--toggle-border: var(--ui-border-size) solid #{col(fg, 500, 0.1)};

	&:hover {
		--toggle-thumb-color: #{col(fg, 700)};
		--toggle-border: var(--ui-border-size) solid #{col(fg, 500, 0.5)};
	}

	@include checked-inner {
		--toggle-background: #{col(fg, 500)};
		--toggle-thumb-color: #{col(bg, 500)};

		&:hover {
			--toggle-background: #{col(fg, 700)};
			--toggle-thumb-color: #{col(bg, 300)};
		}
	}
}

// Dashed variant
.dashed {
	--toggle-background: transparent;
	--toggle-thumb-color: #{col(fg, 100)};
	--toggle-border: var(--ui-border-size) dashed #{col(fg, 500, 0.1)};

	&:hover {
		--toggle-thumb-color: #{col(fg, 700)};
		--toggle-border: var(--ui-border-size) dashed #{col(fg, 500, 0.5)};
	}

	@include checked-inner {
		--toggle-background: #{col(fg, 500)};
		--toggle-thumb-color: #{col(bg, 500)};

		&:hover {
			--toggle-background: #{col(fg, 700)};
			--toggle-thumb-color: #{col(bg, 300)};
		}
	}
}
</style>
