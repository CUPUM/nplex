<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import type { PageData } from './$types';

	export let metaId: PageData['metaIndicators'][number]['id'];
	export let data: PageData['metaIndicators'][number]['indicators'][number];
	export let i: number;
	export let opened = false;
</script>

<fieldset>
	<Field variant="ghost" placeholder="Titre" required bind:value={data.title} />
	<Button equi rounded><Icon name="plus" /></Button>
</fieldset>

<!-- <Field variant="outlined" placeholder="Titre court" required bind:value={data.label} />
<Field variant="outlined" placeholder="Description" bind:value={data.description} /> -->
<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: row;
		gap: 1em;
		font-size: var(--ui-text-sm);
		padding: 0.25em;
		background-color: col(bg, 900);
		border-radius: var(--ui-radius-sm);
	}
</style>
