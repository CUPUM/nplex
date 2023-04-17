<script lang="ts">
	import OrganisationsPreviews from './PreviewOrganisations.svelte';
	import ProjectsPreviews from './PreviewProjects.svelte';
	import Splash from './Splash.svelte';

	export let data;

	let scrollTarget: HTMLElement;
</script>

<Splash {scrollTarget} images={data.splashImages} />
<ProjectsPreviews bind:scrollTarget projects={data.projects} />
<OrganisationsPreviews organisations={data.organisations} />

<!-- <ActorsPreviews actors={data.actors} /> -->

<style lang="scss">
</style>
