<script lang="ts">
	import * as m from '$i18n/messages';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		text,
		fallback,
		class: className,
		...spanProps
	}: { text?: string | null; fallback?: string } & HTMLAttributes<HTMLSpanElement> = $props();
</script>

{#if text}
	{@html text}
{:else}
	<span class={cn('opacity-dim font-thin italic', className)} {...spanProps}>
		{@html fallback ?? m.not_defined()}
	</span>
{/if}
