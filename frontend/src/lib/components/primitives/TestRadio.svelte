<script lang="ts">
	import { getContext } from 'svelte';

	export let value;

	const { group } = getContext('test');
</script>

<label>
	<slot />
	<input type="radio" {value} bind:group={$group} />
</label>

<style>
</style>
