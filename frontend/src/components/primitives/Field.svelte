<script lang="ts">
	export let type: 'search' | 'text' | 'password' | 'number' | 'email' = 'text';
	export let validator: RegExp = undefined; /* Regex validator to be used on submit & during user input */
	export let formatting; /* Auto formatting template for the user input */
	export let value;
	export let placeholder: string = undefined;

	function handleInput(e) {
		value = e.target.value;
	}
</script>

<input {...$$restProps} {type} {value} on:input={handleInput} on:change on:click on:focus on:submit />

<style>
</style>
