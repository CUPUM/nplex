<script lang="ts" context="module">
	import { ripple } from '$lib/actions/ripple';
	import { i18nlink } from '$lib/i18n/link';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { expoInOut, expoOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 200,
		easing: expoInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 250, easing: expoOut });
		},
	});
	export type DashboardNavLink = { key: string; path: string; icon?: ComponentType<Icon> };
</script>

<script lang="ts">
	type T = $$Generic<DashboardNavLink>;
	export let links: Readonly<T[]>;
</script>

<section>
	{#if $$slots.heading}
		<span class="heading">
			<slot name="heading" />
		</span>
	{/if}
	<div class="links">
		{#each links as link, i (link.key)}
			<!-- svelte-ignore a11y-missing-attribute -->
			{@const attr = $i18nlink(link.path)}
			<a
				class="dashboard-link"
				{...attr}
				use:ripple={{
					color: 'var(--color-neutral-500)',
					speed: 2,
					blur: 8,
				}}
				in:scale|global={{ start: 0.95, opacity: 0, delay: i * 75, duration: 750 }}
			>
				{#if link.icon}
					<svelte:component this={link.icon} class="dashboard-icon" />
				{/if}
				<slot name="link" {link} {i} />
				{#if attr['data-current']}
					<div class="needle" in:receive={{ key: 'needle' }} out:send={{ key: 'needle' }} />
				{/if}
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		border-radius: var(--radius-md);
		// background-color: color-mix(in srgb, var(--color-neutral-50) 50%, transparent);
		// background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		@include dark {
			// background-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		}
	}

	.heading {
		position: sticky;
		left: 0;
		padding: 0.25rem 1rem;
		font-size: 0.8em;
		font-weight: 650;
		color: var(--color-neutral-800);
		@include dark {
			color: var(--color-neutral-200);
		}
		@include md {
			padding: 1rem;
			position: relative;
		}
	}

	.links {
		display: flex;
		flex-direction: row;
		@include md {
			flex-direction: column;
		}
	}

	.dashboard-link {
		display: flex;
		flex-direction: row;
		position: relative;
		z-index: 1;
		font-weight: 450;
		border-radius: var(--radius-sm);
		padding: 1.25rem;
		white-space: wrap;
		font-size: var(--size-md);
		white-space: nowrap;
		transition: all 0.25s;
		@include md {
			white-space: unset;
			font-weight: 350;
			padding: 1em 1.25em;
			font-size: var(--size-sm);
		}

		&[data-current] {
			color: var(--color-primary-700);
			@include dark {
				color: var(--color-primary-500);
			}

			@include md {
				font-weight: 600;
			}
		}

		:global(.dashboard-icon) {
			stroke-width: 2.5;
			width: 1.125em;
		}
	}

	.needle {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		z-index: -1;
		background-color: var(--color-neutral-50);
		@include dark {
			background-color: var(--color-neutral-800);
		}

		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0.75em;
		// 	bottom: 0.75em;
		// 	width: 3px;
		// 	right: -3px;
		// 	border-radius: 3px;
		// 	background: currentColor;
		// }
	}
</style>
