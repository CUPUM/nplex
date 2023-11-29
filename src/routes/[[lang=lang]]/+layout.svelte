<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { setLanguageTag } from '$i18n/runtime';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { lang } from '$lib/i18n/store';
	import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(() => {
		loading = false;
	});

	if (browser) {
		lang.subscribe((v) => {
			setLanguageTag(v);
			invalidate(LOAD_DEPENDENCIES.Lang);
		});
	}
</script>

{#if loading}
	<div class="loading">
		<Spinner />
	</div>
{/if}
<LoadingProgress />
<slot />
<ToastsOutlet />

<style lang="postcss">
	.loading {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
		user-select: none;
	}
</style>
