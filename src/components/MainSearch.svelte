<script>
	import { tooltip } from '$actions/tooltip';
	import Icon from './primitives/Icon.svelte';

	let search = "";

	function submit() {
		console.log('submit clicked!');
	}
</script>


<form action="" on:submit|preventDefault={submit}>
	<label for="search"></label>
	<input
		id="search"
		type="text"
		placeholder="Chercher..."
		bind:value={search}
	>
	<button title="test" use:tooltip>Chercher</button>
</form>

<div>
	<Icon name="user"></Icon>
</div>


<style lang="postcss">
	input {
		outline: 1px solid transparent;
		outline-offset: 3px;
		border: none;
		padding: 1em;
		border-radius: 2em;
		transition: outline .2s;

		&:focus {
			outline: 1px solid color(primary500);
		}
	}
</style>