<!--
	@component
	# Overflow Effect
	Create visual cues to signal presence of available (unreached) overflow content.
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	export let scrollTarget: HTMLElement;
	export let position: 'inline-end' | 'inline-start' | 'block-start' | 'block-end';

	$: if (scrollTarget) {
	}
</script>

<div aria-hidden class={position} />

<style lang="scss">
	div {
	}
</style>
