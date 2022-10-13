<script context="module">
	import h1 from './h1.svelte';
	import h2 from './h2.svelte';
	import h3 from './h3.svelte';
	import h4 from './h4.svelte';
	import p from './p.svelte';
	export { h1, h2, h3, h4, p };
</script>

<script>
	export let title;
	export let headerImage;
</script>

<article class="article core-grid">
	<header class="header">
		<hgroup>
			<h1>{title}</h1>
		</hgroup>
		{#if headerImage}
			<img src={headerImage} alt="" />
		{/if}
	</header>
	<slot />
</article>

<style>
	.article {
		display: grid;
		width: 100%;
	}

	.article > :global(*) {
		grid-column: main;
	}

	.header {
		grid-column: fullpad;
		border-radius: 2.5rem;
		overflow: hidden;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	hgroup {
		position: absolute;
		padding: 2rem;
	}

	img {
		padding: 0;
		margin: 0;
		width: 100%;
		object-fit: fill;
	}
</style>
