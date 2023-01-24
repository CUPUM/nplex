<script lang="ts">
	import { enhance } from '$app/forms';
	import { messages } from '$routes/MessagesOutlet.svelte';
	import { FORMID } from '../common';
	import type { ActionData, PageData } from './$types';
	import ProjectSiteAdjacentStreets from './ProjectSiteAdjacentStreets.svelte';
	import ProjectSiteArea from './ProjectSiteArea.svelte';
	import ProjectSiteDistrict from './ProjectSiteDistrict.svelte';
	import ProjectSiteLocation from './ProjectSiteLocation.svelte';
	import ProjectSiteMainUsage from './ProjectSiteMainUsage.svelte';
	import ProjectSiteMap from './ProjectSiteMap.svelte';
	import ProjectSiteOwnership from './ProjectSiteOwnership.svelte';
	import ProjectSiteSecondaryUsages from './ProjectSiteSecondaryUsages.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.success) {
		messages.dispatch({ content: 'Projet mis à jour avec succès', type: 'success' });
	}
</script>

<form
	id={FORMID}
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<ProjectSiteOwnership {data} />
	<hr />
	<ProjectSiteMainUsage {data} />
	<hr />
	<ProjectSiteSecondaryUsages {data} />
	<hr />
	<div class="split">
		<section class="map">
			<ProjectSiteMap {data} />
		</section>
		<section class="fields">
			<ProjectSiteLocation {data} />
			<hr />
			<ProjectSiteDistrict {data} />
			<hr />
			<ProjectSiteArea {data} />
			<hr />
			<ProjectSiteAdjacentStreets {data} />
		</section>
	</div>
</form>

<style lang="scss">
	hr {
		background: col(primary, 100, 0.1);
	}

	.split {
		width: 100%;
		display: grid;
		grid-template-columns: calc(50% - 3rem) 1fr;
		// gap: 1.5rem;
	}

	.map {
		position: sticky;
		grid-column: 1;
		grid-row: 1;
		top: var(--ui-nav-px);
		height: calc(100vh - var(--ui-nav-px) - 1rem);
		padding-left: 1rem;
		border-radius: var(--ui-radius-lg);
	}

	.fields {
		grid-column: 2;
		grid-row: 1;
		z-index: 1;
		height: 200vh;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	:global(.site-formgroup) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 3rem;
		gap: 1.5rem;
		border-radius: var(--ui-radius-lg);
	}

	:global(.site-formgroup-legend) {
		color: col(fg, 500);
		grid-column: legend;
		float: left; // Required to clear outset by vendor styling.
		font-size: var(--ui-text-xl);
		font-weight: 550;
		padding: 0;
		line-height: 1.5;
	}
</style>
