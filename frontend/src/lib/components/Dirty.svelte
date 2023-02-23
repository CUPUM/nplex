<!--
	@component
	# Dirty
	A helper to simplify comparison of bound values. Useful for marking forms or inputs as dirty.
	When using, ensure the lifecycle of the component corresponds to the desired lifecycle of the bound dirty state.
	
-->
<script lang="ts" context="module">
	import { isObject } from '$utils/object';

	function isDirty<T>(sample: T, specimen: T, strictOrder: boolean): boolean {
		const err = new Error('Types of compared values do not coincide.');
		try {
			if (typeof sample !== typeof specimen) {
				if (sample == null || specimen == null) {
					return true;
				}
				throw err;
			}
			// Compare primitives (including null and undefined) with naive equality check.
			if (
				typeof sample === 'string' ||
				typeof sample === 'number' ||
				typeof sample === 'boolean' ||
				sample == null
			) {
				return specimen != sample;
			}
			// Compare arrays.
			else if (Array.isArray(sample)) {
				if (!Array.isArray(specimen)) {
					throw err;
				}
				return (
					sample.length !== specimen.length ||
					sample.some((sampleItem, i) => {
						if (strictOrder) {
							return isDirty(sampleItem, specimen[i], strictOrder);
						}
						return specimen.every((specimenItem) => {
							return isDirty(sampleItem, specimenItem, strictOrder);
						});
					})
				);
			}
			// Compare objects.
			else if (isObject(sample)) {
				if (!isObject(specimen)) {
					throw err;
				}
				const sampleKeys = Object.keys(sample);
				const specimenKeys = Object.keys(specimen);
				return (
					sampleKeys.length !== specimenKeys.length ||
					sampleKeys.some((sampleKey) => {
						return isDirty((sample as any)[sampleKey], specimen[sampleKey], strictOrder);
					})
				);
			}
		} catch (error) {
			console.error(error);
		}
		return true;
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';

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
	export let strictOrder: boolean = false;
	/**
	 * Comparison function.
	 */
	export let compare: (sample: T, specimen: T) => boolean = (s, v) => isDirty(s, v, strictOrder);

	type T = $$Generic;

	$: dirty = compare(sample, specimen);

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

<slot {specimen} {dirty} />
