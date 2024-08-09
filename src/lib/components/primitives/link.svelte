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
				currentUrlWithoutLang.pathname = i18n.route(url.pathname);
			}
		});
	}

	export function linkAttributes(
		href: string,
		{
			currentOnSubpath,
			currentOmitHash = true,
		}: {
			currentOnSubpath?: boolean;
			currentOmitHash?: boolean;
		} = {}
	) {
		let current = $derived.by(() => {
			if (currentUrlWithoutLang && currentUrl) {
				if (
					href.startsWith('#') &&
					decodeURIComponent(currentUrl.hash) === decodeURIComponent(href)
				) {
					return 'step' as const;
				}
				if (currentUrlWithoutLang.pathname === (currentOmitHash ? href.split('#')[0] : href)) {
					return 'page' as const;
				}
				const currentPathWithHash = `${currentUrlWithoutLang.pathname}${currentUrlWithoutLang.hash}`;
				if (
					(currentOnSubpath && currentPathWithHash.startsWith(href)) ||
					currentPathWithHash === href
				) {
					return 'page' as const;
				}
			}
			return undefined;
		});

		return {
			href,
			get 'aria-current'() {
				return current;
			},
		};
	}
</script>

<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import { i18n } from '$lib/i18n/adapter';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		href,
		hreflang,
		children,
		currentOnSubpath,
		currentOmitHash,
		...restProps
	}: HTMLAnchorAttributes &
		Parameters<typeof linkAttributes>[1] & {
			href: string;
			hreflang?: AvailableLanguageTag;
		} = $props();
</script>

<a {...restProps} {...linkAttributes(href, { currentOnSubpath, currentOmitHash })} {hreflang}>
	{@render children?.()}
</a>
