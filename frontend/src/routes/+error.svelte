<script lang="ts">
	import { page } from '$app/stores';
</script>

<article>
	<div>
		<h1>Oopelaye!</h1>
		<h2>{$page.status}</h2>
		<p>{$page.error.message}</p>
	</div>
</article>

<style>
	article {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100%;
		padding: 6rem 2rem;
	}

	div {
		max-width: 800px;
		background-color: var(--color-error-500);
		color: var(--color-dark-900);
		padding: 3rem;
		border-radius: 1.5rem;
	}

	h1 {
		margin: 0;
	}

	h2 {
		font-family: var(--font-misc);
	}

	p {
		font-family: var(--font-misc);
		white-space: normal;
		word-break: break-all;
	}
</style>
