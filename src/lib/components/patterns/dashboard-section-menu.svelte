<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import type { HTMLMenuAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { cn } from '../utilities';

	let { children, class: className, ...menuProps }: HTMLMenuAttributes = $props();
</script>

<menu
	in:fly|global={{ y: 6, duration: 750, easing: expoOut }}
	class={cn(
		'gap-input-group-gap p-sm bg-card/50 bottom-md sticky flex flex-row self-center rounded-[calc(var(--radius-input)+var(--spacing-sm))] text-sm backdrop-blur-md',
		className
	)}
	{...menuProps}
>
	{@render children?.()}
</menu>
