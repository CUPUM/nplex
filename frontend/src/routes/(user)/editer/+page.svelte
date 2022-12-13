<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	const base = $page.url.pathname;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<article>
	<h2 class="e-h2">Créez une nouvelle fiche</h2>
	<nav>
		{#if mounted}
			<a href="{base}/organisation" in:scale={{ start: 0.9, delay: 150 }}>
				<div class="sub">Créer une nouvelle</div>
				<em>organisation</em>
				<Icon name="pen-plus" class="icon" strokeWidth="2" />
			</a>
			<a href="{base}/projet" class="project" in:scale={{ start: 0.9, delay: 300 }}>
				<div class="sub">Créer un nouveau</div>
				<em>projet</em>
				<Icon name="pen-plus" class="icon" strokeWidth="2" />
			</a>
			<a href="{base}/acteur" in:scale={{ start: 0.9, delay: 450 }}>
				<div class="sub">Créer un nouveau</div>
				<em>profil d'acteur</em>
				<Icon name="pen-plus" class="icon" strokeWidth="2" />
			</a>
		{/if}
	</nav>
</article>

<style lang="scss" module>
	article {
		min-height: calc(100vh - var(--navbar-height-px));
		padding: var(--ui-space-large) var(--ui-space-small);
		width: 100%;
		background: col(bg, 700);
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	nav {
		display: grid;
		grid-template-columns: 1fr 1.25fr 1fr;
		flex-wrap: wrap;
		width: 100%;
		max-width: var(--ui-display-medium);
		margin: 0 auto;
		padding: var(--ui-space-small);
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--ui-space-small);
	}

	a {
		display: flex;
		gap: 0.5em;
		flex-wrap: nowrap;
		aspect-ratio: 3 / 4;
		flex-direction: column;
		padding: var(--ui-space-xsmall);
		align-items: center;
		justify-content: center;
		text-align: center;
		background: transparent;
		border: 1px dashed col(fg, 000, 0.1);
		color: col(fg, 100);
		border-radius: 1.5rem;
		line-height: 1;
		transition: all 0.1s ease-out;

		&:hover {
			background: col(fg, 000, 0.1);
			box-shadow: 0 0 0 6px col(fg, 000, 0.1);
		}
	}

	.sub {
		font-size: var(--ui-size-x2small);
		font-weight: 400;
	}

	em {
		font-style: normal;
		font-weight: 450;
		font-size: var(--ui-size-large);
	}

	a .icon {
		font-size: var(--ui-size-large);
	}
</style>
