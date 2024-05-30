<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, content }: { children: Snippet; content: Snippet } = $props();
</script>

{@render children()}

<style>
</style>
