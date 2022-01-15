<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ params }): Promise<LoadOutput> {
		return {
			props: {
				id: params.projectId
			}
		};
	}
</script>

<script lang="ts">
	export let id;
</script>

<h2>{id}</h2>
