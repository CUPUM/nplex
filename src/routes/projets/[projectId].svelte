<!-- <script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({page}: LoadInput): Promise<LoadOutput> {
		return {
			props: {
				id: page.params.projectId
			},
		}
	}
</script> -->

<script lang="ts">
	import { page } from '$app/stores';

</script>




<h2>{$page.params.projectId}</h2>




<style>

</style>