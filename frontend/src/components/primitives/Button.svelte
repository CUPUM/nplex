<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { tooltip } from '$actions/tooltip';

	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' | 'nav' = 'normal';
	export let size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let display: 'inline' | 'block' = 'inline';
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
		use:ripple={{ startColor: 'currentColor' }}
		use:tooltip={{ disabled: !Boolean(message), message }}
		on:click
		on:focus
		on:mouseenter
		on:mouseleave
		class:active
		class:warning
		class:square
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
	>
		<div>
			<slot />
		</div>
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
		class="{variant} {display} {contentAlign}"
		style:font-size="var(--size-{size})"
		disabled={disabled || loading}
		{...$$restProps}
		{href}
	>
		<div>
			<slot />
		</div>
	</a>
{/if}

<style lang="postcss">
	button,
	a {
		/* Base */
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border: none;
		text-decoration: none;
		height: 3em;
		min-height: 3em;
		min-width: 3em;
		border-radius: 1.2em;
		padding-block: 0;
		padding-inline: 1em;
		margin: 0;
		font-family: var(--font-main);
		font-weight: 400;
		outline-width: 2px;
		outline-style: solid;
		outline-color: transparent;
		transition: all 0.15s ease-out;

		&:hover {
			backgrond-color: var(--hover-bg-color);
			color: var(--hover-color);
			border-radius: 1em;
			/* outline-color: var(--outline-color); */
		}

		&:focus {
			outline-color: var(--outline-color);
		}

		&.active {
			background-color: var(--active-bg-color);
			background-color: var(--active-color);
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
	}

	div {
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
		width: 3em;
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
	}

	/* Text alignment */

	.left {
	}

	.center {
	}

	.right {
	}
</style>
