<script lang="ts" context="module">
</script>

<script lang="ts">
</script>

<fieldset>
	<legend>
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
			2fr
			[section-end full-end];
		align-items: flex-start;
		gap: var(--ui-gutter);
		padding: var(--ui-gutter);

		> legend {
			grid-column: legend;
			position: sticky;
			top: var(--ui-nav-px);
			float: left; // Required to clear outset by vendor styling.
			font-size: var(--ui-text-lg);
			font-weight: 550;
			padding: 0;
			line-height: 1.5;
		}

		> section {
			grid-column: section;
			display: flex;
			flex-direction: column;
			gap: var(--ui-gutter);
			align-items: flex-start;
		}
	}
</style>
