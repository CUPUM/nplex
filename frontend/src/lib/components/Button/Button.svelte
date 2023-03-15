<!--
	@component
	## Button
	Primitive button component.
-->
<script lang="ts" context="module">
	const CTX_KEY = 'button-context';

	type ButtonElement = keyof Pick<
		SvelteHTMLElements,
		'a' | 'span' | 'button' | 'label' | 'div' | 'input'
	>;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';
	import { UnbasedURL } from '$utils/url';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		SvelteHTMLElements,
	} from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		as?: ButtonElement;
		href?: string;
		variant?: Variant;
		state?: State;
		equi?: boolean;
		compact?: boolean;
		loading?: boolean;
		rounded?: boolean;
		active?: boolean;
		disabled?: boolean;
		autoActive?: boolean;
		contentAlign?: 'start' | 'center' | 'end';
		class?: string;
		style?: string;
		type?: HTMLButtonAttributes['type'];
	};

	export let as: $$Props['as'] = undefined;
	export let variant: $$Props['variant'] = VARIANTS.Default;
	export let type: $$Props['type'] = 'button';
	export let state: $$Props['state'] = STATES.Normal;
	export let href: $$Props['href'] = undefined;
	export let equi: $$Props['equi'] = undefined;
	export let compact: $$Props['compact'] = undefined;
	export let loading: $$Props['loading'] = false;
	export let disabled: $$Props['disabled'] = undefined;
	export let active: $$Props['active'] = undefined;
	export let rounded: $$Props['rounded'] = false;
	export let autoActive: $$Props['active'] = true;
	export let contentAlign: $$Props['contentAlign'] = 'start';
	let className: $$Props['class'] = '';
	export { className as class };
	export let style: $$Props['style'] = undefined;

	// const groupContext = getButtonGroupContext();

	// $: groupVariant = groupContext?.variant;
	// $: computedVariant = groupVariant ? $groupVariant : variant;
	$: element = as ? as : href ? 'a' : 'button';
	$: hrefURL = href ? new UnbasedURL(href) : undefined;
	$: if (autoActive && hrefURL) {
		active = type === 'submit' ? false : $page.url.pathname === hrefURL.pathname;
	}
</script>

<svelte:element
	this={element}
	role="button"
	{type}
	class="button {variant} {state} {contentAlign} {className} {ICON_CLASS.hover}"
	class:compact
	class:equi
	class:rounded
	class:active
	class:loading
	class:disabled
	disabled={element === 'button' ? disabled : undefined}
	{style}
	{href}
	{...$$restProps}
	on:click
	on:pointerdown
	on:pointercancel
	on:pointerup
	on:pointerenter
	on:mousedown
	on:mouseover
	on:mouseup
	on:keydown
	on:mouseout
	on:mousemove
	on:mouseleave
	on:mouseenter
	on:focus
	on:blur
>
	<Ripple />
	{#if $$slots.leading && !equi}
		<div class="content leading">
			<slot name="leading" />
		</div>
	{/if}
	<div class="content main">
		<slot />
	</div>
	{#if $$slots.trailing && !equi}
		<div class="content trailing">
			<slot name="trailing" />
		</div>
	{/if}
	{#if loading}
		<div class="loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	@use './Button.scss';
</style>
