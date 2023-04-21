<script lang="ts">
	import { page } from '$app/stores';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { AUTHMODAL_MODE } from './AuthModal.svelte';

	const before = Array(Math.round(Math.random() * 10));
	const after = Array(Math.round(Math.random() * 10));
</script>

<article id="participate">
	{#each before as b}
		<div class="filler" style:opacity={Math.random()} />
	{/each}
	{#if $page.data.session}
		<a href="/editer" class="button">Créez vos propres fiches dès maintenant!</a>
	{:else}
		<a
			href="?{SEARCH_PARAMS.AUTH_MODAL}={AUTHMODAL_MODE.SignUp}"
			class="button"
			data-sveltekit-noscroll
		>
			Connectez-vous ou créez-vous un compte pour construire vos propres fiches dès maintenant!
		</a>
	{/if}
	{#each after as b}
		<div class="filler" style:opacity={Math.random()} />
	{/each}
</article>

<style lang="scss">
	#participate {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--ui-gap-sm);
		padding: var(--ui-gutter-sm);
		max-width: var(--ui-width-main);

		@include laptop {
		}
	}

	.filler {
		border-radius: var(--ui-radius-xl);
		background: col(primary, 100, 0.5);
		aspect-ratio: 2;
	}

	.button {
		// border: var(--ui-border-size) solid col(bg, 900);
		background: col(primary, 500, 0.1);
		color: col(primary, 500);
		font-weight: 400;
		line-height: 1.5;
		padding-bottom: 0.2em;
		padding: var(--ui-gutter-md);
		border-radius: var(--ui-radius-xl);
		font-size: var(--ui-text-lg);
		max-width: var(--ui-width-sm);
		text-align: center;
		grid-column: 2;
		grid-row: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
