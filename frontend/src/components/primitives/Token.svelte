<script lang="ts">
	import { tooltip } from '$actions/tooltip';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { getContext } from 'svelte';
	import type { TokenSetContext } from './TokenSet.svelte';

	export let size: number | CssSizeValue = '1em';
	export let variant: 'default' | 'secondary' | 'ghost' | 'cta' = undefined;
	export let ttip: string = undefined;
	export let disabled: boolean = false;
	export let warning: boolean = false;
	export let active: boolean = false;

	const tokenSetCtx = getContext<TokenSetContext>(Ctx.TokenSet);
	let autoVariant = variant || tokenSetCtx?.vairant || 'default';
</script>

<svelte:element
	this={tokenSetCtx ? 'li' : 'div'}
	id="token"
	class={variant}
	style:font-size={cssSize(size)}
	class:active
	class:warning
	{disabled}
	use:tooltip={{ disabled: !ttip, message: ttip }}
	on:click
	on:focus
	{...$$restProps}
>
	<span id="label">
		<slot />
	</span>
	{#if $$slots.input}
		<span id="input">
			<slot name="input" />
		</span>
	{/if}
</svelte:element>

<style lang="postcss">
	#token {
		user-select: none;
		position: relative;
		display: inline-flex;
		flex-wrap: nowrap;
		white-space: nowrap;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		line-height: 1em;
		max-width: 200px;
		height: 2em;
		border-radius: 1em;
		padding: 0 1em;
		font-weight: 400;
		overflow: hidden;
		transition: all 0.15s ease-out;

		&:hover.interactive,
		&:focus.interactive {
			background-color: var(--hover-bg-color);
			color: var(--hover-color);
		}

		&.active {
			background-color: var(--active-bg-color);
			color: var(--active-color);
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}
	}

	span {
		display: inline-block;
		position: relative;
	}

	#label {
		top: -0.05em;
		overflow: hidden;
		line-height: 2em;
		text-overflow: ellipsis;
	}

	#input {
	}

	.interactive {
		cursor: pointer;
	}

	/* Variants */

	.default {
		--hover-color: var(--color-primary-900);
		--hover-bg-color: var(--color-primary-300);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		color: var(--color-primary-500);
		background-color: var(--color-light-100);
	}

	.secondary {
	}

	.ghost {
		--hover-color: var(--color-primary-900);
		--hover-bg-color: var(--color-primary-300);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		color: var(--color-dark-100);
		background-color: var(--color-light-100);
		box-shadow: 0 0 0 1px var(--color-light-900);
	}

	.cta {
	}

	.nav {
		--hover-color: var(--color-primary-700);
		--hover-bg-color: rgba(var(--rgb-primary-500), 0.1);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-primary-300);
		color: var(--color-primary-500);
		background-color: transparent;
	}
</style>
