<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { getContext } from 'svelte';

	export let id: string;
	export let value;

	const selectCtx = getContext(Ctx.Select);
	const selectGroupCtx = getContext(Ctx.SelectGroup);

	console.log(selectCtx);
</script>

<option name="option-{id}" {id} {value}>
	<slot />
</option>
<div class="test" />

<style lang="postcss">
</style>
