<script lang="ts">
	import { onDestroy } from 'svelte';
	import { navbarBackground } from './Navbar.svelte';

	export let color: string;

	const key = {};

	navbarBackground.set(key, color);

	$: navbarBackground.set(key, color);
	// onMount(() => {
	// });

	onDestroy(() => {
		navbarBackground.unset(key);
	});
</script>
