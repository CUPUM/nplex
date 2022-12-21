<script lang="ts">
	import type { PageData } from './$types';
	import ActorsPreviews from './ActorsPreviews.svelte';
	import HomeHeader from './HomeHeader.svelte';
	import OrganisationsPreviews from './OrganisationsPreviews.svelte';
	import ProjectsPreviews from './ProjectsPreviews.svelte';

	export let data: PageData;

	let scrollTarget: HTMLElement;
</script>

<HomeHeader {scrollTarget} />
<ProjectsPreviews bind:scrollTarget projects={data.projects} />
<OrganisationsPreviews organisations={data.organisations} />
<ActorsPreviews actors={data.actors} />

<style lang="scss">
</style>
