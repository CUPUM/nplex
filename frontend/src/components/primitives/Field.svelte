<script lang="ts" context="module">
	export interface FieldContext {
		showPassword: Writable<boolean>;
		reset: () => void;
		getInputRef: () => HTMLInputElement;
		initialValue: any;
	}
</script>

<script lang="ts">
	import { inputOnReset } from '$actions/inputOnReset';
	import { cssSize } from '$utils/css';
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

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
	export let readonly: boolean = undefined;
	export let placeholder: string = '';
	export let leadingSeparator: boolean = false;
	export let trailingSeparator: boolean = false;
	export let pattern: RegExp = undefined;
	export let format: (value: string) => string = undefined;
	export let display: 'inline' | 'block' = 'block';

	const initialValue = value;

	let inputRef: HTMLInputElement;
	let focused = false;
	let hasPlaceholder = false;
	$: hasPlaceholder = placeholder !== '';
	let leadingWidth = 0;
	let showPassword = writable(false);

	function checkValidity() {
		invalid = pattern
			? !inputRef.checkValidity()
			: minlength
			? !(inputRef.value.length >= minlength)
			: maxlength
			? !(inputRef.value.length <= maxlength)
			: undefined;
		success = pattern || minlength || maxlength ? !invalid : undefined;
	}

	function reset() {
		value = initialValue;
		invalid = undefined;
		success = undefined;
	}

	function handleInput(e) {
		value = format ? format(e.target.value) : e.target.value;
		invalid = undefined;
		success = undefined;
	}

	function handleFocus() {
		focused = true;
	}

	function handleBlur(e) {
		focused = false;
		checkValidity();
	}

	setContext<FieldContext>(Ctx.Field, {
		showPassword,
		reset,
		getInputRef: () => inputRef,
		initialValue,
	});
</script>

<div
	class="field {variant} {display}"
	style:--size={cssSize(size)}
	class:focused
	class:warning
	class:success
	class:disabled
	class:invalid
	class:has-value={value !== ''}
	class:has-placeholder={hasPlaceholder}
	class:has-label={$$slots.label}
