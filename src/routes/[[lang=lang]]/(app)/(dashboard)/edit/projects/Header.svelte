<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { Search, X } from 'lucide-svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<hgroup>
		<h1 class="h2">
			<LangKey>{m.project_edit()}</LangKey>
		</h1>
	</hgroup>
	<form
		method="GET"
		data-sveltekit-keepfocu
		data-sveltekit-replacestate
		data-sveltekit-noscroll
		class="input-group bg-blur"
		in:fly|global={{ y: 6, easing: cubicOut, duration: 450 }}
	>
		<input
			type="search"
			name="search"
			placeholder={$langKey(m.project_find())}
			class="input"
			value={data.search}
		/>
		<div class="input-peer">
			{#if $page.url.searchParams.get('search')}
				<a
					transition:scale={{ duration: 250, start: 0.5, opacity: 0, easing: expoOut }}
					{...$link('/edit/projects')}
					class="button ghost square"
				>
					<X />
				</a>
			{/if}
			<button class="button cta square" type="submit">
				<Search class="button-icon" />
			</button>
		</div>
	</form>
</header>

<style lang="postcss">
	header {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		margin-block: 2rem;
		justify-content: space-between;
		max-width: 75ch;
		align-self: center;
	}

	hgroup {
		padding: 2rem;
		flex: 1;
	}

	form {
		align-self: center;
		/* --input-radius: var(--radius-sm); */
		flex: 1;
		max-width: 65ch;
	}
</style>
