<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import EditorLayout from '../../EditorLayout.svelte';
	import { PROJECT_DESCIPTORS_EDITOR_BASE, PROJECT_DESCRIPTORS_EDITOR_ROUTES } from './routes';

	const links = Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES);
</script>

<EditorLayout>
	<svelte:fragment slot="sidebar">
		<SidebarButton href={PROJECT_DESCIPTORS_EDITOR_BASE.pathname}>
			<Icon slot="leading" name="home" />Descripteurs
		</SidebarButton>
		<hr />
		{#each links as link}
			<SidebarButton href={link.pathname}>{link.label}</SidebarButton>
		{/each}
	</svelte:fragment>
	<slot />
</EditorLayout>

<style lang="scss">
</style>
