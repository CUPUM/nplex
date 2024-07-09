<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type {
		projectExemplarityMarkers,
		projectExemplarityMarkersTranslations,
	} from '$lib/db/schema/public.server';
	import { MODES } from '$lib/modes/constants';
	import { imageSrc } from '$lib/storage/media/url';
	import type { InferSelectModel } from 'drizzle-orm';
	import { Award, Heart, Image } from 'lucide-svelte';

	let {
		edit,
		id,
		title,
		summary,
		bannerStorageName,
		exemplarityMarkers,
	}: {
		edit?: boolean;
		id: string;
		title: string | null;
		summary?: string | null;
		bannerStorageName?: string | null;
		exemplarityMarkers?: Pick<
			InferSelectModel<typeof projectExemplarityMarkers> &
				InferSelectModel<typeof projectExemplarityMarkersTranslations>,
			'id' | 'shortTitle' | 'title' | 'description'
		>[];
	} = $props();

	const attributes = $derived(linkAttributes(`${edit ? '/edit' : ''}/projects/${id}`));
</script>

<article
	class="group/card hover:bg-card-accent bg-card rounded-card relative h-full w-full transition-all"
>
	<div
		class="inset-padding absolute flex flex-col items-stretch justify-end rounded-[calc(var(--radius-lg)-var(--spacing-padding))]"
	>
		{#if bannerStorageName}
			<img
				class="fill object-cover"
				src={imageSrc(bannerStorageName, { resize: { height: 480 } })}
				alt="Banner image for {title}"
			/>
		{:else}
			<div class="fill flex items-center justify-center opacity-[5%]">
				<Image class="stroke-md size-[2em]" />
			</div>
		{/if}
		<div
			data-mode={MODES.DARK}
			class="p-card-padding group-hover/card:text-base-accent rounded-inherit after:from-overlay after:rounded-inherit after:opacity-soft after:duraiton-medium relative relative z-1 flex max-h-full max-w-full flex-col transition-all after:absolute after:inset-0 after:-z-1 after:bg-gradient-to-t after:bg-[0px_100px] after:bg-no-repeat after:transition-all after:ease-out group-hover/card:after:bg-[0px_0px] group-hover/card:after:opacity-100"
		>
			<menu
				class="gap-input-group-gap pt-sm compact pb-sm flex flex-row flex-wrap items-start text-xs *:pointer-events-auto"
			>
				<button class="button rounded-full backdrop-blur-sm">
					{0}
					<Heart />
					<!-- <input type="checkbox" bind:checked={project.liked} class="sr-only" /> -->
				</button>
				<button class="button aspect-square rounded-full backdrop-blur-sm">
					<Award />
				</button>
			</menu>
			<h1 class="group-hover/card:text-base-accent text-sm font-bold">
				<OptionalText text={title} fallback={m.no_title()} />
			</h1>
			{#if summary}
				<p
					class="opacity-softer group-hover/card:opacity-soft line-clamp-3 min-h-0 flex-1 overflow-hidden text-ellipsis text-sm transition-all"
				>
					<OptionalText text={summary} fallback={m.no_summary()} />
				</p>
			{/if}
			{#if exemplarityMarkers}
				<ul class="compact gap-input-group-gap pt-sm flex flex-row overflow-x-auto text-xs">
					{#if exemplarityMarkers.length}
						{#each exemplarityMarkers as marker}
							<li class="button rounded-full backdrop-blur-sm">
								<OptionalText text={marker.shortTitle} />
							</li>
						{/each}
					{:else}
						<li class="button button-ghost rounded-full italic">
							{m.project_no_examplarity_marker()}
						</li>
					{/if}
				</ul>
			{/if}
		</div>
	</div>
	<a class="fill user-select-none text-transparent" use:ripple={{ blur: 50 }} {...attributes}>
		{title}
	</a>
</article>
