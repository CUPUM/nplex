<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import TokenSet from '$components/primitives/TokenSet.svelte';
	import { showExploreFilters } from '$stores/explore';
	import { category, term } from '$stores/search';
	import { sizes } from '$utils/sizes';
	import { expoOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';

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
	<!-- Field -->
	<div
		id="field"
		in:fly={{ y: 30, duration: 500, easing: expoOut, delay: 150 }}
		out:fly={{ y: 30, duration: 500, easing: expoOut, delay: 0 }}
	>
		<Field
			type="search"
			size={sizes.medium}
			placeholder="Chercher"
			placeholderIcon="search"
			style="width: 100%;"
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
	</div>

	<!-- Tokens -->
	<div id="tokens">
		<TokenSet style="margin: 0, padding: 0">
			<!-- {#each tokens as token}
				<Token size={sizes.small}>
					{token}
				</Token>
			{/each} -->
		</TokenSet>
	</div>
</form>

<style lang="postcss">
	form {
		position: relative;
		margin-top: 0;
		margin-inline: 1rem;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-areas: 'field category tokens';
		align-items: flex-start;
		justify-content: flex-start;
		gap: 6px;
		padding: 0rem;
		overflow-y: visible;
		padding-bottom: 0.5rem;
	}

	#field {
		grid-area: field;
		flex: 1;
		width: calc(var(--search-width) - 2rem);
	}

	#tokens {
		grid-area: tokens;
		flex: 1;
	}
</style>
