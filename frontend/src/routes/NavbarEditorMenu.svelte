<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { EDITOR_ROUTES } from '$utils/routes';
	import type { ComponentProps } from 'svelte';
	import { EDITABLES_HASHES } from './(user)/editer/common';

	const buttonOptions = { variant: 'ghost', contentAlign: 'start' } satisfies Partial<
		ComponentProps<Button>
	>;
</script>

<legend>{EDITOR_ROUTES.project.title}</legend>
<Button {...buttonOptions} href={EDITOR_ROUTES.project.pathname}>
	<svelte:fragment slot="leading">
		<Icon name="plus" />
	</svelte:fragment>
	Créer un projet
</Button>
<Button {...buttonOptions} href="{EDITOR_ROUTES.project.pathname}#{EDITABLES_HASHES.projects}">
	<svelte:fragment slot="leading">
		<Icon name="pen" />
	</svelte:fragment>
	Modifier un projet
</Button>
<Button {...buttonOptions} href={EDITOR_ROUTES.descriptors.pathname}>
	<svelte:fragment slot="leading">
		<Icon name="pen" />
	</svelte:fragment>
	Gérer les descripteurs de projet
</Button>
<hr />
<legend>{EDITOR_ROUTES.organisation.title}</legend>
<Button {...buttonOptions} href={EDITOR_ROUTES.organisation.pathname}>
	<svelte:fragment slot="leading">
		<Icon name="plus" />
	</svelte:fragment>
	Créer une organisation
</Button>
<Button
	{...buttonOptions}
	href="{EDITOR_ROUTES.organisation.pathname}#{EDITABLES_HASHES.organisations}"
>
	<svelte:fragment slot="leading">
		<Icon name="pen" />
	</svelte:fragment>
	Modifier une organisation
</Button>
<hr />
<legend>{EDITOR_ROUTES.actor.title}</legend>
<Button {...buttonOptions} href={EDITOR_ROUTES.actor.pathname}>
	<svelte:fragment slot="leading">
		<Icon name="plus" />
	</svelte:fragment>
	Créer un profil d'acteur
</Button>
<Button {...buttonOptions} href="{EDITOR_ROUTES.actor.pathname}#{EDITABLES_HASHES.actors}">
	<svelte:fragment slot="leading">
		<Icon name="pen" />
	</svelte:fragment>
	Modifier un profil d'acteur
</Button>

<style lang="scss">
	menu {
		display: flex;
		flex-direction: column;
		gap: inherit;
	}

	legend {
		padding: 1em 1.5em;
		padding-bottom: 0.5em;
		// font-weight: 300;
		font-size: var(--ui-text-xs);
		opacity: 0.35;
	}
</style>
