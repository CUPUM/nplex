<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import LoadingProgress from '$lib/components/LoadingProgress.svelte';
	import ToastsOutlet from '$lib/components/ToastsOutlet.svelte';
	import { onMount } from 'svelte';

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
<slot />
<ToastsOutlet />

<style lang="postcss">
</style>
