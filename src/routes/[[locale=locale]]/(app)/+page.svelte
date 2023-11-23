<script lang="ts">
	import { onMount } from 'svelte';
	import Landing from './Landing.svelte';

	export let data;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: console.log(data.randomImages);
</script>

<Landing />

<style lang="postcss">
</style>
