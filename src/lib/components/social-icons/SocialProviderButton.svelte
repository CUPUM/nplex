<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { createLoading } from '$lib/actions/loading';
	import { ripple } from '$lib/actions/ripple';
	import type { SocialProvider } from '$lib/auth/constants';
	import { SOCIAL_PROVIDERS_DETAILS } from '$lib/auth/socials';
	import { i18nlink } from '$lib/i18n/link';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import TooltipContent from '../TooltipContent.svelte';

	export let provider: SocialProvider;

	const details = SOCIAL_PROVIDERS_DETAILS[provider];

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
	{...$i18nlink(url)}
	class="provider-button"
	data-disabled={details.disabled || undefined}
	use:ripple
	use:loadingAction
	{...$loadingElement}
	use:melt={$trigger}
>
	<svelte:component this={details.icon} />
</a>
<TooltipContent {content} {positioning} {open}>
	{details.name}
</TooltipContent>

<style lang="scss">
	.provider-button {
		font-size: var(--size-xl);
		position: relative;
		display: flex;
		flex-grow: 1;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border-radius: var(--radius-md);
		border: 1px solid color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
		transition: all 0.15s ease-out;

		&:hover,
		&:focus-visible {
			border: 1px solid transparent;
			background-color: var(--color-neutral-50);
			box-shadow: var(--shadow-lg);
			@include dark {
				background-color: var(--color-neutral-800);
			}
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
			background-color: transparent;
		}
	}
</style>
