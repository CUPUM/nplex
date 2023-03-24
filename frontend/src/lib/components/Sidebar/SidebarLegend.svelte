<script lang="ts">
</script>

<legend><slot /></legend>

<style lang="scss">
	legend {
		font-weight: 400;
		font-size: var(--ui-text-xs);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		padding: 0.5rem 1rem;
		text-align: center;
		opacity: 0.5;
		color: col(secondary, 900);
	}
</style>
