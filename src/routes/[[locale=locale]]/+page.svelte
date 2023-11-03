<script lang="ts">
	import { page } from '$app/stores';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { User2 } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	const t = createTranslations({
		fr: {
			title: 'Bienvenue sur Nplex',
			createAccount: 'Créez votre compte dès maintenant !',
			browseProjects: 'Explorez les projets récents',
			browseOrgs: 'Explorez les organisations',
		},
		en: {
			title: 'Welcome to Nplex',
			createAccount: 'Create your account now!',
			browseProjects: 'Browse recent projects',
			browseOrgs: 'Browse organizations',
		},
	});

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<article>
	<header>
		<h1>{$t.title}</h1>
	</header>
	{#if !$page.data.user}
		<section class="hero">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="button cta" {...$link('/signup')}>
				{$t.createAccount}
				<User2 class="button-icon" />
			</a>
		</section>
	{/if}
	<section class="hero">
		<a class="button" {...$link('/projects')}>{$t.browseProjects}</a>
		<a class="button" {...$link('/organizations')} aria-disabled>{$t.browseOrgs}</a>
	</section>
</article>

<!-- <article>
	<h2>Projects</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.projects}
		...
	{:then editableProjects}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article>
<article>
	<h2>Organizations</h2>
	<section>
		<h3>Featured</h3>
		<ul></ul>
	</section>
	{#await data.editable.organizations}
		...
	{:then editableOrganizations}
		<section>
			<h3>Mine</h3>
			<ul></ul>
		</section>
	{/await}
</article> -->

<style lang="postcss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - var(--navbar-height));
		padding-bottom: var(--navbar-height);
	}

	header {
		padding: 2rem;
	}

	h1 {
		font-size: var(--size-4xl);
		font-weight: 500;
	}

	.hero {
		font-size: var(--size-sm);
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		gap: var(--base-gutter);
	}
</style>
