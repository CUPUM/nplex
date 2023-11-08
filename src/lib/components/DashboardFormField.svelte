<script lang="ts">
	export let title: string | undefined = undefined;
	export let centered: boolean = false;
</script>

<section>
	{#if title}
		<h3 class="heading sm">{title}</h3>
	{/if}
	<div class="content" class:centered>
		<slot />
	</div>
</section>

<style lang="postcss">
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-self: stretch;
		align-items: stretch;
		padding: 1rem;
		gap: 1rem;
		@media (--md) {
			padding: 2rem;
			gap: 2rem;
		}
		@media (--lg) {
			gap: 2rem;
			padding: 2rem 3rem;
		}

		&:not(:last-of-type) {
			border-bottom: var(--base-border-dim);
		}
	}

	.content {
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		gap: 2rem;
		flex-direction: column;

		&.centered {
			align-self: center;
			width: 100%;
			max-width: var(--width-md);
		}
	}
</style>
