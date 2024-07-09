<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		children,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLElementTagNameMap['header']> = $props();
</script>

<header
	class={cn('prose prose-block p-lg rounded-section bg-card/soft relative text-sm', className)}
	{...restProps}
>
	{@render children?.()}
</header>
