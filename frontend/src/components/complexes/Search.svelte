<script lang="ts">
	import SearchField from './SearchField.svelte';
	import SearchCategory from './SearchCategory.svelte';
	import SearchTokens from './SearchTokens.svelte';
	import { slide } from 'svelte/transition';

	function submit() {
		console.log('submitted search bar form');
	}

	function reset() {
		console.log('reset form');
	}
</script>

<!-- Combiner avec "filters" -->
<!-- https://stackoverflow.com/questions/4052756/how-to-combine-html-forms -->
<form on:submit|preventDefault={submit} on:reset|preventDefault={reset} transition:slide={{}}>
	<SearchField />
	<SearchCategory />
	<SearchTokens />
</form>

<style>
	form {
		position: relative;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding-block: 0;
		padding-inline: 1rem;
	}
</style>
