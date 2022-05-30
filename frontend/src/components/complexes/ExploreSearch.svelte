<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import { showExploreFilters } from '$stores/explore';
	import { category, term } from '$stores/search';
	import { sizes } from '$utils/sizes';
	import { expoOut } from 'svelte/easing';
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
<form
	on:submit|preventDefault={submit}
	on:reset|preventDefault={reset}
	in:slide={{ duration: 450, easing: expoOut }}
	out:slide={{ duration: 700, easing: expoOut }}
>
	<Field
		type="search"
		size={sizes.medium}
		placeholder="Chercher"
		placeholderIcon="search"
		variant="searchbar"
		bind:value={$term}
	>
		<svelte:fragment slot="left">
			{#if $category}
				<div>
					<Button
						icon={$showExploreFilters ? 'cross' : 'parameters'}
						on:click={showExploreFilters.toggle}
						active={$showExploreFilters}
					/>
				</div>
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="has-value">
			<Button type="submit" icon="submit" slot="right" />
		</svelte:fragment>
	</Field>
</form>

<style lang="postcss">
	form {
		grid-area: search;
		position: relative;
		z-index: 1;
		flex: 1;
		display: block;
		padding: 0rem;
	}
</style>
