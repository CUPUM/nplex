<script lang="ts">
	import EditorHeader from './EditorHeader.svelte';

	// export let crumbs;
</script>

<EditorHeader />
<div>
	<Sidebar>
		{#each sidebarRoutes as r}
			<SidebarButton href={r.pathname}>{r.title}</SidebarButton>
		{/each}
	</Sidebar>
	<form
		use:enhance={({ form, data, action, cancel }) => {
			updating = true;
			return async ({ update, result }) => {
				update({ reset: false });
				if (result.type !== 'success' && result.type !== 'redirect') {
					updating = false;
				}
			};
		}}
		method="POST"
		action="?/{EDITOR_FORM_ACTION}"
		id={EDITOR_FORM_ID}
	>
		<slot />
	</form>
</div>

<style lang="scss">
</style>
