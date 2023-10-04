<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { Folders, Home, Settings2, UserSquare2, type Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { StoresValues } from 'svelte/store';
	import { crossfade, scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			nav: {
				home: 'Mon accueil',
				profile: 'Profil',
				collections: 'Collections',
				settings: 'Paramètres',
			},
		},
		en: {
			nav: {
				home: 'My home',
				profile: 'Profile',
				collections: 'Collections',
				settings: 'Settings',
			},
		},
	});

	const accountLinks = [
		{ key: 'home', subpath: '', icon: Home },
		{ key: 'profile', subpath: 'profile', icon: UserSquare2 },
		{ key: 'collections', subpath: 'collections', icon: Folders },
		{ key: 'settings', subpath: 'settings', icon: Settings2 },
	] satisfies {
		key: keyof StoresValues<typeof t>['nav'];
		subpath: string;
		icon: ComponentType<Icon>;
	}[];

	const [send, receive] = crossfade({ duration: 250 });
</script>

<article>
	<nav>
		{#each accountLinks as section, i (section.key)}
			<!-- svelte-ignore a11y-missing-attribute -->
			{@const linkAttributes = $link(`/i/${section.subpath}`)}
			<a
				class="button ghost"
				{...linkAttributes}
				in:scale|global={{ start: 0.95, opacity: 0, delay: i * 75, duration: 750 }}
				use:ripple
			>
				<svelte:component this={section.icon} class="button-icon" />{$t.nav[section.key]}
				{#if linkAttributes['data-current']}
					<div class="needle" in:receive={{ key: 'needle' }} out:send={{ key: 'needle' }} />
				{/if}
			</a>
		{/each}
	</nav>
	<section>
		<slot />
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}

	nav {
		display: flex;
		flex-direction: column;
		padding: 1.5rem 0.5rem;
		font-size: var(--size-sm);
	}

	.button {
		border-radius: var(--radius-sm);

		:global(.button-icon) {
			stroke-width: 2.5;
			width: 1.1em;
		}
	}

	.needle {
		position: absolute;
		width: 3px;
		top: 1em;
		bottom: 1em;
		right: 0;
		background-color: var(--color-primary-500);
		border-radius: var(--radius-full);
	}

	section {
		flex: 1;
		border-top-left-radius: var(--radius-2xl);
		border-bottom-left-radius: var(--radius-2xl);
		background-color: var(--color-neutral-50);
		@include dark {
			background-color: var(--color-neutral-700);
		}
	}
</style>
