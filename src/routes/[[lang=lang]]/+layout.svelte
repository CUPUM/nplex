<script lang="ts">
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(() => {
		loading = false;
	});
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
