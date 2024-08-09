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
	import { languageTag, type AvailableLanguageTag } from '$i18n/runtime';
	import { appUrl } from '$lib/common/url';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		children,
		variant = 'default',
		href,
		hreflang,
		...buttonProps
	}: {
		hreflang?: AvailableLanguageTag;
		variant?: keyof (typeof STYLES)['VARIANTS'];
		href: string;
	} & HTMLAnchorAttributes = $props();

	const based = href.startsWith('/') ? appUrl(href, { lang: hreflang ?? languageTag() }) : href;
</script>

<a
	{...buttonProps}
	href={based}
	{hreflang}
	data-no-translate
	rel="external"
	style="{STYLES.BASE} {STYLES.VARIANTS[variant]}"
>
	{@render children?.()}
</a>
