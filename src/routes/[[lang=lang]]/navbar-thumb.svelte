<script lang="ts">
	import { switchThumbCrossfade } from '$lib/motion/presets';

	let { current, key }: { current: boolean; key: any } = $props();
</script>

{#if current}
	<div
		data-thumb
		class="rounded-inherit bg-primary/10 absolute inset-0"
		in:switchThumbCrossfade.receive={{ key }}
		out:switchThumbCrossfade.send={{ key }}
	></div>
{/if}
