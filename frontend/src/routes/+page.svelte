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
<hr />
<OrganisationsPreviews organisations={data.organisations} />
<hr />
<ActorsPreviews actors={data.actors} />
<hr />

<style lang="scss">
	hr {
		align-self: stretch;
		// width: 100%;
		// max-width: var(--ui-width-main);
		border: var(--ui-border-thickness) dashed col(fg, 100, 0.5);
		border-top: none;
		margin: 1.5rem;
		position: relative;
		overflow: visible;

		&::after {
			content: '';
			position: absolute;
			height: 12px;
			width: calc(100% + 2 * var(--ui-border-thickness));
			top: 0;
			left: calc(-1 * var(--ui-border-thickness));
			transform: translateY(-50%);
			border-inline: inherit;
		}
	}
</style>
