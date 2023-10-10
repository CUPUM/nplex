<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

<article>
	{#if mounted}
		<div id="loop" in:scale|global={{ start: 0.98, duration: 5000, easing: cubicOut, delay: 1000 }}>
			<Loading
				thickness="2"
				speed={0.01}
				trail={false}
				outro={false}
				intro={false}
				linecap="butt"
			/>
		</div>
		<div in:fade|global={{ delay: 500, duration: 750 }}>
			<Logo id="logo" />
		</div>
	{/if}
</article>

<style lang="postcss">
	article {
		flex: 1;
		position: relative;
		height: 100vh;
		align-self: stretch;
		/* background-color: red; */
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(
			270deg,
			var(--color-neutral-100),
			color-mix(in srgb, var(--color-primary-900) 5%, transparent)
		);

		:global(#logo) {
			font-size: 15rem;
			color: var(--color-primary-800);
		}
	}

	#loop {
		position: absolute;
		inset: 0;
		font-size: 30em;
		color: var(--color-primary-600);
		opacity: 0.25;
	}
</style>
