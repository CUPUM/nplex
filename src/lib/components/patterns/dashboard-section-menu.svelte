<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { cn } from '../utilities';

	let { children, class: className, ...menuProps }: HTMLMenuAttributes = $props();
</script>

<menu
	in:fly|global={{ opacity: 0, y: 6, duration: 250, easing: expoOut, delay: 500 }}
	class={cn(
		'gap-menu-gutter p-input-nest bg-card/50 bottom-md big sticky flex flex-row self-center rounded-[calc(var(--radius-input)+var(--spacing-input-nest))] text-sm backdrop-blur-md',
		className
	)}
	{...menuProps}
>
	{@render children?.()}
</menu>
