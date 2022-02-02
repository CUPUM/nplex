<script context="module" lang="ts">
	export type CheckboxTheme = 'primary' | 'secondary';
	export type CheckboxVariant = 'normal' | 'misc';
	export type CheckboxSize = 'small' | 'medium' | 'large';
</script>

<script lang="ts">
	export let theme: CheckboxTheme = 'primary';
	export let variant: CheckboxVariant = 'normal';
	export let size: CheckboxSize = 'medium';
</script>

<label>
	<input type="checkbox" {...$$props.rest} class="{variant} {size} {theme}" />
	<span />
</label>

<style>
	label {
	}

	input[type='checkbox'] {
	}

	span {
	}
</style>
