<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let currentUrl = $state<URL>();

	if (browser) {
		page.subscribe(({ url }) => (currentUrl = url));
	}

	export function linkAttributes(options: {
		/**
		 * Use `hreflang` to customize the destination language.
		 */
		href: string;
		hreflang?: AvailableLanguageTag;
		currentOnSubpath?: boolean;
	}) {
		let href = $derived(withLang(options.href, options.hreflang));
		let current = $derived.by(() => {
			if (currentUrl) {
				if (href.startsWith('#') && currentUrl.hash === href) {
					return 'step' as const;
				}
				if (currentUrl.pathname === href) {
					return 'page' as const;
				}
				const relative = `${currentUrl.pathname}${currentUrl.hash}`;
				if ((options.currentOnSubpath && relative.startsWith(href)) || relative === href) {
					return 'page' as const;
				}
			}
			return undefined;
		});
		return {
			get 'href'() {
				return href;
			},
			get 'aria-current'() {
				return current;
			},
		};
	}
</script>

<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';
	import { withLang } from '$lib/i18n/location';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		href,
		hreflang,
		children,
		currentOnSubpath,
		...restProps
	}: HTMLAnchorAttributes & Parameters<typeof linkAttributes>[0] = $props();
</script>

<a {...restProps} {...linkAttributes({ href, hreflang, currentOnSubpath })}>
	{@render children?.()}
</a>

<style lang="postcss">
</style>
