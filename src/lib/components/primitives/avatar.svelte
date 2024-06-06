<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		id,
		email,
		imageUrl,
		class: className,
	}: {
		id: string;
		email?: string | null;
		imageUrl?: string | null;
	} & HTMLAttributes<HTMLElement> = $props();

	let char = $derived(email ? email.charAt(0) : id.charAt(0));
</script>

<figure
	class={cn(
		'bg-card text-md pointer-events-none relative inset-0 flex aspect-square items-center justify-center font-bold uppercase',
		className
	)}
>
	<span class="absolute leading-none">
		{char}
	</span>
</figure>
