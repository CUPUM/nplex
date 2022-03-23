<script lang="ts">
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' = 'normal';
	export let warning: boolean = false;
	export let display: 'inline' | 'block' = 'inline';
	export let disabled: boolean = false;
	export let validator: RegExp = undefined; /* Regex validator to be used on submit & during user input */
	export let invalid: boolean = false;
	export let formatting = undefined; /* Auto formatting template for the user input */
	export let value = null;
	export let placeholder: string = null;

	function handleInput(e) {
		value = e.target.value;
	}
</script>

<input
	class:warning
	class="{variant} {display}"
	style:font-size="var(--size-{size})"
	{disabled}
	{type}
	{value}
	{placeholder}
	{...$$restProps}
	on:input={handleInput}
	on:change
	on:click
	on:focus
	on:submit
	data-lpignore="true"
/>

<style lang="postcss">
	input {
		padding: 1em;
		border-radius: 1em;
		font-weight: 400;
		background: var(--color-light-100);
		background-color: red;
		box-shadow: inset 0 0 0 1000px var(--color-light-100), 0 0 0 1px rgba(0, 0, 0, 0.2);
		outline-color: var(--color-primary-100);
		border: none;
	}
</style>
