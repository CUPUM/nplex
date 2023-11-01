<script lang="ts">
	import { enhance } from '$app/forms';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { FilePlus, Search } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			heading: 'Éditez des projets',
			create: 'Créez un nouveau projet&nbsp;!',
			or: 'ou',
			find: 'Trouvez un de vos projets',
		},
		en: {
			heading: 'Start editing projects',
			create: 'Create a brand new project!',
			or: 'or',
			find: "Let's find one of your projects",
		},
	});
</script>

<form class="pattern-cross" use:enhance method="POST" action="?/search">
	<header>
		<h1 class="heading xxl">{$t.heading}</h1>
	</header>
	<section id="projects-actions">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			{...$link(`/new/project`)}
			class="button cta"
			in:fly|global={{ x: 8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			{@html $t.create}
			<FilePlus class="button-icon" />
		</a>
		<span class="prose dimmer" in:fade|global={{ delay: 500, duration: 1000 }}>{$t.or}</span>
		<fieldset
			class="input-group outlined"
			in:fly|global={{ x: -8, easing: cubicOut, duration: 450, delay: 250 }}
		>
			<input type="search" name="q" placeholder={$t.find} class="input" />
			<div class="input-peer">
				<button class="button cta square"><Search class="button-icon" /></button>
			</div>
		</fieldset>
	</section>
</form>

<style lang="postcss">
	form {
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

	#projects-actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
</style>
