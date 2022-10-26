<script lang="ts">
	import { Ctx } from '$utils/keys';
	import { getContext } from 'svelte';

	export let id: string;
	export let value;

	const selectCtx = getContext(Ctx.Select);
	const selectGroupCtx = getContext(Ctx.SelectGroup);
</script>

<option name="option-{id}" {id} {value}>
	<slot />
</option>
<div class="test" />

<style lang="scss">
</style>
