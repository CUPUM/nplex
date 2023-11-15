<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import SidebarGroup from '$lib/components/SidebarGroup.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { mode } from '$lib/modes/store';
	import { ArrowLeft, ArrowRight, MoonStar, Sun } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let data;

	const flat = Object.values(data.docs).flatMap((d) => d);

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
			<menu>
				<button
					class="switch rounded"
					on:click={() => {
						mode.toggle();
					}}
				>
					<div class="switch-item square">
						<Sun class="switch-icon" />
					</div>
					<div class="switch-item square">
						<MoonStar class="switch-icon" />
					</div>
				</button>
			</menu>
			{#each Object.keys(data.docs) as type}
				<SidebarGroup>
					<svelte:fragment slot="heading">
						<span class="type-title">
							{type}
						</span>
					</svelte:fragment>
					{#each data.docs[type] as doc}
						<SidebarItem {...$link(`/docs/${doc.slug}`)}>
							{doc.title}
						</SidebarItem>
					{/each}
				</SidebarGroup>
			{/each}
		</Sidebar>
	</div>
	<article class="prose">
		<slot />
	</article>
	<footer>
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
			<div
				style="width: var(--base-gap)"
				transition:slide={{ axis: 'x', duration: 250, easing: expoOut }}
			></div>
		{/if}
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
		grid-template-columns: 1fr minmax(auto, 75ch) minmax(0px, 1fr);
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'sidebar content pad'
			'sidebar footer footer';
		flex-direction: row;
		gap: var(--base-gap);
		padding: var(--base-gutter);
		padding-top: 0;
		min-height: 100vh;
		min-height: 100svh;
		min-height: 100dvh;
	}

	.sidebar {
		grid-area: 'sidebar';
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

		menu {
			font-size: var(--size-sm);
		}
	}

	.type-title {
		text-transform: capitalize;
	}

	article {
		flex: 1;
		padding: 4rem 1rem;
		margin: 0 auto;
		width: 100%;

		:global(code:not(.code)) {
			background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
			padding: 0.3em 0.5em;
			border-radius: var(--radius-xs);
		}
	}

	footer {
		grid-area: footer;
		font-size: var(--size-sm);
		padding: 1rem;
		display: flex;
		flex-direction: row;
	}
</style>
