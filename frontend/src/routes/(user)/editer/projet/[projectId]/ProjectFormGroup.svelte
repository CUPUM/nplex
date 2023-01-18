<script lang="ts">
</script>

<fieldset>
	<legend class="editor-legend">
		<slot name="legend" />
	</legend>
	<section>
		<slot />
	</section>
</fieldset>

<hr />

<style lang="scss">
	fieldset {
		position: relative;
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns:
			[full-start legend-start]
			1fr
			[legend-end section-start]
			3fr
			[section-end full-end];
		align-items: flex-start;
		gap: 1.5rem;
		padding: 1.5rem;
		// background: col(bg, 500);
		// border-radius: var(--ui-radius-xl);

		section {
			grid-column: section;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			align-items: flex-start;
		}
	}
</style>
