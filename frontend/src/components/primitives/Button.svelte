<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import type { SvelteProps } from '$utils/helpers/types';
	import Icon from './Icon.svelte';

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
	export let message: string = undefined;
	export let loading: boolean = false;

	let nopointer = false;

	$: nopointer = variant === 'nav' && active;
</script>

{#if !href}
	<button
		use:ripple={{ startColor: 'currentColor' }}
		use:tooltip={{ disabled: !Boolean(message), message }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square
		class:nopointer
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
	>
		{#if icon}
			<span class:dim={$$slots.default}>
				<Icon name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span>
				<slot />
			</span>
		{/if}
	</button>
{:else}
	<a
		use:ripple={{ startColor: 'currentColor' }}
		use:tooltip={{ disabled: !Boolean(message), message }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square
		class:nopointer
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
		{href}
	>
		{#if icon}
			<span class:dim={$$slots.default}>
				<Icon name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span>
				<slot />
			</span>
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
		font-weight: 450;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		transition: all 0.15s ease-out;

		&:hover {
			background-color: var(--hover-bg-color);
			color: var(--hover-color);
			/* border-radius: 0.8em; */
			/* outline-color: var(--outline-color); */
		}

		&:focus {
			outline-color: var(--outline-color);
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
			opacity: 0.5;
			pointer-events: none;
			cursor: default;
		}

		&.nopointer {
			pointer-events: none;
			cursor: default;
		}
	}

	span {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		height: 100%;
		padding-bottom: 0.1em;

		&:not(:first-child) {
			margin-left: 0.5em;
		}
	}

	.dim {
		opacity: 0.5;
	}

	/* Display */

	.block {
		display: flex;
		width: 100%;
	}

	.inline {
		display: inline-flex;
	}

	.square {
		justify-content: center;
		width: var(--size);
		padding: 0;
	}

	/* Variants (should correspond to `typeof variant`) */

	.normal {
		--hover-color: var(--color-primary-900);
		--hover-bg-color: var(--color-primary-300);
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-light-900);
		--outline-color: rgba(0, 0, 20, 0.2);
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
		--hover-color: var(--color-primary-700);
		--hover-bg-color: rgba(var(--rgb-primary-500), 0.1);
		--active-color: var(--color-dark-100);
		--active-bg-color: rgba(var(--rgb-primary-900), 0.1);
		--outline-color: var(--color-light-900);
		color: var(--color-primary-500);
		background-color: transparent;
	}

	/* Text alignment */

	.left {
	}

	.center {
	}

	.right {
	}
</style>
