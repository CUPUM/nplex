<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utilities';

	let {
		children,
		messages,
		class: className,
		messagesFor,
	}: { children: Snippet; messages: unknown; class?: string; messagesFor: string } = $props();
</script>

<div class={cn(className)}>
	{@render children?.()}
	{#if messages}
		<label for={messagesFor}>messages go here</label>
	{/if}
</div>

<style lang="postcss">
</style>
