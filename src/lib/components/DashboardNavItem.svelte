<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { dashboardReceive, dashboardSend, getDashboardNav } from './DashboardNav.svelte';

	type $$Props =
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes);

	export let href: $$Props['href'] = undefined;

	const navCtx = getDashboardNav(true);
	const index = navCtx.pushIndex();
	$: current = $$restProps['data-current'];
</script>

<svelte:element this={href ? 'a' : 'button'} class="item" {...$$restProps} {href} use:ripple>
	<slot />
	{#if current}
		<div
			class="needle"
			in:dashboardReceive={{ key: 'dashboard' }}
			out:dashboardSend={{ key: 'dashboard' }}
		></div>
	{/if}
</svelte:element>

<style lang="scss">
	.item {
		display: flex;
		flex-direction: row;
		position: relative;
		z-index: 1;
		font-weight: 450;
		border-radius: var(--radius-sm);
		padding: 1.25rem;
		white-space: wrap;
		font-size: var(--size-md);
		white-space: nowrap;
		transition: all 0.15s ease-out;
		@include md {
			white-space: unset;
			font-weight: 400;
			padding: 1em 1.25em;
			font-size: var(--size-sm);
		}

		&:hover,
		&:focus-visible {
			&:not([data-current]) {
				background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
				color: var(--color-neutral-950);
				@include dark {
					color: var(--color-neutral-50);
				}
			}
		}

		&[data-current] {
			color: var(--color-primary-700);
			@include dark {
				color: var(--color-primary-500);
			}

			@include md {
				font-weight: 650;
			}
		}

		:global(.button-icon) {
			opacity: unset;
			stroke-width: 2.5;
			width: 1.125em;
		}
	}

	.needle {
		position: absolute;
		top: 0.75em;
		bottom: 0.75em;
		left: 100%;
		width: 0.25rem;
		margin-left: 0.125rem;
		border-radius: inherit;
		z-index: -1;
		background-color: var(--color-primary-700);
		@include dark {
			background-color: var(--color-primary-500);
		}
	}
</style>
