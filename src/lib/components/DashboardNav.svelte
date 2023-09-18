<script lang="ts" context="module">
	import { expoOut } from 'svelte/easing';

	import { ripple } from '$lib/actions/ripple';
	import { i18nlink } from '$lib/i18n/link';
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { crossfade, fly, scale } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 250,
		fallback(node, params, intro) {
			return fly(node, { x: 3, duration: 350, easing: expoOut });
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
	<ul>
		{#each links as link, i (link.key)}
			<!-- svelte-ignore a11y-missing-attribute -->
			{@const attr = $i18nlink(link.path)}
			<li>
				<a
					class="button ghost"
					{...attr}
					use:ripple
					in:scale|global={{ start: 0.95, opacity: 0, delay: i * 75, duration: 750 }}
				>
					{#if link.icon}
						<svelte:component this={link.icon} class="button-icon" />
					{/if}
					<slot name="link" {link} {i} />
					{#if attr['data-current']}
						<div class="needle" in:receive={{ key: 'needle' }} out:send={{ key: 'needle' }} />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
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

	ul {
		display: flex;
		flex-direction: row;
		@include md {
			flex-direction: column;
		}
	}

	.button {
		font-weight: 450;
		border-radius: var(--radius-sm);
		height: unset;
		padding: 1rem;
		white-space: wrap;
		font-size: var(--size-md);
		white-space: nowrap;
		@include md {
			white-space: unset;
			font-weight: 350;
			padding: 0.75rem 1rem;
		}
		@include lg {
			font-size: var(--size-sm);
		}

		&[data-current] {
			@include md {
				font-weight: 550;
			}
		}

		:global(.button-icon) {
			stroke-width: 2.5;
			width: 1.125em;
		}
	}

	.needle {
		position: absolute;
		width: 10px;
		aspect-ratio: 1;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 2px;
		background-color: var(--color-primary-600);
		@include dark {
			background-color: var(--color-primary-500);
		}
		@include md {
			transform: unset;
			left: unset;
			bottom: unset;
			right: 3px;
		}
	}
</style>
