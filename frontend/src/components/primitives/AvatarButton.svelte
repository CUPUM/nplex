<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { session } from '$app/stores';
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { getContext } from 'svelte';
	import Loading from './Loading.svelte';

	export let size: number | CssSizeValue = '1em';
	export let warning: boolean = false;
	export let href: string = undefined;
	export let active: boolean = undefined;
	export let disabled: boolean = undefined;
	export let loading: boolean = undefined;

	/** Context detection and handling should reflect that of Button's. */
	const fieldCtx = getContext(Ctx.Field);

	let autoSize: string;
	let cssAvatarImage: string;
	const userColor =
		'#' + parseInt($session.user.created_at.match(/\d+/g).map(Number).join('')).toString(16).substring(0, 6);

	/**
	 * Soft auto-determination of component size, where:
	 *
	 * - User-defined size has most precedence and is used if present.
	 * - Fallback size is smaller if the button is contextualised inside a 'button-parent' context setter. (Useful for
	 *   field buttons and other nested uses)
	 */
	$: autoSize = size ? cssSize(size) : fieldCtx ? '0.8em' : '1em';

	$: cssAvatarImage = $session.profile?.avatar_url ? `url(${$session.profile?.avatar_url})` : '';
</script>

<a
	use:ripple={{ startColor: 'currentColor' }}
	on:click
	on:focus
	on:mouseenter
	on:mouseleave
	class="avatar"
	class:active
	class:warning
	style:font-size={autoSize}
	style:color={userColor}
	disabled={disabled || loading}
	{href}
	{...$$restProps}
>
	<div id="inner" style:background-image={cssAvatarImage}>
		{#if !cssAvatarImage}
			<svg width="100" height="100" preserveAspectRatio="xMidYMid">
				<text
					vector-effect="non-scaling-stroke"
					text-anchor="middle"
					x="50%"
					y="50%"
					font-size="2em"
					font-weight="500"
					dominant-baseline="middle"
				>
					{$session.user.email.charAt(0)}
				</text>
			</svg>
		{/if}
		{#if loading}
			<Loading
				style="position: absolute; width: 1em; height: 1em; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: transparent;"
			/>
		{/if}
	</div>
</a>

<style lang="postcss">
	.avatar {
		--size: 2.8em;
		display: inline-block;
		position: relative;
		height: var(--size);
		min-height: var(--size);
		width: var(--size);
		border-radius: 50%;
		border: none;
		padding: 5px;
		text-decoration: none;
		background: transparent;

		&:hover #inner {
			opacity: 1;
			box-shadow: 0 0 0 5px rgba(var(--rgb-primary-300), 0.2);
		}
	}

	#inner {
		opacity: 0.8;
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: white;
		transition: all 0.2s;
		border-radius: 50%;
		overflow: hidden;
	}

	svg {
		position: asolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		background-color: currentColor;
	}

	text {
		fill: var(--color-dark-500);
	}
</style>
