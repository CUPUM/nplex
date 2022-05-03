<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';

	export let from: number;
	export let to: number;

	const rangeCtx = getContext(Ctx.Range);
</script>
