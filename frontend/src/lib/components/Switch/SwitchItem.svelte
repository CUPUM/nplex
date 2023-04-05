<!--
	@component
	# Switch Item
	Atomic component for options slotable into the Switch component.
 -->
<script lang="ts">
	import { page } from '$app/stores';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { UnbasedURL } from '$utils/url';
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getSwitchContext } from './Switch.svelte';

	type V = $$Generic;

	type $$Props = Pick<HTMLInputAttributes, 'disabled' | 'readonly' | 'id'> & {
		href?: string;
		value?: V | typeof href;
		loading?: boolean;
		style?: string;
		class?: string;
		current?: boolean;
		equi?: boolean;
	};

	export let href: $$Props['href'] = undefined;
	export let value: $$Props['value'] | undefined = href;
	export let loading: $$Props['loading'] = undefined;
	export let style: $$Props['style'] = undefined;
	export let current: $$Props['current'] = undefined;
	let className: $$Props['class'] = '';
	export { className as class };
	export let equi: $$Props['equi'] = undefined;

	const { name, group, currentRef, required, readonly } = getSwitchContext();

	let itemRef: HTMLElement;
	let element: 'a' | 'label' = href ? 'a' : 'label';

	$: hrefURL = href ? new UnbasedURL(href) : undefined;

	$: if (hrefURL && value == href) {
		if ($page.url.pathname === hrefURL.pathname) {
			$group = value;
		}
	}

	$: current = $group === value;

	$: if (current) {
		currentRef.set(itemRef);
	}

	onMount(() => {
		if (current) {
			currentRef.set(itemRef);
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={element}
	bind:this={itemRef}
	class="switch-item {className}"
	data-current={current || undefined}
	{href}
	{style}
	class:readonly={$readonly}
	class:required={$required}
	class:equi
	on:click
	on:pointerdown
	on:focus
	on:blur
	on:keydown
>
	<Ripple />
	{#if !href && href != value}
		<input
			type="radio"
			{value}
			name={$name}
			bind:group={$group}
			required={$required}
			readonly={$readonly}
		/>
	{/if}
	{#if $$slots.leading}
		<span class="switch-item-leading">
			<slot name="leading" />
		</span>
	{/if}
	<span class="switch-item-main">
		<slot {current} />
	</span>
	{#if $$slots.trailing}
		<span class="switch-item-trailing">
			<slot name="trailing" />
		</span>
	{/if}
	{#if loading}
		<slot name="loading">
			<Loading />
		</slot>
	{/if}
</svelte:element>

<style lang="scss">
	@use './SwitchItem.scss';
</style>
