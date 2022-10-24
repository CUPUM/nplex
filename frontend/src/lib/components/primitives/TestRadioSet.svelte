<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let value;

	const group = writable(value);

	$: {
		group.set(value);
	}
	$: {
		value = $group;
	}

	setContext('test', {
		group,
	});
</script>

<fieldset>
	<legend>Value prop: {value}</legend>
	<legend>Group: {$group}</legend>
	<slot />
</fieldset>

<style>
</style>
