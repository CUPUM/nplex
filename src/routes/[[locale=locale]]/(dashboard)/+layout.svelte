<script lang="ts">
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
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
		<div id="dashboard-sidebar">
			<svelte:component this={$page.data.dashboard.sidebar} />
		</div>
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

	#dashboard-sidebar {
		margin-top: var(--base-gap);
		display: flex;
		flex-direction: row;
		align-self: stretch;
		overflow-x: auto;
		top: var(--navbar-sticky);
		position: sticky;
		gap: var(--base-gap);
		z-index: 1;

		@media (--md) {
			margin-right: var(--base-gap);
			align-self: flex-start;
			overflow-x: hidden;
			overflow-y: auto;
			width: var(--dashboard-navbar);
			flex-direction: column;
		}
	}

	#dashboard-content {
		margin-top: var(--base-gap);
		scroll-margin-block-start: var(--navbar-sticky);
		grid-column: 2 / 3;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);
		min-height: calc(100vh - var(--navbar-sticky));
		min-height: calc(100svh - var(--navbar-sticky));
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
