<!--
	@component
	# Breadcrumbs
-->
<script lang="ts">
	import OverflowEffect from '$components/OverflowEffect.svelte';
	import { VARIANTS, type Variant } from '$utils/enums';

	export let variant: Variant = VARIANTS.Default;
</script>

<nav class="breadcrumbs {variant} no-scrollbar">
	<OverflowEffect>
		<div class="breadcrumbs-inner">
			<slot />
		</div>
	</OverflowEffect>
</nav>

<style lang="scss">
	@use './Breadcrumbs.scss';
</style>
