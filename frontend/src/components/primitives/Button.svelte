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
		class:square={square || !$$slots.default}
		class:nopointer
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
	>
		{#if icon}
			<span class="icon" class:dim={$$slots.default}>
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span class="text">
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
		use:tooltip={{ disabled: !Boolean(message), message }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square={square || !$$slots.default}
		class:nopointer
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
		{href}
	>
		{#if icon}
			<span class="icon" class:dim={$$slots.default}>
				<Icon size={$$slots.default ? '1em' : '1.2em'} name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span class="text">
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
		outline-width: 1px;
		outline-style: solid;
		outline-color: transparent;
		overflow: hidden;
		transition: all 0.15s ease-out;

		&:hover {
			background-color: var(--hover-bg-color);
			color: var(--hover-color);
			/* border-radius: 0.8em; */
		}

		&:focus {
			/* border-radius: 0.8em; */
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
	}

	span {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		height: 100%;

		&.text {
			top: -0.1em;
		}

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
		--active-color: var(--color-primary-900);
		--active-bg-color: var(--color-primary-300);
		color: var(--color-primary-500);
		background-color: transparent;
		/* font-family: var(--font-misc); */
		/* font-weight: 600;
		letter-spacing: 0.25px; */
	}

	/* Content alignment */

	.left {
	}

	.center {
		justify-content: center;
	}

	.right {
	}
</style>
