<script lang="ts" context="module">
	export interface RangeContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';

	export let min: number;
	export let max: number;
	export let value;

	const rangeCtx = setContext<RangeContext>(Ctx.Range, {});
</script>

<input type="range" {min} {max} bind:value />
