<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';
	import Switch from '$components/primitives/Switch.svelte';
	import SwitchItem from '$components/primitives/SwitchItem.svelte';
	import TokenSet from '$components/primitives/TokenSet.svelte';
	import { showFilters } from '$stores/projects';
	import { category, term } from '$stores/search';
	import { exploreRoutes } from '$utils/routes';
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
	out:slide={{}}
>
	<!-- Field -->
	<div id="field" transition:fly={{ y: 30, duration: 500, easing: expoOut, delay: 150 }}>
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
							icon={$showFilters ? 'cross' : 'parameters'}
							on:click={showFilters.toggle}
							active={$showFilters}
						/>
					</div>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="has-value">
				<Button type="submit" icon="submit" slot="right" />
			</svelte:fragment>
		</Field>
	</div>
	<!-- Category -->
	<div id="category" transition:fly={{ y: 30, duration: 500, easing: expoOut, delay: 0 }}>
		<Switch name="category" orientation="row" size={sizes.medium}>
			{#each exploreRoutes as r, i}
				<SwitchItem
					id={r.category}
					value={r.category}
					bind:group={$category}
					on:mouseover={() => prefetch(r.pathname)}
					on:focus={() => prefetch(r.pathname)}
					on:input={() => goto(r.pathname)}
				>
					{r.title}
				</SwitchItem>
			{/each}
		</Switch>
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

	#category {
		grid-area: category;
	}

	#field {
		grid-area: field;
		flex: 1;
	}

	#tokens {
		grid-area: tokens;
		flex: 1;
	}
</style>
