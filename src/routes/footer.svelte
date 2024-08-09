<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { languageTag } from '$i18n/runtime';
	import LogoCupumUmontreal from '$lib/components/primitives/logo-cupum-umontreal.svelte';
	import LogoMontrealQuebec from '$lib/components/primitives/logo-montreal-quebec.svelte';
	import LogoUnescoUnitwin from '$lib/components/primitives/logo-unesco-unitwin.svelte';
	import Logo from '$lib/components/primitives/logo.svelte';
	import { PRESENTATIONS } from '$lib/presentation/constants';
	import { slide } from 'svelte/transition';
</script>

{#if $page.data.presentation !== PRESENTATIONS.FULL_SCREEN && !$page.data.footer?.hidden}
	<footer
		transition:slide
		class="bg-input/softer p-lg pb-sm gap-xl mt-2xl group-data-[presentation=normal]/root:max-w-main mx-auto flex w-full flex-col items-center rounded-t-lg"
	>
		<nav class="gap-2xl px-lg flex flex-row max-sm:flex-col">
			<a
				href="https://www.unesco.org/{languageTag()}/unitwin"
				rel="external"
				target="_blank"
				class="opacity-softish transition-all hover:opacity-100"
			>
				<LogoUnescoUnitwin preserveAspectRatio="xMidYMid" width="100%" height="3.5rem" />
			</a>
			<a
				href="https://montreal.ca{languageTag() === 'en' ? '/en' : ''}/unites/bureau-du-design"
				rel="external"
				target="_blank"
				class="opacity-softish transition-all hover:opacity-100"
			>
				<LogoMontrealQuebec preserveAspectRatio="xMidYMid" width="100%" height="3.5rem" />
			</a>
			<a
				href="https://www.unesco-paysage.umontreal.ca/{languageTag()}/"
				rel="external"
				target="_blank"
				class="opacity-softish transition-all hover:opacity-100"
			>
				<LogoCupumUmontreal preserveAspectRatio="xMidYMid" width="100%" height="3.5rem" />
			</a>
		</nav>
		<nav class="gap-md flex flex-col items-center">
			<a href="/" class="opacity-softish transition-all hover:opacity-100">
				<Logo id="footer-logo" height="2em" />
			</a>
			<a
				href="https://www.unesco-paysage.umontreal.ca/{languageTag()}/"
				rel="external"
				target="_blank"
				class="hover:text-base-accent opacity-soft compact cursor-pointer text-base text-xs transition-all"
			>
				&copy;&ensp;{m.unesco_chair_long()}
			</a>
		</nav>
	</footer>
{/if}
