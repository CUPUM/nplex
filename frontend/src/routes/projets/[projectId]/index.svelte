<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		return {
			props: {
				id: params.projectId,
			},
		};
	};
</script>

<script lang="ts">
	export let id;

	export let name;

	// Show UI based on projects store item, if present and update concurrently.
</script>

<h2>{id}</h2>
