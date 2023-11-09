<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { link } from '$lib/i18n/link';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
</script>

<main id="docs">
	<menu class="sidebar">
		<header>
			<Logo />
			<hr />
			<a class="header" {...$link('/docs')}>Documentation</a>
		</header>
		<span class="sidebar-legend">Styles</span>
		<nav class="sidebar-group">Test</nav>
	</menu>
	<div class="content">
		<article>
			<slot />
		</article>
		<footer>
			<button class="button outlined square"><ArrowLeft class="button-icon" /></button>
			<button class="button outlined square"><ArrowRight class="button-icon" /></button>
		</footer>
	</div>
</main>

<style lang="postcss">
	#docs {
		display: flex;
		flex-direction: row;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		gap: 1rem;
		padding: 1rem;
		font-size: var(--size-lg);
		font-weight: 500;

		hr {
			border-right-width: var(--border-size);
			border-bottom-width: var(--border-size);
			border-color: currentColor;
			opacity: 0.25;
			display: block;
			height: unset;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100svh;
		min-height: 100dvh;
	}

	article {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	footer {
		font-size: var(--size-sm);
		padding: 1rem;
	}
</style>
