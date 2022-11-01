<script lang="ts">
	import type { LayoutData } from './$types';
	import EditorActorCard from './EditorActorCard.svelte';
	import EditorList from './EditorList.svelte';
	import EditorOrganisationCard from './EditorOrganisationCard.svelte';
	import EditorProjectCard from './EditorProjectCard.svelte';
	import EditorSearch from './EditorSearch.svelte';

	export let data: LayoutData;
</script>

<div>
	<article>
		<slot />
	</article>
	<article>
		<EditorSearch />
		<EditorList title="Projets" data={data.projects}>
			<EditorProjectCard />
			<svelte:fragment slot="list" let:datum>
				<EditorProjectCard {datum} />
			</svelte:fragment>
		</EditorList>
		<EditorList title="Organisations" data={data.organisations}>
			<EditorOrganisationCard />
			<svelte:fragment slot="list" let:datum>
				<li>{datum.title}</li>
			</svelte:fragment>
		</EditorList>
		<EditorList title="Acteurs" data={data.actors}>
			<EditorActorCard />
			<svelte:fragment slot="list" let:datum>
				<li>{datum.title}</li>
			</svelte:fragment>
		</EditorList>
	</article>
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
