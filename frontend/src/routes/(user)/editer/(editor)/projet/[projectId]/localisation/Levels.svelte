<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import FieldButtonIncrement from '$components/Field/FieldButtonIncrement.svelte';

	// $: levels = ($page.data as PageData).project
</script>

<section class="editor-section">
	<h3 class="legend">Nombre d'étages</h3>
	<Field type="number" min={1} max={5} style="width: 160px" textAlign="center">
		<FieldButtonIncrement down slot="leading" />
		<FieldButtonIncrement up slot="trailing" />
	</Field>
</section>

<style lang="scss">
</style>
