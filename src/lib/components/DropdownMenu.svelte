<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';

	const {
		elements: { trigger, menu, item, group, groupLabel },
		states: { open },
	} = createDropdownMenu();
</script>

<slot trigger={$trigger} />
{#if $open}
	<menu class="dropdown-menu" use:melt={$menu}>
		<slot name="content" item={$item} />
	</menu>
{/if}
