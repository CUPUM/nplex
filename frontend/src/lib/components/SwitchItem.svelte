<!--
	@component
	## Switch Item
	Atomic component for options slotable into the Switch component.

 -->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import Loading from './Loading.svelte';
	import Ripple from './Ripple.svelte';
	import { getSwitchContext } from './Switch.svelte';

	export let id: string | undefined = undefined;
	export let value: any;
	export let loading: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	let switchItemRef: HTMLLabelElement;

	const { name, group, setMark, setTempMark } = getSwitchContext();

	$: if ($group === value) {
		setMark(switchItemRef);
	}

	onMount(() => {
		if ($group === value) {
			setMark(switchItemRef);
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	bind:this={switchItemRef}
	class="switch-item nest {className}"
	class:current={$group === value}
	{style}
	on:click
	on:focus
	on:mouseenter={() => setTempMark(switchItemRef)}
	on:mouseenter
	on:mouseleave
>
	<input {id} {value} {name} type="radio" hidden bind:group={$group} />
	<Ripple />
	<div class="slot">
		<slot />
	</div>
	{#if loading}
		<slot name="loading">
			<Loading />
		</slot>
	{/if}
</label>

<style lang="scss">
	:where(.switch-item) {
		--inset: var(--ui-inset);
		--height: calc(var(--ui-height) - 2 * var(--ui-inset-sum));
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(var(--height), auto);
		align-items: center;
		justify-content: center;
		border-radius: calc(var(--ui-radius) - var(--ui-inset-sum));
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
		padding: 0 var(--ui-pad-x);
		padding-bottom: calc(0.5em - 0.5ex);
	}

	// Variants

	:global(.default) > :where(.switch-item) {
		color: currentColor;
		&:hover {
			color: col(bg, 700);
		}
		&.current {
			cursor: default;
			color: col(bg, 500);
		}
	}
	:global(.default.temp) > :where(.switch-item) {
		&.current {
			color: col(fg, 900);
			background: col(fg, 100, 0.15);
		}
	}

	:global(.outlined) > :where(.switch-item) {
		color: currentColor;
		&:hover {
			color: col(fg, 900);
		}
		&.current {
			cursor: default;
			color: col(bg, 500);
		}
	}
	:global(.outlined.temp) > :where(.switch-item) {
		&.current {
			color: col(fg, 900);
			background: col(fg, 100, 0.15);
		}
	}
</style>
