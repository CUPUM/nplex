<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<article>
	<div id="loop" in:fade={{ duration: 2500, easing: expoOut, delay: 500 }}>
		<Loading thickness="10" speed={0.01} trail={false} outro={false} intro={false} linecap="butt" />
	</div>

	<Logo id="logo" />
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
		background: linear-gradient(270deg, var(--color-neutral-100), var(--color-neutral-200));

		:global(#logo) {
			font-size: 15rem;
			color: var(--color-primary-700);
		}
	}

	#loop {
		font-size: 30em;
		color: var(--color-primary-600);
		opacity: 0.25;
	}
</style>
