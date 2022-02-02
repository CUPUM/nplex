<script lang="ts">
	import SearchField from './Search.Field.svelte';
	import SearchCategory from './Search.Category.svelte';
	import SearchTokens from './Search.Tokens.svelte';

	function submit() {
		console.log('submitted search bar form');
	}

	function reset() {
		console.log('reset form');
	}
</script>

<!-- Combiner avec "filters" -->
<!-- https://stackoverflow.com/questions/4052756/how-to-combine-html-forms -->
<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
	<SearchField />
	<SearchCategory />
	<SearchTokens />
</form>

<style>
	form {
		width: 100%;
		margin-top: 3px;
		padding-inline: var(--size-medium);
		display: flex;
		flex-grow: 0;
		flex-shrink: 0;
		flex-direction: row;
		font-size: var(--size-medium);
		height: 3em;
		gap: var(--size-small);
	}
</style>
