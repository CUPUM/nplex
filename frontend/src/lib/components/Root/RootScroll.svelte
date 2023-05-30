<script lang="ts">
	import { rootScroll } from '$stores/rootScroll';
	import { onDestroy } from 'svelte';

	const key = {};

	export let lock: boolean | undefined;

	$: if (lock) {
		rootScroll.lock(key);
	} else {
		rootScroll.unlock(key);
	}

	if (lock) {
		rootScroll.lock(key);
	}

	// onMount(() => {
	// });

	onDestroy(() => {
		rootScroll.unlock(key);
	});
</script>
