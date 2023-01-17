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
			3fr
			[section-end full-end];
		align-items: flex-start;
		gap: var(--ui-gutter);
		padding: 4rem var(--ui-gutter);

		legend {
			// opacity: 0.5;
			color: col(fg, 500);
			grid-column: legend;
			position: sticky;
			top: var(--ui-nav-px);
			float: left; // Required to clear outset by vendor styling.
			font-size: var(--ui-text-xl);
			font-weight: 550;
			padding: 0;
			line-height: 1.5;
			// transition: all 0.25s ease;
		}

		// &:hover {
		// 	legend {
		// 		opacity: 1;
		// 	}
		// }

		section {
			grid-column: section;
			display: flex;
			flex-direction: column;
			gap: var(--ui-gutter);
			align-items: flex-start;
		}
	}
</style>
