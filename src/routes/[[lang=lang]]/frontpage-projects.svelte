<script lang="ts">
	import * as m from '$i18n/messages';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<article class="gap-md px-padding flex flex-col items-stretch">
	<header class="mx-auto w-full max-w-xl self-center">
		<h2 class="text-base-accent text-2xl font-semibold">
			{m.recent_projects()}
		</h2>
	</header>
	<ul class="gap-gutter flex flex-row flex-wrap place-content-start items-center justify-start">
		{#each data.featuredProjects as project}
			<a class="p-card-padding rounded-card bg-card">{project.id}</a>
		{/each}
	</ul>
</article>
