<script context="module" lang="ts">
	/* Kinds */
	export const buttonKinds = ['normal', 'secondary', 'cta'] as const;
	export type ButtonKind = typeof buttonKinds[number];
	/* Sizes */
	export const buttonSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const;
	export type ButtonSize = typeof buttonSizes[number];
	/* Icon positions */
	export const buttonIconPositions = ['left', 'right'] as const;
	export type ButtonIconPosition = typeof buttonIconPositions[number];
</script>

<script lang="ts">
	import { ripple } from '$actions/ripple';
	import type { IconName } from './Icon.svelte';
	import Icon from './Icon.svelte';
	export let kind: ButtonKind = 'normal';
	export let size: ButtonSize = 'medium';
	export let icon: IconName = null;
	export let iconPosition: ButtonIconPosition = 'left';
	export let square: boolean = false;
	export let href: string = null;
	export let active: boolean = false;
	export let tooltip: string = null;
</script>

{#if !href}
	<button
		use:ripple
		on:click
		on:focus
		{...$$restProps}
		class="{kind} {size}"
		class:square={!$$slots.default || square}
	>
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if $$slots.default}
			<span class="label">
				<slot />
			</span>
		{/if}
	</button>
{:else}
	<a on:click on:focus {...$$restProps} class="{kind} {size}" class:square={!$$slots.default || square} {href}>
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
