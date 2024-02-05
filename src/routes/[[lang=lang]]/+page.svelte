<script lang="ts">
	import { onMount } from 'svelte';
	import Landing from './Landing.svelte';

	export let data;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<Landing images={data.randomImages} />

<style lang="postcss">
</style>
