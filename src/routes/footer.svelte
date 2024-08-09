<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { languageTag } from '$i18n/runtime';
	import LogoCupumUmontreal from '$lib/components/primitives/logo-cupum-umontreal.svelte';
	import LogoMontrealQuebec from '$lib/components/primitives/logo-montreal-quebec.svelte';
	import LogoUnescoUnitwin from '$lib/components/primitives/logo-unesco-unitwin.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { PRESENTATIONS } from '$lib/presentation/constants';
	import { Building2, DraftingCompass } from 'lucide-svelte';
	import type { Component, ComponentType } from 'svelte';
	import { slide } from 'svelte/transition';

	const sections = [
		[
			{
				href: '/',
				label: m.home(),
			},
			{
				href: '/about',
				label: m.about(),
			},
			{
				href: '/guides',
				label: m.guides(),
			},
		],
		[
			{
				href: '/projects',
				label: m.projects(),
				Icon: DraftingCompass,
			},
			{
				href: '/organizations',
				label: m.organizations(),
				Icon: Building2,
			},
		],
	] satisfies { href: string; label: string; Icon?: ComponentType }[][];

	const partners = [
		{
			Logo: LogoUnescoUnitwin,
			href: `https://www.unesco.org/${languageTag()}/unitwin`,
		},
		{
			Logo: LogoMontrealQuebec,
			href: `https://montreal.ca${languageTag() === 'en' ? '/en' : ''}/unites/bureau-du-design`,
		},
		{
			Logo: LogoCupumUmontreal,
			href: `https://www.unesco-paysage.umontreal.ca/${languageTag()}/`,
		},
	] satisfies { Logo: Component; href: string }[];
</script>

{#if $page.data.presentation !== PRESENTATIONS.FULL_SCREEN && !$page.data.footer?.hidden}
	<footer
		transition:slide
		class="p-lg gap-lg mt-2xl group-data-[presentation=normal]/root:max-w-main rounded-b-inherit bg-card/softer mx-auto flex w-full max-w-full flex-col items-stretch rounded-t-xl text-xs transition-all"
	>
		<!-- Site map -->
		<nav class="gap-sm flex flex-row flex-wrap items-center justify-center">
			{#each sections as links}
				<section class="gap-inherit flex flex-row flex-wrap justify-center">
					{#each links as link}
						<a
							href={link.href}
							class="py-xs px-sm hover:bg-input group/link rounded-xs flex flex-row items-center gap-[0.25em] transition-all"
						>
							{#if 'Icon' in link}
								<svelte:component
									this={link.Icon}
									class="opacity-softer group-hover/link:opacity-soft h-[1em] transition-all"
								></svelte:component>
							{/if}
							{link.label}
						</a>
					{/each}
				</section>
			{/each}
		</nav>
		<!-- Partners -->
		<nav class="gap-lg md:gap-xl flex flex-col self-center md:flex-row">
			{#each partners as { Logo, href }}
				<a
					{href}
					rel="external"
					target="_blank"
					class="p-md opacity-soft transition-all hover:opacity-100"
				>
					<Logo preserveAspectRatio="xMidYMid" width="auto" height="3.5rem" />
				</a>
			{/each}
		</nav>
		<!-- Chair copy -->
		<nav class="gap-md flex flex-col items-center">
			<a href="/" class="opacity-soft p-md transition-all hover:opacity-100">
				<Logo id="footer-logo" height="3rem" />
			</a>
			<a
				href="https://www.unesco-paysage.umontreal.ca/{languageTag()}/"
				rel="external"
				target="_blank"
				class="hover:text-base-accent opacity-softer compact cursor-pointer text-center text-base transition-all"
			>
				&copy;&ensp;{m.unesco_chair_long()}
			</a>
		</nav>
	</footer>
{/if}
