<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<header in:fly={{ y: 12, easing: cubicOut, duration: 350 }}>
	<h1 class="heading-xl">Gérez les listes contrôlées des descripteurs de projet</h1>
</header>

<style lang="scss">
	header {
		min-height: 50vh;
		display: flex;
		align-self: stretch;
		flex-direction: column;
		justify-content: flex-end;
		padding: var(--ui-gutter-md);
		margin-bottom: var(--ui-gap-sm);
		background-color: col(primary, 100, 0.25);
		border-radius: var(--ui-radius-lg);
		opacity: max(0, calc(1 - var(--ui-scroll) * 0.002));
	}

	h1 {
		color: transparent;
		max-width: var(--ui-width-md);
		-webkit-text-stroke: 1px col(primary, 700);
	}
</style>
