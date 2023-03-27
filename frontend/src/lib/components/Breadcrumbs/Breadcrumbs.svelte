<!--
	@component
	# Breadcrumbs
-->
<script lang="ts">
	import OverflowEffect from '$components/OverflowEffect.svelte';

	export let variant: 'editor' = 'editor';
</script>

<nav class="breadcrumbs {variant} noscrollbar">
	<OverflowEffect>
		<div class="breadcrumbs-inner">
			<slot />
		</div>
	</OverflowEffect>
</nav>

<style lang="scss">
	@use './Breadcrumbs.scss';
</style>
