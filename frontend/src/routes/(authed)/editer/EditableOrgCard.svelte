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
		<svg class="card-bg" />
		<div class="details">
			<div class="name">
				{organization.name}
			</div>
			<div class="skills">Expertises (à venir)</div>
		</div>
	</a>
{:else}
	<a class="new-entry {ICON_CLASS.hover}" href={EDITOR_ROUTES.organization.pathname}>
		<EditableNewCard>Créer une organisation</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 400px;
		width: 300px;
		border-radius: var(--ui-radius-lg);
	}

	.org {
		// color: col(fg, 500);
		background: col(bg, 500);
	}

	.card-bg {
		position: absolute;
		inset: 0;
	}

	.details {
		padding: 2rem;
		display: flex;
		flex-direction: column;

		.name {
			font-size: var(--ui-text-xl);
			line-height: 1.2;
			font-weight: 500;
			flex: 1;
		}

		.skills {
		}
	}
</style>
