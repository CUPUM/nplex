<script lang="ts">
	import * as m from '$i18n/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="px-padding mb-xl max-w-main w-full self-center">
	<header class="prose">
		<h2>{m.project_exemplarity_markers()}</h2>
	</header>
	<ul>
		{#await data.markersByCategories}
			...
		{:then awaitedMarkersByCategories}
			{#each awaitedMarkersByCategories as category}
				<li>
					<header class="prose">
						<h3>
							{category.title}
						</h3>
					</header>
					<ul class="gap-input-group-gap flex flex-row flex-wrap">
						{#each category.markers as marker}
							<li class="button rounded-full">{marker.title}</li>
						{/each}
					</ul>
				</li>
			{/each}
		{/await}
	</ul>
</section>
