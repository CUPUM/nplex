<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export async function load({ page }) {
		return {
			props: {
				projectId: page.params.projectId
			}
		}
	}
</script>


<script lang="ts">
	import { page } from '$app/stores';

	export let projectId: string;
</script>


<h1>
	Fiche de projet: {projectId}
</h1>