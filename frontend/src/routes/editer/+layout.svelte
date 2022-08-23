<script lang="ts">
	import EditorProjectsList from '$routes/editer/EditorProjectsList.svelte';
	import type { LayoutData } from './$types';
	import EditorActorsList from './EditorActorsList.svelte';
	import EditorOrganisationsList from './EditorOrganisationsList.svelte';
	import Search from './Search.svelte';

	const targetForm = 'edit-form';

	export let data: LayoutData;
</script>

<div>
	<article>
		<slot />
	</article>
	<Search />
	<EditorProjectsList />
	<EditorOrganisationsList />
	<EditorActorsList />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0;
	}

	article {
		position: relative;
	}
</style>
