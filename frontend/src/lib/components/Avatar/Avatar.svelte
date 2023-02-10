<script lang="ts">
	import type { Database } from '$types/database/generated';
	import Loading from '../Loading.svelte';
	import Ripple from '../Ripple.svelte';

	type AvatarData = Pick<
		Database['public']['Tables']['users']['Row'],
		'avatar_url' | 'first_name' | 'id' | 'public_email'
	>;

	export let data: AvatarData;
	export let loading: boolean = false;
	export let warning: boolean | undefined = undefined;
	export let href: string | undefined = undefined;
	export let active: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let as: keyof HTMLElementTagNameMap | undefined = undefined;
	export let style: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	function color(str: string) {
		return `#${str}`;
		// return `#${str
		// 	.split('')
		// 	.map((c) => c.charCodeAt(0).toString(16))
		// 	.join('')
		// 	.slice(0, 6)}`;
	}

	$: seed = data.id.replace('-', '');
	$: color1 = color(seed.slice(-6));
	$: color2 = color(seed.slice(0, 6));
	$: color3 = color(seed.slice(-12, -6));
	$: initial = (data.first_name ?? data.public_email ?? '?').charAt(0).toUpperCase();
</script>

<svelte:element
	this={as ? as : href ? 'a' : 'figure'}
	class="avatar {className}"
	{style}
	{disabled}
	{href}
	class:active
	class:warning
	class:loading
>
	{#if data.avatar_url}
		<img src={data.avatar_url} alt="user-avatar-{data.avatar_url}" loading="lazy" />
	{:else}
		<svg
			width="100"
			height="100"
			preserveAspectRatio="xMidYMid"
			style:--color1={color1}
			style:--color2={color2}
			style:--color3={color3}
		>
			<text
				vector-effect="non-scaling-stroke"
				text-anchor="middle"
				x="50%"
				y="53%"
				font-size="1.2em"
				font-weight="500"
				stroke="none"
				dominant-baseline="middle"
			>
				{initial}
			</text>
		</svg>
	{/if}
	<Ripple />
	<slot name="badge" />
	{#if loading}
		<slot name="loading">
			<Loading />
		</slot>
	{/if}
</svelte:element>

<style lang="scss">
	.avatar {
		display: inline-block;
		position: relative;
		height: var(--ui-height);
		width: var(--ui-height);
		border-radius: 99px; //var(--ui-radius);
		border: none;
		text-decoration: none;
		background: transparent;
		padding: 0;
		margin: 0;
		cursor: pointer;
		// opacity: 1;
		transform: scale(0.95);
		transition: all 0.15s ease-out;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			color: col(bg, 900);
			opacity: 0.75;
			border-radius: inherit;
			border: 0px solid currentColor;
			transition: all 0.15s ease-out;
		}
		&:hover,
		&.active {
			// opacity: 1;
			transform: scale(1);
			&::after {
				border: 2px solid currentColor;
			}
		}
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}

	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		border-radius: inherit;
		background: conic-gradient(
			from 90deg at -10% -10%,
			var(--color1),
			var(--color2),
			var(--color3) 90deg
		);
	}

	text {
		fill: black;
		filter: invert(0.2);
	}
</style>
