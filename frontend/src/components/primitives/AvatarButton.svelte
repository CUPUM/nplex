<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { session } from '$app/stores';
	import { userProfile } from '$stores/profile';
	import { cssSize, type SizeInput } from '$utils/css';
	import Loading from './Loading.svelte';

	export let size: SizeInput = '1em';
	export let warning: boolean = false;
	export let href: string = undefined;
	export let active: boolean = undefined;
	export let disabled: boolean = undefined;
	export let loading: boolean = undefined;

	let cssAvatarImage: string = '';
	const userColor =
		'#' + parseInt($session.user.created_at.match(/\d+/g).map(Number).join('')).toString(16).substring(0, 6);
	const userLetter = $session.user.email.charAt(0);

	$: cssAvatarImage = $userProfile && $userProfile.avatar_url ? `url(${$userProfile.avatar_url})` : '';
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
	style:font-size={cssSize(size)}
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
					font-size="1.5em"
					font-weight="400"
					stroke="none"
					dominant-baseline="middle"
				>
					{userLetter}
				</text>
			</svg>
		{/if}
		{#if loading}
			<Loading />
		{/if}
	</div>
</a>

<style lang="scss">
	.avatar {
		--size: calc(var(--default-size) - 2 * var(--inset, 0px));
		--pad: 5px;
		display: inline-block;
		position: relative;
		height: var(--size);
		min-height: var(--size);
		width: var(--size);
		border-radius: 50%;
		border: none;
		padding: var(--pad);
		text-decoration: none;
		background: transparent;

		&:hover #inner {
			opacity: 1;
			box-shadow: 0 0 0 5px rgba(var(--rgb-light-500), 0.5);
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
		padding: 0;
		margin: 0;
	}

	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		background-color: currentColor;
	}

	text {
		fill: var(--color-light-500);
	}
</style>
