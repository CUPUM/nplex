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
	<h1 class="heading-2xl">
		Descripteurs de projet:
		<br />
		<span class="outlined">Gestion des listes contrôlées</span>
	</h1>
</header>

<style lang="scss">
	header {
		position: relative;
		min-height: calc(75vh - var(--ui-gap-sm) - var(--ui-nav-h));
		min-height: calc(75svh - var(--ui-gap-sm) - var(--ui-nav-h));
		display: flex;
		gap: 3rem;
		flex-direction: column;
		justify-content: center;
		padding: var(--ui-gutter-md);
		margin-bottom: var(--ui-gap-sm);
		border: var(--ui-border-size) solid col(primary, 300);
		// border-block-color: transparent;
		border-radius: var(--ui-radius-xl);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.001));
	}

	h1 {
		z-index: 1;
		color: transparent;
		max-width: var(--ui-width-md);
		color: col(primary, 900);
	}

	.outlined {
		color: transparent;
		-webkit-text-stroke: var(--ui-border-size) col(primary, 300);
	}
</style>
