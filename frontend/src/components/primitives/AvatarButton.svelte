<script lang="ts">
	import { ripple } from '$actions/ripple';
	import { page } from '$app/stores';
	import { userProfile } from '$stores/profile';
	import { cssSize } from '$utils/css';
	import Loading from './Loading.svelte';

	export let size: string | number = '1em';
	export let warning: boolean = false;
	export let href: string = undefined;
	export let active: boolean = undefined;
	export let disabled: boolean = undefined;
	export let loading: boolean = undefined;
	export let userid: string = undefined;

	const user = $page.data?.session.user; // To do:  get user from db if someone else's user id is passed.
	let cssAvatarImage: string = '';
	const userColors = [
		`#${parseInt(user.created_at.match(/\d+/g).map(Number).join('')).toString(16).slice(-6)}`,
		`#${user.email
			.split('')
			.map((c) => c.charCodeAt(0).toString(16))
			.join('')
			.slice(0, 6)}`,
		`#${user.id.slice(0, 6)}`,
	];
	const userLetter = user.email.charAt(0).toUpperCase();

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
	style:--color1={userColors[0]}
	style:--color2={userColors[1]}
	style:--color3={userColors[2]}
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
					y="55%"
					font-size="1.2em"
					font-weight="500"
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
			box-shadow: 0 0 0 5px rgba(var(--rgb-dark-100), 0.1);
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
		border-radius: 50%;
		overflow: hidden;
		padding: 0;
		margin: 0;
		transition: all 0.2s;
	}

	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		background: conic-gradient(from 90deg at -10% -10%, var(--color1), var(--color2), var(--color3) 90deg);
		// background: conic-gradient(from 0deg at 0% 25%, blue, green, yellow 180deg);
	}

	text {
		fill: var(--color-light-500);
	}
</style>
