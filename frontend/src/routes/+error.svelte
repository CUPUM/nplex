<script lang="ts">
	import { page } from '$app/stores';
	import { THEMES } from '$utils/themes';
	import RootTheme from './RootTheme.svelte';
</script>

<RootTheme theme={THEMES.dark} />
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
