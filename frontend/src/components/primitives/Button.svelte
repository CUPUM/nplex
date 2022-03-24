<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import type { SvelteProps } from '$utils/helpers/types';
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';

	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' | 'nav' = 'normal';
	export let size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let display: 'inline' | 'block' = 'inline';
	export let icon: SvelteProps<Icon>['name'] = undefined;
	export let iconPosition: 'left' | 'right' = 'left';
	export let warning: boolean = false;
	export let square: boolean = false;
	export let href: string = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let ttip: string = undefined;
	export let loading: boolean = false;

	let nopointer = false;
	let composed = false;

	$: nopointer = variant === 'nav' && active;

	$: composed = !!icon && $$slots.default;
</script>

{#if !href}
	<button
		use:ripple={{ startColor: 'currentColor' }}
		use:tooltip={{ disabled: !Boolean(ttip), message: ttip }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square
		class:nopointer
		class:composed
		class="{variant} {display} {contentAlign} icon-{iconPosition}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
	>
		{#if icon}
			<span id="icon" class:dim={$$slots.default}>
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span id="label">
				<slot />
			</span>
		{/if}
		{#if loading}
			<Loading
				style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
			/>
		{/if}
	</button>
{:else}
	<a
		use:ripple={{ startColor: 'currentColor' }}
		use:tooltip={{ disabled: !Boolean(ttip), message: ttip }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square
		class:nopointer
		class:composed
		class="{variant} {display} {contentAlign} icon-{iconPosition}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
		{href}
	>
		{#if icon}
			<span id="icon" class:dim={$$slots.default}>
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span id="label">
				<slot />
			</span>
		{/if}
		{#if loading}
			<Loading
				style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
			/>
		{/if}
	</a>
{/if}

<style lang="postcss">
	button,
	a {
		/* Base */
		--size: 2.8em;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: 1em;
		padding-block: 0;
		padding-inline: 1em;
		margin: 0;
		font-family: var(--font-main);
		font-weight: 500;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		overflow: hidden;
		align-items: center;
		transition: all 0.2s ease-out;

		&:hover {
			background-color: var(--hover-bg-color);
			color: var(--hover-color);
			transition: all 0s;
		}

		&:focus {
			outline-color: var(--hover-bg-color);
		}

		&.active {
			background-color: var(--active-bg-color);
			color: var(--active-color);
		}

		&.warning {
			background-color: var(--color-error-100);
			color: var(--color-error-700);
		}

		&:disabled {
			opacity: 0.75;
			pointer-events: none;
			cursor: default;
		}

		&.nopointer {
			pointer-events: none;
			cursor: default;
		}

		&.dim {
			opacity: 0.5;
		}
	}

	/* Variants (should correspond to `typeof variant`) */

	.normal {
		--hover-color: var(--color-primary-900);
		--hover-bg-color: var(--color-primary-300);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		color: var(--color-dark-500);
		background-color: var(--color-light-100);
	}

	.secondary {
	}

	.ghost {
	}

	.cta {
	}

	.nav {
		--hover-color: var(--color-primary-500);
		--hover-bg-color: rgba(var(--rgb-primary-300), 0.1);
		--active-color: var(--color-primary-300);
		--active-bg-color: transparent;
		color: var(--color-dark-100);
		background-color: transparent;
		/* font-family: var(--font-misc); */
		font-weight: 600;
		letter-spacing: 0.3px;
	}

	/* Display */

	.block {
		display: flex;
		width: 100%;

		&.composed {
			display: grid;
		}
	}

	.inline {
		display: inline-flex;

		&.composed {
			display: inline-grid;
		}
	}

	.square {
		justify-content: center;
		width: var(--size);
		padding: 0;
	}

	/* Content alignment */

	span {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;

		&:not(:first-child) {
			margin-left: 0.5em;
		}
	}

	#label {
		top: -0.05em;
	}

	#icon {
		top: -0.05em;
	}

	.left {
		justify-content: flex-start;
	}

	.center {
		justify-content: center;

		&.composed {
			grid-template-columns: auto;

			&.icon-left {
				grid-template-columns: 1fr auto minmax(0, 1fr);
			}

			&.icon-right {
				grid-template-columns: minmax(0, 1fr) auto 1fr;
			}
		}
	}

	.right {
		justify-content: flex-end;
	}
</style>
