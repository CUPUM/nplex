<script lang="ts">
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import Loading from '$lib/components/Loading.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { slide } from '$lib/transitions/slide';
	import { Paintbrush, Users } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			editables: {
				projects: 'Mes projets',
				organizations: 'Mes organisations',
				noname: 'Sans nom',
			},
		},
		en: {
			editables: {
				projects: 'My projects',
				organizations: 'My organizations',
				noname: 'No name',
			},
		},
	});

	const angleThreshold = 60;

	export let data;

	let scrollY = 0;
	let headerHeight = 0;
	const angle = tweened(Math.min(angleThreshold, scrollY * 0.5), {
		easing: expoOut,
		duration: 250,
	});
	$: $angle = Math.min(angleThreshold, scrollY * 0.75);
</script>

<svelte:window bind:scrollY />

<article>
	{#if $page.data.dashboard?.header}
		<header
			id="dashboard-header"
			in:slide={{ duration: 750, easing: expoOut, opacity: 0 }}
			out:slide={{ easing: expoOut, duration: 500, opacity: 0 }}
			style:transform="rotateX({$angle}deg)"
			style:opacity={Math.max(0, 1 - $angle / angleThreshold)}
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
	<section in:scale={{ start: 0.98, duration: 350, easing: expoOut }} id="dashboard-content">
		<slot />
	</section>
</article>
<aside>
	<section>
		<h2 class="heading md">{$t.editables.projects}</h2>
		<ul>
			{#await data.streamed.editableProjects}
				<Loading />
			{:then ep}
				{#each ep as p}
					<li>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a {...$link(`/edit/projects/${p.id}`)} class="card" use:ripple>
							<Paintbrush class="card-icon" />
							{#if p.title}
								{p.title}
							{:else}
								<span class="dimmer">{$t.editables.noname}</span>
							{/if}
						</a>
					</li>
				{/each}
			{/await}
		</ul>
	</section>
	<section>
		<h2 class="heading md">{$t.editables.organizations}</h2>
		<ul>
			{#await data.streamed.editableOrganizations}
				<Loading />
			{:then eo}
				{#each eo as o}
					<!-- svelte-ignore a11y-missing-attribute -->
					<a {...$link(`/edit/organizations/${o.id}`)} class="card" use:ripple>
						<Users class="card-icon" />
						{#if o.name}
							{o.name}
						{:else}
							<span class="dimmer">{$t.editables.noname}</span>
						{/if}
					</a>
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
		margin-bottom: var(--base-gap);
		border-radius: var(--radius-xl);
		z-index: -1;
		transform-origin: bottom center;
		transition: all var(--duration-2xslow) var(--ease-out-expo);

		&.scrolled {
			transform: rotateX(30deg);
			opacity: 0;
			transition: all var(--duration-medium) ease-in;
		}
	}

	#dashboard-breadcrumbs {
		grid-column: 1 / -1;
	}

	#dashboard-sidebar {
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
		scroll-margin-block-start: var(--navbar-sticky);
		grid-column: 2 / 3;
		border-radius: var(--radius-lg);
		/* background-color: var(--color-neutral-50); */
		:global(:--dark) & {
			/* background-color: var(--color-neutral-800); */
		}
	}
</style>
