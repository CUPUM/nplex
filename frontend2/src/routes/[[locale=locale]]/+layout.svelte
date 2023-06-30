<script lang="ts">
	import { page } from '$app/stores';
	import { createTranslation, plural, type PluralCount } from '$lib/i18n/translate.js';
	import { THEMES_ARR } from '$lib/theming/themes.js';

	export let data;

	const t = createTranslation({
		fr: {
			theme: {
				dark: 'Sombre',
				light: 'Clair',
			},
			test: (name: string, n: PluralCount<'many'>) =>
				`${name} a ${plural({ many: 'plusieurs fruits', 0: 'aucun fruit' }, n)}.`,
		},
		en: {
			theme: {
				dark: 'Dark',
				light: 'Light',
			},
			test: (name: string, n: PluralCount<'many'>) =>
				`${name} has ${plural({ many: 'many fruits', 0: 'no fruit' }, n)}.`,
		},
	});
</script>

<h1>Layout, load data: {data.locale}; page store data: {$page.data.locale}</h1>
<!-- Locale switcher -->
<nav>
	<a href="/fr">Fr</a>
	<a href="/en">En</a>
	<a href="/fr/guides">Fr guides</a>
	<a href="/en/guides">En guides</a>
	<a href="/de/guides">De guides (should error)</a>
</nav>
<!-- Theme switcher -->
<form method="POST" action="/?/theme">
	{#each THEMES_ARR as theme}
		<button type="submit" value={theme}>{$t.theme[theme]}</button>
	{/each}
</form>
<p>{$t.test('Bob', 2)}</p>

<slot />

<style lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;
	}

	a {
		padding: 1rem;
		background-color: var(--color-light-500);
	}
</style>
