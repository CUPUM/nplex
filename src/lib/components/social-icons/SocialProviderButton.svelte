<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import type { OAuthProvider } from '$lib/auth/constants';
	import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/socials';
	import { link } from '$lib/i18n/link';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { scale } from 'svelte/transition';
	import TooltipContent from '../TooltipContent.svelte';

	export let provider: OAuthProvider;
	export let i: number | undefined = undefined;

	const details = OAUTH_PROVIDERS_DETAILS[provider];

	const url = `/login/${provider}`;

	const { element: loadingElement, action: loadingAction, state: loadingState } = createLoading();

	const {
		elements: { trigger, content },
		states: { open },
		options: { positioning },
	} = createTooltip({
		positioning: {
			placement: 'top',
			gutter: 10,
		},
		forceVisible: true,
		openDelay: 350,
	});

	beforeNavigate((nav) => {
		if (nav.to && nav.to.url.pathname.indexOf(url) > -1) {
			loadingState.set(true);
		}
	});

	afterNavigate(() => {
		loadingState.set(false);
	});
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	{...$link(url)}
	class="button outlined"
	use:ripple
	use:loadingAction
	{...{
		...$loadingElement,
		'data-disabled': $loadingElement['data-disabled'] || details.disabled || undefined,
	}}
	use:melt={$trigger}
	in:scale|global={{ start: 0.95, delay: (i ?? 0) * 75, duration: 750 }}
>
	<div class="provider-icon">
		<svelte:component this={details.icon} />
	</div>
</a>
<TooltipContent {content} {positioning} {open}>
	{details.name}
</TooltipContent>

<style lang="scss">
</style>
