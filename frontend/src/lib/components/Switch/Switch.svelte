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
	@use './Switch.scss';
</style>
