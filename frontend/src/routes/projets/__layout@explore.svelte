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
	import { projectsFilters } from '$stores/projects';
	import { updateURLFromProjectsFilters } from '$utils/url';

	$: updateURLFromProjectsFilters($projectsFilters);
</script>

<slot />
