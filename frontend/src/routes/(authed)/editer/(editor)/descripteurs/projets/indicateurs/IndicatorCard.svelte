<script lang="ts">
	import Field from '$components/Field/Field.svelte';
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

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: column;
		font-size: var(--ui-text-sm);
		padding: 6px;
		gap: 3px;
		background-color: col(bg, 500);
		border-radius: var(--ui-radius-lg);
	}
</style>
