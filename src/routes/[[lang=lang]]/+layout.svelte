<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { setLanguageTag } from '$i18n/runtime';
	import Footer from '$lib/components/Footer.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	export let data;

	let mounted = false;
	let prevLang = data.lang;

	onMount(() => {
		mounted = true;
	});

	setLanguageTag(data.lang);
	$: if (data.lang !== prevLang) {
		prevLang = data.lang;
		setLanguageTag(data.lang);
		invalidate(LOAD_DEPENDENCIES.Lang);
	}
</script>

{#if !mounted}
	<div class="loading">
		<Spinner />
	</div>
{/if}
<LoadingProgress />
<Navbar />
<main>
	<slot />
</main>
<Footer />
<ToastsOutlet />

<style lang="postcss">
	.loading {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
		user-select: none;
	}

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
</style>
