<script lang="ts">
	import { switchThumbCrossfade } from '$lib/motion/presets';

	let { current, key }: { current: boolean; key: any } = $props();
</script>

{#if current}
	<div
		class="opacity-dim border-primary border-lg rounded-inherit absolute inset-0 border"
		in:switchThumbCrossfade.receive={{ key }}
		out:switchThumbCrossfade.send={{ key }}
	></div>
{/if}
