<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';

	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

{#if loading}
	<div class="loading">
		<Loading />
	</div>
{/if}
<LoadingProgress />
<Navbar />
<main>
	<slot />
</main>
<ToastsOutlet />
<Footer />

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		flex-wrap: nowrap;
		padding: 0;
		margin: 0;
		min-height: calc(100vh - var(--navbar-height));
		min-height: calc(100svh - var(--navbar-height));
		min-height: calc(100dvh - var(--navbar-height));
	}

	.loading {
		z-index: 999;
		position: fixed;
		inset: 0;
		pointer-events: none;
		user-select: none;
	}
</style>
