<script lang="ts">
	import { i18nlink } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';

	const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
		},
	});

	const {
		elements: { menu, item, trigger, arrow },
	} = createDropdownMenu();
</script>

<header>
	<nav>
		<a class="button" {...$i18nlink('/about')}>{$t.about}</a>
		<a class="button" {...$i18nlink('/guides')}>{$t.guides}</a>
		<a class="button" {...$i18nlink('/projects')}>{$t.projects}</a>
	</nav>
	<!-- User nav -->
	<nav></nav>
	<!-- User settings -->
	<menu>
		<button class="button" use:melt={$trigger}>Langue</button>
		<div use:melt={$menu}>Hello</div>
	</menu>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
	}

	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: var(--size-4xl);
		font-size: --;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-sm);
		background-color: white;
	}
</style>
