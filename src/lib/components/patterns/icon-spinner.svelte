<script lang="ts">
	import { type Component, type ComponentType } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import Spinner from '../primitives/spinner.svelte';

	let {
		busy,
		icon,
		...iconProps
	}: { busy: boolean; icon: ComponentType | Component } & Omit<SVGAttributes<SVGElement>, 'speed'> =
		$props();
</script>

{#if busy}
	<Spinner {...iconProps} />
{:else}
	<svelte:component this={icon} {...iconProps} />
{/if}

<style>
</style>
