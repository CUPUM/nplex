<script lang="ts" context="module">
	export const BUTTON_GROUP_CLASS = 'button-group';
</script>

<script lang="ts">
	import { ICON_CLASSES } from '$components/Icon.svelte';

	import Ripple from '$components/Ripple.svelte';

	export let href: string | undefined = undefined;
	export let current: boolean | undefined = undefined;
	export let cta: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let equi: boolean | undefined = undefined;
	export let round: boolean | undefined = undefined;
	export let active: boolean | undefined = undefined;
	export let group: string | undefined = undefined;
</script>

<svelte:element
	this={typeof href === 'string' ? 'a' : 'button'}
	class="navbar-button {ICON_CLASSES.HOVER} {active || current ? ICON_CLASSES.HOLD : ''}"
	class:cta
	class:current
	class:active
	class:disabled
	class:equi
	class:round
	data-group={group}
	aria-disabled={disabled}
	{href}
	on:pointerdown
>
	<Ripple color="var(--color-primary-500)" />
	<div class="inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	.navbar-button {
		--bradius: calc(var(--radius, var(--ui-radius-md)) - var(--inset, 0px));
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 500;
		padding: 0 1.25em;
		height: calc(var(--ui-height) - 2 * var(--inset, 0px));
		border-radius: var(--bradius);
		letter-spacing: 0.02em;
		line-height: 1;
		color: col(fg, 700);
		background: col(bg, 100, 0.8);
		outline: 0px dashed transparent;
		outline-offset: 0px;
		transition: all 0.1s, box-shadow 0.25s ease-out;
		backdrop-filter: blur(12px);
		&:hover,
		&.active,
		&:active {
			color: col(bg, 500);
			background: col(fg, 100, 0.95);
		}
		&.current:not(.active) {
			cursor: default;
			color: col(primary, 500);
			// background: col(bg, 100, 0.7);
		}
	}
	.inner {
		position: relative;
		height: 1.3em;
	}
	.disabled {
		pointer-events: none;
		opacity: 0.25;
	}
	.equi {
		aspect-ratio: 1;
		padding: 0;
	}

	.round {
		aspect-ratio: 1;
		padding: 0;
		border-radius: 50%;
	}

	// :global(.button-group) .navbar-button {
	// 	&:not(:first-of-type) {
	// 		border-top-left-radius: 0; // calc(var(--bradius) * 0.25);
	// 		border-bottom-left-radius: 0; // calc(var(--bradius) * 0.25);
	// 	}
	// 	&:not(:last-of-type) {
	// 		border-top-right-radius: 0; // calc(var(--bradius) * 0.25);
	// 		border-bottom-right-radius: 0; // calc(var(--bradius) * 0.25);
	// 	}
	// }

	// Call-to-action variant
	.cta {
		color: col(bg, 100);
		background: col(fg, 500, 0.9);
		&:hover,
		&.active,
		&:active {
			color: col(primary, 700);
			background: col(primary, 100, 0.5);
		}
	}
</style>
