<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { dashboardReceive, dashboardSend, getDashboardNav } from './DashboardNav.svelte';

	type $$Props = { danger?: boolean } & (
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes)
	);

	export let href: $$Props['href'] = undefined;
	export let danger: $$Props['danger'] = undefined;

	const navCtx = getDashboardNav(true);
	const index = navCtx.pushIndex();
	$: current = $$restProps['data-current'];
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="item"
	class:danger
	{...$$restProps}
	{href}
	use:ripple
	in:fly={{ x: -6, delay: index * 50, duration: 750, easing: expoOut }}
>
	<slot />
	{#if current}
		<div
			class="needle"
			in:dashboardReceive={{ key: 'dashboard' }}
			out:dashboardSend={{ key: 'dashboard' }}
		></div>
	{/if}
</svelte:element>

<style lang="postcss">
	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		z-index: 1;
		font-weight: 450;
		border-radius: var(--radius-sm);
		padding: 1rem 1.25rem;
		font-size: var(--size-md);
		white-space: nowrap;
		line-height: 1.5em;
		transition: all 0.15s ease-out;
		@media (--md) {
			white-space: wrap;
			font-weight: 400;
			padding: 0.8em 1.25em;
			font-size: var(--size-sm);
		}

		&:disabled,
		&[aria-disabled] {
			opacity: 0.25;
			pointer-events: none;
		}

		&:active {
			animation: var(--animation-press);
		}

		&:hover,
		&:focus-visible {
			&:not([data-current]) {
				color: var(--color-neutral-950);
				background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
				:global(:--dark) & {
					color: var(--color-neutral-50);
				}
				&.danger {
					color: var(--color-error-600);
					background-color: color-mix(in srgb, var(--color-error-500) 10%, transparent);
					:global(:--dark) & {
						color: var(--color-error-400);
					}
				}
				:global(.button-icon) {
					opacity: 1;
					transform: translateX(0.2em);
				}
			}
		}

		&[data-current] {
			color: var(--color-primary-600);
			:global(:--dark) & {
				color: var(--color-primary-500);
			}
			@media (--md) {
				font-weight: 650;
			}
			:global(.button-icon) {
				opacity: 1;
			}
		}

		&.danger {
			color: var(--color-error-700);
			:global(:--dark) & {
				color: var(--color-error-300);
			}
		}

		:global(.button-icon) {
			flex: none;
			opacity: 0.35;
			transition: all var(--duration-fast) ease-out;
			width: 1.25em;
			stroke-width: 2;
			transform: translateX(0);
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
		background-color: var(--color-primary-600);
		:global(:--dark) & {
			background-color: var(--color-primary-500);
		}
		.danger & {
			background-color: var(--color-error-800);
			:global(:--dark) & {
				background-color: var(--color-error-300);
			}
		}
	}
</style>
