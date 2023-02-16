<!--
	@component
	# Token / Chip / Pill
	
-->
<script lang="ts">
	export let as: keyof HTMLElementTagNameMap = 'span';
	export let variant: 'default' | 'ghost' | 'cta' | 'danger' | 'outlined' = 'default';
	export let active: boolean | undefined = undefined;
	export let readonly: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	$: type = as === 'button' ? 'button' : undefined;
</script>

<svelte:element this={as} class="ui-token {variant}" class:active {type} on:pointerdown>
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
		cursor: pointer;
		user-select: none;
		flex: none;
		flex-wrap: nowrap;
		height: var(--height);
		border-radius: var(--radius);
		padding: var(--inset);
		display: inline-flex;
		align-items: center;
		flex-direction: row;
		font-weight: 400;
	}

	.readonly {
		cursor: default;
	}

	.disabled {
		cursor: default;
		opacity: 0.35;
	}

	.main {
		white-space: nowrap;
		position: relative;
		top: -0.1em;
		padding-inline: var(--inset);
		&:first-child {
			padding-left: calc(var(--ui-pad-x) - var(--inset));
		}
		&:last-child {
			padding-right: calc(var(--ui-pad-x) - var(--inset));
		}
	}

	.default {
		color: col(fg, 000);
		background: col(fg, 100, 0.05);
		&:hover {
			color: col(fg, 500);
			background: col(fg, 100, 0.1);
		}
		&.active {
			color: col(bg, 900);
			background: col(fg, 100);
		}
	}

	.outlined {
		&:hover {
		}
		&.active {
		}

		.cta {
		}
	}
</style>
