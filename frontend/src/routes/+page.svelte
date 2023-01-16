<script lang="ts">
	import type { PageData } from './$types';
	import ActorsPreviews from './PreviewActors.svelte';
	import OrganisationsPreviews from './PreviewOrganisations.svelte';
	import ProjectsPreviews from './PreviewProjects.svelte';
	import Splash from './Splash.svelte';

	export let data: PageData;

	let scrollTarget: HTMLElement;
</script>

<Splash {scrollTarget} />
<ProjectsPreviews bind:scrollTarget projects={data.projects} />
<OrganisationsPreviews organisations={data.organisations} />
<ActorsPreviews actors={data.actors} />

<style lang="scss">
</style>
