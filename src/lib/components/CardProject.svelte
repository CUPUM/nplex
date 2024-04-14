<script lang="ts">
	export let href: string | undefined;
	export let hreflang: string | undefined;
	export let disabled: boolean | undefined = undefined;
	export let bannerId: string | null | undefined = undefined;
	export let title: string | null | undefined = undefined;
	export let summary: string | null | undefined = undefined;
</script>

<div class="card">
	{#if href}
		<!-- svelte-ignore a11y-missing-content -->
		<a {href} {hreflang} class="card-link" aria-hidden="true" />
	{/if}
	{#if bannerId}
		<figure>
			{bannerId}
		</figure>
	{/if}
	<div class="details">
		<span class="title">{title}</span>
		<span class="summary">{summary}</span>
	</div>
</div>

<style>
	.card {
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		padding: 2rem;
	}

	.card-link {
		position: absolute;
		inset: 0;
		z-index: 1;
		cursor: pointer;
	}
</style>
