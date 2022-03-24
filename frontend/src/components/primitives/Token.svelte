<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { scale } from 'svelte/transition';

	export let type: 'default' | 'checkbox' | 'radio' = 'default';
	export let size: 'xsmall' | 'small' | 'medium' | 'large' = 'medium';
	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' = 'normal';
	export let deletable: boolean = false;
	export let ttip: string = undefined;
	export let disabled: boolean = false;
	export let warning: boolean = false;
	export let active: boolean = false;
</script>

<div
	class={variant}
	style:font-size="var(--size-{size})"
	class:active
	{disabled}
	on:click
	on:focus
	{...$$restProps}
	transition:scale={{ start: 0.9, duration: 200 }}
>
	<slot />
	<span />
</div>

<style lang="postcss">
	div {
		user-select: none;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		line-height: 1em;
		text-overflow: ellipsis;
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
		position: relative;
	}

	.interactive {
		cursor: pointer;
	}

	/* Variants */

	.normal {
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
