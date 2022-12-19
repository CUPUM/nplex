<script lang="ts">
	import { page } from '$app/stores';
	import { THEME_NAMES } from '$utils/themes';
	import { onDestroy, onMount } from 'svelte/internal';
	import { rootTheme } from './RootTheme.svelte';

	onMount(() => {
		rootTheme.set(THEME_NAMES.DARK);
	});

	onDestroy(() => {
		rootTheme.reset();
	});
</script>

<div>
	<h1>Oops!</h1>
	<h2>Erreur: {$page.status}</h2>
	<pre>{JSON.stringify($page.error, undefined, 2)}</pre>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 820px;
		min-height: 100vh;
		padding: 4rem;
		margin: 0 auto;
		margin-top: calc(-1 * var(--ui-nav-px));
		color: var(--color-error-300);
	}

	h1 {
		margin: 0;
	}

	pre {
		font-size: medium;
		font-family: var(--ui-font-misc);
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>
