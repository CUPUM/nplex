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
	import { slide } from 'svelte/transition';

	export let id;

	console.log(id);

	// Show UI based on projects store item, if present and update concurrently.
</script>

<article transition:slide={{}}>
	<h2>Titre du projet</h2>
	<section>section 1</section>
	<section>section 2</section>
</article>

<style lang="postcss">
	article {
	}
</style>
