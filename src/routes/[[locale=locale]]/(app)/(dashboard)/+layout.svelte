<script lang="ts">
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import EditableProjects from './EditableProjects.svelte';

	const t = createTranslations({
		fr: {
			editables: {
				projects: 'Mes projets',
				organizations: 'Mes organisations',
			},
		},
		en: {
			editables: {
				projects: 'My projects',
				organizations: 'My organizations',
			},
		},
	});

	export let data;
</script>

<Dashboard
	header={$page.data.dashboard?.header}
	sidebar={$page.data.dashboard?.sidebar}
	footer={$page.data.dashboard?.footer}
>
	<slot />
</Dashboard>
<aside>
	<section class="editables">
		<h2 class="heading lg">{$t.editables.projects}</h2>
		<EditableProjects projects={data.streamed.editableProjects} />
	</section>
	<section class="editables">
		<h2 class="heading lg">{$t.editables.organizations}</h2>
	</section>
</aside>

<style lang="postcss">
	.editables {
		h2 {
			margin: 2rem;
		}
	}

	.cards {
		padding: var(--base-gutter);
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
		overflow-x: auto;
	}
</style>
