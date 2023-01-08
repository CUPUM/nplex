<script lang="ts">
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';
	import EditableProjectCard from './EditableProjectCard.svelte';
	import EditablesList from './EditablesList.svelte';

	export let data: LayoutData;
</script>

<slot />
<header>
	<hgroup>
		<h2>Mes fiches</h2>
		<span>Explorez les fiches pour lesquelles vous avez des droits d'édition.</span>
	</hgroup>
</header>
<EditablesList id={EDITOR_ROUTES.project.edit.hash} title="Projets" data={data.projects} let:datum>
	<EditableProjectCard project={datum} />
</EditablesList>
<EditablesList
	id={EDITOR_ROUTES.organisation.edit.hash}
	title="Organisations"
	data={data.projects}
	let:datum
>
	<EditableProjectCard project={datum} />
</EditablesList>
<EditablesList id={EDITOR_ROUTES.actor.edit.hash} title="Acteurs" data={data.projects} let:datum>
	<EditableProjectCard project={datum} />
</EditablesList>

<style lang="scss">
	header {
		padding: var(--ui-gutter);
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
			min-height: 50vh;
		}

		h2 {
			text-align: center;
			font-size: var(--ui-text-2xl);
			font-weight: 600;
		}

		span {
			display: block;
			font-weight: 300;
			line-height: 1.25;
			letter-spacing: 0.2px;
			font-size: var(--ui-text-md);
		}
	}
</style>
