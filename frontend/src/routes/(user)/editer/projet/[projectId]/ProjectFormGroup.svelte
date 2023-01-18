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
		gap: var(--ui-gutter);
		padding: 4rem var(--ui-gutter);

		section {
			grid-column: section;
			display: flex;
			flex-direction: column;
			gap: var(--ui-gutter);
			align-items: flex-start;
		}
	}
</style>
