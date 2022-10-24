<script lang="ts">
	import { Ctx } from '$utils/values/keys';
	import { setContext } from 'svelte';

	export let id: string;
	export let value;

	setContext(Ctx.Select, {});
</script>

<select name="select-{id}" bind:value>
	<slot />
</select>

<style lang="scss">
</style>
