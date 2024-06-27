<script lang="ts">
	import * as m from '$i18n/messages';
	import DottedBackground from '$lib/components/primitives/dotted-background.svelte';
	import { imageSrc } from '$lib/storage/media/url';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="relative z-[0] flex flex-col items-stretch">
	<DottedBackground class="opacity-dimmer bg-center" />
	<header class="prose px-padding w-full max-w-xl self-center">
		<h2>{m.project_gallery()}</h2>
	</header>
	{#await data.gallery then awaitedGallery}
		{#if awaitedGallery.length}
			<ul class="gap-padding p-lg relative flex flex-row overflow-x-auto">
				{#each awaitedGallery as image}
					<li class="rounded-card flex-none">
						<img
							src={imageSrc(image.storageName, { resize: { height: 900 } })}
							class="rounded-inherit"
						/>
					</li>
				{/each}
			</ul>
		{:else}
			<section class="p-padding w-full max-w-xl self-center">
				<span class="text-base-dim italic">
					{m.no_image()}
				</span>
			</section>
		{/if}
	{/await}
</section>
