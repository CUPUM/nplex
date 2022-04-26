<script lang="ts">
	import { getContext } from 'svelte';
	import { rangeContextKey } from './Range.svelte';

	export let from: number;
	export let to: number;

	const ctx = getContext(rangeContextKey);
</script>
