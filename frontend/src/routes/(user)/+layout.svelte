<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import type { LayoutData } from './$types';
	import { EDITABLES_HASHES } from './common';
	import EditablesList from './EditablesList.svelte';

	export let data: LayoutData;
</script>

<slot />
<header>
	<h2>Fiches éditables</h2>
</header>
<EditablesList id={EDITABLES_HASHES.projects} title="Projets" data={data.projects} let:datum>
	<a class="project-card" href="/editer/projet/{datum.id}">
		<section>
			<div class="title">{datum.title}</div>
			<div class="type">{datum.type?.title ?? 'Sans type'}</div>
		</section>
	</a>
	<svelte:fragment slot="create">
		<a class="project-card" href="/editer/projet">
			<Icon name="file-add" />
		</a>
	</svelte:fragment>
</EditablesList>

<style lang="scss">
	header {
		padding: 2rem;
	}

	.project-card {
		display: grid;
		height: 350px;
		aspect-ratio: 2 /3;
		background: red;
	}
</style>
