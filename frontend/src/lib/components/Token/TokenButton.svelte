<!--
	@component
	# Token Button
	
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
	import Ripple from '$components/Ripple.svelte';

	export let as: keyof HTMLElementTagNameMap = 'button';
	export let variant: 'default' | 'outlined' | 'danger' | 'cta' | 'ghost' = 'default';
	export let equi: boolean = true;
</script>

<svelte:element this={as} class="ui-token-button {variant}" class:equi type="button">
	<Ripple />
	<slot />
</svelte:element>

<style lang="scss">
	@use './TokenButton.scss';
</style>
