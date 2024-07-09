<script lang="ts">
	import * as m from '$i18n/messages';
	import SidebarGroup from '$lib/components/patterns/sidebar-group.svelte';
	import type { PageData } from './$types';

	let { types }: Pick<PageData['lists'], 'types'> = $props();
</script>

{#await types then awaitedTypes}
	<SidebarGroup>
		{#snippet legend()}
			{m.organization_types()}
		{/snippet}
		<ul>
			{#each awaitedTypes as type}
				<label class="button button-dashed">
					{type.title}
					<input type="checkbox" value={type.id} class="sr-only" />
				</label>
			{/each}
		</ul>
	</SidebarGroup>
{/await}
