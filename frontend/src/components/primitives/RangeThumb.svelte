<script lang="ts">
	import { getContext } from 'svelte';
	import { rangeContextKey } from './Range.svelte';

	const ctx = getContext(rangeContextKey);

	export let value: number;
	export let name: string;
</script>

<input type="range" {name} id="{name}-thumb" />
