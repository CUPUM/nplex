<script lang="ts">
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';
</script>

<Sidebar variant="outlined">
	{#each Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES) as link, i}
		<SidebarButton {i} href={link.pathname}>
			{link.label}
		</SidebarButton>
	{/each}
</Sidebar>

<style lang="scss">
</style>
