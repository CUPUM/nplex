<script lang="ts">
	import { ICON_CLASS } from '$components/Icon.svelte';
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './constants';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let organization: Awaited<LayoutData['defer']['editableOrgs']>[number] | EditablesDefault;
</script>

{#if 'name' in organization}
	<a class="org" href="{EDITOR_ROUTES.organization.pathname}/{organization.id}">
		{organization.name}
	</a>
{:else}
	<a class="new-entry {ICON_CLASS.hover}" href={EDITOR_ROUTES.organization.pathname}>
		<EditableNewCard>Créer une organisation</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 350px;
		aspect-ratio: 3 /4;
		border-radius: var(--ui-radius-lg);
	}

	.org {
		background: col(bg, 300);
	}
</style>
