<script lang="ts">
	import Map from '$lib/components/patterns/map.svelte';

	let { data } = $props();
</script>

<Map class="rounded-inherit absolute! top-0 left-0 h-[100vh] w-[100vw] flex-none"></Map>
