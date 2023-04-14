<!--
	@component
	# Token Button
	
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import type { StylePropsDynamic, StylePropsStatic } from '$types/utils';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) &
		StylePropsStatic<'token-button', 'radius'> &
		StylePropsDynamic<'token-button', 'color' | 'background' | 'border', 'hover'> & {
			href?: string;
			variant?: 'default' | 'cta' | 'outlined' | 'dashed' | 'ghost';
			state?: undefined | 'error' | 'warning' | 'success';
			equi?: boolean;
		};

	export let href: $$Props['href'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let state: $$Props['state'] = undefined;
	export let equi: $$Props['equi'] = true;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...$$restProps}
	class="token-button {variant} {state}"
	class:equi
	type="button"
>
	<Ripple />
	<div class="token-button-inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.token-button {
		// Dynamic vars
		@include dynamic-props('token-button', ('color', 'background', 'border'), ('hover'));
		// Static vars
		--ui-token-button-radius: var(
			--token-button-radius,
			calc(var(--ui-token-radius) - var(--ui-token-inset))
		);
		// Base style
		position: relative;
		cursor: pointer;
		height: 100%;
		flex: none;
		border-radius: var(--ui-token-button-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: var(--ui-pad-md);
		color: var(--ui-token-button-color);
		background: var(--ui-token-button-background);
		transition: all 0.1s ease-out;
		&:hover:not(.disabled),
		&:hover:not(:disabled) {
			color: var(--ui-token-button-hover-color);
			background: var(--ui-token-button-hover-background);
			transition: all 0s;
		}
		&.disabled,
		:disabled {
			pointer-events: none;
			cursor: default;
		}
		&.equi {
			aspect-ratio: 1;
			padding: 0;
		}
	}
	.token-button-inner {
		position: relative;
		top: -0.1em;
	}

	// Default variant
	.default {
		--token-button-variant-color: currentColor;
		--token-button-variant-background: #{col(fg, 100, 0.1)};
		--token-button-variant-hover-color: #{col(bg, 100)};
		--token-button-variant-hover-background: #{col(fg, 000, 0)};
	}
</style>
