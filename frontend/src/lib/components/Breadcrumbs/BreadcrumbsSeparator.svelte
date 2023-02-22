<!--
	@component
	# Breadcrumbs Separator
	
-->
<script lang="ts">
</script>

<span>
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
