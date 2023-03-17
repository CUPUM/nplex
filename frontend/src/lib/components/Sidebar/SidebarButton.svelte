<script lang="ts">
	import { page } from '$app/stores';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { UnbasedURL } from '$utils/url';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let href: string | undefined = undefined;
	export let element: keyof HTMLElementTagNameMap | undefined = undefined;
	export let variant: 'default' | 'cta' | 'outlined' | undefined = undefined;
	export let current: boolean | undefined | 'auto' = 'auto';
	export let i: number;

	$: hrefUrl = href ? new UnbasedURL(href) : undefined;

	$: computedCurrent =
		(current === 'auto' ? hrefUrl && $page.url.pathname === hrefUrl.pathname : current) ||
		undefined;
</script>

<svelte:element
	this={href ? 'a' : element ? element : 'button'}
	class="sidebar-button focuspress {variant ?? ''} {computedCurrent
		? ICON_CLASS.hold
		: ICON_CLASS.hover}"
	{href}
	data-current={computedCurrent}
	in:fly={{ x: 6, delay: i * 100, duration: 350, easing: expoOut }}
>
	<Ripple />
	{#if $$slots.leading}
		<div class="leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="main">
		<slot />
	</div>
	{#if $$slots.trailing}
		<div class="trailing">
			<slot name="trailing" />
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	.sidebar-button {
		--sidebar-button-radius: calc(var(--sidebar-radius) - var(--sidebar-inset));
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding-inline: 1.25em;
		padding-block: 0.75em;
		gap: 0.75em;
		border-radius: var(--sidebar-button-radius);
		font-weight: 500;
		transition: all 0.1s ease-out;
	}

	.main {
		position: relative;
		top: -0.1em;
	}

	.leading,
	.trailing {
		position: relative;
		align-self: center;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.default,
	:global(.default) .sidebar-button {
		align-self: flex-start;
		--ripple-color: #{col(primary, 500)};
		color: col(fg, 100);

		&[data-current] {
			cursor: default;
			color: col(primary, 700);
			background: col(primary, 500, 0.15);
			// border-color: col(secondary, 700, 0.5);
		}

		&:hover:not([data-current]) {
			color: col(primary, 500);
			background: col(bg, 000, 0.2);
		}
	}

	.outlined,
	:global(.outlined) .sidebar-button {
		--ripple-color: #{col(secondary, 500)};
		color: col(fg, 000);
		// border: var(--ui-border-thickness) dashed col(secondary, 500, 0);

		&[data-current] {
			cursor: default;
			color: col(secondary, 700);
			background: col(secondary, 100, 0.1);
			// border-color: col(secondary, 700, 0.5);
		}

		&:hover:not([data-current]) {
			color: col(secondary, 300);
			background: col(secondary, 100, 0.05);
		}
	}
</style>
