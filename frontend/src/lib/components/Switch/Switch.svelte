<!--
	@component
	## Switch
	Generic switch set component used to contextualize a group of Switch Items.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'switch-context';

	interface SwitchContext {
		group: Writable<unknown>;
		name: Readable<string | undefined>;
		currentRef: Writable<HTMLElement | null>;
		required: Readable<boolean | undefined>;
		readonly: Readable<boolean | undefined>;
	}

	export function getSwitchContext() {
		return getContext<SwitchContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { targetBox } from '$actions/targetBox';
	import {
		ORIENTATIONS,
		STATES,
		VARIANTS,
		type Orientation,
		type State,
		type Variant,
	} from '$utils/enums';
	import { getContext, setContext } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { readonly as readonlyStore, writable, type Readable, type Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export let variant: Variant = VARIANTS.Default;
	export let state: State = STATES.Normal;
	// export let direction: Direction = DIRECTIONS.Normal
	export let orientation: Orientation = ORIENTATIONS.Row;
	export let name: string | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let value: V | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	type V = $$Generic;

	const currentRef = writable<HTMLElement | null>(null);

	const _group = writable<V | undefined>(value);
	$: value = $_group;
	$: _group.set(value);

	const _name = writable<string | undefined>(name);
	$: _name.set(name);

	const _required = writable<boolean | undefined>(required);
	$: _required.set(required);

	const _readonly = writable<boolean | undefined>(readonly);
	$: _readonly.set(readonly);

	setContext<SwitchContext>(CTX_KEY, {
		currentRef,
		group: _group,
		name: readonlyStore(_name),
		required: readonlyStore(_required),
		readonly: readonlyStore(_readonly),
	});
</script>

<fieldset
	class="switch {variant} {state} {className} {orientation}"
	class:compact
	{style}
	{disabled}
	on:pointerenter
	on:pointerleave
>
	{#if currentRef}
		<div
			transition:scale|local={{ duration: 150, start: 0.9, opacity: 0, easing: cubicInOut }}
			use:targetBox={{ target: $currentRef }}
			class="switch-thumb"
		/>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	.switch {
	--switch-inset: var(--ui-inset-md);
	--switch-size: var(--ui-block-lg);
	--switch-radius: var(--ui-radius-md);
	--switch-gutter: 0px;
	--switch-direction: row;
	--switch-border: 0px solid transparent;
	flex: none;
	position: relative;
	display: inline-flex;
	flex-direction: var(--switch-direction);
	gap: var(--switch-gutter);
	background-color: var(--switch-background);
	color: var(--switch-color);
	padding: var(--switch-inset);
	border-radius: var(--switch-radius);
	outline: var(--ui-outline-inactive);
	transition: all 0.1s ease-out;

	&::after {
		pointer-events: none;
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: var(--switch-border);
		transition: all 0.1s ease-out;
	}

	&.column {
		--switch-direction: column;
	}

	&:focus-within,
	&:has(:active) {
		outline: var(--ui-outline-active);
	}
}

.switch-thumb {
	// position: absolute;
	background-color: var(--switch-thumb-background);
	border-radius: calc(var(--switch-radius) - var(--switch-inset));
	transition: all 0.15s var(--ui-ease-out);
}

.compact {
	--switch-radius: 99em;
	--switch-inset: var(--ui-inset-sm);
	--switch-size: var(--ui-block-md);
}

// Default variant.
.default {
	--switch-background: #{col(fg, 500, 0.05)};
	--switch-color: #{col(fg, 000)};
	--switch-thumb-background: #{col(fg, 300)};
}

// Outlined variant.
.outlined {
	--switch-color: #{col(fg, 000)};
	--switch-border: var(--ui-border-size) solid #{col(fg, 100, 0.2)};
	--switch-thumb-background: #{col(fg, 300)};
	outline-color: transparent !important;

	&:hover {
		--switch-color: #{col(fg, 500)};
		--switch-border: var(--ui-border-size) solid #{col(fg, 100, 0.5)};
	}
}

// Feature (subtle accent) variant.
.feature {
	--switch-color: #{col(fg, 000)};
	--switch-border: var(--ui-border-size) solid #{col(fg, 500, 0.1)};
	--switch-thumb-background: #{col(primary, 500, 0.25)};
	--ripple-color: #{col(primary, 700)};
	outline-color: transparent !important;

	&:hover,
	&:focus-within {
		--switch-color: #{col(fg, 500)};
		--switch-border: var(--ui-border-size) solid #{col(primary, 700, 0.25)};
	}
}
</style>
