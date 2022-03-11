<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import type { SvelteProps } from '$utils/helpers/types';
	import Icon from './Icon.svelte';

	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' | 'nav' = 'normal';
	export let size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let text: string = undefined;
	export let textAlign: 'left' | 'center' | 'right' = 'center';
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
</script>

{#if !href}
	<button
		use:ripple
		use:tooltip={{ enabled: Boolean(message), message }}
		on:click
		on:focus
		class="{variant} {size} {display} text-{textAlign}"
		class:square={!text || square}
		class:active
		class:warning
		disabled={disabled || loading}
		{...$$restProps}
	>
		{#if icon}
			<div class="icon icon-{iconPosition}">
				<Icon size="100%" name={icon} />
			</div>
		{/if}
		{#if text}
			<div class="text">
				{text}
			</div>
		{/if}
	</button>
{:else}
	<a
		use:ripple
		use:tooltip={{ enabled: Boolean(message), message }}
		on:click
		on:focus
		class="{variant} {size} {display} text-{textAlign}"
		class:square={!text || square}
		class:active
		class:warning
		disabled={disabled || loading}
		{...$$restProps}
		{href}
	>
		{#if icon}
			<div class="icon icon-{iconPosition}">
				<Icon size="100%" name={icon} />
			</div>
		{/if}
		{#if text}
			<div class="text">
				{text}
			</div>
		{/if}
	</a>
{/if}

<style lang="postcss">
	button,
	a {
		/* Unsetting defaults */
		all: unset;
		/* Base */
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		white-space: nowrap;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: middle;
		/* Testing */
		font-size: var(--size-small);
		--size: 2.8em;
		height: var(--size);
		min-height: var(--size);
		min-width: var(--size);
		border-radius: 1.2em;
		padding-block: 0;
		padding-inline: 0.8em;
		margin: 0.25rem;
		font-family: var(--font-main);
		font-weight: 500;
		background-color: var(--color-primary-300);
		transition: all 0.15s ease-out;

		/* Misc */

		&:hover,
		&:focus {
		}

		&.active {
		}

		&.warning {
		}

		&:disabled {
			pointer-events: none;
			cursor: default;
		}

		&:active {
			color: var(--color);
		}
	}

	.text {
		position: relative;
		display: inline-block;
		top: -0.05em;
		vertical-align: middle;
	}

	.icon {
		position: relative;
		display: inline-block;
		top: -0.15em;
		vertical-align: middle;
		width: 1.2em;
		height: 1.2em;
		overflow: hidden;
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

	/* Variants */

	.normal {
	}

	.secondary {
	}

	.cta {
	}

	.nav {
	}

	/* Sizes */

	.xsmall {
	}

	.small {
	}

	.medium {
	}

	.large {
	}

	.xlarge {
	}

	/* Text alignment */

	.text-left {
	}

	.text-center {
	}

	.text-right {
	}

	/* Icon position */

	.icon-left {
	}

	.icon-right {
	}
</style>
