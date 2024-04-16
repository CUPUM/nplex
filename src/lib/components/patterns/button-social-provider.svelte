<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { ripple } from '$lib/actions/ripple';
	import type { OAuthProvider } from '$lib/auth/constants';
	import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/socials';
	import { createLoadable } from '$lib/builders/loading';
	import { createTooltip } from '$lib/builders/tooltip';
	import { link } from '$lib/i18n/link.svelte';
	import { melt } from '@melt-ui/svelte';
	import { scale } from 'svelte/transition';
	import TooltipContent from '../TooltipContent.svelte';

	export let provider: OAuthProvider;
	export let i: number | undefined = undefined;

	const details = OAUTH_PROVIDERS_DETAILS[provider];

	const url = `/login/${provider}`;

	const {
		elements: { root },
		state,
	} = createLoadable();

	const {
		elements: { trigger, content, arrow },
		states: { open },
		options: { positioning },
	} = createTooltip();

	beforeNavigate((nav) => {
		if (nav.to && nav.to.url.pathname.indexOf(url) > -1) {
			state.set(true);
		}
	});

	afterNavigate(() => {
		state.set(false);
	});
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	{...$link(url)}
	class="button outlined square"
	use:ripple
	use:melt={$root}
	{...{
		...$root,
		'action': undefined,
		'data-disabled': $root['data-disabled'] || details.disabled || undefined,
	}}
	use:melt={$trigger}
	in:scale|global={{ start: 0.95, delay: (i ?? 0) * 75, duration: 750 }}
>
	<div class="provider-icon">
		<svelte:component this={details.icon} />
	</div>
</a>
<TooltipContent {content} {positioning} {arrow} {open}>
	{details.name}
</TooltipContent>

<style>
	[data-disabled] .provider-icon {
		opacity: 0.35;
	}
</style>
