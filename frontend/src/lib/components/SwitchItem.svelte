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
	class="switch-item {className}"
	class:current={$group === value}
	{style}
	on:click
	on:focus
	on:mouseenter={() => setTempMark(switchItemRef)}
	on:mouseleave={() => setTempMark(switchItemRef, true)}
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
	.switch-item {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: minmax(var(--computed-height), auto);
		align-items: center;
		justify-content: center;
		border-radius: var(--computed-radius);
		padding: 0;
		margin: 0;
		gap: 0;
		cursor: pointer;
		transition: all 0.15s ease-out;
	}

	.slot {
		padding: 0 var(--default-padding-inline);
		padding-bottom: calc(0.5em - 0.5ex);
		font-weight: 500;
	}

	:global(.default) > .switch-item {
		color: --color-contrast-500;
		&.current {
			color: var(--color-base-000);
		}
	}
	:global(.default.temp) > .switch-item {
		color: red;
		&.current {
			color: var(--color-contrast-900);
		}
	}
</style>
