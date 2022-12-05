<script lang="ts" context="module">
</script>

<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let href: string | undefined = undefined;
	export let current: boolean | undefined = undefined;
	export let cta: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let equi: boolean | undefined = undefined;
	export let active: boolean | undefined = undefined;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="navbar-button"
	class:cta
	class:current
	class:active
	class:disabled
	class:equi
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
		--radius: var(--radius-parent, var(--ui-radius-md));
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-weight: 500;
		padding: 0 1.25em;
		height: calc(3.5em - 2 * var(--inset, 0px));
		// border-radius: calc(var(--radius-parent, var(--ui-radius-md)) - var(--inset, 0px));
		border-radius: calc(var(--radius) - var(--inset-sum));
		letter-spacing: 0.02em;
		color: col(fg, 900);
		outline: 0px dashed transparent;
		outline-offset: 0px;
		transition: all 0.15s cubic-bezier(0, 0, 0, 1), box-shadow 0.25s ease-out;
		// &::after {
		// 	content: '';
		// 	opacity: 0;
		// 	position: absolute;
		// 	bottom: 0em;
		// 	left: 50%;
		// 	width: 8px;
		// 	height: 2px;
		// 	background: currentColor;
		// 	border-radius: 2px;
		// 	transform: translate(-50%, -0.1em);
		// 	transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
		// 		transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
		// }
		&:hover,
		&.active,
		&:active {
			color: col(primary, 900);
			background: col(primary, 100, 0.2);
			// &::after {
			// 	opacity: 1;
			// 	transform: translate(-50%, -0.4em);
			// }
			.inner {
				// transform: translateY(-0.08em);
			}
		}
		&:where(.current) {
			color: col(fg, 100);
			// 	&::after {
			// 		opacity: 1;
			// 		height: 4px;
			// 		width: 4px;
			// 		transform: translate(-50%, -0.5em);
			// 	}
		}
	}
	.inner {
		position: relative;
		display: flex;
		align-items: center;
		padding-bottom: calc(0.5em - 0.5ex);
		transition: all 0.15s ease-out;
	}
	.disabled {
		pointer-events: none;
		opacity: 0.25;
		transform: scale(0.98);
	}
	.equi {
		aspect-ratio: 1;
		padding: 0;
		border-radius: 50%;
		&::after {
			display: none;
		}
	}

	// Call-to-action variant
	.cta {
		// color: rgb(220, 225, 230);
		color: col(bg, 500);
		background: col(primary, 500);
		&:hover,
		&.active,
		&:active {
			// color: white;
			color: col(bg, 100);
			background: col(primary, 700);
		}
	}
</style>
