<script lang="ts">
	let { data } = $props();
</script>

<article class="prose mx-auto max-w-md">
	<svelte:component this={data.content} />
</article>
