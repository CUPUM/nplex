<script lang="ts">
	import { setLanguageTag } from '$i18n/runtime';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import RootFooter from '$lib/components/singletons/root-footer.svelte';
	import RootNavbar from '$lib/components/singletons/root-navbar.svelte';
	import RootProgress from '$lib/components/singletons/root-progress.svelte';
	import RootToastContainer from '$lib/components/singletons/root-toast-container.svelte';
	import { untrack } from 'svelte';

	let { data, children } = $props();

	let mounted = $state(false);

	$effect(() => {
		untrack(() => {
			mounted = true;
		});
	});

	const lang = $derived(data.lang);
	setLanguageTag(() => lang);
</script>

{#if !mounted}
	<div class="fixed inset-0 z-[999] pointer-events-none">
		<Spinner />
	</div>
{/if}
<RootProgress />
<RootNavbar />
<main
	class="flex font- flex-col flex-1 flex-nowrap min-h-[calc(100dvh - var(--root-navbar-height))]"
>
	{@render children()}
</main>
<RootFooter />
<RootToastContainer />
