<script lang="ts">
	import { i18n } from '$lib/i18n/adapter';
	import { ParaglideJS as I18nProvider } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import Footer from './footer.svelte';
	import Navbar from './navbar.svelte';
	import PresentationProvider from './presentation-provider.svelte';
	import ScrollProvider from './scroll-provider.svelte';
	import ThemeProvider from './theme-provider.svelte';
	import ToastsProvider from './toasts-provider.svelte';

	let { children } = $props();
</script>

<I18nProvider {i18n}>
	<ScrollProvider />
	<PresentationProvider />
	<ThemeProvider />
	<ToastsProvider />
	<Navbar />
	<main class="min-h-main-full-height rounded-inherit flex flex-1 flex-col flex-nowrap">
		{@render children()}
	</main>
	<Footer />
</I18nProvider>
