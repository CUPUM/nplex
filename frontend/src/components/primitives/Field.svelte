<script lang="ts" context="module">
	const CTX_KEY = 'field-context-key';

	export interface FieldContext {
		value: Writable<string>;
		inputRef: Writable<HTMLInputElement>;
	}

	export function getFieldContext() {
		return getContext<FieldContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { cssSize } from '$utils/css';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let id: string = undefined;
	export let value: string = '';
	export let prefix: string = '';
	export let suffix: string = '';
	export let name: string = undefined;
	export let size: string | number = '1em';
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let variant: 'default' | 'outlined' | 'ghost' = 'default';
	export let required: boolean = undefined;
	export let disabled: boolean = undefined;
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let invalid: boolean = undefined;
	export let maxlength: number = undefined;
	export let minlength: number = undefined;
	export let placeholder: string = '';
	export let leadingSeparator: boolean = false;
	export let trailingSeparator: boolean = false;
	export let pattern: RegExp = undefined;
	export let format: (value: string) => string = undefined;
	let className: string = undefined;
	export { className as class };

	const _value = writable(value);
	$: value = $_value;
	$: _value.set(value);

	let inputRef = writable<HTMLInputElement>(null);
	let leadingWidth = 0;
	let labelWidth = 0;
	let focused = false;
	let focusedOnce = false;

	function checkValidity() {
		invalid = !value
			? false
			: pattern
			? !$inputRef.checkValidity()
			: minlength
			? !($inputRef.value.length >= minlength)
			: maxlength
			? !($inputRef.value.length <= maxlength)
			: undefined;
		// success = pattern || minlength || maxlength ? !invalid : undefined;
	}

	function handleInput(e) {
		value = format ? format(e.target.value) : e.target.value;
	}

	function focus() {
		$inputRef?.focus();
	}

	function handleFocus() {
		focused = true;
		invalid = undefined;
		success = undefined;
	}

	function handleBlur(e: FocusEvent) {
		focused = false;
		checkValidity();
	}

	setContext<FieldContext>(CTX_KEY, {
		value: _value,
		inputRef,
	});
</script>

<div
	class="outer {variant} {className}"
	style:--size={cssSize(size)}
	class:focused
	class:warning
	class:success
	class:disabled
	class:invalid
	class:has-value={value !== ''}
	class:has-placeholder={placeholder !== ''}
	class:has-label={$$slots.label}
	style:--leading-width="{leadingWidth}px"
	style:--label-width="{labelWidth}px"
	on:click={focus}
>
	<div class="inner">
		{#if $$slots.leading && $inputRef}
			<div class="leading" bind:clientWidth={leadingWidth}>
				<slot name="leading" />
			</div>
		{/if}
		<div class="main">
			{#if $$slots.label}
				<label for={id} bind:clientWidth={labelWidth}>
					<slot name="label" />
				</label>
			{/if}
			{#if prefix}
				<span class="prefix">{prefix}</span>
			{/if}
			<input
				bind:this={$inputRef}
				class="input"
				{type}
				{name}
				{placeholder}
				{value}
				{maxlength}
				{minlength}
				{disabled}
				{required}
				readonly={!focusedOnce}
				pattern={pattern ? pattern.source : undefined}
				use:inputOnReset
				on:change
				on:reset
				on:input
				on:focus
				on:blur
				on:input={handleInput}
				on:focus={handleFocus}
				on:focus|once={() => (focusedOnce = true)}
				on:blur={handleBlur}
			/>
			{#if suffix}
				<span class="suffix">{suffix}</span>
			{/if}
		</div>
		{#if $$slots.trailing && $inputRef}
			<div class="trailing">
				<slot name="trailing" />
			</div>
		{/if}
		<div class="outline">
			<div class="tl" />
			<div class="tr" />
			<div class="t" />
			<div class="b" />
		</div>
	</div>
</div>

<style lang="scss">
	// Outer element extendable by class prop.
	.outer {
		--inset: 3px;
		--radius-ratio: 1;
		--ctx-radius-ratio: var(--radius-ratio);
		--height-ratio: 3;
		--computed-height: calc(var(--size) * var(--height-ratio));
		--computed-radius: calc(var(--size) * var(--radius-ratio));
		font-size: var(--size);
		position: relative;
		height: var(--computed-height);
		border-radius: var(--computed-radius);
		padding: 0;
		margin: 0;

		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&.warning {
			// color: red !important;
			// background-color: rgba(var(--rgb-error-100), 0.1);
		}

		&.invalid {
			color: var(--color-error-700) !important;
			background-color: rgba(var(--rgb-error-100), 0.1) !important;
		}

		&.success {
			color: var(--color-success-700) !important;
			background-color: rgba(var(--rgb-success-100), 0.1) !important;
		}
	}

	.inner {
		position: relative;
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns:
			[leading-start]
			auto
			[leading-end main-start]
			minmax(0, 1fr)
			[main-end trailing-start]
			auto
			[trailing-end];
		padding: 0;
		margin: 0;
		gap: 0;
		border-radius: inherit;
		flex-direction: row;
		align-items: center;
	}

	.leading,
	.trailing {
		height: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex: 0 1 auto;
		align-items: center;
		transition: padding 0.25s ease-in-out;

		&:not(:empty) {
			gap: 3px;
			padding: 0 var(--inset);
		}
	}

	.leading {
		grid-column: leading;
	}

	.trailing {
		grid-column: trailing;
	}

	.main {
		flex: 0 1 auto;
		position: relative;
		grid-column: main;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: text;
		height: 100%;
		padding: 0 1.25em;
		margin: 0;
		top: -0.1em;
		transition: all 0.25s cubic-bezier(0.25, 0, 0, 1);
	}

	.prefix,
	.suffix {
		flex: 0;
		white-space: pre;
		display: inline-block;
		opacity: 0;
		transform: translateY(0.25em);
		transition: all 0.25s cubic-bezier(0.25, 0, 0, 1);

		.focused &,
		:not(.focused):not(.has-label) & {
			transform: translateY(0);
			opacity: 0.5;
		}
	}

	input {
		flex: 1;
		font-family: inherit;
		font-size: inherit;
		border-radius: inherit;
		border: none;
		outline: none;
		background: transparent;
		height: 2em;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 0;
		margin: 0;
		color: currentColor;

		&::placeholder {
			color: currentColor;
			opacity: 0.35;
		}

		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			transition: background-color 5000s ease-in 0s;
		}
	}

	label {
		user-select: none;
		cursor: text;
		position: absolute;
		grid-column: main;
		line-height: 1em;
		top: 1em;
		white-space: nowrap;
		overflow: hidden;
		max-width: calc(100% - 2.4 * var(--size));
		text-overflow: ellipsis;
		transition: all 0.25s cubic-bezier(0.25, 0, 0, 1);
	}

	.outline {
		--label-padding: 0em;
		--thickness: 1px;
		.has-label & {
			--label-padding: 0.5em;
		}
		pointer-events: none;
		position: absolute;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns:
			[full-start left-start]
			calc(1.25em + var(--leading-width) - var(--label-padding))
			// Keep leftmost value in sync with .main inline-padding.
			[left-end top-start]
			calc(var(--label-width) + 2 * var(--label-padding))
			[top-end right-start]
			auto
			[right-end full-end];
		transition: all 0.15s ease-out;

		.tl,
		.tr,
		.t,
		.b {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			border-width: var(--thickness);
			border-style: solid;
			transition: border-width 0.25s ease-in-out;
		}

		.tl {
			grid-column: left;
			border-top-left-radius: inherit;
			border-right-width: 0;
			border-color: currentColor transparent transparent transparent;
		}

		.tr {
			grid-column: right;
			border-left-width: 0;
			border-top-right-radius: inherit;
			border-color: currentColor transparent transparent transparent;
		}

		.t {
			justify-self: right;
			grid-column: top;
			border-inline-width: 0;
			border-color: currentColor transparent transparent transparent;
			transition: width 0.15s ease-out;
		}

		.b {
			grid-column: full;
			border-radius: inherit;
			border-color: transparent currentColor currentColor currentColor;
		}
	}

	//
	// Variants
	//

	.default {
		color: var(--color-dark-300);
		background-color: rgba(var(--rgb-light-900), 0.35);
		backdrop-filter: blur(10px);
		transition: background-color 0.1s ease-out;
		.outline {
			opacity: 0;
			color: var(--color-primary-500);
			& > *:not(.base) {
				display: none;
			}
			.base {
				border-color: currentColor;
			}
		}
		label {
			opacity: 0;
			top: 0.5em;
			font-size: clamp(10px, 0.5em, 24px);
		}
		&:not(.has-placeholder):not(:hover):not(.focused):not(.has-value) {
			label {
				opacity: 0.35;
				top: 1em;
				font-size: var(--size);
			}
			.prefix,
			.suffix {
				opacity: 0;
			}
		}
		&:hover {
			background-color: rgba(var(--rgb-light-900), 0.5);
			.outline {
				// opacity: 0.5;
			}
			&.has-label {
				.main {
					top: 0.15em;
				}
				label {
					opacity: 0.35;
					top: 0.35em;
				}
			}
		}
		&.focused {
			color: var(--color-dark-900);
			background-color: rgba(255, 255, 255, 0.9);
			.outline {
				opacity: 0.75;
			}
			&.has-label {
				.main {
					top: 0.15em;
				}
			}
			label {
				opacity: 0.35;
				top: 0.35em;
			}
		}
	}

	.outlined {
		color: var(--color-dark-300);
		background-color: transparent;
		.outline {
			opacity: 0.25;
		}
		label {
			opacity: 0.5;
		}
		&.has-placeholder,
		&.has-value:hover {
			label {
				top: -0.3em;
				font-size: clamp(10px, 0.5em, 24px);
			}
			.outline {
				.t {
					width: 0;
				}
			}
		}
		&.has-value {
			label {
				top: 0em;
				font-size: clamp(10px, 0.5em, 24px);
				opacity: 0;
			}
		}
		&.has-placeholder,
		&.has-label {
			&:not(.has-value):not(.focused) {
				.prefix,
				.suffix {
					opacity: 0;
				}
			}
		}
		&:hover {
			.outline {
				opacity: 0.5;
			}
			label {
				opacity: 0.75;
			}
		}
		&.focused {
			.outline {
				opacity: 1;
				.t {
					width: 0;
				}
			}
			label {
				font-size: clamp(10px, 0.5em, 24px);
				opacity: 1;
				top: -0.3em;
			}
		}
	}
</style>
