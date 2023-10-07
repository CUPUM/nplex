<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import { onMount } from 'svelte';
	import Contexts from './Contexts.svelte';
	import Navbar from './Navbar.svelte';

	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

<Contexts>
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
	<Footer />
	<!-- <ToastsOutlet /> -->
</Contexts>

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		flex-wrap: nowrap;
		padding: 0;
		margin: 0;
	}

	.loading {
		z-index: 999;
		position: fixed;
		inset: 0;
		pointer-events: none;
		user-select: none;
	}
</style>
