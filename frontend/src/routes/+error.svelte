<script lang="ts">
	import { page } from '$app/stores';
	import { backgroundColor } from '$stores/backgroundColor';
	import { colors } from '$utils/vars';
	import { onDestroy, onMount } from 'svelte/internal';

	onMount(() => {
		backgroundColor.set(colors.light.error[700], 150);
	});

	onDestroy(() => {
		backgroundColor.reset();
	});
</script>

<div>
	<h1>Oops!</h1>
	<h2>Erreur: {$page.status}</h2>
	<pre>{JSON.stringify($page.error, undefined, 2)}</pre>
</div>

<!-- <slot /> -->
<style lang="scss">
	div {
		width: 100%;
		max-width: 820px;
		padding: 2rem;
		margin: 2rem auto;
		color: var(--color-light-100);
	}

	h1 {
		margin: 0;
	}

	h2 {
		// font-family: var(--font-misc);
	}

	pre {
		font-size: 12px;
		font-family: var(--font-misc);
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>
