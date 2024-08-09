<script lang="ts">
	import { switchThumbCrossfade } from '$lib/motion/presets';

	let { current, key }: { current: boolean | undefined | string; key: any } = $props();
</script>

{#if current}
	<div
		class="switch-thumb"
		in:switchThumbCrossfade.receive={{ key }}
		out:switchThumbCrossfade.send={{ key }}
	></div>
{/if}
