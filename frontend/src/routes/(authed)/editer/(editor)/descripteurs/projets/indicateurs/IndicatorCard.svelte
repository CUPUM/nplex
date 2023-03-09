<script lang="ts">
	import Field from '$components/Field/Field.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import type { PageData } from './$types';

	export let data: PageData['metaIndicators'][number]['indicators'][number];
	export let i: number;
	export let opened = false;
</script>

<fieldset>
	<Field variant="outlined" placeholder="Titre" required bind:value={data.title} />
	<Field variant="outlined" placeholder="Titre court" required bind:value={data.label} />
	<Field variant="outlined" placeholder="Description" bind:value={data.description} />
</fieldset>
<Modal opened>Test</Modal>

<style lang="scss">
	fieldset {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
