<script lang="ts">
	import type { Database } from '$types/database';
	import { cssSize, type SizeInput } from '$utils/css';
	import type { User } from '@supabase/supabase-js';
	import Loading from './Loading.svelte';

	type UserProfile = Database['public']['Tables']['users']['Row'];

	export let data: Partial<
		Pick<UserProfile, 'avatar_url' | 'first_name' | 'id' | 'public_email' | 'created_at'> &
			Pick<User, 'id' | 'email'>
	>;
	export let loading: boolean = false;
	export let size: SizeInput = '1em';

	const color1 = `#${parseInt(data.created_at.match(/\d+/g).map(Number).join('')).toString(16).slice(-6)}`;
	const color2 = `#${(
		data.first_name ||
		data.email ||
		data.public_email ||
		(data.id || data.id).replace('-', '').slice(12, 18)
	)
		.split('')
		.map((c) => c.charCodeAt(0).toString(16))
		.join('')
		.slice(0, 6)}`;
	const color3 = `#${(data.id || data.id).slice(0, 6)}`;

	const userLetter = (data.first_name || data.email || data.public_email || '?').charAt(0).toUpperCase();
</script>

<figure style:font-size={cssSize(size)}>
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
				y="55%"
				font-size=".5em"
				font-weight="500"
				stroke="none"
				dominant-baseline="middle"
			>
				{userLetter}
			</text>
		</svg>
	{/if}
	<slot name="badge" />
	{#if loading}
		<Loading />
	{/if}
</figure>

<style lang="scss">
	figure {
		position: relative;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		padding: 0;
		margin: 0;
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
		background: conic-gradient(from 90deg at -10% -10%, var(--color1), var(--color2), var(--color3) 90deg);
	}

	text {
		fill: var(--color-light-500);
	}
</style>
