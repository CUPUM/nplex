<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext } from 'svelte';

	export let from: number;
	export let to: number;

	const rangeCtx = getContext(Ctx.Range);
</script>
