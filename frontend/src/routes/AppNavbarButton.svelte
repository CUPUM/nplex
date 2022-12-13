<script lang="ts" context="module">
	export const BUTTON_GROUP_CLASS = 'button-group';
</script>

<script lang="ts">
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
	this={href ? 'a' : 'button'}
	class="navbar-button"
	class:cta
	class:current
	class:active
	class:disabled
	class:equi
	class:round
	aria-disabled={disabled}
	{href}
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
		color: col(fg, 700);
		outline: 0px dashed transparent;
		outline-offset: 0px;
		transition: all 0.15s cubic-bezier(0, 0, 0, 1), box-shadow 0.25s ease-out;
		backdrop-filter: blur(10px);
		background: col(bg, 700, 0.5);
		&:hover,
		&.active,
		&:active {
			color: col(primary, 900);
			background: col(primary, 100, 0.5);
		}
		&.current:not(.active) {
			cursor: default;
			color: col(primary, 500);
			background: col(bg, 100, 0.7);
		}
	}
	.inner {
		position: relative;
		align-items: center;
		height: 1.6em;
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
