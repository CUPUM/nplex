<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';
	import type { SvelteProps } from '$utils/helpers/types';
	import Icon from './Icon.svelte';

	export let variant: 'normal' | 'secondary' | 'cta' = 'normal';
	export let size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
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
		class="{variant} {size} {display} {textAlign}"
		class:square={!$$slots.default || square}
		class:active
		class:warning
		disabled={disabled || loading}
		{...$$restProps}
	>
		{#if icon}
			<span class="icon {iconPosition}">
				<Icon name={icon} />
			</span>
		{/if}
		{#if $$slots.default}
			<span class="label">
				<slot />
			</span>
		{/if}
	</button>
{:else}
	<a on:click on:focus {...$$restProps} class="{variant} {size}" class:square={!$$slots.default || square} {href}>
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if $$slots.default}
			<span class="label">
				<slot />
			</span>
		{/if}
	</a>
{/if}

<!-- <style lang="postcss">
	button,
	a {
		--height: 2.5em;
		height: var(--height);
		user-select: none;
		position: relative;
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		padding-block: 0;
		padding-inline: 1em;
		margin: 0;
		font-family: var(--font-misc);
		font-weight: 600;
		letter-spacing: 0.02em;
		border: none;
		border-radius: 0.9em;
		overflow: hidden;
	}

	span {
		position: relative;
		top: -1px;
	}

	.square {
		width: var(--height);
		padding: 0;
	}

	/* Sizes */
	.xsmall {
	}
	.small {
		font-size: var(--size-small);
	}
	.medium {
		font-size: var(--size-medium);
	}
	.large {
		font-weight: 550;
		font-size: var(--size-large);
	}
	.xlarge {
	}

	/* Kinds */
	.normal {
		--color: var(--color-dark-700);
		--background: var(--color-light-500);
	}
	.secondary {
		--color: purple;
		--background: lightblue;
	}
	.cta {
		--color: purple;
		--background: lightblue;
	}
</style> -->
