<script lang="ts">
	import { page } from '$app/stores';
	import Ripple from '$components/Ripple.svelte';

	export let href: string | undefined = undefined;
	export let element: keyof HTMLElementTagNameMap | undefined = undefined;
	export let variant: 'default' | 'cta' | 'outlined' = 'default';
	export let current: boolean | undefined | 'auto' = 'auto';

	$: computedCurrent = (current === 'auto' && href && $page.url.pathname === href) || undefined;
</script>

<svelte:element
	this={href ? 'a' : element ? element : 'button'}
	class="ui-sidebar-button focus-press {variant}"
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
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding-inline: 1em;
		padding-block: 0.5em;
		border-radius: var(--ui-radius-md);
		font-weight: 550;
		transition: all 0.1s ease-out;
	}

	.main {
		position: relative;
		top: -0.1em;
	}

	.default {
		color: col(fg, 000);
		border: 1px dashed col(primary, 500, 0);

		&[data-current] {
			cursor: default;
			color: col(primary, 500);
			border-color: col(primary, 500, 0.5);
		}

		&:hover:not([data-current]) {
			color: col(primary, 700);
			background: col(primary, 100, 0.1);
		}
	}
</style>
