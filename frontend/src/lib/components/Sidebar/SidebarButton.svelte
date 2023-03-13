<script lang="ts">
	import { page } from '$app/stores';
	import Ripple from '$components/Ripple.svelte';
	import { UnbasedURL } from '$utils/url';

	export let href: string | undefined = undefined;
	export let element: keyof HTMLElementTagNameMap | undefined = undefined;
	export let variant: 'default' | 'cta' | 'outlined' = 'default';
	export let current: boolean | undefined | 'auto' = 'auto';

	$: hrefUrl = href ? new UnbasedURL(href) : undefined;

	$: computedCurrent =
		(current === 'auto' && hrefUrl && $page.url.pathname === hrefUrl.pathname) || undefined;
</script>

<svelte:element
	this={href ? 'a' : element ? element : 'button'}
	class="ui-sidebar-button focuspress {variant}"
	{href}
	data-current={current === 'auto' ? computedCurrent : current || undefined}
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
	.ui-sidebar-button {
		--ripple-color: #{col(secondary, 500)};
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding-inline: 1em;
		padding-block: 0.75em;
		gap: 1em;
		border-radius: var(--ui-radius-md);
		font-weight: 550;
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

	.default {
		color: col(fg, 000);
		border: var(--ui-border-thickness) dashed col(secondary, 500, 0);

		&[data-current] {
			cursor: default;
			color: col(secondary, 500);
			background: col(secondary, 100, 0.05);
			border-color: col(secondary, 700, 0.5);
		}

		&:hover:not([data-current]) {
			color: col(secondary, 700);
			background: col(secondary, 100, 0.1);
		}
	}
</style>
