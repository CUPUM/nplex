<script lang="ts">
	import { page } from '$app/stores';
	import { UnbasedURL } from '$utils/url';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let href: string;
	export let current: boolean | undefined = undefined;
	export let matcher: RegExp | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	$: hrefUrl = new UnbasedURL(href);
	$: autoCurrent =
		(matcher ? $page.url.href.match(matcher)?.length : $page.url.pathname === hrefUrl.pathname) ||
		undefined;
</script>

<a
	class="breadcrumbs-item"
	{href}
	data-sveltekit-preload-code
	data-sveltekit-preload-data
	data-current={current ?? autoCurrent}
	aria-disabled={disabled}
	in:slide={{ axis: 'x', duration: 250, easing: expoOut }}
>
	<span class="breadcrumb-item-inner">
		<slot />
	</span>
</a>

<style lang="scss">
	@use './BreadcrumbsItem.scss';
</style>
