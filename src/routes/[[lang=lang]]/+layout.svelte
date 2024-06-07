<script lang="ts">
	import Footer from './footer.svelte';
	import LanguageProvider from './language-provider.svelte';
	import ModeProvider from './mode-provider.svelte';
	import Navbar from './navbar.svelte';
	import PresentationProvider from './presentation-provider.svelte';
	import ScrollProvider from './scroll-provider.svelte';
	import ToastsProvider from './toasts-provider.svelte';

	let { data, children } = $props();
</script>

<ScrollProvider />
<PresentationProvider />
<LanguageProvider lang={data.lang} />
<ModeProvider />
<ToastsProvider />
<Navbar />
<main class="min-h-main-full-height flex flex-1 flex-col flex-nowrap">
	{@render children()}
</main>
<Footer />
