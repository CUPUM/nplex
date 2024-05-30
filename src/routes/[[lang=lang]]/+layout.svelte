<script lang="ts">
	import Footer from '$lib/components/singletons/footer.svelte';
	import LanguageProvider from '$lib/components/singletons/language-provider.svelte';
	import ModeProvider from '$lib/components/singletons/mode-provider.svelte';
	import Navbar from '$lib/components/singletons/navbar.svelte';
	import PresentationProvider from '$lib/components/singletons/presentation-provider.svelte';
	import ScrollProvider from '$lib/components/singletons/scroll-provider.svelte';

	let { data, children } = $props();
</script>

<ScrollProvider />
<PresentationProvider />
<LanguageProvider lang={data.lang} />
<ModeProvider />
<!-- <Progress /> -->
<Navbar />
<main class="min-h-main-full-height flex flex-1 flex-col flex-nowrap">
	{@render children()}
</main>
<Footer />
<!-- <Toasts /> -->
