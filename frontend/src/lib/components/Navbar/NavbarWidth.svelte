<script lang="ts">
	import { onDestroy } from 'svelte';
	import { navbarWidth } from './Navbar.svelte';

	export let width: Parameters<typeof navbarWidth.set>[1];

	const key = {};

	navbarWidth.set(key, width);

	$: navbarWidth.set(key, width);

	// onMount(() => {
	// });

	onDestroy(() => {
		navbarWidth.unset(key);
	});
</script>
