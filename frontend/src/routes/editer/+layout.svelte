<script lang="ts">
	import ProjectsList from '$routes/editer/ProjectsList.svelte';
	import type { LayoutData } from './$types';
	import Search from './Search.svelte';

	const targetForm = 'edit-form';

	export let data: LayoutData;
</script>

<div>
	<article>
		<slot />
	</article>
	<Search />
	<ProjectsList />
	<!-- Other lists here -->
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0;
	}

	article {
		position: relative;
		display: flex;
		flex-direction: row;
	}
</style>
