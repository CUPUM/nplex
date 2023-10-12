<script lang="ts">
	import { enhance } from '$app/forms';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { Search, Sparkle } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { getLoadingNewProject } from '../../../Contexts.svelte';

	const t = createTranslations({
		fr: {
			edit: {
				heading: 'Éditez des projets',
				create: 'Créez un nouveau projet!',
				or: 'ou',
				find: 'Trouvez un de vos projets',
			},
		},
		en: {
			edit: {
				heading: 'Start editing projects',
				create: 'Create a brand new project!',
				or: 'or',
				find: "Let's find one of your projects",
			},
		},
	});

	const {
		state: creating,
		element: creatingAttributes,
		action: creatingAction,
	} = getLoadingNewProject(true);
</script>

<div id="projects">
	<header>
		<h1 class="heading xxl">{$t.edit.heading}</h1>
	</header>
	<section id="projects-actions">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			{...$link(`/new/project`)}
			class="button cta"
			use:creatingAction
			{...$creatingAttributes}
			in:fly|global={{ x: 8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			{$t.edit.create}
			<Sparkle class="button-icon" />
		</a>
		<span class="prose dimmer" in:fade|global={{ delay: 500, duration: 1000 }}>{$t.edit.or}</span>
		<form
			class="input-group outlined"
			use:enhance
			method="POST"
			action="?/search"
			in:fly|global={{ x: -8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			<input type="search" name="q" placeholder={$t.edit.find} class="input" />
			<div class="input-peer">
				<button class="button cta square"><Search class="button-icon" /></button>
			</div>
		</form>
	</section>
</div>

<style lang="postcss">
	#projects {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: stretch;
		min-height: calc(100vh - var(--navbar-height));
		min-height: calc(100svh - var(--navbar-height));
		min-height: calc(100dvh - var(--navbar-height));
		padding-bottom: var(--navbar-height);
		gap: 1rem;
		background-color: var(--base-bg);
		border-radius: inherit;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	header {
		/* padding:; */
	}

	#projects-actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
