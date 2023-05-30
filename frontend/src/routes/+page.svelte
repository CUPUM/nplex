<script lang="ts">
	import HomepageHeader from './HomepageHeader.svelte';
	import HomepageIntroduction from './HomepageIntroduction.svelte';
	import HomepageProjects from './HomepageProjects.svelte';
	import OrganisationsPreviews from './PreviewOrganisations.svelte';

	export let data;

	let scrollTarget: HTMLElement;
</script>

<HomepageHeader {scrollTarget} images={data.splashImages} />
<HomepageIntroduction />
<HomepageProjects bind:scrollTarget projects={data.projects} />
<OrganisationsPreviews organisations={data.organisations} />

<!-- <ActorsPreviews actors={data.actors} /> -->

<style lang="scss">
</style>
