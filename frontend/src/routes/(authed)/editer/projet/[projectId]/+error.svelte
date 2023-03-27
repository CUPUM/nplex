<script lang="ts">
	import { page } from '$app/stores';

	$: console.log($page.error?.message);
</script>

<div>
	<code class="subtle">¯\_(ツ)_/¯</code>
	<h2 class="heading-sm">Erreur: {$page.status}</h2>
	<pre>{JSON.stringify($page.error, undefined, 2)}</pre>
</div>

<style lang="scss">
	div {
		width: 100%;
		color: col(error, 700);
		padding: 3rem;
	}

	pre {
		font-size: medium;
		font-family: var(--ui-font-misc);
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>
