<script lang="ts" context="module">
	import { defineContext } from '$lib/utils/context';
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

<section in:scale={{ start: 0.95, duration: 750, easing: expoOut, delay: navIndex * 150 }}>
	{#if $$slots.heading}
		<span class="heading">
			<slot name="heading" />
		</span>
	{/if}
	<div class="items">
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-lg);
		// border: var(--base-border-size) solid var(--color-neutral-200);
		background-color: var(--color-neutral-200);
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		@include dark {
			background-color: var(--color-neutral-800);
		}

		@include lg {
			margin-bottom: 0;
		}
	}

	.heading {
		position: sticky;
		left: 0;
		padding: 0.25rem 1rem;
		font-size: 0.8em;
		font-weight: 350;
		letter-spacing: 0.01em;
		line-height: 1.5;
		color: var(--color-neutral-500);
		@include dark {
			color: var(--color-neutral-600);
		}
		@include md {
			position: relative;
		}
	}

	.items {
		display: flex;
		flex-direction: row;
		@include md {
			flex-direction: column;
		}
	}
</style>