>
	{#if $$slots.leading}
		<div class="leading" bind:clientWidth={leadingWidth}>
			<slot name="leading" />
		</div>
	{/if}
	<label class="main">
		{#if prefix}
			<span class="prefix">{prefix}</span>
		{/if}
		<input
			bind:this={inputRef}
			class="input"
			type={type === 'password' && $showPassword ? 'text' : type}
			{placeholder}
			{value}
			{readonly}
			{maxlength}
			{minlength}
			{disabled}
			{required}
			pattern={pattern ? pattern.source : undefined}
			use:inputOnReset
			on:change
			on:reset
			on:input
			on:focus
			on:blur
			on:input={handleInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
		/>
		{#if suffix}
			<span class="suffix">{suffix}</span>
		{/if}
	</label>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
	<fieldset style:--leading-width="{leadingWidth}px">
		{#if $$slots.label}
			<legend>
				<div>
					<slot name="label" />
				</div>
			</legend>
		{/if}
	</fieldset>
</div>

<style lang="scss">
	.field {
		--inset: 5px;
		--radius-ratio: 0.8;
		--ctx-radius-ratio: var(--radius-ratio);
		--height-ratio: 3;
		--computed-height: calc(var(--size) * var(--height-ratio));
		--computed-radius: calc(var(--size) * var(--radius-ratio));
		font-size: var(--size);
		position: relative;
		display: grid;
		grid-template-columns:
			[leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end];
		gap: 0;
		flex-direction: row;
		align-items: center;
		line-height: 1em;
		flex-wrap: nowrap;
		white-space: nowrap;
		height: var(--computed-height);
		border-radius: var(--computed-radius);
		padding: 0;
		margin: 0;

		&.inline {
			display: inline-grid;
		}

		&.disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&.warning,
		&.invalid {
			fieldset {
				border: 2px solid var(--color-error-300);
			}
		}

		&.success {
			fieldset {
				border: 2px solid var(--color-success-300);
			}
		}

		&.focused,
		&:not(.focused):not(.has-label) {
			.prefix,
			.suffix {
				transform: translateY(0);
				opacity: 0.5;
				transition: opacity 0.2s 0.1s ease-in-out, transform 0.25s 0.1s cubic-bezier(0.2, 0, 0.2, 1);
			}
		}
	}

	.leading,
	.trailing {
		height: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		gap: 0;
		display: flex;
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
		grid-column: main;
		cursor: text;
		position: relative;
		display: inline-flex;
		height: 100%;
		align-items: center;
		padding: 0 1.5em;
		margin: 0;
		top: -0.1em;
		transition: top 0.2s cubic-bezier(0.2, 0, 0.2, 1);
	}

	.prefix,
	.suffix {
		white-space: pre;
		line-height: 1em;
		position: relative;
		display: inline-block;
		opacity: 0;
		transform: translateY(0.25em);
		transition: opacity 0.2s ease-in-out, transform 0.25s cubic-bezier(0.8, 0, 0.8, 1);
	}

	input {
		position: relative;
		grid-column: input;
		flex: 1;
		font-family: inherit;
		font-size: inherit;
		border-radius: inherit;
		border: none;
		outline: none;
		background: none;
		background-color: transparent;
		line-height: 1em;
		text-overflow: ellipsis;
		padding: 0;
		margin: 0;
		color: currentColor;

		&::placeholder {
			color: currentColor;
			opacity: 0.35;
			transition: all 0.2s;

			@at-root .has-label:not(.focused) & {
				opacity: 0;
			}
		}

		&:-webkit-autofill,
		&:-webkit-autofill:focus {
			transition: background-color 600000s 0s, color 600000s 0s;
		}
	}

	//
	// Notched outline styling
	//

	fieldset {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		padding-left: var(--leading-width, 0px);
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 1em;
		border-radius: inherit;
		border-width: 0px;
		border-style: solid;
		border-color: currentColor;
		transition: all 0.15s ease-in-out;
	}

	legend {
		opacity: 0.5;
		white-space: nowrap;
		position: relative;
		font-size: 1em;
		height: 0;
		padding: 0;
		top: 0;
		margin-left: 1.5em;
		max-width: 0;
		transition: all 0.2s cubic-bezier(0.2, 0, 0.2, 1), color 0s;

		div {
			font-size: 1em;
			padding: 0;
			margin: 0;
			line-height: calc(var(--computed-height) - 0.2em);
			transition: all 0.2s cubic-bezier(0.2, 0, 0.2, 1), color 0s;
		}
	}

	.focused,
	.has-value {
		legend:not(:empty) {
			// top: -0.5em;

			div {
				line-height: 1em;
				font-size: max(12px, 0.5em);
			}
		}
	}

	//
	// Variants
	//

	.default {
		color: var(--color-dark-500);
		background-color: rgba(var(--rgb-light-900), 0.25);
		transition: all 0.15s ease-out;

		&:hover {
			color: var(--color-dark-900);
			background-color: rgba(var(--rgb-light-900), 0.5);
		}

		&.has-value:not(.focused) {
			// background-color: transparent;

			legend {
				opacity: 0.25;
				top: 0.25em;
			}

			&.has-label .main {
				top: 0.25em;
			}
		}

		&.focused {
			background-color: white;
			box-shadow: 0 0.5em 1.5em -0.5em rgba(var(--rgb-dark-900), 0.25);

			legend {
				top: -1em;
			}
		}
	}

	.outlined {
		color: var(--color-dark-500);
		background-color: transparent;
		transition: all 0.15s ease-out;

		fieldset {
			color: rgba(var(--rgb-dark-500), 0.2);
			border-width: 1px;
		}

		&:hover {
			color: var(--color-dark-700);

			&:not(.focused) {
				// background-color: rgba(var(--rgb-light-900), 0.1);
			}

			fieldset {
				color: rgba(var(--rgb-dark-500), 0.5);
			}
		}

		&.has-value {
			&:not(.focused) {
				legend {
					opacity: 1;
					top: -0.22em;
				}
			}
		}

		&.focused,
		&.has-value {
			legend {
				max-width: 100%;
				margin-left: 1.25em;
				padding-inline: 0.25em;
				top: -0.32em;
			}
		}

		&.focused {
			fieldset {
				color: rgba(var(--rgb-dark-500), 0.5);
				border: 1.5px solid currentColor;
			}

			legend {
				opacity: 1;
			}
		}
	}

	.ghost {
	}
</style>
