<!--
	@component
	# Token Button
	
-->
<script lang="ts">
	import Ripple from '$components/Ripple.svelte';
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';

	export let as: keyof HTMLElementTagNameMap = 'button';
	export let variant: Variant = VARIANTS.Default;
	export let state: State = STATES.Normal;
	export let equi: boolean = true;
</script>

<svelte:element this={as} class="token-button {variant} {state}" class:equi type="button">
	<Ripple />
	<div class="token-button-inner">
		<slot />
	</div>
</svelte:element>

<style lang="scss">
	@use './TokenButton.scss';
</style>
