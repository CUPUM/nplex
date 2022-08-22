<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal } from '$actions/reveal';

	import Field from '$components/primitives/Field.svelte';
	import FieldIcon from '$components/primitives/FieldIcon.svelte';
	import { slipMask } from '$utils/presets/reveal';
</script>

<form class="search-sheets">
	<h3 use:reveal={slipMask}>Trouvez une fiche existante à laquelle vous avez accès ou créez une nouvelle fiche:</h3>
	<Field placeholder="Chercher parmis vos projets, organisations, et acteurs">
		<FieldIcon name="search" slot="leading" />
	</Field>
</form>

<style lang="scss">
	form {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
