<script lang="ts">
	import * as m from '$i18n/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="px-padding mb-xl w-full max-w-xl self-center">
	<header class="prose">
		<h2>{m.project_exemplarity_markers()}</h2>
	</header>
	<ul>
		{#await data.markersByCategories}
			...
		{:then awaitedMarkersByCategories}
			{#each awaitedMarkersByCategories as category}
				<li>
					{category.title}
					<ul>
						{#each category.markers as marker}
							<li class="button pointer-events-none rounded-full">{marker.title}</li>
						{/each}
					</ul>
				</li>
			{/each}
		{/await}
	</ul>
</section>
