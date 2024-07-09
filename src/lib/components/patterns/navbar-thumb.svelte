<script lang="ts">
	import { switchThumbCrossfade } from '$lib/motion/presets';

	let { current, key }: { current: boolean; key: any } = $props();
</script>

{#if current}
	<div
		data-thumb
		class="rounded-inherit bg-checked absolute inset-0 -z-1"
		in:switchThumbCrossfade.receive|global={{ key }}
		out:switchThumbCrossfade.send|global={{ key }}
	></div>
{/if}
