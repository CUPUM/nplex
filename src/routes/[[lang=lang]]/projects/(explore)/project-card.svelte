<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { Image } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { project }: { project: PageData['result'][number] } = $props();
</script>

<article
	class="group/card hover:bg-card-accent bg-card rounded-card relative h-full w-full transition-all hover:shadow-lg"
>
	<div
		class="inset-[var(--border-width-lg)] flex flex-col items-stretch justify-end rounded-[calc(var(--radius-card)-var(--border-width-lg))] group-data-[view-mode=masonry]/explore:absolute"
	>
		<!-- <img class="fill object-cover" src="https://picsum.photos/seed/{project.id}/500/500" /> -->
		{#if project.bannerStorageName}
			<img class="fill" src="https://picsum.photos/seed/{project.id}/200/300" />
		{:else}
			<div class="fill opacity-dimmer flex items-center justify-center">
				<Image class="size-[2em] stroke-width-[1]" />
			</div>
		{/if}
		<div
			class="p-card-padding pt-2xl text-base-dim group-hover/card:text-base-accent rounded-inherit from-overlay after after:from-overlay after:rounded-inherit group-hover/card:after:opacity-dim relative flex flex-col transition-all after:absolute after:inset-0 after:bg-gradient-to-t after:bg-[0px_100px] after:bg-no-repeat after:opacity-[0] after:transition-all after:ease-out group-hover/card:after:bg-[0px_0px]"
		>
			<div class="pointer-events-none z-1">
				<h1 class="text-md font-semibold">
					<OptionalText text={project.title} fallback={m.no_title()} />
				</h1>
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y_missing_content -->
	<a class="fill" use:ripple={{ blur: 50 }} {...linkAttributes(`/projects/${project.id}`)}></a>
</article>
