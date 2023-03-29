<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<header in:fly={{ y: 12, easing: cubicOut, duration: 350 }}>
	<!-- <MeshGradient
		color={[
			col('bg', 500),
			col('bg', 300),
			col('secondary', 300, 0.25),
			col('primary', 500, 0.25),
			col('secondary', 700, 0.2),
		]}
	/> -->
	<h1 class="heading-2xl">Gestion des listes contrôlées des descripteurs de projet</h1>
</header>

<style lang="scss">
	header {
		position: relative;
		min-height: calc(100vh - var(--ui-gap-sm) - var(--ui-nav-h));
		min-height: calc(100svh - var(--ui-gap-sm) - var(--ui-nav-h));
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: var(--ui-gutter-md);
		margin-bottom: var(--ui-gap-sm);
		// background-color: col(primary, 300);
		border: var(--ui-border-size) solid col(secondary, 500, 0.5);
		border-radius: var(--ui-radius-lg);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.0015));
	}

	h1 {
		z-index: 1;
		color: transparent;
		max-width: var(--ui-width-md);
		-webkit-text-stroke: var(--ui-border-size) col(secondary, 500);
	}
</style>
