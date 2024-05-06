<script lang="ts">
	import { setLanguageTag } from '$i18n/runtime';
	import Footer from '$lib/components/singletons/footer.svelte';
	import Navbar from '$lib/components/singletons/navbar.svelte';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const lang = $derived(data.lang);
	setLanguageTag(() => lang);
</script>

<!-- {#if !mounted}
	<div class="fixed inset-0 z-[999] pointer-events-none">
		<Spinner />
	</div>
{/if} -->
<!-- <Progress /> -->
<Navbar />
<main class="flex min-h-[calc(100svh-var(--height-navbar))] flex-1 flex-col flex-nowrap">
	{@render children()}
</main>
<Footer />
<!-- <Toasts /> -->
