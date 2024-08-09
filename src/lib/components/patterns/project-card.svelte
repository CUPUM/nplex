<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import type {
		projectExemplarityMarkers,
		projectExemplarityMarkersTranslations,
	} from '$lib/db/schema/public.server';
	import { imageSrc } from '$lib/storage/media/url';
	import { THEMES } from '$lib/theme/constants';
	import type { InferSelectModel } from 'drizzle-orm';
	import { Award, Bookmark, Heart, Image } from 'lucide-svelte';

	let {
		edit,
		id,
		title,
		summary,
		liked,
		likesCount,
		bannerStorageName,
		exemplarityMarkers,
	}: {
		edit?: boolean;
		id: string;
		title: string | null;
		summary?: string | null;
		liked?: boolean;
		likesCount?: number;
		bannerStorageName?: string | null;
		exemplarityMarkers?: Pick<
			InferSelectModel<typeof projectExemplarityMarkers> &
				InferSelectModel<typeof projectExemplarityMarkersTranslations>,
			'id' | 'shortTitle' | 'title' | 'description'
		>[];
	} = $props();

	const attributes = $derived(linkAttributes(`${edit ? '/edit' : ''}/projects/${id}`));
</script>

{#snippet likes()}
	{#if likesCount}
		{#if $page.data.user}
			<button
				class="px-input-padding h-input text-on-like bg-like hover:bg-like-accent hover:text-on-like-accent rounded-full"
				use:ripple
			>
				<Heart />
				{likesCount}
				<input type="checkbox" bind:checked={liked} class="sr-only" />
			</button>
		{:else}
			<a
				class="px-input-padding h-input text-on-like bg-like hover:bg-like-accent hover:text-on-like-accent rounded-full"
				href="/login"
			>
				<Heart />
				{likesCount}
			</a>
		{/if}
	{/if}
{/snippet}

{#snippet bookmark()}
	{#if likesCount}
		{#if $page.data.user}
			<button class="button button-ghost aspect-square rounded-full" use:ripple>
				<Bookmark />
			</button>
		{:else}
			<a class="button button-ghost aspect-square rounded-full" href="/login">
				<Bookmark />
			</a>
		{/if}
	{/if}
{/snippet}

{#snippet award()}
	<button class="button aspect-square rounded-full">
		<Award />
	</button>
{/snippet}

<article
	class="group/card hover:bg-card-accent bg-card rounded-card p-padding relative relative h-full w-full transition-all"
>
	<div
		class="relative flex h-full w-full flex-col items-stretch justify-end rounded-[calc(var(--radius-card)-var(--spacing-padding))]"
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
			data-theme={THEMES.DARK}
			class="p-card-padding text-base-accent rounded-inherit after:from-overlay after:rounded-inherit after:opacity-soft after:duraiton-medium relative relative z-1 flex max-h-full max-w-full flex-col transition-all after:absolute after:inset-0 after:-z-1 after:bg-gradient-to-t after:bg-[0px_50px] after:bg-no-repeat after:transition-all after:ease-out group-hover/card:after:bg-[0px_0px] group-hover/card:after:opacity-100"
		>
			<menu
				class="gap-input-group-gap pt-sm compact pb-sm flex flex-row flex-wrap items-start text-xs *:pointer-events-auto"
			>
				{@render likes()}
				{@render bookmark()}
				{@render award()}
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
	<a class="fill user-select-none text-transparent" use:ripple {...attributes}>
		{title}
	</a>
</article>
