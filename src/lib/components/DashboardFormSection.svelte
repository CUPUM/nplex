<script lang="ts">
	export let title: string | undefined = undefined;
</script>

<section>
	{#if title}
		<header>
			<h3 class="heading md">{title}</h3>
		</header>
	{/if}
	<slot />
</section>

<style lang="postcss">
	section {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-self: stretch;
		align-items: flex-start;
	}

	header {
		padding: 1rem;
	}
</style>
