<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple/Ripple.svelte';
	import * as styles from './Button.css';

	export let href: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let variant: keyof typeof styles.button = 'default';
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let square: boolean | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let active: boolean | undefined = false;
	export let display: 'inline' | 'block' = 'block';
	export let contentAlign: 'left' | 'center' | 'right' = 'center';
	export let value: string | undefined = undefined;
	export let form: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let formaction: string | undefined = undefined;
	export let tabindex: number | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
	export let style: string | undefined = undefined;

	let buttonRef;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svelte:element
	this={href && !disabled ? 'a' : 'button'}
	bind:this={buttonRef}
	{style}
	class={styles.button[variant]}
	class:compact
	{disabled}
	{href}
	{id}
	{type}
	{value}
	{form}
	{title}
	{tabindex}
	{formaction}
>
	<Ripple />
	{#if $$slots.leading}
		<div class={styles.leading}>
			<slot name="leading" />
		</div>
	{/if}
	<div class={styles.main}>
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class={styles.trailing}>
			<slot name="trailing" />
		</div>
	{/if}
	{#if loading}
		<slot name="loading">
			<Loading color="currentColor" />
		</slot>
	{/if}
</svelte:element>

<style lang="scss">
	// .outer {
	// 	--radius-ratio: var(--ctx-radius-ratio, 1);
	// 	--height-ratio: 3;
	// 	--computed-height: calc((var(--height-ratio) * var(--size)) - (2 * var(--inset, 0px)));
	// 	--computed-size: calc(var(--computed-height) / var(--height-ratio));
	// 	--computed-radius: calc(var(--radius-ratio) * var(--computed-size));
	// 	// Use font-size: --computed-size in nested elements only else this messes with calcs when --size has "em" unit...
	// 	font-size: var(--size);
	// 	position: relative;
	// 	display: grid;
	// 	grid-template-columns:
	// 		[leading-start]
	// 		auto
	// 		[leading-end content-start]
	// 		1fr
	// 		[content-end trailing-start]
	// 		auto
	// 		[trailing-end];
	// 	flex-direction: row;
	// 	align-items: center;
	// 	font-weight: 400;
	// 	line-height: 1em;
	// 	padding: 0 1.5em;
	// 	margin: 0;
	// 	gap: 0;
	// 	cursor: pointer;
	// 	border-radius: var(--computed-radius);
	// 	height: var(--computed-height);
	// 	flex-wrap: nowrap;
	// 	white-space: nowrap;
	// 	border: none;
	// 	font-family: inherit;

	// 	&.fullwidth {
	// 		width: 100%;
	// 	}

	// 	&.compact {
	// 		--height-ratio: 2;
	// 		padding: 0.75em;
	// 	}

	// 	&.has-leading,
	// 	&.has-trailing {
	// 		padding: 0 1em;

	// 		&.center {
	// 			grid-template-columns:
	// 				[leading-start]
	// 				1fr
	// 				[leading-end content-start]
	// 				auto
	// 				[content-end trailing-start]
	// 				1fr
	// 				[trailing-end];
	// 		}
	// 	}

	// 	&.square {
	// 		flex: none;
	// 		aspect-ratio: 1 / 1;
	// 		padding: 0;
	// 		justify-content: center;

	// 		&.content {
	// 			justify-self: stretch;
	// 		}
	// 	}

	// 	&:disabled {
	// 		transform: scale(0.99);
	// 		pointer-events: none;
	// 		&:not(.loading) {
	// 			opacity: 0.5;
	// 		}
	// 	}

	// 	&.warning {
	// 		outline-width: 2px;
	// 		outline-color: var(--color-error-300);
	// 		background-color: var(--color-error-100);
	// 	}

	// 	&.active:not(:global([popover])) {
	// 		pointer-events: none;
	// 	}

	// 	&:active {
	// 		transform: scale(0.96);
	// 	}

	// 	&.loading {
	// 		transform: scale(0.98);
	// 		.content,
	// 		.leading,
	// 		.trailing {
	// 			opacity: 0.25;
	// 		}
	// 	}
	// }

	// .ripple {
	// 	pointer-events: none;
	// 	position: absolute;
	// 	border-radius: inherit;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 100%;
	// }

	// .content {
	// 	font-size: var(--computed-size);
	// 	max-height: 100%;
	// 	position: relative;
	// 	top: -0.1em;
	// 	padding: 0;
	// 	margin: 0;
	// 	display: block;
	// 	grid-column: content;
	// 	text-overflow: ellipsis;
	// 	.center & {
	// 		text-align: center;
	// 	}
	// 	.left & {
	// 		text-align: left;
	// 	}
	// 	.right & {
	// 		text-align: right;
	// 	}
	// }

	// .leading,
	// .trailing {
	// 	font-size: var(--computed-size);
	// 	max-height: 100%;
	// 	position: relative;
	// 	top: -0.1em;
	// 	padding: 0;
	// 	margin: 0;
	// 	display: block;
	// }
	// .leading {
	// 	text-align: left;
	// 	grid-column: leading;
	// 	&:not(:empty) {
	// 		padding-right: 0.75em;
	// 	}
	// }
	// .trailing {
	// 	text-align: right;
	// 	grid-column: trailing;
	// 	&:not(:empty) {
	// 		padding-left: 0.75em;
	// 	}
	// }

	// //
	// // Variants
	// //

	// .default {
	// 	color: var(--color-dark-900);
	// 	background-color: white;
	// 	box-shadow: 0 0.5em 2em -1em transparent;
	// 	transition: box-shadow 0.25s ease-out;

	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		color: var(--color-light-300);
	// 		background-color: var(--color-dark-700);
	// 		box-shadow: 0 1em 2em -1.2em var(--color-dark-900);
	// 	}

	// 	&:active:not([popover]) {
	// 		color: white;
	// 		background-color: var(--color-primary-300);
	// 		box-shadow: 0 1em 2em -1em var(--color-primary-700);
	// 	}
	// }

	// .secondary {
	// 	color: var(--color-dark-900);
	// 	background-color: transparent;
	// 	box-shadow: inset 0 0 0 1px rgba(var(--rgb-dark-500), 0.2);

	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		color: var(--color-dark-900);
	// 		background-color: rgba(var(--rgb-dark-100), 0.1);
	// 		box-shadow: inset 0 0 0 3px rgba(var(--rgb-dark-500), 0);
	// 	}
	// }

	// .cta {
	// 	color: var(--color-light-100);
	// 	background-color: var(--color-primary-500);
	// 	box-shadow: 0 0.5em 1em -0.5em rgba(var(--rgb-dark-700), 0);
	// 	transition: all 0.35s ease-out;
	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		color: white;
	// 		background-color: var(--color-primary-900);
	// 		box-shadow: 0 1em 1.25em -.75em rgba(var(--rgb-primary-700), 0.5);
	// 		transition: background-color .1s, box-shadow 0.2s ease-out;
	// 	}
	// 	&.active:not([popover]) {
	// 		color: var(--color-primary-900);
	// 		background-color: var(--color-primary-300);
	// 	}
	// }

	// .ghost {
	// 	color: var(--color-dark-300);
	// 	background-color: transparent;

	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		color: var(--color-primary-700);
	// 		background-color: rgba(var(--rgb-primary-300), 0.1);
	// 	}

	// 	&.active {
	// 		color: var(--color-primary-300);
	// 		background-color: rgba(var(--rgb-primary-100), 0.1);
	// 	}
	// }

	// .nav {
	// 	--radius-ratio: 1.5;
	// 	padding: 0 1.25em;
	// 	font-weight: 500;
	// 	color: var(--color-dark-900);
	// 	background-color: transparent;

	// 	.content {
	// 		transition: transform 0.2s cubic-bezier(0.25, 2.25, 0.75, 0.5);
	// 	}

	// 	&::after {
	// 		content: '';
	// 		opacity: 0;
	// 		position: absolute;
	// 		bottom: 0em;
	// 		left: 50%;
	// 		width: 8px;
	// 		height: 2px;
	// 		background-color: currentColor;
	// 		border-radius: 3px;
	// 		transform: translate(-50%, -0.1em);
	// 		transition: opacity 0.2s, width 0.15s cubic-bezier(0, 0, 0, 1),
	// 			transform 0.35s cubic-bezier(0.25, 2.25, 0.75, 0.5);
	// 	}
	// 	&.square::after {
	// 		display: none;
	// 	}

	// 	// prettier-ignore
	// 	@at-root :global(.button-parent:hover) &,
	// 	&:hover:not(.active),
	// 	&:global([popover]) {
	// 		color: var(--color-dark-900);
	// 		background-color: rgba(var(--rgb-dark-100), 0.1) !important;

	// 		&::after {
	// 			opacity: 1;
	// 			transform: translate(-50%, -.5em);
	// 		}

	// 		& .content {
	// 			transform: translateY(-0.07em);
	// 		}
	// 	}

	// 	&.active:not([popover]) {
	// 		color: var(--color-primary-500);

	// 		&::after {
	// 			opacity: 1;
	// 			height: 5px;
	// 			width: 5px;
	// 			transform: translate(-50%, -0.25em);
	// 		}
	// 	}
	// }

	// .nav-cta {
	// 	--radius-ratio: 1.5;
	// 	background-color: var(--color-primary-500);
	// 	color: var(--color-light-100);
	// 	font-weight: 500;
	// 	box-shadow: 0 0.5em 1em -0.5em rgba(0, 0, 0, 0);
	// 	transition: background-color 0.15s, border-radius 0.2s cubic-bezier(0.25, 0, 0, 1), box-shadow 0.2s ease-out;

	// 	:global(.button-parent:hover) &,
	// 	&:hover,
	// 	&:global([popover]) {
	// 		box-shadow: 0 0.5em 1em -0.5em var(--color-primary-700);
	// 		background-color: var(--color-primary-900);
	// 		color: white;
	// 		--radius-ratio: 1.2;
	// 	}
	// }
</style>
