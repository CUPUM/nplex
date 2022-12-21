<script lang="ts">
	import type { LayoutData } from './$types';
	import { EDITABLES_HASHES } from './common';
	import EditableProjectCard from './EditableProjectCard.svelte';
	import EditablesList from './EditablesList.svelte';

	export let data: LayoutData;
</script>

<slot />
<header>
	<h2>Fiches éditables</h2>
</header>
<EditablesList id={EDITABLES_HASHES.PROJECTS} title="Projets" data={data.projects} let:datum>
	<EditableProjectCard project={datum} />
</EditablesList>
<EditablesList id={EDITABLES_HASHES.PROJECTS} title="Organisations" data={data.projects} let:datum>
	<EditableProjectCard project={datum} />
</EditablesList>
<EditablesList id={EDITABLES_HASHES.PROJECTS} title="Acteurs" data={data.projects} let:datum>
	<EditableProjectCard project={datum} />
</EditablesList>

<style lang="scss">
	header {
		padding: 2rem;
	}
</style>
