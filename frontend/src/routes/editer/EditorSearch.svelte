<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/primitives/Field.svelte';
	import FieldIcon from '$components/primitives/FieldIcon.svelte';
</script>

<form class="search-sheets">
	<!-- <h3 use:reveal={slipMask}>Trouvez une fiche existante</h3> -->
	<div>
		<Field placeholder="Cherchez parmis vos projets, organisations, et acteurs">
			<FieldIcon name="search" slot="leading" />
		</Field>
	</div>
</form>

<style lang="scss">
	form {
		position: sticky;
		top: 0;
		margin: 0;
		padding: 0;
		padding-top: calc(var(--navbar-height) + 1rem);
		// padding-bottom: 1rem;
		@include mixins.core-grid;
		z-index: 10;
		// background-color: rgba(var(--rgb-light-100), 0.9);
		// backdrop-filter: blur(12px);
	}

	h3 {
		margin: 0;
		margin-bottom: 2rem;
		grid-column: main;
	}

	div {
		grid-column: main;
	}
</style>
