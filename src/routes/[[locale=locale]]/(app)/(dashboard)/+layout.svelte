<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Loading from '$lib/components/Spinner.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { slide } from '$lib/transitions/slide';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { scale } from 'svelte/transition';
	import OrganizationCard from './OrganizationCard.svelte';
	import ProjectCard from './ProjectCard.svelte';

	const t = createTranslations({
		fr: {
			editables: {
				projects: 'Mes projets',
				organizations: 'Mes organisations',
			},
		},
		en: {
			editables: {
				projects: 'My projects',
				organizations: 'My organizations',
			},
		},
	});

	const angleThreshold = 60;

	export let data;

	let scrollY = 0;
	let headerHeight = 0;
	const angle = tweened(0, {
		easing: expoOut,
		duration: 250,
	});
	$: $angle = Math.min(angleThreshold, scrollY * 0.35);
</script>

<svelte:window bind:scrollY />

<article>
	{#if $page.data.dashboard?.header}
		<header
			id="dashboard-header"
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
			style:transform="rotateX({$angle}deg)"
			bind:clientHeight={headerHeight}
		>
			<svelte:component this={$page.data.dashboard.header} />
		</header>
	{/if}
	{#if $page.data.dashboard?.breadcrumbs}
		<div id="dashboard-breadcrumbs">Breadcrumbs</div>
	{/if}
	{#if $page.data.dashboard?.sidebar}
		<Sidebar>
			<svelte:component this={$page.data.dashboard.sidebar} />
		</Sidebar>
	{/if}
	<div in:scale={{ start: 0.98, duration: 350, easing: expoOut }} id="dashboard-content">
		<slot />
	</div>
</article>
<aside>
	<section class="editables">
		<h2 class="heading lg">{$t.editables.projects}</h2>
		<ul class="cards">
			{#await data.streamed.editableProjects}
				<Loading />
			{:then ep}
				{#each ep as project}
					<li>
						<ProjectCard {project} />
					</li>
				{/each}
			{/await}
		</ul>
	</section>
	<section class="editables">
		<h2 class="heading lg">{$t.editables.organizations}</h2>
		<ul class="cards">
			{#await data.streamed.editableOrganizations}
				<Loading />
			{:then eo}
				{#each eo as organization}
					<li>
						<OrganizationCard {organization} />
					</li>
				{/each}
			{/await}
		</ul>
	</section>
	<!-- <menu>
		<button class="button square"><ChevronUp class="button-icon" /></button>
	</menu> -->
</aside>

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		perspective: 1500px;
		@media (--md) {
			display: grid;
			grid-template-columns: fit-content(var(--dashboard-navbar)) minmax(0, 1fr);
			gap: var(--base-gap);
			padding-inline: 0.75rem;
		}
	}

	#dashboard-header {
		grid-column: 1 / -1;
		border-radius: var(--radius-xl);
		z-index: -1;
		transform-origin: center bottom;
		backface-visibility: hidden;
		transition: all var(--duration-2xslow) var(--ease-out-expo);
	}

	#dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	#dashboard-content {
		scroll-margin-block-start: var(--sticky-top);
		grid-column: 2 / 3;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);
		min-height: calc(100vh - var(--sticky-top));
		min-height: calc(100svh - var(--sticky-top));
	}

	.editables {
		h2 {
			margin: 2rem;
		}
	}

	.cards {
		padding: var(--base-gutter);
		display: flex;
		flex-direction: row;
		gap: var(--base-gutter);
		overflow-x: auto;
	}
</style>
