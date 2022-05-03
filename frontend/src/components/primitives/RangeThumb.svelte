<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';

	const rangeCtx = getContext(Ctx.Range);

	export let value: number;
	export let name: string;
</script>

<input type="range" {name} id="{name}-thumb" />
