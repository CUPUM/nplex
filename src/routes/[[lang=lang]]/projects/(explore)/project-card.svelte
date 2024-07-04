<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { MODES } from '$lib/modes/constants';
	import { imageSrc } from '$lib/storage/media/url';
	import { Award, Heart, Image } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { project }: { project: PageData['result'][number] } = $props();
</script>

<article
	class="group/card hover:bg-card-accent bg-card relative h-full w-full rounded-lg transition-all"
>
	<div
		class="inset-padding flex flex-col items-stretch justify-end rounded-[calc(var(--radius-lg)-var(--spacing-padding))] group-data-[view-mode=masonry]/explore:absolute"
	>
		{#if project.bannerStorageName}
			<img
				class="fill object-cover"
				src={imageSrc(project.bannerStorageName, { resize: { height: 480 } })}
				alt="Banner image for {project.title}"
			/>
		{:else}
			<div class="fill opacity-dimmest flex items-center justify-center">
				<Image class="size-[2em] stroke-width-[1]" />
			</div>
		{/if}
		<div
			data-mode={MODES.DARK}
			class="p-card-padding pt-2xl text-base-dim group-hover/card:text-base-accent rounded-inherit after:from-overlay after:rounded-inherit after:opacity-soft after:duraiton-medium relative flex flex-col transition-all after:absolute after:inset-0 after:bg-gradient-to-t after:bg-[0px_100px] after:bg-no-repeat after:transition-all after:ease-out group-hover/card:after:bg-[0px_0px] group-hover/card:after:opacity-100"
		>
			<div class="pointer-events-none z-1">
				<menu
					class="gap-input-group-gap pt-sm compact pb-sm flex flex-row flex-wrap items-start text-xs *:pointer-events-auto"
				>
					<button class="button rounded-full backdrop-blur-sm">
						{0}
						<Heart />
						<input type="checkbox" bind:checked={project.liked} class="sr-only" />
					</button>
					<button class="button aspect-square rounded-full backdrop-blur-sm">
						<Award />
					</button>
				</menu>
				<h1 class="group-hover/card:text-base-accent text-sm font-bold">
					<OptionalText text={project.title} fallback={m.no_title()} />
				</h1>
				<p class="text-base-dim text-sm font-medium">
					<OptionalText text={project.summary} fallback={m.no_summary()} />
				</p>
				<ul class="compact gap-input-group-gap pt-sm flex flex-row overflow-x-auto text-xs">
					{#each project.exemplarityMarkers as marker}
						<li class="button rounded-full backdrop-blur-sm">
							<OptionalText text={marker.shortTitle} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<a
		class="fill user-select-none text-transparent"
		use:ripple={{ blur: 50 }}
		{...linkAttributes(`/projects/${project.id}`)}
	>
		{project.title}
	</a>
</article>
