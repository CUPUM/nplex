<script lang="ts" context="module">
	const item = cva({
		base: {
			'--icon-transform': 'translateX(0)',
			'--icon-opacity': '0.5',
			'position': 'relative',
			'display': 'flex',
			'flexDirection': 'row',
			'justifyContent': 'space-between',
			'alignItems': 'flex-start',
			'zIndex': '1',
			'fontWeight': '450',
			'borderRadius': 'sm',
			'padding': '1em 1.25em',
			'fontSize': 'md',
			'whiteSpace': 'nowrap',
			'lineHeight': '1.5',
			'transitionProperty': 'all',
			'transitionDuration': 'fast',
			'transitionTimingFunction': 'ease-out',
			'md': {
				whiteSpace: 'wrap',
				fontWeight: '400',
				padding: '0.8em 1.25em',
				fontSize: 'sm',
			},
			'_hoverOrFocusVisible': {
				'--icon-transform': 'translateX(.25em)',
				'--icon-opacity': '1',
				'_notCurrent': {
					backgroundColor: 'neutral.500/.1',
					color: 'neutral.950',
					_dark: {
						color: 'neutral.50',
					},
				},
			},
			'_current': {
				color: 'primary.600',
				_dark: {
					color: 'primary.500',
				},
				md: {
					fontWeight: '650',
				},
			},
		},
		variants: {
			special: {
				danger: {
					color: 'error.700',
					_dark: {
						color: 'error.300',
					},
					_hoverOrFocusVisible: {
						color: 'error.600!',
						backgroundColor: 'error.500/.1!',
						_dark: {
							color: 'error.200!',
							backgroundColor: 'error.500/.1!',
						},
					},
				},
			},
		},
	});

	export const dashboardButtonIcon = css({
		width: '1.125em',
		flex: 'none',
		opacity: 'var(--icon-opacity)',
		transform: 'var(--icon-transform)',
		transition: 'all token(durations.fast) ease-out',
	});

	const needle = css({
		position: 'absolute',
		top: '0.75em',
		bottom: '0.75em',
		left: '100%',
		width: '0.25rem',
		marginLeft: '0.125rem',
		borderRadius: 'inherit',
		zIndex: '-1',
		backgroundColor: 'primary.600',
		_dark: {
			backgroundColor: 'primary.500',
		},
	});
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { css, cva, type RecipeVariantProps } from 'styled-system/css';
	import { expoOut } from 'svelte/easing';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import type { ValueOf } from 'type-fest';
	import { dashboardReceive, dashboardSend, getDashboardNav } from './DashboardNav.svelte';

	type ItemVariantProps = NonNullable<RecipeVariantProps<typeof item>>;

	type $$Props = { special?: ValueOf<Pick<ItemVariantProps, 'special'>> } & (
		| ({ href: string } & HTMLAnchorAttributes)
		| ({ href?: undefined } & HTMLButtonAttributes)
	);

	export let href: $$Props['href'] = undefined;
	export let special: $$Props['special'] = undefined;

	const navCtx = getDashboardNav(true);
	const index = navCtx.pushIndex();
	$: current = $$restProps['data-current'];
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class={item({ special })}
	{...$$restProps}
	{href}
	use:ripple
	in:fly={{ x: -6, delay: index * 50, duration: 750, easing: expoOut }}
>
	<slot />
	{#if current}
		<div
			class={needle}
			in:dashboardReceive={{ key: 'dashboard' }}
			out:dashboardSend={{ key: 'dashboard' }}
		></div>
	{/if}
</svelte:element>
