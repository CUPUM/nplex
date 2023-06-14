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
	@mixin switch($variant) {
	:global(.#{$variant}) .switch-item {
		@content;
	}
}

.switch-item {
	--switch-item-size: calc(var(--switch-size) - 2 * var(--switch-inset));
	--switch-item-radius: calc(var(--switch-radius) - var(--switch-inset));
	--switch-item-inset: var(--ui-inset-md);
	--switch-item-color: inherit;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: var(--switch-item-radius);
	block-size: var(--switch-item-size);
	padding: var(--switch-item-inset);
	cursor: pointer;
	background-color: var(--switch-item-background);
	color: var(--switch-item-color);
	transition: all 0.2s ease-out;

	// @include focuspress;
}

.equi {
	aspect-ratio: 1;
	padding-inline: 0;
	justify-content: center;

	.switch-item-main {
		padding-inline: 0;
	}
}

input {
	appearance: none;
	position: absolute;
}

[data-current] {
	cursor: default;
}

.disabled,
:disabled {
	pointer-events: none;
}

.switch-item-main {
	position: relative;
	top: -0.1em;
	// padding-bottom: 0.2em;
	padding-inline: calc(var(--ui-pad-md) - var(--switch-item-inset));
}

// Default variant.
@include switch(default) {
	// --switch-item-background: transparent;

	&:hover,
	&:focus-within {
		--switch-item-color: #{col(fg, 700)};
		--switch-item-background: #{col(fg, 500, 0.1)};
	}

	&[data-current] {
		--switch-item-color: #{col(bg, 500)};
	}
}

// Outlined variant.
@include switch(outlined) {
	// --switch-item-background: transparent;

	&:hover,
	&:focus-within {
		--switch-item-color: #{col(fg, 700)};
		--switch-item-background: #{col(fg, 100, 0.1)};
	}

	&[data-current] {
		--switch-item-color: #{col(bg, 500)};
	}
}

// Feature (subtle accent) variant.
@include switch(feature) {
	&:hover,
	&:focus-within {
		--switch-item-color: #{col(primary, 500)};
	}

	&[data-current] {
		--switch-item-color: #{col(primary, 700)};
	}
}
</style>
