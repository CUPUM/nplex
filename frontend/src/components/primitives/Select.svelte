<script lang="ts">
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';

	export let id: string;
	export let value = undefined;

	setContext(Ctx.Select, {});
</script>

<select name="select-{id}">
	<slot />
</select>

<style lang="postcss">
</style>
