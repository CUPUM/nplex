<script lang="ts" context="module">
	import { defineContext } from '$lib/utils/context';
	import { css } from 'styled-system/css';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';

	export const [dashboardSend, dashboardReceive] = crossfade({
		duration: 200,
		easing: expoInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 250, easing: expoOut });
		},
	});

	/**
	 * Parent dashboard context.
	 */
	const [getDashboard, setDashboardCtx] = defineContext<{ pushIndex: () => number }>({});
	export function setDashboard() {
		let index = 0;
		function pushIndex() {
			return index++;
		}
		setDashboardCtx({
			pushIndex,
		});
	}

	/**
	 * Dashboard nav context for items.
	 */
	const [getDashboardNav, setDashboardNav] = defineContext<{ pushIndex: () => number }>({});

	export { getDashboardNav };

	const nav = css({
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 'lg',
		backgroundColor: 'neutral.50',
		padding: '0.75rem',
		marginBottom: '0.75rem',
		_dark: {
			backgroundColor: 'neutral.800',
		},
		lg: {
			marginBottom: '0',
		},
	});

	const heading = css({
		position: 'sticky',
		left: '0',
		padding: '.75rem 1.1rem',
		fontSize: '0.8rem',
		fontWeight: '350',
		letterSpacing: '0.01em',
		lineHeight: '1.5',
		color: 'neutral.500',
		_dark: {
			color: 'neutral.600',
		},
		md: {
			position: 'relative',
		},
	});

	const items = css({
		display: 'flex',
		flexDirection: 'row',
		md: {
			flexDirection: 'column',
		},
	});
</script>

<script lang="ts">
	const ctx = getDashboard();
	const navIndex = ctx?.pushIndex() ?? 0;

	let index = 0;
	function pushIndex() {
		return index++;
	}
	setDashboardNav({
		pushIndex,
	});
</script>

<section
	in:scale={{ start: 0.95, duration: 750, easing: expoOut, delay: navIndex * 150 }}
	class={nav}
>
	{#if $$slots.heading}
		<span class={heading}>
			<slot name="heading" />
		</span>
	{/if}
	<div class={items}>
		<slot />
	</div>
</section>
