<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Token from '$components/primitives/Token.svelte';
	import { showExploreFilters } from '$stores/explore';
	import { category, exploreSearchterm } from '$stores/search';
	import { insert } from '$transitions/insert';
	import { onDestroy, onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	function submit() {
		console.log('submitted search bar form');
	}

	function reset() {
		console.log('reset form');
	}

	onMount(() => {});

	onDestroy(() => {});
</script>

<!-- Combiner avec "filters" -->
<!-- https://stackoverflow.com/questions/4052756/how-to-combine-html-forms -->
<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
	<section
		in:insert={{ y: 40, opacity: 0, height: true, width: false, duration: 450, easing: expoOut }}
		out:insert={{ duration: 700, easing: expoOut }}
		id="search-field"
	>
		<Field
			type="search"
			placeholder="Chercher"
			placeholderIcon="search"
			variant="searchbar"
			bind:value={$exploreSearchterm}
		>
			<svelte:fragment slot="left">
				{#if $category}
					<Button on:click={showExploreFilters.toggle} active={$showExploreFilters}>
						<Icon slot="icon" name={$showExploreFilters ? 'cross' : 'parameters'} />
					</Button>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="has-value">
				<Button type="submit" variant="cta" slot="right">
					<Icon slot="icon" name="submit" />
				</Button>
			</svelte:fragment>
		</Field>
	</section>
	<section id="search-tokens" use:horizontalScroll={{}} transition:fade={{}}>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
		<Token>Jeton de recherche</Token>
	</section>
</form>

<style lang="postcss">
	form {
		z-index: 1;
		position: sticky;
		margin: 1rem;
		margin-top: 0.5rem;
		padding: 0;
		display: flex;
		flex-direction: row;
	}

	#search-field {
		grid-area: search;
		position: relative;
		z-index: 1;
		width: var(--search-width);
		flex: none;
		display: block;
		padding: 0rem;
	}

	#search-tokens {
		position: relative;
		z-index: 10;
		grid-area: tokens;
		display: block;
		overflow-x: overlay;
		white-space: nowrap;
		margin-left: 0.5rem;
		margin-right: 1rem;
		border-radius: 1em;
		/* mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%); */
		transition: all 0.25s ease-out;

		&:hover {
			/* mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0) 100%); */
			/* mask-image: unset; */
		}
	}
</style>
