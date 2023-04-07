<script lang="ts">
</script>

<button {...$$restProps}><slot /></button>

<style lang="scss">
	button {
		color: var(--button-color, black);
		padding: 1em;
		background-color: grey;
		border-radius: var(--button-radius, var(--ui-radius-md));
	}
</style>
