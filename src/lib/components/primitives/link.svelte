<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let currentUrl = $state<URL>();
	let currentUrlWithoutLang = $state<URL>();

	if (browser) {
		page.subscribe(({ url }) => {
			currentUrl = url;
			currentUrlWithoutLang = url;
			if (currentUrlWithoutLang) {
				currentUrlWithoutLang.pathname = removeLang(url.pathname);
			}
		});
	}

	export function linkAttributes(
		hrefWithoutLang: string,
		{
			lang,
			currentOnSubpath,
			omitHash = true,
		}: {
			lang?: AvailableLanguageTag;
			currentOnSubpath?: boolean;
			omitHash?: boolean;
		} = {}
	) {
		let current = $derived.by(() => {
			if (currentUrlWithoutLang) {
				if (hrefWithoutLang.startsWith('#') && currentUrlWithoutLang.hash === hrefWithoutLang) {
					return 'step' as const;
				}
				if (
					currentUrlWithoutLang.pathname ===
					(omitHash ? hrefWithoutLang.split('#')[0] : hrefWithoutLang)
				) {
					return 'page' as const;
				}
				const currentPathWithHash = `${currentUrlWithoutLang.pathname}${currentUrlWithoutLang.hash}`;
				if (
					(currentOnSubpath && currentPathWithHash.startsWith(hrefWithoutLang)) ||
					currentPathWithHash === hrefWithoutLang
				) {
					return 'page' as const;
				}
			}
			return undefined;
		});

		return {
			get href() {
				return withLang(hrefWithoutLang, lang);
			},
			get 'aria-current'() {
				return current;
			},
		};
	}
</script>

<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import { removeLang, withLang } from '$lib/i18n/location';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		href,
		hreflang,
		children,
		currentOnSubpath,
		...restProps
	}: HTMLAnchorAttributes & {
		href: string;
		hreflang?: AvailableLanguageTag;
		currentOnSubpath?: boolean;
	} = $props();
</script>

<a {...restProps} {...linkAttributes(href, { lang: hreflang, currentOnSubpath })}>
	{@render children?.()}
</a>

<style lang="postcss">
</style>
