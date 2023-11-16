<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import SwitchThumb from '$lib/components/SwitchThumb.svelte';
	import { link } from '$lib/i18n/link';
	import { MODES } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { ArrowLeft, ArrowRight, MoonStar, Sun } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let data;

	const flat = Object.entries(data.docs).flatMap(([section, d]) => {
		if (data.indexes[section]) {
			return [
				{
					slug: section,
					title: section,
					section,
				},
				...d,
			];
		}
		return d;
	});

	$: current = flat.findIndex((d) => d.slug === $page.url.pathname.split('/docs/')[1]);
	$: next = flat[current + 1] ?? undefined;
	$: prev = flat[current - 1] ?? undefined;
</script>

<main id="docs">
	<div class="sidebar">
		<Sidebar>
			<header>
				<a {...$link('/')}>
					<Logo size="1.25em" />
				</a>
				<hr />
				<a {...$link('/docs')}>Docs</a>
			</header>
			{#each Object.keys(data.docs) as section}
				<SidebarGroup {...$link(`/docs/${section}`)}>
					<svelte:fragment slot="heading">
						<span class="section-title">
							{section}
						</span>
					</svelte:fragment>
					{#each data.docs[section] as doc}
						<SidebarItem {...$link(`/docs/${doc.slug}`)}>
							{doc.title}
						</SidebarItem>
					{/each}
				</SidebarGroup>
			{/each}
			<menu>
				<button
					class="switch rounded"
					on:click={() => {
						mode.toggle();
					}}
				>
					<div
						class="switch-item square"
						data-state={$mode === MODES.LIGHT ? 'checked' : undefined}
					>
						<Sun />
						<SwitchThumb current={$mode === MODES.LIGHT} />
					</div>
					<div class="switch-item square" data-state={$mode === MODES.DARK ? 'checked' : undefined}>
						<MoonStar />
						<SwitchThumb current={$mode === MODES.DARK} />
					</div>
				</button>
			</menu>
		</Sidebar>
	</div>
	<article class="prose">
		<slot />
	</article>
	<footer class="small">
		{#if prev}
			<a
				class="button outlined"
				aria-disabled={!prev}
				{...$link(`/docs/${prev?.slug}`)}
				transition:slide={{ axis: 'x', duration: 250, easing: expoOut }}
			>
				<ArrowLeft class="button-icon" />
				{prev.title}
			</a>
		{/if}
		<div style="width: var(--base-gutter)" />
		{#if next}
			<a
				class="button outlined"
				aria-disabled={!next}
				{...$link(`/docs/${next?.slug}`)}
				transition:slide={{ axis: 'x', duration: 250, easing: expoOut }}
			>
				<ArrowRight class="button-icon" />
				{next.title}
			</a>
		{/if}
	</footer>
</main>

<style lang="postcss">
	#docs {
		--sticky-top: 0px;
		display: grid;
		grid-template-columns: 1fr minmax(auto, 80ch) minmax(0px, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'sidebar content pad'
			'sidebar footer pad';
		flex-direction: row;
		gap: var(--base-gutter);
		padding: var(--base-gutter);
		padding-top: 0;
		min-height: 100vh;
		min-height: 100svh;
		min-height: 100dvh;
	}

	.sidebar {
		grid-area: sidebar;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		font-weight: 500;

		hr {
			border-right-width: var(--border-size);
			border-bottom-width: var(--border-size);
			border-color: currentColor;
			opacity: 0.25;
			display: block;
			align-self: stretch;
			height: unset;
		}
	}

	menu {
		font-size: var(--size-sm);
	}

	.section-title {
		text-transform: capitalize;
	}

	article {
		flex: 1;
		padding: 2rem;
		padding-top: 0;
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 80ch;
		/* background: red; */

		:global(code:not(.code)) {
			background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
			padding: 0.3em 0.5em;
			border-radius: var(--radius-xs);
		}
	}

	footer {
		grid-area: footer;
		padding: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
