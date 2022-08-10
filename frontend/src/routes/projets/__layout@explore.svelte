<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

	export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
		return {
			stuff: {
				category: 'projects',
			},
		};
	}
</script>

<script lang="ts">
	// To do: move into store logic, with start-stop notifier clearing url.
	// $: updateURLFromProjectsFilters($projectsFilters);
</script>

<slot />
