<script lang="ts" context="module">
</script>

<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let href: string | undefined = undefined;
	export let current: boolean | undefined = undefined;
	export let cta: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let square: boolean | undefined = undefined;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="navbar-button"
	class:cta
	class:current
	class:disabled
	class:square
	aria-disabled={disabled}
	{href}
>
	<Ripple color="var(--color-primary-300)" opacityStart={1} />
	<div class="inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.navbar-button {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 500;
		margin: 0;
		padding: 0 1.25em;
		min-height: 3em;
		border-radius: 1em;
		letter-spacing: 0.02em;
		color: var(--color-contrast-100);
		border: none;
		transition: all 0.15s cubic-bezier(0, 0, 0, 1), box-shadow 0.25s ease-out;
		&::after {
			content: '';
			opacity: 0;
			position: absolute;
			bottom: 0em;
			left: 50%;
			width: 6px;
			height: 2px;
			background-color: currentColor;
			border-radius: 3px;
			transform: translate(-50%, -0.1em);
			transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
				transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.current)):hover {
			color: var(--color-contrast-900);
			background-color: rgba(var(--rgb-contrast-100), 0.1);
			&::after {
				opacity: 1;
				transform: translate(-50%, -0.5em);
			}
			.inner {
				transform: translateY(-0.07em);
			}
		}
		&:active,
		&:global(.current) {
			color: var(--color-primary-500);
			&::after {
				opacity: 1;
				height: 4px;
				width: 4px;
				transform: translate(-50%, -0.25em);
			}
		}
	}
	.inner {
		position: relative;
		display: flex;
		align-items: center;
		transition: all 0.15s ease-out;
	}
	.disabled {
		pointer-events: none;
		opacity: 0.25;
		transform: scale(0.98);
	}
	.square {
		aspect-ratio: 1;
		padding: 0;
	}

	// Call-to-action variant
	.cta {
		color: var(--color-base-500);
		background-color: var(--color-primary-500);
		:global(.hover-source:hover) &:global(.hover-target),
		&:global(:not(.active)):hover {
			color: var(--color-base-000);
			background-color: var(--color-primary-700);
			box-shadow: 0 0.5em 1em -0.5em var(--color-primary-300);
		}
	}
</style>
