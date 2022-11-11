<script lang="ts">
	import { page } from '$app/stores';
	import { backgroundColor } from '$stores/backgroundColor';
	import { documentTheme } from '$stores/documentTheme';
	import { Theme } from '$utils/enums';
	import { onDestroy, onMount } from 'svelte/internal';
	import { navbarBackground } from './Navbar.svelte';

	onMount(() => {
		documentTheme.set(Theme.dark);
		backgroundColor.reset();
		navbarBackground.reset();
	});

	onDestroy(() => {
		documentTheme.reset();
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
		margin-top: var(--n-navbar-height-px);
		color: var(--color-error-300);
	}

	h1 {
		margin: 0;
	}

	pre {
		font-size: medium;
		font-family: var(--font-misc);
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>
