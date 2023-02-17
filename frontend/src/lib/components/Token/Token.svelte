<!--
	@component
	# Token / Chip / Pill
	
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let as: keyof HTMLElementTagNameMap = 'span';
	export let variant: 'default' | 'subtle' | 'ghost' | 'cta' | 'danger' | 'outlined' | 'dashed' =
		'default';
	export let active: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	$: type = as === 'button' ? 'button' : undefined;
</script>

<svelte:element
	this={as}
	class="ui-token {variant}"
	class:active
	class:disabled
	class:readonly
	{disabled}
	{readonly}
	{type}
	on:pointerdown
>
	{#if !disabled && !readonly}
		<Ripple />
	{/if}
	{#if $$slots.leading}
		<div class="leading"><slot name="leading" /></div>
	{/if}
	<div class="main"><slot /></div>
	{#if $$slots.trailing}
		<div class="trailing"><slot name="trailing" /></div>
	{/if}
</svelte:element>

<style lang="scss">
	.ui-token {
		--height: 3em;
		--radius: 999px; //var(--ui-radius-md);
		--inset: var(--ui-inset);
		position: relative;
		cursor: pointer;
		user-select: none;
		flex: none;
		flex-wrap: nowrap;
		height: var(--height);
		border-radius: var(--radius);
		padding: var(--inset);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		font-weight: 400;
	}

	.readonly,
	:readonly {
		cursor: default;
	}

	.disabled,
	:disabled {
		cursor: default;
		opacity: 0.35;
	}

	.main {
		white-space: nowrap;
		position: relative;
		top: -0.1em;
		padding-right: var(--inset);
		padding-left: calc(var(--ui-pad-x) - var(--inset));
		.leading + & {
			padding-left: var(--inset);
		}
		&:last-child {
			padding-right: calc(var(--ui-pad-x) - var(--inset));
		}
	}

	.default {
		color: col(fg, 000);
		background: col(fg, 500, 0.05);
		&:hover {
			color: col(fg, 500);
			background: col(fg, 500, 0.1);
		}
		&.active,
		&:has(:checked) {
			color: col(bg, 900);
			background: col(fg, 100);
		}
	}

	.subtle {
		color: col(fg, 000, 0.8);
		background: col(fg, 500, 0.05);
		&:hover {
			color: col(primary, 500);
			background: col(primary, 300, 0.1);
		}
		&.active,
		&:has(:checked) {
			color: col(primary, 700);
			background: col(primary, 500, 0.2);
		}
	}

	.outlined,
	.dashed {
		border: 1px solid col(fg, 500, 0.1);
		&:hover {
		}
		&.active,
		&:has(:checked) {
		}
	}

	.cta {
		&:hover {
		}
		&.active,
		&:has(:checked) {
		}
	}

	.dashed {
		border-style: dashed;
	}
</style>
