<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Token from '$components/primitives/Token.svelte';
	import { showExploreFilters } from '$stores/explore';
	import { category, exploreSearchterm } from '$stores/search';
	import { crossfadeExploreFiltersButton } from '$transitions/crossfades';
	import { slip } from '$transitions/slip';
	import { onDestroy, onMount } from 'svelte';

	let fadestart = false;
	let fadeend = true;
	const [send, receive] = crossfadeExploreFiltersButton;

	function submit() {
		// console.log('submitted search bar form');
	}

	function reset() {
		// console.log('reset form');
	}

	function handleTokenScroll(e: Event) {
		const el = e.target as HTMLElement;
		const threshold = 24;
		fadestart = el.scrollLeft > threshold;
		fadeend = el.scrollLeft + el.offsetWidth < el.scrollWidth - threshold;
	}

	onMount(() => {});

	onDestroy(() => {});
</script>

<!-- Combiner avec "filters" -->
<!-- https://stackoverflow.com/questions/4052756/how-to-combine-html-forms -->
<form on:submit|preventDefault={submit} on:reset|preventDefault={reset}>
	<section class="search-field">
		<Field
			type="search"
			placeholder="Chercher"
			placeholderIcon="search"
			variant="searchbar"
			bind:value={$exploreSearchterm}
		>
			<svelte:fragment slot="left">
				{#if $category && !$showExploreFilters}
					<div transition:slip={{ width: true, overflow: 'visible' }}>
						<div in:receive={{ key: '' }} out:send={{ key: '' }}>
							<Button on:click={showExploreFilters.toggle} active={$showExploreFilters}>
								<Icon slot="icon" name={$showExploreFilters ? 'cross' : 'parameters'} />
							</Button>
						</div>
					</div>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="has-value">
				<Button type="submit" variant="cta" slot="right">
					<Icon slot="icon" name="arrow-right" />
				</Button>
			</svelte:fragment>
		</Field>
	</section>
	<section
		class="search-tokens"
		use:horizontalScroll={{}}
		on:scroll={handleTokenScroll}
		class:fadestart
		class:fadeend
	>
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

<style lang="scss">
	form {
		z-index: 10;
		position: relative;
		padding: 1rem;
		padding-top: 0.5rem;
		margin: 0;
		display: flex;
		flex-direction: row;
		overflow: visible;
	}

	.search-field {
		position: relative;
		z-index: 1;
		width: var(--search-width);
		flex: none;
		display: flex;
		padding: 0;
		margin: 0;
	}

	.search-tokens {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: row;
		// justify-content: center;
		align-items: center;
		overflow-x: scroll;
		overflow-y: visible;
		white-space: nowrap;
		margin-left: 0.5rem;
		margin-right: 1rem;
		transition: all 0.25s ease-out;

		&:not(:hover) {
			&.fadestart {
				mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 25%);
			}

			&.fadeend {
				mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 25%);
			}

			&.fadestart.fadeend {
				mask-image: linear-gradient(
					to right,
					rgba(0, 0, 0, 0) 0%,
					rgba(0, 0, 0, 1) 25%,
					rgba(0, 0, 0, 1) 75%,
					rgba(0, 0, 0, 0) 100%
				);
			}
		}
	}
</style>
