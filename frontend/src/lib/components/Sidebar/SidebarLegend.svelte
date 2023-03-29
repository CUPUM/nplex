<script lang="ts">
</script>

<legend><slot /></legend>

<style lang="scss">
	legend {
		font-weight: 350;
		font-size: var(--ui-text-sm);
		padding: 0.5rem 1.25rem;
	}

	:global(.editor) legend {
		opacity: 0.5;
		color: col(fg, 000);
	}
</style>
