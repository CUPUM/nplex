<!--
	@component
	# Text Area
	Multiline text input component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'text-area-context';

	interface TextAreaContext {
		value: Writable<string | null | undefined>;
		// textAreaRef: Writable<HTMLTextAreaElement>;
	}

	export function getTextAreaContext() {
		return getContext<TextAreaContext>(CTX_KEY);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import Dirtiness from './Dirtiness.svelte';
	import Ripple from './Ripple.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: string | null | undefined = null;
	export let sample: typeof value = value;
	export let variant: 'default' | 'outlined' | 'cta' = 'default';
	export let direction: 'row' | 'column' = 'column';
	export let resize: boolean | undefined = undefined;
	export let compact: boolean | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let warning: boolean | undefined = undefined;
	export let success: boolean | undefined = undefined;
	export let invalid: boolean | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let placeholder: string = '';
	export let dirty: boolean = false;
	export let tabindex: number = 0;
	let className: string = '';
	export { className as class };
	export let style: string | undefined = undefined;
	export function focus() {
		textareaRef.focus();
	}
	export function blur() {
		textareaRef.blur();
	}

	let textareaRef: HTMLTextAreaElement;
	let labelWidth = 0;
	$: hasvalue = !!value;
	$: hasplaceholder = placeholder !== '';
	$: haslabel = $$slots.label;

	const _value = writable<typeof value>(value);
	$: value = $_value;
	$: _value.set(value);

	setContext<TextAreaContext>(CTX_KEY, {
		value: _value,
	});
</script>

<Dirtiness {sample} bind:dirty let:check>
	<fieldset
		class="container nest focus-outline-within {variant} {direction} {className}"
		{style}
		{disabled}
		class:compact
		class:warning
		class:readonly
		class:loading
		class:success
		class:invalid
		class:dirty
		class:hasvalue
		class:hasplaceholder
		class:haslabel
		class:required
		style:--label-width="{labelWidth}px"
		on:click|self={focus}
		on:click
		on:pointerdown
		on:pointerup
		on:keypress
		on:keydown
		on:keyup
	>
		<Ripple />
		{#if $$slots.leading}
			<div class="aside leading" on:click|self={focus}>
				<slot name="leading" />
			</div>
		{/if}
		<!-- Placing outlines here to allow use of CSS general sibling selector based on .leading -->
		<div class="outline left" />
		<div class="outline right" />
		<div class="outline bottom" />
		{#if $$slots.label}
			<label in:fly={{ y: 6, opacity: 0 }} for={id} bind:clientWidth={labelWidth}>
				<slot {dirty} name="label" /><span class="star">*</span>
			</label>
		{/if}
		<textarea
			bind:this={textareaRef}
			bind:value
			{name}
			{id}
			{required}
			{readonly}
			{placeholder}
			{maxlength}
			{minlength}
			{tabindex}
			class:resize
			on:focus
			on:blur
			on:change
			on:input
		/>
		{#if $$slots.trailing}
			<div class="aside trailing" on:click|self={focus}>
				<slot name="trailing" />
			</div>
		{/if}
	</fieldset>
</Dirtiness>

<style lang="scss">
	:where(.container) {
		--radius: var(--ui-radius-md);
		--inset: var(--ui-inset);
		--notch-padding: 0.25em;
		--pad-y: calc(var(--ui-height) * 0.5 - 1em);
		position: relative;
		display: grid;
		border-radius: var(--ui-radius-md);
		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
		&.readonly {
			cursor: default;
		}
		&.warning {
			color: red !important;
			background: col(error, 100, 0.1);
		}
		&.invalid {
			color: col(error, 700) !important;
			background: col(error, 100, 0.1) !important;
		}
		&.success {
			color: col(success, 700) !important;
			background: col(success, 100, 0.1) !important;
		}
	}

	.column {
		grid-template-columns:
			[full-start pad-left-start]
			var(--ui-pad-x)
			[pad-left-end main-start]
			1fr
			[main-end full-end];
		grid-template-rows:
			[full-start leading-start]
			auto
			[leading-end main-start]
			1fr
			[main-end trailing-start]
			auto
			[trailing-end full-end];
	}

	.row {
		.aside {
			flex-direction: column;
		}
	}

	.aside {
		grid-column: full;
		padding: var(--inset) 0;
		margin: 0;
		gap: 0;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		&:not(:empty) {
			gap: 3px;
			padding: var(--inset);
		}
	}
	.leading {
		grid-row: leading;
	}
	.trailing {
		grid-row: trailing;
	}

	textarea {
		cursor: inherit;
		font-family: inherit;
		font-weight: inherit;
		font-size: inherit;
		color: inherit;
		position: relative;
		grid-row: main;
		grid-column: main;
		font-family: inherit;
		font-size: inherit;
		line-height: 1.5em;
		padding-right: var(--ui-pad-x);
		padding-block: var(--pad-y);
		flex: 1;
		background: transparent;
		overflow-x: hidden;
		resize: none;
	}

	label {
		position: absolute;
		pointer-events: none;
		line-height: 1.5em;
		top: var(--pad-y);
		grid-column: main;
		grid-row: main;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition: all 0.15s var(--ui-ease-out);
	}

	.leading:not(:empty) ~ {
		textarea,
		label {
			margin-top: var(--pad-y);
		}
	}

	.outline {
		--thickness: 1px;
		pointer-events: none;
		position: absolute;
		height: 50%;
		transition: all 0.15s ease-out;
		border-width: var(--thickness);
		border-style: solid;
	}
	.left {
		grid-row: full;
		grid-column: pad-left;
		left: 0;
		right: 0;
		top: 0;
		border-top-left-radius: inherit;
		border-right-width: 0;
		border-bottom-width: 0;
	}
	.right {
		grid-row: full;
		grid-column: main;
		right: 0;
		left: 0;
		top: 0;
		border-left-width: 0;
		border-bottom-width: 0;
		border-top-right-radius: inherit;
	}
	.bottom {
		grid-row: full;
		grid-column: full;
		left: 0;
		right: 0;
		bottom: 0;
		border-top-width: 0;
		border-bottom-right-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.star {
		display: none;
		color: col(primary, 900);
		padding-left: 0.2em;
		.required & {
			display: inline-block;
		}
	}

	.resize {
		resize: vertical;
	}

	// Variants

	:where(.default) {
		color: col(fg, 900);
		background: col(bg, 900, 0.5);
		transition: all 0.15s var(--ui-ease-out);
		.outline {
			display: none;
		}
		label {
			opacity: 0.5;
		}
		&.haslabel {
			.affix {
				opacity: 0;
			}
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within {
			label {
				top: 0.5em;
				font-size: clamp(11px, 0.5em, 24px);
			}
			.affix {
				opacity: 0.5;
			}
			&.haslabel {
				.affix,
				textarea {
					top: 0.45em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover {
			color: col(fg, 500);
			background: col(bg, 900);
		}
		&:focus-within {
			color: col(fg, 000);
			background: col(bg, 300);
			textarea {
				opacity: 1;
			}
		}
	}

	:where(.outlined) {
		color: col(fg, 700);
		background: transparent;
		transition: color 0.1s ease-out, background-color 0.1s ease-out;
		label {
			opacity: 0.5;
		}
		.outline {
			border-color: col(fg, 900);
			opacity: 0.5;
		}
		&.haslabel {
			.affix {
				opacity: 0;
			}
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within {
			label {
				opacity: 0.35;
				top: -0.5em;
				line-height: 1em;
				padding-block: 0;
				font-size: clamp(12px, 0.5em, 24px);
			}
			.leading:not(:empty) ~ {
				label {
					top: 0em;
				}
			}
			.affix {
				opacity: 0.35;
			}
			&.haslabel {
				.left {
					right: var(--notch-padding);
				}
				.right {
					left: calc(var(--label-width) + var(--notch-padding));
				}
				.leading:not(:empty) ~ {
					.left {
						right: 0;
					}
					.right {
						left: 0;
					}
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&:focus-within {
			color: col(fg, 300);
			background: transparent;
			.outline {
				opacity: 0.75;
			}
		}
		&:focus-within {
			outline: none;
			color: col(fg, 100);
			.outline {
				--thickness: 1.5px;
				opacity: 1;
				border-color: col(primary, 700);
			}
			label {
				color: col(primary, 700);
				opacity: 1;
			}
		}
	}

	:where(.cta) {
		color: col(bg, 300);
		background: col(primary, 500);
		box-shadow: 0 0.2em 1em -0.5em col(primary, 500, 0);
		transition: all 0.1s ease-out, box-shadow 0.25s ease-in-out;
		.outline {
			display: none;
		}
		label {
			opacity: 0.35;
		}
		&.haslabel {
			.affix {
				opacity: 0;
			}
		}
		&.hasplaceholder,
		&.hasvalue,
		&:focus-within {
			label {
				top: 0.5em;
				font-size: clamp(11px, 0.5em, 24px);
			}
			.affix {
				opacity: 0.5;
			}
			&.haslabel {
				.affix,
				textarea {
					top: 0.35em;
				}
			}
		}
		:global(.hover-source:hover) &:global(.hover-target),
		&:hover,
		&:focus-within {
			box-shadow: 0 0.8em 1.5em -1em col(primary, 900, 0.5);
			color: col(bg, 100);
			background: col(primary, 700);
			label {
				opacity: 0.5;
			}
		}
		&:focus-within {
			box-shadow: 0 0.5em 1em -0.5em col(primary, 900, 0.5);
			color: col(bg, 100);
		}
	}
</style>
