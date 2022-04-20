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

<style lang="postcss">
	form {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		/* display: flex;
		flex-direction: row; */
		align-items: center;
		padding: 0 1.5rem;
		/* border-color: var(--color-light-900);
		border-block-width: 1px;
		border-inline-width: 0;
		border-style: solid; */
	}

	fieldset {
		border: none;
	}
</style>
