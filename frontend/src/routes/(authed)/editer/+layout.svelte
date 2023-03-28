<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import type { ComponentProps } from 'svelte';
	import type { Snapshot } from './$types';
	import { isDirty, updating } from './common';
	import { EDITOR_FORM_ID, EDITOR_ROUTES } from './constants';
	import EditableActorCard from './EditableActorCard.svelte';
	import EditableOrgCard from './EditableOrgCard.svelte';
	import EditableProjectCard from './EditableProjectCard.svelte';
	import EditablesList from './EditablesList.svelte';
	import EditorBreadcrumbs from './EditorBreadcrumbs.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	export let data;

	const theme = 'dark';
	const shade = 500;

	let projectsFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};
	let orgFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};
	let actorsFilters: ComponentProps<EditablesList<any>>['filters'] = {
		authoring: 'all',
		publishing: 'all',
	};

	export const snapshot: Snapshot<{
		projectsFilters: typeof projectsFilters;
		organisationsFilters: typeof orgFilters;
		actorsFilters: typeof actorsFilters;
	}> = {
		capture: () => {
			return { projectsFilters, organisationsFilters: orgFilters, actorsFilters };
		},
		restore: (persisted) => {
			({ projectsFilters, organisationsFilters: orgFilters, actorsFilters } = persisted);
		},
	};
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbar={{
		theme: THEMES[theme],
		background: col('bg', shade),
		width: NAVBAR_WIDTH.Full,
	}}
	use:setRootBackground={{ overscroll: THEME_PALETTES[theme].bg[shade] }}
	style:--editor-bg={col('bg', shade)}
>
	<EditorBreadcrumbs />
	<!-- Top header -->
	{#if $page.data.editorHeader}
		<svelte:component this={$page.data.editorHeader} />
	{/if}
	<div id="editor-sidebar-layout">
		<!-- Sidebar navigation -->
		{#if $page.data.editorSidebar}
			<svelte:component this={$page.data.editorSidebar} />
		{/if}
		<!-- Editor main content -->
		<slot />
	</div>
	<!-- Floating toolbar -->
	<EditorToolbar />
	<!-- Navigation intercepting modal to prevent accidental data loss -->
	<ModalConfirmNavigation intercept={$isDirty} let:confirm let:cancel>
		Vous avez des données non-sauvegardées. Celles-ci seront perdues si vous changez de page sans
		enregistrer vos modifications.
		<svelte:fragment slot="footer">
			<Button variant="ghost" on:click={confirm}>Continuer sans sauvegarder</Button>
			<Button variant="ghost" on:click={cancel}>Annuler</Button>
			<Button variant="cta" type="submit" form={EDITOR_FORM_ID} loading={$updating}>
				Sauvegarder et continuer
			</Button>
		</svelte:fragment>
	</ModalConfirmNavigation>
</article>
<header>
	<Icon id="editables-header-icon" name="pen" strokeLinecap="round" strokeWidth={1} />
	<hgroup>
		<h1 class="heading-xl">Mes fiches</h1>
		<span class="text-lg">Explorez les fiches pour lesquelles vous avez des droits d'édition.</span>
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
	bind:filters={orgFilters}
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
	article {
		--article-radius: min(var(--ui-radius-2xl), calc(0.1 * var(--ui-scroll-px)));
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--article-radius) var(--article-radius);
		color: col(fg, 500);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
		padding: var(--ui-gutter-md);
		padding-top: 0;

		@include mobile {
			padding: 0.75rem;
			padding-top: 0;
			font-size: var(--ui-text-sm);
		}

		#editor-sidebar-layout {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			gap: var(--ui-gap-sm);
		}

		:global(.editor-form) {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: var(--ui-gap-sm);
			min-height: 100vh;
			min-height: 100svh;
			scroll-margin-block-start: var(--ui-nav-h);
		}

		:global(.editor-form-header) {
			position: relative;
			align-self: stretch;
			padding: var(--ui-gutter-md);
			border-radius: var(--ui-radius-xl);
			background-color: col(secondary, 100);

			:global(p:last-child) {
				margin-bottom: 0.5em;
			}
		}

		:global(.editor-form-group) {
			position: relative;
			padding: var(--ui-gutter-md);
			border-radius: var(--ui-radius-xl);
			background-color: col(bg, 700);
			// max-width: calc(100% - var(--ui-sidebar-w));
			// min-width: min(var(--ui-width-md), 100%);
		}

		:global(.editor-form-group-title) {
			@include typography(heading, md);
			margin-top: -0.25em;
			margin-bottom: 2rem;
		}
	}

	header {
		display: flex;
		flex-direction: column;
		padding: 3rem 1.5rem;
		min-height: 50vh;
		width: 100%;
		max-width: var(--ui-width-main);
		align-self: center;
		align-items: center;
		justify-content: center;

		:global(#editables-header-icon) {
			font-size: 35em;
			position: absolute;
			opacity: 0.05;
			// color: col(primary, 500);
		}

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
