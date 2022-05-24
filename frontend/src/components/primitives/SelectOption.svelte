<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';

	export let id: string;
	export let value;

	const selectCtx = getContext(Ctx.Select);
	const selectGroupCtx = getContext(Ctx.SelectGroup);
</script>

<option name="option-{id}" {id}>
	<slot />
</option>

<style lang="postcss">
</style>
