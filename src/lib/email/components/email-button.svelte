<script context="module" lang="ts">
	const STYLES = {
		BASE: 'padding-inline:1.5em;padding-block:1em;white-space:nowrap;text-overflow:ellipsis;border-radius:0.9em;',
		VARIANTS: {
			default: '',
			bordered: '',
			dashed: '',
			cta: '',
			link: '',
			ghost: '',
		},
	};
</script>

<script lang="ts">
	import { type AvailableLanguageTag } from '$i18n/runtime';
	import { appUrl } from '$lib/common/url';
	import { withLang } from '$lib/i18n/location';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		children,
		variant = 'default',
		href,
		...buttonProps
	}: {
		hreflang?: AvailableLanguageTag;
		variant?: keyof (typeof STYLES)['VARIANTS'];
		href: string;
	} & HTMLAnchorAttributes = $props();

	const langHref = withLang(href, buttonProps.hreflang);
	const appHref = href.startsWith('/') ? appUrl(langHref) : langHref;
</script>

<a {...buttonProps} href={appHref} rel="external" style="{STYLES.BASE} {STYLES.VARIANTS[variant]}">
	{@render children?.()}
</a>
