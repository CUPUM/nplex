<script lang="ts" context="module">
	export interface RangeContext {}
</script>

<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';
	import { getContext } from 'svelte';

	const rangeCtx = setContext<RangeContext>(Ctx.Range, {});
</script>
