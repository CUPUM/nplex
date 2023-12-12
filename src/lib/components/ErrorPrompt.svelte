<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { Frown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import LangKey from './LangKey.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if $page.error && mounted}
	<article in:fade|global={{ duration: 250, easing: expoOut }}>
		<div>
			<h1 in:fly|global={{ y: 6 }}>
				<Frown strokeWidth="3" size="1em" class="icon" />
				Oops, <LangKey>
					{m.error_details()}
				</LangKey>
			</h1>
			<p in:fly={{ y: -6, delay: 75 }}>
				{$page.error?.message}
			</p>
		</div>
	</article>
{/if}

<style lang="postcss">
	article {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		container-type: inline-size;
		border-radius: inherit;
		background: radial-gradient(
			circle at center,
			color-mix(in srgb, var(--color-error-500) 10%, transparent),
			transparent
		);
	}

	div {
		max-width: var(--width-sm);
	}

	h1 {
		font-weight: 500;
		font-size: var(--size-2xl);
		color: var(--color-error-400);
		line-height: 1.1;
		margin-bottom: 1em;
		:global(:--dark) & {
			color: var(--color-error-200);
		}

		:global(.icon) {
			display: inline;
			vertical-align: bottom;
		}
	}

	p {
		opacity: 0.5;
	}

	@container (width < 500px) {
		h1 {
			font-size: var(--size-xl);
		}
	}
</style>
