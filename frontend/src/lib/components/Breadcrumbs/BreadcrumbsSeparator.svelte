<!--
	@component
	# Breadcrumbs Separator
	
-->
<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

<span in:slide={{ axis: 'x', duration: 250, easing: expoOut }}>
	<slot>/</slot>
</span>

<style lang="scss">
	span {
		position: relative;
		pointer-events: none;
		opacity: 0.2;
		top: -0.1em;
		margin-inline: 3px;
	}
</style>
