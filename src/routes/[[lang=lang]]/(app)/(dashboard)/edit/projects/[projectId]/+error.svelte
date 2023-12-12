<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import ButtonIconArrowLeft from '$lib/components/ButtonIconArrowLeft.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { STATUS_CODES } from '$lib/utils/constants';
</script>

<article>
	{#if $page.status === STATUS_CODES.NOT_FOUND}
		<h1 class="h4">
			<LangKey>{m.project_notFound()}</LangKey>
		</h1>
		<a {...$link('/edit/projects')} class="button link">
			<ButtonIconArrowLeft />
			<LangKey>{m.project_notFound_browse()}</LangKey>
		</a>
	{/if}
</article>

<style lang="postcss">
	article {
		grid-column: full;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		justify-self: stretch;
		align-self: stretch;
		grid-column: 1/-1;
		padding: 2rem;
		gap: 2rem;
	}

	a {
		font-size: var(--size-sm);
	}
</style>
