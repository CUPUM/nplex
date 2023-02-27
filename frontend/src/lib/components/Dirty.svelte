<!--
	@component
	# Dirty
	A helper to simplify comparison of bound values. Useful for marking forms or inputs as dirty.
	When using, ensure the lifecycle of the component corresponds to the desired lifecycle of the bound dirty state.
	
-->
<script lang="ts">
	import isEqual from '$utils/isEqual';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let dirty = false;
	/**
	 * The reference value used to determine if the specimen is dirty.
	 */
	export let sample: T;
	/**
	 * Bind a variable to allow the dirty component to sync.
	 */
	export let specimen: T;
	/**
	 * Should array comparison take into account the order of array members?
	 */
	export let strictOrder: boolean | undefined = undefined;
	/**
	 * Comparison function, should return true when values differ, i.e. when the specimen in
	 * considered dirty.
	 */
	export let compare: (sample: T, specimen: T, strictOrder?: boolean) => boolean = (s, v) =>
		!isEqual(s, v, strictOrder);

	type T = $$Generic;

	const dispatch = createEventDispatcher();

	$: dirty = compare(sample, specimen, strictOrder);

	$: if (dirty) {
		dispatch('dirty');
	} else {
		dispatch('clean');
	}

	// function sync() {
	// 	if (typeof sample === 'object') {
	// 		return (specimen = JSON.parse(JSON.stringify(sample)));
	// 	}
	// 	specimen = sample;
	// }

	onDestroy(() => {
		dirty = false;
	});
</script>

<slot {dirty} />
