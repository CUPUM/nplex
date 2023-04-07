<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { navbarBackground } from './Navbar.svelte';

	export let color: string;

	const key = {};

	onMount(() => {
		navbarBackground.set(key, color);
	});

	onDestroy(() => {
		navbarBackground.unset(key);
	});
</script>
