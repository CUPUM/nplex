<script lang="ts">
	// const links = Object.values(PROJECT_DESCRIPTORS_EDITOR_ROUTES);
	// $: ({ crumbs } = $page.data as LayoutData);

	// export let data;
</script>

<slot />

<style lang="scss">
	.layout {
		align-self: stretch;
		display: flex;
		flex-direction: row;
		gap: var(--ui-gap-sm);
	}

	.sidebar {
		// grid-column: sidebar;
		flex: none;
	}

	.main {
		flex: 1;
	}
</style>
