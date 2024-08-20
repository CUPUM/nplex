<script lang="ts">
	import * as m from '$i18n/messages';
	import { imageSrc } from '$lib/storage/media/url';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="h-main-full-height pt-lg relative z-[0] flex flex-col items-stretch">
	<header class="px-padding top-sticky-top z-front sticky flex w-full flex-col">
		<hgroup class="prose prose-block max-w-main w-full self-center">
			<h2>{m.project_gallery()}</h2>
		</hgroup>
	</header>
	{#await data.gallery then awaitedGallery}
		{#if awaitedGallery.length}
			<ul class="gap-padding p-padding pt-lg relative flex flex-1 flex-row overflow-x-auto">
				{#each awaitedGallery as image}
					<li class="rounded-card h-full flex-none">
						<img
							src={imageSrc(image.storageName, { resize: { height: 900 } })}
							alt={image.description}
							class="rounded-inherit"
						/>
					</li>
				{/each}
			</ul>
		{:else}
			<section class="p-padding max-w-main w-full self-center">
				<span class="text-base/softer italic">
					{m.no_image()}
				</span>
			</section>
		{/if}
	{/await}
</section>
