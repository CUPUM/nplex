<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { getContext, setContext } from 'svelte';

	const selectCtx = getContext(Ctx.Select);
	setContext(Ctx.SelectGroup, {});
</script>

<optgroup>
	<slot />
</optgroup>

<style lang="scss">
</style>
