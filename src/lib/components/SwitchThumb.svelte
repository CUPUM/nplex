<!--
	 @component 
#Switch thumb
Handles conditional rendering of switch thumb based on a condition and a key for crossfade.
-->
<script lang="ts" context="module">
	import { cubicInOut, elasticOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';

	export const switchThumbCrossfade = crossfade({
		duration(l) {
			return 150 + l / 10;
		},
		easing: cubicInOut,
		fallback(node /* params, intro */) {
			return scale(node, { duration: 500, easing: elasticOut, start: 0.95 });
		},
	});
</script>

<script lang="ts">
	export let key: any = undefined;
	export let current: boolean;

	function parentSwitch(node: HTMLElement) {
		if (!key) {
			const parentSwitchRef = node.closest('.switch');
			key = parentSwitchRef ?? 'switch';
		}
	}

	const [send, receive] = switchThumbCrossfade;
</script>

{#if current}
	<div class="switch-thumb" in:receive={{ key }} out:send={{ key }} use:parentSwitch />
{/if}

<style>
</style>
