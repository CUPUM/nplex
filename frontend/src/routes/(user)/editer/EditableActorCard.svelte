<script lang="ts">
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let actor: LayoutData['actors'][number] | EditablesDefault;
</script>

{#if 'title' in actor}
	<a class="actor" href="{EDITOR_ROUTES.actor.pathname}/{actor.id}">
		{actor.title}
	</a>
{:else}
	<a href={EDITOR_ROUTES.actor.pathname}>
		<EditableNewCard>Créer un profil de personne</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 350px;
		aspect-ratio: 2 /3;
		border-radius: var(--ui-radius-lg);
	}

	.actor {
	}
</style>
