<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let organization: LayoutData['organizations'][number] | EditablesDefault;
</script>

{#if 'name' in organization}
	<a href="{EDITOR_ROUTES.organization.pathname}/{organization.id}">
		{organization.name}
	</a>
{:else}
	<a class="new-entry {ICON_CLASS.hover}" href={EDITOR_ROUTES.organization.pathname}>
		<span>Créer une organisation</span>
		<i>
			<Icon name="pen-plus" strokeWidth={1.25} />
		</i>
	</a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 350px;
		aspect-ratio: 3 /4;
		border-radius: var(--ui-radius-lg);
	}
</style>
