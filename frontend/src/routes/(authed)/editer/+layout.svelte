<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { Snapshot } from './$types';
	import { EDITOR_ROUTES } from './common';
	import EditableActorCard from './EditableActorCard.svelte';
	import EditableOrgCard from './EditableOrgCard.svelte';
	import EditableProjectCard from './EditableProjectCard.svelte';
	import EditablesList from './EditablesList.svelte';

	export let data;

	let projectsFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};
	let organisationsFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};
	let actorsFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};

	export const snapshot: Snapshot<{
		projectsFilters: typeof projectsFilters;
		organisationsFilters: typeof organisationsFilters;
		actorsFilters: typeof actorsFilters;
	}> = {
		capture: () => {
			return { projectsFilters, organisationsFilters, actorsFilters };
		},
		restore: (persisted) => {
			({ projectsFilters, organisationsFilters, actorsFilters } = persisted);
		},
	};
</script>

<slot />
<header>
	<hgroup>
		<h1 class="heading-xl">Mes fiches</h1>
		<span class="info">Explorez les fiches pour lesquelles vous avez des droits d'édition.</span>
	</hgroup>
</header>
<EditablesList
	bind:filters={projectsFilters}
	id={EDITOR_ROUTES.project.edit.hash}
	title="Mes projets"
	data={data.defer.editableProjects}
	let:datum
>
	<EditableProjectCard project={datum} />
</EditablesList>
<EditablesList
	bind:filters={organisationsFilters}
	id={EDITOR_ROUTES.organization.edit.hash}
	title="Mes organisations"
	data={data.defer.editableOrgs}
	let:datum
>
	<EditableOrgCard organization={datum} />
</EditablesList>
<EditablesList
	bind:filters={actorsFilters}
	id={EDITOR_ROUTES.actor.edit.hash}
	title="Mes profils d'acteurs"
	data={data.defer.editableActors}
	let:datum
>
	<EditableActorCard actor={datum} />
</EditablesList>

<style lang="scss">
	header {
		padding: 1.5rem;
		margin-top: 3rem;
		width: 100%;
		max-width: var(--ui-width-main);
		align-self: center;

		hgroup {
			width: 100%;
			max-width: var(--ui-width-lg);
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			align-items: center;
			justify-content: center;
		}
	}
</style>
