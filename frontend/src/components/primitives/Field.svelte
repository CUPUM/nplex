<script lang="ts">
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let variant: 'normal' | 'secondary' | 'ghost' | 'cta' = 'normal';
	export let warning: boolean = false;
	export let display: 'inline' | 'block' = 'inline';
	export let disabled: boolean = false;
	export let validator: RegExp = undefined; /* Regex validator to be used on submit & during user input */
	export let valid: boolean = true;
	export let formatting = undefined; /* Auto formatting template for the user input */
	export let value = null;
	export let placeholder: string = null;

	function handleInput(e) {
		value = e.target.value;
	}
</script>

<input {...$$restProps} {type} {value} {placeholder} on:input={handleInput} on:change on:click on:focus on:submit />

<style>
</style>
